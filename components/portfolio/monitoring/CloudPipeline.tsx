import { ChevronRight } from "lucide-react";
import { PIPELINE } from "./monitoringData";

/** Small Azure data-flow status strip (not a large diagram). */
export function CloudPipeline() {
  return (
    <div className="rounded-lg border border-line bg-white/[0.02] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
        Cloud Pipeline
      </div>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
        {PIPELINE.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-1">
            <div className="rounded border border-line bg-white/[0.02] px-1.5 py-1 leading-tight">
              <div className="font-mono text-[9px] text-foreground/85">
                {stage.label}
              </div>
              <div className="flex items-center gap-1 font-mono text-[7px] text-emerald-300">
                <span className="h-1 w-1 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                {stage.status}
              </div>
            </div>
            {i < PIPELINE.length - 1 && (
              <ChevronRight size={11} className="shrink-0 text-subtle" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
