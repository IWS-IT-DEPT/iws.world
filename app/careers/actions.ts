"use server";

import { initialFormState, type FormState } from "@/lib/form-state";
import { getResendClient, getSendFromAddress } from "@/lib/resend";
import { siteConfig } from "@/lib/data";

export async function submitCareersForm(
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
  const position = String(formData.get("position") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !phone) {
    return {
      status: "error",
      message: "Please fill in your name, email, and phone number.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: getSendFromAddress("IWS Careers"),
      to: [siteConfig.hrEmail],
      replyTo: email,
      subject: `Job application from ${name}${position ? ` — ${position}` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        position ? `Position of interest: ${position}` : null,
        location ? `Preferred location: ${location}` : null,
        "",
        message || "(No additional message provided)",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error (careers form):", error);
      return {
        status: "error",
        message: "Something went wrong submitting your application. Please call us instead.",
      };
    }

    return {
      status: "success",
      message: "Thanks — your application has been sent to our HR team.",
    };
  } catch (err) {
    console.error("Careers form send failed:", err);
    return {
      status: "error",
      message: "Something went wrong submitting your application. Please call us instead.",
    };
  }
}
