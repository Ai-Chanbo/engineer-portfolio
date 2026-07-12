"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  CAMERAS,
  INITIAL_CYCLE,
  INITIAL_SEQ,
  STATIC_STATE,
  computeDerived,
  defectPriority,
  makeCyclePlan,
  type CamStatus,
  type CyclePlan,
  type InspectionState,
  type TimelineItem,
  type AlarmItem,
} from "./inspectionData";

type Machine = {
  phase: "capturing" | "inference" | "resolved" | "pause";
  cam: number;
  plan: CyclePlan;
  statuses: CamStatus[];
  confidence: number[];
  ms: number[];
  defect: (string | null)[];
  ngFocusCam: number;
  lastNgCam: number;
  seq: number;
  cycle: number;
  timeline: TimelineItem[];
  alarms: AlarmItem[];
  nextDelay: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const nowTime = () =>
  new Date().toLocaleTimeString("ja-JP", { hour12: false });

function startCycle(m: Machine) {
  m.plan = makeCyclePlan();
  m.statuses = Array(6).fill("waiting");
  m.confidence = Array(6).fill(0);
  m.ms = Array(6).fill(0);
  m.defect = Array(6).fill(null);
  m.cam = 0;
  m.ngFocusCam = -1;
  m.statuses[0] = "capturing";
  m.phase = "capturing";
}

function freshMachine(): Machine {
  const m = {
    phase: "capturing",
    cam: 0,
    plan: { ng: [], defect: [], conf: [], ms: [] },
    statuses: [],
    confidence: [],
    ms: [],
    defect: [],
    ngFocusCam: -1,
    lastNgCam: -1,
    seq: INITIAL_SEQ,
    cycle: INITIAL_CYCLE,
    timeline: [],
    alarms: [],
    nextDelay: 500,
  } as Machine;
  startCycle(m);
  return m;
}

/** Advance the state machine by exactly one transition. */
function step(m: Machine) {
  switch (m.phase) {
    case "capturing":
      m.statuses[m.cam] = "inference";
      m.phase = "inference";
      m.nextDelay = rand(360, 600);
      break;

    case "inference": {
      const ng = m.plan.ng[m.cam];
      m.statuses[m.cam] = ng ? "ng" : "ok";
      m.confidence[m.cam] = m.plan.conf[m.cam];
      m.ms[m.cam] = m.plan.ms[m.cam];
      m.defect[m.cam] = ng ? m.plan.defect[m.cam] : null;
      if (ng) {
        m.ngFocusCam = m.cam;
        m.lastNgCam = m.cam;
      }
      m.seq += 1;

      const defectName = ng ? (m.plan.defect[m.cam] as string) : null;
      m.alarms = [
        {
          time: nowTime(),
          cam: m.cam,
          label: defectName ?? "Normal",
          ok: !ng,
          priority: defectName ? defectPriority(defectName) : null,
        },
        ...m.alarms,
      ].slice(0, 4);
      m.timeline = [
        { seq: m.seq, cam: m.cam, ok: !ng, label: defectName ?? "OK" },
        ...m.timeline,
      ].slice(0, 10);

      m.phase = "resolved";
      m.nextDelay = rand(260, 440);
      break;
    }

    case "resolved":
      if (m.cam < 5) {
        m.cam += 1;
        m.statuses[m.cam] = "capturing";
        m.phase = "capturing";
        m.nextDelay = rand(440, 640);
      } else {
        m.phase = "pause";
        m.nextDelay = 1200;
      }
      break;

    case "pause":
      // A completed cycle rolls over to the next.
      m.cycle += 1;
      startCycle(m);
      m.nextDelay = rand(440, 640);
      break;
  }
}

function snapshot(m: Machine): InspectionState {
  const active =
    m.phase === "capturing" || m.phase === "inference" ? m.cam : -1;
  const ngFocus = m.ngFocusCam >= 0 && m.statuses[m.ngFocusCam] === "ng" ? m.ngFocusCam : -1;
  return computeDerived({
    statuses: [...m.statuses],
    active,
    confidence: [...m.confidence],
    ms: [...m.ms],
    defect: [...m.defect],
    ngFocusCam: ngFocus,
    lastNgCam: m.lastNgCam,
    cycle: m.cycle,
    timeline: m.timeline,
    alarms: m.alarms,
  });
}

/**
 * Drives the live inspection. Returns a ref to attach to the dashboard root,
 * the current snapshot, and whether the animation is actively running.
 *
 * - Single recursive timeout (no interval fan-out).
 * - Pauses when the element leaves the viewport (IntersectionObserver).
 * - Reduced motion → static deterministic snapshot, no timer.
 */
export function useInspectionSimulation() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<InspectionState>(STATIC_STATE);
  const [inView, setInView] = useState(false);
  const machineRef = useRef<Machine | null>(null);

  // Observe visibility.
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

  // Run / pause the machine. `live` is false while off-screen or when reduced
  // motion is requested, so the state stays on the static snapshot.
  useEffect(() => {
    if (!live) return;

    const m = machineRef.current ?? (machineRef.current = freshMachine());
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    // setState only ever runs inside these async callbacks (not synchronously
    // in the effect body). The first pass publishes without stepping so the
    // start of the cycle is shown.
    const loop = (advance: boolean) => {
      if (cancelled) return;
      if (advance) step(m);
      setState(snapshot(m));
      timer = setTimeout(() => loop(true), m.nextDelay);
    };
    timer = setTimeout(() => loop(false), 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [live]);

  return { ref, state, live };
}

export { CAMERAS };
