"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DEVICE_ID, PLC_INFO, PROTOCOL } from "./monitoringData";

/**
 * Top status bar with a live clock. Stable placeholder on the server + first
 * client paint, then updates each second — no hydration mismatch. Interval is
 * paused when the dashboard is off-screen (`live`).
 */
export function MonitoringStatusBar({ live }: { live: boolean }) {
  const [time, setTime] = useState("--:--:--");

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
      <div className="hidden items-center gap-1.5 sm:flex">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>

      <div className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-0.5 font-mono text-[9px] text-subtle sm:text-[10px]">
        <Chip label="System" value="RUNNING" tone="live" dot />
        <Sep />
        <Chip label="PLC" value={PLC_INFO.status} tone="ok" />
        <Sep />
        <Chip label="Protocol" value={PROTOCOL} />
        <Sep />
        <Chip label="Device" value={DEVICE_ID} />
        <Sep />
        <Chip label="Azure" value="CONNECTED" tone="ok" />
      </div>

      <div className="flex items-center gap-2 font-mono text-[9px] text-muted sm:text-[10px]">
        <span className="tabular-nums">{time}</span>
        <span className="flex items-center gap-1 text-cyan-300">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full bg-cyan-400",
              live && "motion-safe:animate-pulse",
            )}
          />
          LIVE
        </span>
      </div>
    </div>
  );
}

function Chip({
  label,
  value,
  tone,
  dot,
}: {
  label: string;
  value: string;
  tone?: "live" | "ok";
  dot?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap">
      <span className="text-subtle/70">{label}:</span>
      <span
        className={cn(
          "inline-flex items-center gap-1",
          tone === "live"
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
