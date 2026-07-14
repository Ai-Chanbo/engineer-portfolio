import { cn } from "@/lib/utils";
import type { MonitoringState, Tone } from "./monitoringData";

const toneClass: Record<Tone, string> = {
  ok: "text-emerald-300",
  warn: "text-amber-300",
  alarm: "text-red-300",
  live: "text-cyan-300",
  neutral: "text-foreground/85",
};

const dotClass: Record<Tone, string> = {
  ok: "bg-emerald-400",
  warn: "bg-amber-400",
  alarm: "bg-red-500",
  live: "bg-cyan-400",
  neutral: "bg-white/30",
};

export function EquipmentSummary({ state }: { state: MonitoringState }) {
  return (
    <div className="rounded-lg border border-line bg-white/[0.02] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
          Equipment Overview
        </span>
        <span className="font-mono text-[9px] tabular-nums text-muted">
          {state.lastUpdate}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3">
        {state.equipment.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-2 border-b border-line/50 pb-1"
          >
            <span className="text-[10px] text-muted">{row.label}</span>
            <span className="inline-flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", dotClass[row.tone])} />
              <span className={cn("font-mono text-[11px]", toneClass[row.tone])}>
                {row.value}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
