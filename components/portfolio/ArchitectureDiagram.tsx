import { ArrowRight, ArrowDown } from "lucide-react";
import type { ArchStage } from "@/types";

/**
 * Renders a system architecture as a horizontal flow of labelled stages
 * (vertical on mobile), connected by arrows. Driven by data, no image needed.
 */
export function ArchitectureDiagram({
  stages,
  caption,
}: {
  stages: ArchStage[];
  caption?: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-card/40 p-5 sm:p-7">
      <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch">
        {stages.map((stage, i) => (
          <div key={stage.name} className="contents">
            <div className="flex-1 rounded-xl border border-line bg-white/[0.02] p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-wide text-accent-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-subtle">
                  {stage.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {stage.nodes.map((node) => (
                  <span
                    key={node}
                    className="rounded-md border border-line bg-white/[0.03] px-2 py-1 text-xs text-foreground"
                  >
                    {node}
                  </span>
                ))}
              </div>
            </div>

            {i < stages.length - 1 && (
              <div
                aria-hidden
                className="flex shrink-0 items-center justify-center text-subtle lg:px-0.5"
              >
                <ArrowDown size={16} className="lg:hidden" />
                <ArrowRight size={16} className="hidden lg:block" />
              </div>
            )}
          </div>
        ))}
      </div>
      {caption && (
        <p className="mt-4 text-center font-mono text-[11px] text-subtle">
          {caption}
        </p>
      )}
    </div>
  );
}
