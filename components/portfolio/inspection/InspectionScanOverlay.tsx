/**
 * Scan / capture overlay — independent of the media below it, so it works over
 * both the SVG fallback and a real image. Cyan tint while active, moving scan
 * band only while capturing (and only when live: gated by `live`).
 */
export function InspectionScanOverlay({
  active,
  capturing,
  live,
}: {
  active: boolean;
  capturing: boolean;
  live: boolean;
}) {
  if (!active) return null;
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cyan-300/[0.05]"
      />
      {live && capturing && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-[inspect-scan_1.1s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 42%, rgba(34,211,238,0.85) 50%, transparent 58%)",
            backgroundSize: "100% 220%",
          }}
        />
      )}
    </>
  );
}
