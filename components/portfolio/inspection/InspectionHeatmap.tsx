import { cn } from "@/lib/utils";
import type { InspectionState } from "./inspectionData";
import { CAMERAS } from "./inspectionData";

export function InspectionHeatmap({
  state,
  live,
}: {
  state: InspectionState;
  live: boolean;
}) {
  const cam = state.ngFocusCam;
  const hasAnomaly = cam >= 0;
  const defect = hasAnomaly ? state.defect[cam] : null;

  return (
    <div className="rounded-lg border border-line bg-white/[0.02] p-3">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
        Defect Heatmap
      </div>

      {hasAnomaly ? (
        <>
          <div className="mb-2 flex items-center justify-between font-mono text-[9px]">
            <span className="text-foreground/80">{CAMERAS[cam].id}</span>
            {defect && <span className="text-red-300">{defect}</span>}
          </div>

          <div className="relative overflow-hidden rounded-md border border-line">
            <svg
              viewBox="0 0 100 58"
              className={cn(
                "block h-auto w-full origin-center transition-transform duration-500",
                // NG時のみ少し拡大
                "scale-[1.03]",
              )}
            >
              <defs>
                <radialGradient id="heatmap-hot" cx="58%" cy="46%" r="56%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
                  <stop offset="13%" stopColor="#f87171" stopOpacity="0.95" />
                  <stop offset="34%" stopColor="#f59e0b" stopOpacity="0.82" />
                  <stop offset="62%" stopColor="#10b981" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0b3a6b" stopOpacity="0.08" />
                </radialGradient>
              </defs>
              <rect x="0" y="0" width="100" height="58" fill="#05090f" />
              <rect x="0" y="0" width="100" height="58" fill="url(#heatmap-hot)" />
              {/* detection box: faint dashed frame + bright ┌┐└┘ corner markers */}
              <g className={cn(live && "motion-safe:animate-pulse")}>
                <rect
                  x="47"
                  y="18"
                  width="22"
                  height="18"
                  rx="1"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.35"
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                />
                <path
                  d="M47 24 L47 18 L53 18 M63 18 L69 18 L69 24 M47 30 L47 36 L53 36 M63 36 L69 36 L69 30"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="58" y1="24" x2="58" y2="30" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.7" />
                <line x1="55" y1="27" x2="61" y2="27" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.7" />
              </g>
            </svg>

            {/* breathing glow over the anomaly centre */}
            {live && (
              <div
                aria-hidden
                className="pointer-events-none absolute left-[58%] top-[46%] h-12 w-12 rounded-full motion-safe:animate-[breathe_3.4s_ease-in-out_infinite]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.35), rgba(248,113,113,0.25) 45%, transparent 70%)",
                }}
              />
            )}
          </div>

          {/* legend */}
          <div className="mt-2 flex items-center gap-2">
            <span className="font-mono text-[8px] text-subtle">Low</span>
            <div
              className="h-1.5 flex-1 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, #3b82f6, #10b981, #f59e0b, #ef4444)",
              }}
            />
            <span className="font-mono text-[8px] text-subtle">High</span>
          </div>
        </>
      ) : (
        <div className="flex h-[92px] flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-line text-center">
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          <span className="font-mono text-[10px] text-emerald-300/90">
            No anomaly detected
          </span>
        </div>
      )}
    </div>
  );
}
