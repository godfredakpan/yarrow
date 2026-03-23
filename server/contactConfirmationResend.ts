/**
 * Shared logic for POST /api/send-contact-confirmation (Vercel) and Vite dev middleware.
 * Requires RESEND_API_KEY (and optionally RESEND_FROM) in the server environment.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ConfirmationKind = "consultation" | "event";

export type ConfirmationBody = {
  email: string;
  name: string;
  kind: ConfirmationKind;
  /** Padded to 8 digits for the email, e.g. 108768 → 00108768 */
  caseId: number;
  /** Text after "Case …: " and before " within our system" */
  categoryLabel: string;
  eventTitle?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function parseConfirmationBody(json: unknown): ConfirmationBody | null {
  if (!json || typeof json !== "object") return null;
  const o = json as Record<string, unknown>;
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const kind = o.kind === "event" ? "event" : o.kind === "consultation" ? "consultation" : null;
  const eventTitle =
    typeof o.eventTitle === "string" ? o.eventTitle.trim().slice(0, 200) : undefined;
  const caseIdRaw = o.caseId;
  const caseId =
    typeof caseIdRaw === "number" && Number.isFinite(caseIdRaw) && caseIdRaw >= 0 && Number.isInteger(caseIdRaw)
      ? caseIdRaw
      : typeof caseIdRaw === "string" && /^\d+$/.test(caseIdRaw)
        ? parseInt(caseIdRaw, 10)
        : NaN;
  const categoryLabel =
    typeof o.categoryLabel === "string" ? o.categoryLabel.trim().slice(0, 200) : "";
  if (!email || !EMAIL_RE.test(email) || email.length > 255) return null;
  if (!name || name.length > 100) return null;
  if (!kind) return null;
  if (!Number.isFinite(caseId) || caseId < 0) return null;
  if (!categoryLabel) return null;
  return { email, name, kind, caseId, categoryLabel, eventTitle: eventTitle || undefined };
}

function formatCaseRef(caseId: number): string {
  return String(caseId).padStart(8, "0");
}

function buildHtml(body: ConfirmationBody): { subject: string; html: string } {
  const safeName = escapeHtml(body.name);
  const caseRef = formatCaseRef(body.caseId);
  const safeCategory = escapeHtml(body.categoryLabel);

  if (body.kind === "event") {
    return {
      subject: `We got your registration — Case ${caseRef} — Yarrow`,
      html: `<p>Dear ${safeName},</p>
<p>Thanks for registering with Yarrow. We got your registration and we're on it!</p>
<p>You can expect to hear back from us within 24 hours.</p>
<p>Your registration has been identified as Case ${caseRef}: ${safeCategory} within our system. If you need to contact us again on this same topic, please use this number as a reference.</p>
<p>Rooted in Her,<br>—Yarrow</p>`,
    };
  }

  return {
    subject: `We got your message — Case ${caseRef} — Yarrow`,
    html: `<p>Dear ${safeName},</p>
<p>Thanks for contacting Yarrow. We got your message and we're on it!</p>
<p>You can expect to hear back from us within 24 hours.</p>
<p>Your email has been identified as Case ${caseRef}: ${safeCategory} within our system. If you need to contact us again on this same topic, please use this number as a reference.</p>
<p>Rooted in Her,<br>—Yarrow</p>`,
  };
}

export type ConfirmationEnv = {
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
};

export async function sendConfirmationEmail(
  body: ConfirmationBody,
  env: ConfirmationEnv
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const key = env.RESEND_API_KEY?.trim();
  if (!key) {
    return { ok: false, status: 503, error: "Email service not configured" };
  }
  const from = env.RESEND_FROM?.trim() || "Yarrow <onboarding@resend.dev>";
  const { subject, html } = buildHtml(body);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [body.email],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    return { ok: false, status: 502, error: "Failed to send confirmation email" };
  }

  return { ok: true };
}

export function confirmationToResponse(
  result: Awaited<ReturnType<typeof sendConfirmationEmail>>
): Response {
  if (result.ok) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ ok: false, error: result.error }), {
    status: result.status,
    headers: { "Content-Type": "application/json" },
  });
}
