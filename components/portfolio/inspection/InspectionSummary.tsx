import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  INSPECTION_MODEL,
  PLC_STATUS,
  CAMERA_COUNT,
  LINE_SPEED,
  CAMERAS,
  type InspectionState,
} from "./inspectionData";
import { InspectionLiveMeta } from "./InspectionLiveMeta";

export function InspectionSummary({
  state,
  live,
}: {
  state: InspectionState;
  live: boolean;
}) {
  const fail = state.ngCount > 0;
  const lastNg = state.lastNgCam >= 0 ? CAMERAS[state.lastNgCam].id : "None";
  const lastTime = state.alarms[0]?.time ?? "—";
  const c = state.cycle; // reveal key — re-staggers once per cycle

  return (
    <div className="flex flex-col gap-2">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
        Result Summary
      </div>

      {/* Card 1 — verdict + core metrics */}
      <div className="rounded-lg border border-line bg-white/[0.02] p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-md border px-3.5 py-3",
            fail
              ? "border-red-400/40 bg-red-500/[0.06]"
              : "border-emerald-400/25 bg-emerald-500/[0.035]",
          )}
        >
          {fail ? (
            <AlertTriangle size={26} className="shrink-0 text-red-400" />
          ) : (
            <CheckCircle2 size={26} className="shrink-0 text-emerald-300" />
          )}
          <div>
            <div className="font-mono text-[8px] uppercase tracking-wider text-subtle">
              Overall Result
            </div>
            <Reveal cycle={c} delay={0}>
              <span
                className={cn(
                  "text-[2rem] font-bold leading-none tracking-tight tabular-nums",
                  fail ? "text-red-400" : "text-emerald-300",
                )}
              >
                {state.overall}
              </span>
            </Reveal>
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1">
          <Metric label="OK" value={String(state.okCount)} tone="ok" />
          <Metric label="NG" value={String(state.ngCount)} tone={fail ? "ng" : undefined} />
          <Metric label="Total" value={String(state.total)} />
          <Metric label="NG Rate" value={`${state.ngRate}%`} tone={fail ? "ng" : undefined} />
          <Metric
            label="Confidence"
            value={state.avgConfidence ? `${state.avgConfidence}%` : "—"}
            reveal={{ cycle: c, delay: 180 }}
          />
          <Metric
            label="Inference"
            value={state.avgMs ? `${state.avgMs} ms` : "—"}
            reveal={{ cycle: c, delay: 360 }}
          />
        </div>
      </div>

      {/* Card 2 — system */}
      <div className="rounded-lg border border-line bg-white/[0.02] p-3">
        <MetaRow label="Model" value={INSPECTION_MODEL.name} />
        <MetaRow label="Backend" value={INSPECTION_MODEL.backend} />
        <MetaRow label="PLC" value={PLC_STATUS} tone="ok" />
        <MetaRow label="Camera" value={`${CAMERA_COUNT} / ${CAMERA_COUNT}`} />
        <MetaRow label="Cycle" value={`#${state.cycle}`} />
        <MetaRow label="Model Status" value={INSPECTION_MODEL.status} tone="ok" badge />
      </div>

      {/* Card 3 — live metrics */}
      <div className="rounded-lg border border-line bg-white/[0.02] p-3">
        <InspectionLiveMeta live={live} />
        <MetaRow label="Line Speed" value={LINE_SPEED} />
        <MetaRow label="Last NG Camera" value={lastNg} tone={fail ? "ng" : undefined} />
        <MetaRow label="Last Inspection Time" value={lastTime} />
      </div>
    </div>
  );
}

/** One-shot fade+rise, re-keyed per cycle for a staggered reveal. */
function Reveal({
  cycle,
  delay,
  children,
}: {
  cycle: number;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <span
      key={cycle}
      className="inline-block motion-safe:animate-[metric-in_0.4s_ease-out] motion-safe:[animation-fill-mode:backwards]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
}

function Metric({
  label,
  value,
  tone,
  reveal,
}: {
  label: string;
  value: string;
  tone?: "ok" | "ng";
  reveal?: { cycle: number; delay: number };
}) {
  const valueEl = (
    <span
      className={cn(
        "font-mono text-[12px] tabular-nums",
        tone === "ok"
          ? "text-emerald-300"
          : tone === "ng"
            ? "text-red-300"
            : "text-foreground",
      )}
    >
      {value}
    </span>
  );
  return (
    <div className="flex items-baseline justify-between border-b border-line/50 pb-1">
      <span className="text-[9px] text-muted">{label}</span>
      {reveal ? (
        <Reveal cycle={reveal.cycle} delay={reveal.delay}>
          {valueEl}
        </Reveal>
      ) : (
        valueEl
      )}
    </div>
  );
}

function MetaRow({
  label,
  value,
  tone,
  badge,
}: {
  label: string;
  value: string;
  tone?: "ok" | "ng";
  badge?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line/50 py-1 last:border-b-0">
      <span className="font-mono text-[9px] uppercase tracking-wider text-subtle">
        {label}
      </span>
      {badge ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {value}
        </span>
      ) : (
        <span
          className={cn(
            "font-mono text-[11px]",
            tone === "ok"
              ? "text-emerald-300"
              : tone === "ng"
                ? "text-red-300"
                : "text-foreground",
          )}
        >
          {value}
        </span>
      )}
    </div>
  );
}
