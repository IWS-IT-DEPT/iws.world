import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import SectionHeading from "@/components/SectionHeading";
import { locations, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a quote or ask a question — contact IWS about warehousing, Foreign Trade Zone services, or logistics.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact us"
            title="Get a quote or ask us anything"
            description="Tell us about your storage, FTZ, or logistics needs and we'll get back to you quickly."
          />

          <div className="mt-10 space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-iws-charcoal/50">
                Call us
              </p>
              <a
                href={siteConfig.phoneHref}
                className="text-xl font-bold text-iws-charcoal hover:text-iws-green-dark"
              >
                {siteConfig.phone}
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-iws-charcoal/50">
                Email sales
              </p>
              <a
                href={`mailto:${siteConfig.salesEmail}`}
                className="text-xl font-bold text-iws-charcoal hover:text-iws-green-dark"
              >
                {siteConfig.salesEmail}
              </a>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-iws-charcoal/50">
                Our locations
              </p>
              <ul className="space-y-1.5 text-sm text-iws-charcoal/70">
                {locations.map((loc) => (
                  <li key={loc.id}>
                    <span className="font-medium text-iws-charcoal">
                      {loc.city}, {loc.state}
                    </span>{" "}
                    — {loc.address}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-iws-border bg-white p-7 shadow-sm sm:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
