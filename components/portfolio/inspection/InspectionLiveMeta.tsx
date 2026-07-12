"use client";

import { useEffect, useState } from "react";
import { INITIAL_UPTIME_SECONDS } from "./inspectionData";

function fmtUptime(total: number) {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

/**
 * Live uptime + FPS rows. Deterministic initial values (SSR-safe), then a
 * single 1s interval updates them — paused while the dashboard is off-screen.
 */
export function InspectionLiveMeta({ live }: { live: boolean }) {
  const [uptime, setUptime] = useState(fmtUptime(INITIAL_UPTIME_SECONDS));
  const [fps, setFps] = useState("30.0");

  useEffect(() => {
    if (!live) return;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setUptime(fmtUptime(INITIAL_UPTIME_SECONDS + elapsed));
      setFps((29.6 + Math.random() * 0.8).toFixed(1));
    }, 1000);
    return () => clearInterval(id);
  }, [live]);

  return (
    <>
      <Row label="System Uptime" value={uptime} />
      <Row label="FPS" value={fps} />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line/50 py-1 last:border-b-0">
      <span className="font-mono text-[9px] uppercase tracking-wider text-subtle">
        {label}
      </span>
      <span className="font-mono text-[11px] tabular-nums text-foreground">
        {value}
      </span>
    </div>
  );
}
