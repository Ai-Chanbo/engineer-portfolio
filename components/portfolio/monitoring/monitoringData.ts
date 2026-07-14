/**
 * Static config + pure helpers for the PLC temperature monitoring simulation.
 * No timers, no DOM — safe to import anywhere (incl. SSR).
 *
 * Shared constants (device, PLC, Azure, thresholds) live here so every panel
 * renders the SAME source of truth.
 */

export type TempStatus = "NORMAL" | "WARNING" | "ALARM";

export const WARN_THRESHOLD = 60;
export const ALARM_THRESHOLD = 70;

export const DEVICE_ID = "plc-monitor-demo-001";
export const PROTOCOL = "Modbus TCP";

export const PLC_INFO = {
  status: "CONNECTED",
  ip: "192.168.1.10",
  protocol: PROTOCOL,
  poll: "1000 ms",
} as const;

export const AZURE_INFO = {
  iotHub: "CONNECTED",
  deviceId: DEVICE_ID,
  telemetry: "SENDING",
  cosmos: "ONLINE",
} as const;

export const MAX_HISTORY = 120;
export const MAX_TELEMETRY = 10;
export const MAX_ALARMS = 6;
export const INITIAL_SEQ = 1542;

/** Azure data-flow pipeline (small status strip). */
export const PIPELINE = [
  { label: "PLC", status: "CONNECTED" },
  { label: "C# Edge", status: "RUNNING" },
  { label: "IoT Hub", status: "RECEIVING" },
  { label: "Functions", status: "PROCESSING" },
  { label: "Cosmos DB", status: "ONLINE" },
  { label: "Power BI", status: "UPDATED" },
] as const;

export type Tone = "ok" | "warn" | "alarm" | "neutral" | "live";

export type EquipRow = { label: string; value: string; tone: Tone };

export type TelemetryItem = {
  seq: number;
  temp: number;
  status: TempStatus;
  time: string;
};

export type AlarmPriority = "HIGH" | "MEDIUM" | "INFO" | "RECOVERED";
export type AlarmRow = {
  time: string;
  event: string;
  temp: number | null;
  priority: AlarmPriority;
};

export type MonitoringState = {
  temp: number;
  prevTemp: number;
  diff: number;
  status: TempStatus;
  rawValue: number;
  history: number[]; // oldest → newest, max MAX_HISTORY
  telemetry: TelemetryItem[]; // newest first, max MAX_TELEMETRY
  alarms: AlarmRow[]; // newest first, max MAX_ALARMS
  equipment: EquipRow[];
  seq: number;
  lastUpdate: string;
  cloudUpload: string;
  reconnect: number;
};

const round = (n: number, d = 1) => {
  const f = 10 ** d;
  return Math.round(n * f) / f;
};

export function tempStatus(t: number): TempStatus {
  return t >= ALARM_THRESHOLD ? "ALARM" : t >= WARN_THRESHOLD ? "WARNING" : "NORMAL";
}

/** Equipment state derived from the temperature status (HMI-style). */
export function equipmentFor(s: TempStatus): EquipRow[] {
  if (s === "ALARM") {
    return [
      { label: "Operation", value: "STOPPING", tone: "alarm" },
      { label: "Motor", value: "OFF", tone: "alarm" },
      { label: "Sensor", value: "ALARM", tone: "alarm" },
      { label: "Cooling Fan", value: "MAX", tone: "alarm" },
      { label: "Communication", value: "STABLE", tone: "ok" },
    ];
  }
  if (s === "WARNING") {
    return [
      { label: "Operation", value: "RUNNING", tone: "ok" },
      { label: "Motor", value: "ON", tone: "ok" },
      { label: "Sensor", value: "ELEVATED", tone: "warn" },
      { label: "Cooling Fan", value: "ACTIVE", tone: "warn" },
      { label: "Communication", value: "STABLE", tone: "ok" },
    ];
  }
  return [
    { label: "Operation", value: "RUNNING", tone: "ok" },
    { label: "Motor", value: "ON", tone: "ok" },
    { label: "Sensor", value: "NORMAL", tone: "ok" },
    { label: "Cooling Fan", value: "AUTO", tone: "neutral" },
    { label: "Communication", value: "STABLE", tone: "ok" },
  ];
}

/**
 * Deterministic snapshot for SSR / first paint / reduced motion.
 * Pure (no Date / Math.random) — no hydration mismatch.
 */
const STATIC_HISTORY = Array.from({ length: 84 }, (_, i) =>
  round(52.5 + 3.6 * Math.sin(i / 7) + 1.4 * Math.sin(i / 2.4)),
);
const STATIC_TEMP = STATIC_HISTORY[STATIC_HISTORY.length - 1];
const STATIC_PREV = STATIC_HISTORY[STATIC_HISTORY.length - 2];

export const STATIC_STATE: MonitoringState = {
  temp: STATIC_TEMP,
  prevTemp: STATIC_PREV,
  diff: round(STATIC_TEMP - STATIC_PREV),
  status: tempStatus(STATIC_TEMP),
  rawValue: Math.round(STATIC_TEMP * 1000),
  history: STATIC_HISTORY,
  telemetry: [
    { seq: 1546, temp: STATIC_TEMP, status: tempStatus(STATIC_TEMP), time: "20:42:18" },
    { seq: 1545, temp: 55.8, status: "NORMAL", time: "20:42:17" },
    { seq: 1544, temp: 57.1, status: "NORMAL", time: "20:42:16" },
    { seq: 1543, temp: 56.4, status: "NORMAL", time: "20:42:15" },
    { seq: 1542, temp: 54.9, status: "NORMAL", time: "20:42:14" },
  ],
  alarms: [
    { time: "20:39:08", event: "TEMP WARNING", temp: 63.1, priority: "MEDIUM" },
    { time: "20:30:42", event: "PLC RECONNECTED", temp: null, priority: "INFO" },
    { time: "20:18:11", event: "TEMP NORMAL", temp: 57.2, priority: "RECOVERED" },
  ],
  equipment: equipmentFor(tempStatus(STATIC_TEMP)),
  seq: 1546,
  lastUpdate: "20:42:18",
  cloudUpload: "20:42:18",
  reconnect: 0,
};
