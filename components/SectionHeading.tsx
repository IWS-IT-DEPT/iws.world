type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  /** Use "h1" for the main heading of a page (one per page, for SEO). */
  as?: "h1" | "h2";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""} ${Heading === "h2" ? "reveal" : ""}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-wider ${
            light ? "text-white/70" : "text-iws-green-dark"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-iws-charcoal"
        }`}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-white/70" : "text-iws-charcoal/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
