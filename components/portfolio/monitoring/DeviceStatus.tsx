import { cn } from "@/lib/utils";
import { PLC_INFO, AZURE_INFO, type MonitoringState } from "./monitoringData";

/** PLC + Azure connection cards (shared constants, live values from state). */
export function DeviceStatus({ state }: { state: MonitoringState }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      <Card title="PLC">
        <Row label="Status" value={PLC_INFO.status} tone="ok" />
        <Row label="IP" value={PLC_INFO.ip} />
        <Row label="Protocol" value={PLC_INFO.protocol} />
        <Row label="Poll Interval" value={PLC_INFO.poll} />
        <Row label="Reconnect" value={String(state.reconnect)} />
      </Card>
      <Card title="Azure">
        <Row label="IoT Hub" value={AZURE_INFO.iotHub} tone="ok" />
        <Row label="Device ID" value={AZURE_INFO.deviceId} />
        <Row label="Telemetry" value={AZURE_INFO.telemetry} tone="live" />
        <Row label="Last Upload" value={state.cloudUpload} />
        <Row label="Cosmos DB" value={AZURE_INFO.cosmos} tone="ok" />
      </Card>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-white/[0.02] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
        {title}
      </div>
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "ok" | "live";
}) {
  return (
    <div className="flex items-center justify-between border-b border-line/50 py-0.5 last:border-b-0">
      <span className="font-mono text-[9px] uppercase tracking-wider text-subtle">
        {label}
      </span>
      <span
        className={cn(
          "max-w-[62%] truncate font-mono text-[11px] tabular-nums",
          tone === "ok"
            ? "text-emerald-300"
            : tone === "live"
              ? "text-cyan-300"
              : "text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}
