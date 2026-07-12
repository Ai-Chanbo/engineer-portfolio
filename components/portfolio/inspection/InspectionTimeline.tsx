import { cn } from "@/lib/utils";
import { PartGraphic } from "./partShapes";
import { CAMERAS, type TimelineItem } from "./inspectionData";

export function InspectionTimeline({ items }: { items: TimelineItem[] }) {
  const latest = items[0]?.seq;
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
          Inspection Timeline
        </span>
        {latest !== undefined && (
          <span className="font-mono text-[9px] tabular-nums text-muted">
            Latest · Inspection #{latest}
          </span>
        )}
      </div>

      {/* overflow-hidden clips the oldest as new items push in — no scrollbar */}
      <div className="flex gap-1.5 overflow-hidden">
        {items.map((item, i) => (
          <div
            key={item.seq}
            className={cn(
              "flex w-[74px] shrink-0 flex-col overflow-hidden rounded-md border bg-white/[0.01]",
              item.ok ? "border-emerald-400/30" : "border-red-500/50",
              i === 0 && "motion-safe:animate-[item-in_0.4s_ease-out]",
            )}
          >
            <div className="relative aspect-square">
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full bg-[#090b0d] [filter:contrast(1.14)_brightness(0.84)_saturate(0.78)]"
              >
                <PartGraphic part={CAMERAS[item.cam].part} uid={1000 + item.seq} />
              </svg>
              <span
                className={cn(
                  "absolute right-1 top-1 h-1.5 w-1.5 rounded-full",
                  item.ok ? "bg-emerald-400" : "bg-red-500",
                )}
              />
            </div>
            <div
              className={cn(
                "flex flex-col items-center gap-px border-t px-1 py-1 text-center font-mono leading-tight",
                item.ok ? "border-emerald-400/20" : "border-red-500/30",
              )}
            >
              <span className="text-[7px] tabular-nums text-subtle">
                #{item.seq}
              </span>
              <span className="text-[8px] text-foreground/85">
                {CAMERAS[item.cam].id}
              </span>
              <span
                className={cn(
                  "w-full truncate text-[8px]",
                  item.ok ? "text-emerald-300/70" : "text-red-300",
                )}
                title={item.label}
              >
                {item.label}
              </span>
              <span
                className={cn(
                  "text-[8px] font-bold",
                  item.ok ? "text-emerald-300" : "text-red-300",
                )}
              >
                {item.ok ? "OK" : "NG"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
