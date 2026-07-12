"use client";

import { useInspectionSimulation } from "./useInspectionSimulation";
import { InspectionStatusBar } from "./InspectionStatusBar";
import { InspectionCameraGrid } from "./InspectionCameraGrid";
import { InspectionSummary } from "./InspectionSummary";
import { InspectionHeatmap } from "./InspectionHeatmap";
import { InspectionTimeline } from "./InspectionTimeline";
import { InspectionAlarms } from "./InspectionAlarms";

/**
 * Live AI inspection dashboard (client). Orchestrates the simulation and the
 * responsive 2-column layout. On mobile the blocks reflow into the required
 * order (Summary → Live → Heatmap → Timeline → Alarms) via `display:contents`
 * + `order-*`, collapsing back to two columns from `md`.
 */
export function InspectionDashboard() {
  const { ref, state, live } = useInspectionSimulation();
  const resolved = state.okCount + state.ngCount;

  return (
    <div
      ref={ref}
      data-overall={state.overall}
      data-ng={state.ngCount}
      data-resolved={resolved}
      data-active={state.active}
      className="flex flex-col"
    >
      <InspectionStatusBar live={live} />

      <div className="flex flex-col gap-2.5 p-2.5 sm:p-3.5 md:flex-row">
        {/* Left column (Live Inspection + Timeline) */}
        <div className="contents md:flex md:w-[64%] md:min-w-0 md:flex-col md:gap-2.5 lg:w-[70%]">
          <div className="order-2 md:order-none">
            <InspectionCameraGrid state={state} live={live} />
          </div>
          <div className="order-4 md:order-none">
            <InspectionTimeline items={state.timeline} />
          </div>
        </div>

        {/* Right column (Summary + Heatmap + Alarms) */}
        <div className="contents md:flex md:w-[36%] md:min-w-0 md:flex-col md:gap-2.5 lg:w-[30%]">
          <div className="order-1 md:order-none">
            <InspectionSummary state={state} live={live} />
          </div>
          <div className="order-3 md:order-none">
            <InspectionHeatmap state={state} live={live} />
          </div>
          <div className="order-5 md:order-none">
            <InspectionAlarms items={state.alarms} />
          </div>
        </div>
      </div>
    </div>
  );
}
