import { cn } from "@/lib/utils";
import type { MonitoringState, TempStatus } from "./monitoringData";

const statusColor: Record<TempStatus, { border: string; text: string; dot: string }> = {
  NORMAL: { border: "border-emerald-400/30", text: "text-emerald-300/80", dot: "bg-emerald-400" },
  WARNING: { border: "border-amber-400/40", text: "text-amber-300", dot: "bg-amber-400" },
  ALARM: { border: "border-red-500/50", text: "text-red-300", dot: "bg-red-500" },
};

export function TelemetryTimeline({ state }: { state: MonitoringState }) {
  const items = state.telemetry;
  const latest = items[0]?.seq;
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
          Telemetry Timeline
        </span>
        {latest !== undefined && (
          <span className="font-mono text-[9px] tabular-nums text-muted">
            Latest · #{latest}
          </span>
        )}
      </div>

      {/* overflow-hidden clips oldest as new items push in — no scrollbar */}
      <div className="flex gap-1.5 overflow-hidden">
        {items.map((item, i) => {
          const c = statusColor[item.status];
          return (
            <div
              key={item.seq}
              className={cn(
                "flex w-[74px] shrink-0 flex-col items-center gap-0.5 rounded-md border bg-white/[0.01] px-1 py-1.5 text-center font-mono leading-tight",
                c.border,
                i === 0 && "motion-safe:animate-[item-in_0.4s_ease-out]",
              )}
            >
              <span className="flex items-center gap-1 text-[7px] tabular-nums text-subtle">
                <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />#{item.seq}
              </span>
              <span className="text-[13px] tabular-nums text-foreground">
                {item.temp.toFixed(1)}
              </span>
              <span className={cn("text-[8px]", c.text)}>{item.status}</span>
              <span className="text-[7px] tabular-nums text-subtle">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
