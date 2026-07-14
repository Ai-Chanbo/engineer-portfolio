import { cn } from "@/lib/utils";
import type { AlarmRow, MonitoringState } from "./monitoringData";

const priorityStyle: Record<
  AlarmRow["priority"],
  { text: string; dot: string; bg: string }
> = {
  HIGH: { text: "text-red-300", dot: "bg-red-500", bg: "border-red-400/30 bg-red-500/[0.05]" },
  MEDIUM: { text: "text-amber-300", dot: "bg-amber-400", bg: "border-amber-400/25 bg-amber-500/[0.04]" },
  INFO: { text: "text-cyan-300", dot: "bg-cyan-400", bg: "border-line bg-white/[0.01]" },
  RECOVERED: { text: "text-emerald-300", dot: "bg-emerald-400", bg: "border-line bg-white/[0.01]" },
};

export function AlarmHistory({ state }: { state: MonitoringState }) {
  return (
    <div className="rounded-lg border border-line bg-white/[0.02] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
        Alarm History
      </div>
      <div className="flex flex-col gap-1">
        {state.alarms.map((a, i) => {
          const st = priorityStyle[a.priority];
          return (
            <div
              key={`${a.time}-${a.event}-${i}`}
              className={cn(
                "grid grid-cols-[auto_1fr_auto_auto] items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[10px]",
                i === 0 && "motion-safe:animate-[item-in_0.35s_ease-out]",
                st.bg,
              )}
            >
              <span className="tabular-nums text-subtle">{a.time}</span>
              <span className={cn("truncate", st.text)} title={a.event}>
                {a.event}
              </span>
              <span className="tabular-nums text-muted">
                {a.temp !== null ? `${a.temp.toFixed(1)}℃` : "—"}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[8px] font-bold tracking-wide",
                  st.text,
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", st.dot)} />
                {a.priority}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
