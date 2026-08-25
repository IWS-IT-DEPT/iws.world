import Image from "next/image";
import Link from "next/link";
import { locations, mapHref, navLinks, siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-iws-charcoal text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-4 inline-flex rounded-lg bg-white p-2">
            <Image
              src="/images/logo.png"
              alt="IWS - International Warehouse & Shipping"
              width={48}
              height={48}
              className="h-12 w-12"
            />
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            Full-service warehousing and Foreign Trade Zone solutions for
            industrial and manufacturing clients across the Gulf Coast.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Company
          </h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/60 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.rollingGreenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white"
              >
                Rolling Green Transportation ↗
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Locations
          </h3>
          <ul className="space-y-2.5 text-sm text-white/60">
            {locations.map((loc) => (
              <li key={loc.id}>
                <a
                  href={mapHref(loc.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {loc.city}, {loc.state}
                </a>{" "}
                <span className="text-white/40">— {loc.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Contact
          </h3>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li>
              <a href={siteConfig.phoneHref} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.salesEmail}`} className="hover:text-white">
                {siteConfig.salesEmail}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.hrEmail}`} className="hover:text-white">
                {siteConfig.hrEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} International Warehouse &amp;
            Shipping. All rights reserved.
          </p>
          <p>Mobile, AL &middot; Pensacola, FL &middot; Houston, TX</p>
        </div>
      </div>
    </footer>
  );
}
