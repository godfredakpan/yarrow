/**
 * Optional confirmation email after contact/booking. Calls same-origin /api/send-contact-confirmation
 * (Vercel) or Vite dev middleware. Override with VITE_CONTACT_CONFIRM_URL for a full URL.
 */

export type ContactConfirmationPayload = {
  name: string;
  email: string;
  kind: "consultation" | "event";
  caseId: number;
  /** Shown in "Case …: {categoryLabel} within our system" */
  categoryLabel: string;
  eventTitle?: string;
};

export async function sendContactConfirmationEmail(
  payload: ContactConfirmationPayload
): Promise<boolean> {
  const path =
    import.meta.env.VITE_CONTACT_CONFIRM_URL ?? "/api/send-contact-confirmation";
  const url = path.startsWith("http")
    ? path
    : `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
