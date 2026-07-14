"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  MAX_ALARMS,
  MAX_HISTORY,
  MAX_TELEMETRY,
  STATIC_STATE,
  equipmentFor,
  tempStatus,
  type AlarmRow,
  type AlarmPriority,
  type MonitoringState,
  type TelemetryItem,
  type TempStatus,
} from "./monitoringData";

type Machine = {
  temp: number;
  prevTemp: number;
  target: number;
  eventTicks: number;
  lastStatus: TempStatus;
  history: number[];
  telemetry: TelemetryItem[];
  alarms: AlarmRow[];
  seq: number;
  reconnect: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));
const round = (n: number, d = 1) => {
  const f = 10 ** d;
  return Math.round(n * f) / f;
};
const nowTime = () =>
  new Date().toLocaleTimeString("ja-JP", { hour12: false });

function freshMachine(): Machine {
  return {
    temp: STATIC_STATE.temp,
    prevTemp: STATIC_STATE.temp,
    target: 53,
    eventTicks: 0,
    lastStatus: STATIC_STATE.status,
    history: [...STATIC_STATE.history],
    telemetry: [...STATIC_STATE.telemetry],
    alarms: [...STATIC_STATE.alarms],
    seq: STATIC_STATE.seq,
    reconnect: STATIC_STATE.reconnect,
  };
}

const EVENT_LABEL: Record<
  Exclude<TempStatus, "NORMAL"> | "NORMAL",
  string
> = {
  ALARM: "TEMP HIGH",
  WARNING: "TEMP WARNING",
  NORMAL: "TEMP NORMAL",
};

function step(m: Machine) {
  m.prevTemp = m.temp;

  // Pick a new regime target when the current episode ends.
  if (m.eventTicks <= 0) {
    const r = Math.random();
    if (r < 0.24) {
      m.target = rand(62, 68); // warning excursion
      m.eventTicks = randInt(6, 10);
    } else if (r < 0.42) {
      m.target = rand(72, 76); // alarm excursion (reliably crosses 70)
      m.eventTicks = randInt(7, 11);
    } else {
      m.target = rand(50, 56); // normal band
      m.eventTicks = randInt(8, 14);
    }
  }
  m.eventTicks -= 1;

  // Ease toward target + small noise.
  m.temp = round(
    Math.min(78, Math.max(44, m.temp + (m.target - m.temp) * 0.26 + rand(-0.5, 0.5))),
  );

  const status = tempStatus(m.temp);
  const time = nowTime();
  m.seq += 1;

  m.history = [...m.history, m.temp].slice(-MAX_HISTORY);
  m.telemetry = [{ seq: m.seq, temp: m.temp, status, time }, ...m.telemetry].slice(
    0,
    MAX_TELEMETRY,
  );

  // Alarm on status transition.
  if (status !== m.lastStatus) {
    const priority: AlarmPriority =
      status === "ALARM"
        ? "HIGH"
        : status === "WARNING"
          ? "MEDIUM"
          : "RECOVERED";
    m.alarms = [
      { time, event: EVENT_LABEL[status], temp: m.temp, priority },
      ...m.alarms,
    ].slice(0, MAX_ALARMS);
    m.lastStatus = status;
  } else if (Math.random() < 0.015) {
    // Rare PLC reconnect (INFO).
    m.reconnect += 1;
    const info: AlarmRow = {
      time,
      event: "PLC RECONNECTED",
      temp: null,
      priority: "INFO",
    };
    m.alarms = [info, ...m.alarms].slice(0, MAX_ALARMS);
  }
}

function snapshot(m: Machine): MonitoringState {
  const status = tempStatus(m.temp);
  const time = m.telemetry[0]?.time ?? STATIC_STATE.lastUpdate;
  return {
    temp: m.temp,
    prevTemp: m.prevTemp,
    diff: round(m.temp - m.prevTemp),
    status,
    rawValue: Math.round(m.temp * 1000),
    history: m.history,
    telemetry: m.telemetry,
    alarms: m.alarms,
    equipment: equipmentFor(status),
    seq: m.seq,
    lastUpdate: time,
    cloudUpload: time,
    reconnect: m.reconnect,
  };
}

/**
 * Drives the live monitoring HMI. Returns a ref for the dashboard root, the
 * current snapshot, and whether it is actively running.
 * - Single recursive timeout (no interval fan-out).
 * - Pauses off-screen (IntersectionObserver); static when reduced motion.
 */
export function useMonitoringSimulation() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<MonitoringState>(STATIC_STATE);
  const [inView, setInView] = useState(false);
  const machineRef = useRef<Machine | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const live = inView && !reduced;

  useEffect(() => {
    if (!live) return;
    const m = machineRef.current ?? (machineRef.current = freshMachine());
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const loop = (advance: boolean) => {
      if (cancelled) return;
      if (advance) step(m);
      setState(snapshot(m));
      timer = setTimeout(() => loop(true), 950 + Math.random() * 200);
    };
    timer = setTimeout(() => loop(false), 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [live]);

  return { ref, state, live };
}
