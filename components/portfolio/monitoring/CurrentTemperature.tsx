import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  WARN_THRESHOLD,
  ALARM_THRESHOLD,
  type MonitoringState,
} from "./monitoringData";

export function CurrentTemperature({ state }: { state: MonitoringState }) {
  const s = state.status;
  const accent =
    s === "ALARM"
      ? "text-red-400"
      : s === "WARNING"
        ? "text-amber-300"
        : "text-emerald-300";
  const frame =
    s === "ALARM"
      ? "border-red-400/45 shadow-[0_0_22px_-8px_rgba(248,113,113,0.5)]"
      : s === "WARNING"
        ? "border-amber-400/40 shadow-[0_0_22px_-8px_rgba(245,158,11,0.45)]"
        : "border-emerald-400/25";

  const up = state.diff > 0;
  const flat = state.diff === 0;

  return (
    <div
      className={cn(
        "rounded-lg border bg-white/[0.02] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        frame,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-subtle">
          Current Temperature
        </span>
        <span
          className={cn(
            "rounded px-1.5 py-0.5 font-mono text-[9px] font-bold",
            s === "ALARM"
              ? "bg-red-500/15 text-red-300"
              : s === "WARNING"
                ? "bg-amber-500/15 text-amber-300"
                : "bg-emerald-500/15 text-emerald-300",
          )}
        >
          {s}
        </span>
      </div>

      <div className="mt-1.5 flex items-end gap-2">
        <span
          key={`t-${state.seq}`}
          className={cn(
            "font-mono text-[2.2rem] font-bold leading-none tabular-nums motion-safe:animate-[metric-in_0.4s_ease-out]",
            accent,
          )}
        >
          {state.temp.toFixed(1)}
        </span>
        <span className="pb-1 font-mono text-sm text-muted">℃</span>
        <span
          className={cn(
            "mb-1 ml-auto inline-flex items-center gap-0.5 font-mono text-[11px] tabular-nums",
            up ? "text-red-300" : flat ? "text-subtle" : "text-cyan-300",
          )}
        >
          {flat ? <Minus size={11} /> : up ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
          {state.diff > 0 ? "+" : ""}
          {state.diff.toFixed(1)}℃
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 border-t border-line/60 pt-2">
        <Row label="Updated" value={state.lastUpdate} />
        <Row label="Raw Value" value={String(state.rawValue)} />
        <Row label="Warning" value={`${WARN_THRESHOLD}℃`} tone="warn" />
        <Row label="Alarm" value={`${ALARM_THRESHOLD}℃`} tone="alarm" />
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "warn" | "alarm";
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-[9px] text-muted">{label}</span>
      <span
        className={cn(
          "font-mono text-[11px] tabular-nums",
          tone === "warn"
            ? "text-amber-300/90"
            : tone === "alarm"
              ? "text-red-300/90"
              : "text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}
