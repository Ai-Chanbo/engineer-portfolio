/**
 * Ambient aurora + grid backdrop (pure CSS, no JS cost).
 * Renders behind the hero: two slowly drifting gradient blobs, a masked
 * technical grid, and a fine film grain for depth.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden grain"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 mask-radial-fade opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Aurora blob — blue */}
      <div
        className="absolute left-1/2 top-[-10%] h-[55vh] w-[55vh] -translate-x-1/2 rounded-full blur-[100px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.45), transparent 70%)",
        }}
      />

      {/* Aurora blob — cyan */}
      <div
        className="absolute right-[8%] top-[18%] h-[42vh] w-[42vh] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.28), transparent 70%)",
        }}
      />

      {/* Aurora blob — indigo, low */}
      <div
        className="absolute left-[6%] top-[40%] h-[38vh] w-[38vh] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.22), transparent 70%)",
        }}
      />

      {/* Vignette to seat the content on the background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent,rgba(9,9,11,0.7)_80%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
