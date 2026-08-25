"use server";

import { initialFormState, type FormState } from "@/lib/form-state";
import { getResendClient, getSendFromAddress } from "@/lib/resend";
import { siteConfig } from "@/lib/data";

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const honeypot = String(formData.get("company_website") ?? "");
  if (honeypot.trim() !== "") {
    return initialFormState;
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const companyName = String(formData.get("companyName") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email, and message.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: getSendFromAddress("IWS Website"),
      to: [siteConfig.salesEmail],
      replyTo: email,
      subject: `Website inquiry from ${name}${companyName ? ` (${companyName})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        companyName ? `Company: ${companyName}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error (contact form):", error);
      return {
        status: "error",
        message: "Something went wrong sending your message. Please call us instead.",
      };
    }

    return {
      status: "success",
      message: "Thanks — we've received your message and will follow up shortly.",
    };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please call us instead.",
    };
  }
}
