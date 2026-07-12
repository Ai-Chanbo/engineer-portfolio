import { cn } from "@/lib/utils";
import { CAMERAS, type AlarmItem } from "./inspectionData";

export function InspectionAlarms({ items }: { items: AlarmItem[] }) {
  const recent = items.slice(0, 3);
  return (
    <div className="rounded-lg border border-line bg-white/[0.02] p-3">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
        Recent Alarms
      </div>
      <div className="flex flex-col gap-1">
        {recent.map((a, i) => (
          <div
            key={`${a.time}-${a.cam}-${i}`}
            className={cn(
              "grid grid-cols-[auto_auto_1fr_auto_auto] items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[10px]",
              i === 0 && "motion-safe:animate-[item-in_0.35s_ease-out]",
              a.ok
                ? "border-line bg-white/[0.01]"
                : "border-red-400/30 bg-red-500/[0.05]",
            )}
          >
            <span className="tabular-nums text-subtle">{a.time}</span>
            <span className="text-foreground/80">{CAMERAS[a.cam].id}</span>
            <span
              className={cn("truncate", a.ok ? "text-muted" : "text-red-300")}
              title={a.label}
            >
              {a.label}
            </span>
            {a.priority ? (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[8px] font-bold tracking-wide",
                  a.priority === "HIGH"
                    ? "bg-red-500/15 text-red-300"
                    : "bg-white/[0.05] text-muted",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    a.priority === "HIGH" ? "bg-red-500" : "bg-amber-400",
                  )}
                />
                {a.priority}
              </span>
            ) : (
              <span className="text-[8px] text-subtle/50">—</span>
            )}
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[9px] font-bold",
                a.ok
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-red-500/20 text-red-300",
              )}
            >
              {a.ok ? "OK" : "NG"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
