import Link from "next/link";
import { siteConfig } from "@/lib/data";

export default function CtaBand({
  title = "Ready to talk about your storage or logistics needs?",
  description = "Tell us about your facility, your freight, or your team, and we'll follow up quickly.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-iws-blue">
      <div className="container-page flex flex-col items-start justify-between gap-6 py-16 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 text-white/70">{description}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-iws-blue-dark shadow-sm transition-colors hover:bg-white/90"
          >
            Get a Quote
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="rounded-full border border-white/30 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Call {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
