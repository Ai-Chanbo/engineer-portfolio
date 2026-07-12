"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { INSPECTION_MODEL, PLC_STATUS, LINE_ID } from "./inspectionData";

/**
 * Top status bar with a live clock. The clock renders a stable placeholder on
 * the server and first client paint, then updates every second — no hydration
 * mismatch. The interval is paused when the dashboard is off-screen (`live`).
 */
export function InspectionStatusBar({ live }: { live: boolean }) {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    if (!live) return;
    const update = () =>
      setTime(new Date().toLocaleTimeString("ja-JP", { hour12: false }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [live]);

  return (
    <div className="flex items-center gap-x-3 gap-y-1 border-b border-line bg-white/[0.02] px-3 py-2 sm:px-4">
      {/* window dots */}
      <div className="hidden items-center gap-1.5 sm:flex">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>

      <div className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-0.5 font-mono text-[9px] text-subtle sm:text-[10px]">
        <StatusChip label="System" value="RUNNING" tone="cyan" dot />
        <Sep />
        <StatusChip
          label="Model"
          value={`${INSPECTION_MODEL.name} (${INSPECTION_MODEL.backendShort})`}
        />
        <Sep />
        <StatusChip label="PLC" value={PLC_STATUS} tone="ok" />
        <Sep />
        <StatusChip label="Line" value={LINE_ID} />
      </div>

      {/* clock + REC */}
      <div className="flex items-center gap-2 font-mono text-[9px] text-muted sm:text-[10px]">
        <span className="tabular-nums">{time}</span>
        <span className="flex items-center gap-1 text-red-400">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full bg-red-500",
              live && "motion-safe:animate-pulse",
            )}
          />
          REC
        </span>
      </div>
    </div>
  );
}

function StatusChip({
  label,
  value,
  tone,
  dot,
}: {
  label: string;
  value: string;
  tone?: "cyan" | "ok";
  dot?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap">
      <span className="text-subtle/70">{label}:</span>
      <span
        className={cn(
          "inline-flex items-center gap-1",
          tone === "cyan"
            ? "text-cyan-300"
            : tone === "ok"
              ? "text-emerald-300"
              : "text-foreground/80",
        )}
      >
        {dot && (
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 motion-safe:animate-pulse" />
        )}
        {value}
      </span>
    </span>
  );
}

function Sep() {
  return <span className="hidden text-white/15 sm:inline">|</span>;
}
