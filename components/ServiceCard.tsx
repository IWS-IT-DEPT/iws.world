import type { Service } from "@/lib/data";

export default function ServiceCard({
  service,
  detailed = false,
}: {
  service: Service;
  detailed?: boolean;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-iws-border bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="text-lg font-bold text-iws-charcoal">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-iws-charcoal/70">
        {detailed ? service.description : service.summary}
      </p>
    </div>
  );
}
