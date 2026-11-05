/**
 * IWS arrow icon: a rounded chevron inside a ring (drawn on a 512 grid).
 * Inherits the surrounding text color. Put it inside an element with the
 * `group` class: on hover the ring fills with the link color and the
 * chevron turns white and nudges in its direction.
 */
export default function ArrowIcon({
  direction = "right",
  className = "",
}: {
  direction?: "right" | "up-right";
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 512 512"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`arrow-circle ${direction === "up-right" ? "arrow-circle--external" : ""} ${className}`}
    >
      <circle className="arrow-circle__ring" cx="256" cy="256" r="236" strokeWidth="40" />
      <g transform={direction === "up-right" ? "rotate(-45 256 256)" : undefined}>
        <path className="arrow-circle__chevron" d="M214 150 320 256 214 362" strokeWidth="42" />
      </g>
    </svg>
  );
}
