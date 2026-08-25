import { Resend } from "resend";

let client: Resend | null = null;

export function getResendClient() {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }
    client = new Resend(apiKey);
  }
  return client;
}

export function getSendFromAddress(label: string) {
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!domain) {
    throw new Error("RESEND_EMAIL_DOMAIN is not set");
  }
  return `${label} <website@${domain}>`;
}
