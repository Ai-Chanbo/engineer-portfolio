import { InspectionCameraCard } from "./InspectionCameraCard";
import { CAMERAS, type InspectionState } from "./inspectionData";

export function InspectionCameraGrid({
  state,
  live,
}: {
  state: InspectionState;
  live: boolean;
}) {
  return (
    <div>
      <PanelLabel>
        Live Inspection
        {live && (
          <span className="ml-2 inline-flex items-center gap-1 text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 motion-safe:animate-pulse" />
            <span className="font-mono text-[9px]">SCANNING</span>
          </span>
        )}
      </PanelLabel>
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-3">
        {CAMERAS.map((cam, i) => (
          <InspectionCameraCard
            key={cam.id}
            camera={cam}
            index={i}
            status={state.statuses[i]}
            confidence={state.confidence[i]}
            ms={state.ms[i]}
            defect={state.defect[i]}
            live={live}
          />
        ))}
      </div>
    </div>
  );
}

export function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-center font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
      {children}
    </div>
  );
}
