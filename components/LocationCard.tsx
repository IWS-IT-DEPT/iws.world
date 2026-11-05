import type { Location } from "@/lib/data";
import { mapHref, siteConfig } from "@/lib/data";
import ArrowIcon from "@/components/ArrowIcon";

export default function LocationCard({ location }: { location: Location }) {
  return (
    <div className="card-lift reveal flex h-full flex-col rounded-2xl border border-iws-border bg-white p-7 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-iws-green-dark">
        {location.city}, {location.state}
      </p>
      <h3 className="mt-1 text-lg font-bold text-iws-charcoal">
        {location.label}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-iws-charcoal/70">
        {location.address}
        <br />
        {location.addressLine2}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-iws-charcoal/60">
        {location.role}
      </p>
      <div className="mt-5 flex flex-wrap gap-3 border-t border-iws-border pt-5 text-sm font-semibold">
        <a
          href={mapHref(location.mapQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-iws-blue hover:text-iws-blue-dark"
        >
          Get Directions <ArrowIcon direction="up-right" />
        </a>
        <a href={siteConfig.phoneHref} className="text-iws-charcoal/70 hover:text-iws-charcoal">
          {siteConfig.phone}
        </a>
      </div>
    </div>
  );
}
