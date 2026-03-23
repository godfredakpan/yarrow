/**
 * Vercel Serverless / Edge: sends a confirmation email via Resend after contact or event registration.
 * Set RESEND_API_KEY and RESEND_FROM (verified domain) in the project environment.
 */
import {
  confirmationToResponse,
  parseConfirmationBody,
  sendConfirmationEmail,
} from "../server/contactConfirmationResend";

export const config = { runtime: "edge" };

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = parseConfirmationBody(json);
  if (!body) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = await sendConfirmationEmail(body, process.env);
  return confirmationToResponse(result);
}
