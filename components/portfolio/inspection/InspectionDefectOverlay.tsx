/**
 * NG defect overlay — a transparent SVG (same 0–100 coordinate space as the
 * media) plus the defect label. Layered above the media so it renders over a
 * real image or the SVG fallback identically.
 */
export function InspectionDefectOverlay({
  index,
  defect,
}: {
  index: number;
  defect: string | null;
}) {
  return (
    <>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id={`heat${index}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(248,113,113,0.55)" />
            <stop offset="100%" stopColor="rgba(248,113,113,0)" />
          </radialGradient>
        </defs>
        {/* heatmap glow */}
        <circle cx="60" cy="44" r="21" fill={`url(#heat${index})`} />
        {/* defect assist line (scratch / crack) */}
        <path
          d="M52 40 l9 5 l-3 3 l7 4"
          fill="none"
          stroke="#fecaca"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* detection box */}
        <rect
          x="47"
          y="35"
          width="25"
          height="18"
          rx="2"
          fill="none"
          stroke="#f87171"
          strokeWidth="1.3"
          strokeDasharray="3.5 2.5"
        />
      </svg>

      {defect && (
        <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded bg-red-500/25 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-red-100 sm:text-[9px]">
          {defect}
        </span>
      )}
    </>
  );
}
