import { cn } from "@/lib/utils";
import {
  WARN_THRESHOLD,
  ALARM_THRESHOLD,
  type MonitoringState,
  type TempStatus,
} from "./monitoringData";

const T_MIN = 44;
const T_MAX = 78;
const L = 24; // left gutter (Y labels)
const R = 6;
const TOP = 6;
const BOT = 14; // bottom gutter (X labels)
const W = 360;
const H = 170;
const PLOT_W = W - L - R;
const PLOT_H = H - TOP - BOT;

const yFor = (t: number) =>
  TOP + ((T_MAX - t) / (T_MAX - T_MIN)) * PLOT_H;
const xFor = (i: number, n: number) =>
  L + (n <= 1 ? 0 : i / (n - 1)) * PLOT_W;

const STATUS_STROKE: Record<TempStatus, string> = {
  NORMAL: "#34d399",
  WARNING: "#f59e0b",
  ALARM: "#f87171",
};

export function TemperatureChart({ state }: { state: MonitoringState }) {
  const h = state.history;
  const n = h.length;
  const line = h.map((t, i) => `${xFor(i, n)},${yFor(t)}`).join(" ");
  const area = `${xFor(0, n)},${TOP + PLOT_H} ${line} ${xFor(n - 1, n)},${TOP + PLOT_H}`;
  const cx = xFor(n - 1, n);
  const cy = yFor(h[n - 1]);
  const point = STATUS_STROKE[state.status];

  return (
    <div className="rounded-md border border-line bg-[radial-gradient(120%_120%_at_50%_-10%,#101216_0%,#0a0b0e_60%)] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full">
        <defs>
          <linearGradient id="tempArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid + Y ticks */}
        {[50, 55, 65, 75].map((t) => (
          <line
            key={`g${t}`}
            x1={L}
            y1={yFor(t)}
            x2={W - R}
            y2={yFor(t)}
            stroke="rgba(255,255,255,0.045)"
            strokeWidth="0.5"
          />
        ))}
        {[50, 60, 70].map((t) => (
          <text
            key={`yl${t}`}
            x={L - 4}
            y={yFor(t) + 2}
            textAnchor="end"
            fill="#8b8b95"
            fontFamily="monospace"
            style={{ fontSize: 5 }}
          >
            {t}
          </text>
        ))}

        {/* threshold lines */}
        <line x1={L} y1={yFor(WARN_THRESHOLD)} x2={W - R} y2={yFor(WARN_THRESHOLD)} stroke="#f59e0b" strokeOpacity="0.55" strokeWidth="0.6" strokeDasharray="3 2" />
        <line x1={L} y1={yFor(ALARM_THRESHOLD)} x2={W - R} y2={yFor(ALARM_THRESHOLD)} stroke="#f87171" strokeOpacity="0.6" strokeWidth="0.6" strokeDasharray="3 2" />
        <text x={W - R} y={yFor(WARN_THRESHOLD) - 2} textAnchor="end" fill="#f59e0b" fillOpacity="0.8" fontFamily="monospace" style={{ fontSize: 4.5 }}>WARN 60℃</text>
        <text x={W - R} y={yFor(ALARM_THRESHOLD) - 2} textAnchor="end" fill="#f87171" fillOpacity="0.8" fontFamily="monospace" style={{ fontSize: 4.5 }}>ALARM 70℃</text>

        {/* series */}
        <polygon points={area} fill="url(#tempArea)" />
        <polyline
          points={line}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* current point */}
        <circle cx={cx} cy={cy} r="3.2" fill={point} fillOpacity="0.18" />
        <circle cx={cx} cy={cy} r="1.6" fill={point} />

        {/* X axis hint */}
        <text x={L} y={H - 4} fill="#8b8b95" fontFamily="monospace" style={{ fontSize: 4.5 }}>
          −{n}s
        </text>
        <text x={W - R} y={H - 4} textAnchor="end" fill="#8b8b95" fontFamily="monospace" style={{ fontSize: 4.5 }}>
          now
        </text>
      </svg>
    </div>
  );
}

/** Small header used above the chart. */
export function ChartHeader({ status }: { status: TempStatus }) {
  return (
    <div className="mb-1.5 flex items-center justify-between">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
        Realtime Temperature
      </span>
      <span
        className={cn(
          "rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold",
          status === "ALARM"
            ? "bg-red-500/15 text-red-300"
            : status === "WARNING"
              ? "bg-amber-500/15 text-amber-300"
              : "bg-emerald-500/15 text-emerald-300",
        )}
      >
        {status}
      </span>
    </div>
  );
}
