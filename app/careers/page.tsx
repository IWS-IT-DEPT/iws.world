import type { Metadata } from "next";
import Image from "next/image";
import CareersForm from "./CareersForm";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the IWS team across our warehouse and logistics operations in Mobile, AL, Pensacola, FL, and Houston, TX.",
};

const reasons = [
  {
    title: "Steady, essential work",
    description:
      "We support large industrial and manufacturing operations that depend on us every day — the work is consistent and it matters.",
  },
  {
    title: "Hands-on teams",
    description:
      "Our warehouses run on people who know how to move freight safely and efficiently — from forklift operators to dock supervisors.",
  },
  {
    title: "Room to grow",
    description:
      "With facilities across three states and an in-house trucking company, there are paths to grow beyond your first role at IWS.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-iws-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/warehouse-doors.jpg"
            alt="IWS warehouse loading dock"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-iws-charcoal via-iws-charcoal/90 to-iws-charcoal/60" />
        </div>
        <div className="container-page relative py-20 sm:py-28">
          <SectionHeading
            light
            eyebrow="Careers"
            title="Join the team keeping industry moving"
            description="From our warehouse floors to our trucks, IWS people are the reason freight moves on schedule. We're always glad to hear from reliable, hands-on people."
          />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-3">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl border border-iws-border bg-white p-7 shadow-sm"
              >
                <h3 className="text-lg font-bold text-iws-charcoal">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-iws-charcoal/70">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-iws-sand py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Apply now"
              title="Tell us about yourself"
              description="Send us your information and we'll reach out about current openings that fit."
            />
            <div className="mt-8 space-y-1 text-sm text-iws-charcoal/70">
              <p>
                Prefer to talk first? Call us at{" "}
                <a
                  href={siteConfig.phoneHref}
                  className="font-semibold text-iws-charcoal hover:text-iws-green-dark"
                >
                  {siteConfig.phone}
                </a>
                .
              </p>
              <p>
                Or email us directly at{" "}
                <a
                  href={`mailto:${siteConfig.hrEmail}`}
                  className="font-semibold text-iws-charcoal hover:text-iws-green-dark"
                >
                  {siteConfig.hrEmail}
                </a>
                .
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-iws-border bg-white p-7 shadow-sm sm:p-10">
            <CareersForm />
          </div>
        </div>
      </section>
    </>
  );
}
