"use client";

import { useMonitoringSimulation } from "./useMonitoringSimulation";
import { MonitoringStatusBar } from "./MonitoringStatusBar";
import { TemperatureChart, ChartHeader } from "./TemperatureChart";
import { EquipmentSummary } from "./EquipmentSummary";
import { TelemetryTimeline } from "./TelemetryTimeline";
import { CurrentTemperature } from "./CurrentTemperature";
import { DeviceStatus } from "./DeviceStatus";
import { AlarmHistory } from "./AlarmHistory";
import { CloudPipeline } from "./CloudPipeline";

/**
 * Live PLC temperature monitoring HMI (client). Orchestrates the simulation and
 * the responsive 2-column layout. On mobile the blocks reflow into the required
 * order via `display:contents` + `order-*`, collapsing to two columns from `md`.
 */
export function MonitoringDashboard() {
  const { ref, state, live } = useMonitoringSimulation();

  return (
    <div
      ref={ref}
      data-status={state.status}
      data-temp={state.temp}
      className="flex flex-col"
    >
      <MonitoringStatusBar live={live} />

      <div className="flex flex-col gap-2.5 p-2.5 sm:p-3.5 md:flex-row">
        {/* Left column: Chart + Equipment + Telemetry + Pipeline */}
        <div className="contents md:flex md:w-[64%] md:min-w-0 md:flex-col md:gap-2.5 lg:w-[70%]">
          <div className="order-3 flex flex-col md:order-none">
            <ChartHeader status={state.status} />
            <TemperatureChart state={state} />
          </div>
          <div className="order-4 md:order-none">
            <EquipmentSummary state={state} />
          </div>
          <div className="order-7 md:order-none">
            <TelemetryTimeline state={state} />
          </div>
          <div className="order-8 md:order-none">
            <CloudPipeline />
          </div>
        </div>

        {/* Right column: Current Temp + Device + Alarms */}
        <div className="contents md:flex md:w-[36%] md:min-w-0 md:flex-col md:gap-2.5 lg:w-[30%]">
          <div className="order-2 md:order-none">
            <CurrentTemperature state={state} />
          </div>
          <div className="order-5 md:order-none">
            <DeviceStatus state={state} />
          </div>
          <div className="order-6 md:order-none">
            <AlarmHistory state={state} />
          </div>
        </div>
      </div>
    </div>
  );
}
