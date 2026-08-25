"use client";

import { useActionState } from "react";
import { submitContactForm } from "./actions";
import { initialFormState } from "@/lib/form-state";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialFormState
  );

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-iws-green/30 bg-iws-green/5 p-8 text-center">
        <h3 className="text-lg font-bold text-iws-charcoal">Message sent</h3>
        <p className="mt-2 text-iws-charcoal/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company_website">Company Website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-iws-charcoal">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-iws-border bg-white px-4 py-2.5 text-sm text-iws-charcoal outline-none focus:border-iws-green focus:ring-2 focus:ring-iws-green/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-iws-charcoal">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-iws-border bg-white px-4 py-2.5 text-sm text-iws-charcoal outline-none focus:border-iws-green focus:ring-2 focus:ring-iws-green/20"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-iws-charcoal">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-iws-border bg-white px-4 py-2.5 text-sm text-iws-charcoal outline-none focus:border-iws-green focus:ring-2 focus:ring-iws-green/20"
          />
        </div>
        <div>
          <label htmlFor="companyName" className="mb-1.5 block text-sm font-medium text-iws-charcoal">
            Company
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            className="w-full rounded-lg border border-iws-border bg-white px-4 py-2.5 text-sm text-iws-charcoal outline-none focus:border-iws-green focus:ring-2 focus:ring-iws-green/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-iws-charcoal">
          How can we help? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-iws-border bg-white px-4 py-2.5 text-sm text-iws-charcoal outline-none focus:border-iws-green focus:ring-2 focus:ring-iws-green/20"
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm font-medium text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-iws-green px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-iws-green-dark disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
