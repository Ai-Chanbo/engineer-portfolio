import { cn } from "@/lib/utils";
import { InspectionMedia } from "./InspectionMedia";
import { InspectionScanOverlay } from "./InspectionScanOverlay";
import { InspectionDefectOverlay } from "./InspectionDefectOverlay";
import type { CamStatus, Camera } from "./inspectionData";

export function InspectionCameraCard({
  camera,
  index,
  status,
  confidence,
  ms,
  defect,
  live,
}: {
  camera: Camera;
  index: number;
  status: CamStatus;
  confidence: number;
  ms: number;
  defect: string | null;
  live: boolean;
}) {
  const active = status === "capturing" || status === "inference";
  const resolved = status === "ok" || status === "ng";

  return (
    <div
      className={cn(
        "group/cam relative overflow-hidden rounded-lg border transition-all duration-300 ease-out",
        // NG: outer frame only (inner stays neutral, like a real HMI)
        status === "ng"
          ? "border-2 border-red-500/70 shadow-[0_0_16px_-6px_rgba(248,113,113,0.4)]"
          : status === "ok"
            ? "border-emerald-400/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_20px_-12px_rgba(0,0,0,0.9)]"
            : active
              ? "border-cyan-300/55 shadow-[inset_0_0_16px_-4px_rgba(34,211,238,0.35),0_0_22px_-6px_rgba(34,211,238,0.5)]"
              : "border-line shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_20px_-12px_rgba(0,0,0,0.9)]",
      )}
    >
      {/* Layered tile: media → scan → defect → capture flash */}
      <div className="relative aspect-square bg-[radial-gradient(115%_115%_at_50%_-10%,#16181d_0%,#0a0b0e_55%,#070809_100%)] shadow-[inset_0_0_28px_rgba(0,0,0,0.65)]">
        {/* corner sheen (below media) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]"
        />
        <InspectionMedia camera={camera} index={index} dim={status === "waiting"} />
        <InspectionScanOverlay
          active={active}
          capturing={status === "capturing"}
          live={live}
        />
        {status === "ng" && (
          <InspectionDefectOverlay index={index} defect={defect} />
        )}
        {live && status === "capturing" && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-cyan-100/50 motion-safe:animate-[capture-flash_0.5s_ease-out]"
          />
        )}
      </div>

      {/* Camera id */}
      <span className="absolute left-1.5 top-1.5 rounded bg-black/55 px-1.5 py-0.5 font-mono text-[8px] text-white/75 sm:text-[9px]">
        {camera.id}
      </span>

      {/* State chip (top-right) for non-resolved cameras */}
      {!resolved && (
        <span
          className={cn(
            "absolute right-1.5 top-1.5 inline-flex items-center rounded px-1.5 py-0.5 font-mono text-[7px] tracking-wide sm:text-[8px]",
            active ? "bg-cyan-400/20 text-cyan-200" : "bg-white/5 text-subtle",
          )}
        >
          {status === "capturing" && "CAPTURING"}
          {status === "inference" && (
            <>
              INFERENCE
              <InferenceDots />
            </>
          )}
          {status === "waiting" && "WAITING"}
        </span>
      )}

      {/* Bottom row: metrics + verdict (revealed on resolve) */}
      <div className="absolute inset-x-1.5 bottom-1.5 flex items-end justify-between gap-1">
        {resolved ? (
          <span
            key={`c-${status}`}
            className="rounded bg-black/45 px-1 py-0.5 font-mono text-[7px] leading-tight tabular-nums text-white/70 motion-safe:animate-[metric-in_0.45s_ease-out] sm:text-[8px]"
          >
            {confidence.toFixed(1)}% · {ms}ms
          </span>
        ) : active ? (
          <span className="flex items-center gap-1 rounded bg-black/45 px-1 py-0.5 text-[7px] font-medium text-cyan-200 sm:text-[8px]">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 motion-safe:animate-pulse" />
            INSPECTING
          </span>
        ) : (
          <span />
        )}

        {resolved && (
          <span
            key={`b-${status}`}
            className={cn(
              "rounded px-1.5 py-0.5 text-[8px] font-bold motion-safe:animate-[metric-in_0.4s_ease-out] sm:text-[9px]",
              status === "ng"
                ? "bg-red-500/25 text-red-200"
                : "bg-emerald-500/20 text-emerald-200",
            )}
          >
            {status === "ng" ? "NG" : "OK"}
          </span>
        )}
      </div>
    </div>
  );
}

function InferenceDots() {
  return (
    <span aria-hidden className="ml-0.5 inline-flex">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="motion-safe:animate-[dot-blink_1s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 180}ms` }}
        >
          .
        </span>
      ))}
    </span>
  );
}
