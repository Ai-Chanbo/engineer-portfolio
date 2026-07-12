import { cn } from "@/lib/utils";
import { InspectionDashboard } from "./inspection/InspectionDashboard";

/**
 * Placeholder "product screenshot" rendered in code so the portfolio never
 * looks empty before real captures exist. Two on-topic variants:
 *  - inspection: a live AI inspection dashboard (see ./inspection)
 *  - monitoring: a temperature line chart with stat tiles
 * ProjectVisual only switches between variants and provides the window frame.
 */
export function ProjectVisual({
  variant,
  title,
  className,
}: {
  variant: "inspection" | "monitoring";
  title: string;
  className?: string;
}) {
  if (variant === "inspection") {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl border border-line bg-[#0c0c0f]",
          className,
        )}
      >
        <InspectionDashboard />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(34,211,238,0.12),transparent)]" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-line bg-[#0c0c0f]",
        className,
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-white/[0.02] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[11px] text-subtle">{title}</span>
      </div>

      <div className="p-4 sm:p-5">
        <MonitoringMock />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(59,130,246,0.15),transparent)]" />
    </div>
  );
}

function MonitoringMock() {
  // A gentle temperature curve.
  const pts = [
    [0, 60], [40, 52], [80, 58], [120, 40], [160, 46],
    [200, 30], [240, 38], [280, 24], [320, 32], [360, 20],
  ];
  const line = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `0,90 ${line} 360,90`;

  return (
    <div className="flex flex-col gap-4">
      {/* Stat tiles */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { l: "現在温度", v: "42.6", u: "℃" },
          { l: "平均", v: "38.1", u: "℃" },
          { l: "稼働", v: "99.9", u: "%" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-lg border border-line bg-white/[0.02] px-3 py-2"
          >
            <div className="text-[9px] text-subtle">{s.l}</div>
            <div className="mt-0.5 font-mono text-sm text-foreground">
              {s.v}
              <span className="ml-0.5 text-[10px] text-subtle">{s.u}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-lg border border-line bg-white/[0.02] p-3">
        <svg viewBox="0 0 360 90" className="h-24 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="tempLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          {[22, 45, 68].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="360"
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}
          <polygon points={area} fill="url(#tempFill)" />
          <polyline
            points={line}
            fill="none"
            stroke="url(#tempLine)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
