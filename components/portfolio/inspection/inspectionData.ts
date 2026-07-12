/**
 * Static config + pure helpers for the AI inspection simulation.
 * No timers, no DOM — safe to import anywhere (incl. SSR).
 *
 * Shared constants (model, PLC, camera count, initial cycle) live here so the
 * status bar and the summary render the SAME source of truth.
 */

export type CamStatus = "waiting" | "capturing" | "inference" | "ok" | "ng";

export type PartType =
  | "flange"
  | "plate"
  | "hexnut"
  | "bolt"
  | "washer"
  | "connector";

export type Camera = {
  id: string;
  part: PartType;
  /** Human-readable part name (used for alt text). */
  label: string;
  /**
   * Optional real inspection image. When set it replaces the SVG fallback.
   * Place files in `public/images/inspection/` and set an absolute path, e.g.
   *   image: "/images/inspection/cam-01.png"
   *
   * public/images/inspection/
   * ├── cam-01.png
   * ├── cam-02.png
   * ├── cam-03.png
   * ├── cam-04-ng.png
   * ├── cam-05.png
   * └── cam-06.png
   */
  image?: string;
};

export const CAMERAS: Camera[] = [
  { id: "CAM 01", part: "flange", label: "フランジ" },
  { id: "CAM 02", part: "plate", label: "金属プレート" },
  { id: "CAM 03", part: "hexnut", label: "六角ナット" },
  { id: "CAM 04", part: "bolt", label: "ボルト" },
  { id: "CAM 05", part: "washer", label: "ワッシャー" },
  { id: "CAM 06", part: "connector", label: "コネクタ" },
];

/** Single source of truth for hardware/model metadata. */
export const INSPECTION_MODEL = {
  name: "EfficientAD",
  backend: "ONNX Runtime",
  backendShort: "ONNX",
  status: "READY",
} as const;

export const PLC_STATUS = "CONNECTED";
export const LINE_ID = "L01";
export const CAMERA_COUNT = CAMERAS.length;
/** Deterministic starting cycle number (SSR-safe). */
export const INITIAL_CYCLE = 1542;
/** Deterministic starting uptime in seconds (SSR-safe). ≈ 3h 57m. */
export const INITIAL_UPTIME_SECONDS = 14237;
export const LINE_SPEED = "12.4 m/min";
/** Deterministic starting inspection number (SSR-safe). */
export const INITIAL_SEQ = 8420;

export const DEFECT_LABELS = ["Scratch", "Dent", "Crack", "Contamination"];

export type Priority = "HIGH" | "MEDIUM";

/** Higher-severity defects raise a HIGH priority alarm. */
export function defectPriority(defect: string): Priority {
  return defect === "Crack" || defect === "Contamination" ? "HIGH" : "MEDIUM";
}

export type TimelineItem = {
  seq: number;
  cam: number;
  ok: boolean;
  /** "OK" or the defect name (Scratch / Dent / …). */
  label: string;
};
export type AlarmItem = {
  time: string;
  cam: number;
  label: string;
  ok: boolean;
  priority: Priority | null;
};

/** The full snapshot the UI renders. */
export type InspectionState = {
  statuses: CamStatus[];
  active: number; // camera currently capturing/inferring, or -1
  confidence: number[]; // per camera (0 = unresolved)
  ms: number[];
  defect: (string | null)[];
  okCount: number;
  ngCount: number;
  total: number;
  overall: "PASS" | "NG";
  ngRate: number;
  avgConfidence: number;
  avgMs: number;
  ngFocusCam: number; // camera to feature in the heatmap, or -1
  lastNgCam: number; // most recent NG camera across cycles, or -1
  cycle: number; // inspection cycle number
  timeline: TimelineItem[]; // newest first, max 10
  alarms: AlarmItem[]; // newest first, max 4
};

export type CyclePlan = {
  ng: boolean[];
  defect: (string | null)[];
  conf: number[];
  ms: number[];
};

const round = (n: number, d = 0) => {
  const f = 10 ** d;
  return Math.round(n * f) / f;
};
const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Randomised cycle: usually 1 NG, sometimes 0, occasionally 2. */
export function makeCyclePlan(): CyclePlan {
  const roll = Math.random();
  const ngCount = roll < 0.28 ? 0 : roll < 0.82 ? 1 : 2;

  const idx = [0, 1, 2, 3, 4, 5];
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const ngPos = new Set(idx.slice(0, ngCount));

  const ng: boolean[] = [];
  const defect: (string | null)[] = [];
  const conf: number[] = [];
  const ms: number[] = [];
  for (let c = 0; c < 6; c++) {
    const isNg = ngPos.has(c);
    ng[c] = isNg;
    defect[c] = isNg
      ? DEFECT_LABELS[Math.floor(Math.random() * DEFECT_LABELS.length)]
      : null;
    conf[c] = isNg ? round(rand(58, 82), 1) : round(rand(97.8, 99.8), 1);
    ms[c] = Math.round(rand(34, 48));
  }
  return { ng, defect, conf, ms };
}

/** Derive counts/averages/overall from the resolved cameras. */
export function computeDerived(base: {
  statuses: CamStatus[];
  active: number;
  confidence: number[];
  ms: number[];
  defect: (string | null)[];
  ngFocusCam: number;
  lastNgCam: number;
  cycle: number;
  timeline: TimelineItem[];
  alarms: AlarmItem[];
}): InspectionState {
  const okCount = base.statuses.filter((s) => s === "ok").length;
  const ngCount = base.statuses.filter((s) => s === "ng").length;
  const total = 6;

  const okConf = base.confidence.filter((c, i) => base.statuses[i] === "ok");
  const resolvedMs = base.ms.filter(
    (m, i) => base.statuses[i] === "ok" || base.statuses[i] === "ng",
  );

  return {
    ...base,
    okCount,
    ngCount,
    total,
    overall: ngCount > 0 ? "NG" : "PASS",
    ngRate: round((ngCount / total) * 100, 1),
    avgConfidence: okConf.length
      ? round(okConf.reduce((a, b) => a + b, 0) / okConf.length, 1)
      : 0,
    avgMs: resolvedMs.length
      ? Math.round(resolvedMs.reduce((a, b) => a + b, 0) / resolvedMs.length)
      : 0,
  };
}

/**
 * Deterministic snapshot used for SSR / first paint / reduced-motion.
 * MUST be pure (no Date / Math.random) to avoid hydration mismatches.
 */
export const STATIC_STATE: InspectionState = computeDerived({
  statuses: ["ok", "ok", "ok", "ng", "ok", "ok"],
  active: -1,
  confidence: [99.2, 98.7, 99.4, 71.5, 99.0, 98.6],
  ms: [38, 41, 36, 44, 39, 42],
  defect: [null, null, null, "Scratch", null, null],
  ngFocusCam: 3,
  lastNgCam: 3,
  cycle: INITIAL_CYCLE,
  timeline: [
    { seq: 8427, cam: 3, ok: false, label: "Scratch" },
    { seq: 8426, cam: 2, ok: true, label: "OK" },
    { seq: 8425, cam: 1, ok: true, label: "OK" },
    { seq: 8424, cam: 0, ok: true, label: "OK" },
    { seq: 8423, cam: 5, ok: true, label: "OK" },
    { seq: 8422, cam: 4, ok: true, label: "OK" },
    { seq: 8421, cam: 3, ok: true, label: "OK" },
    { seq: 8420, cam: 1, ok: false, label: "Crack" },
  ],
  alarms: [
    { time: "10:24:38", cam: 3, label: "Scratch", ok: false, priority: "MEDIUM" },
    { time: "10:18:12", cam: 1, label: "Normal", ok: true, priority: null },
    { time: "10:15:47", cam: 4, label: "Normal", ok: true, priority: null },
  ],
});
