import { cn } from "@/lib/utils";
import { InspectionDashboard } from "./inspection/InspectionDashboard";
import { MonitoringDashboard } from "./monitoring/MonitoringDashboard";

/**
 * Live product dashboards rendered in code so the portfolio never looks empty
 * before real captures exist. Two on-topic variants:
 *  - inspection: AI visual inspection HMI (see ./inspection)
 *  - monitoring: PLC temperature monitoring HMI (see ./monitoring)
 * ProjectVisual only switches between variants and provides the window frame.
 */
export function ProjectVisual({
  variant,
  className,
}: {
  variant: "inspection" | "monitoring";
  title: string;
  className?: string;
}) {
  const glow =
    variant === "inspection"
      ? "rgba(34,211,238,0.12)"
      : "rgba(34,211,238,0.1)";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-line bg-[#0c0c0f]",
        className,
      )}
    >
      {variant === "inspection" ? (
        <InspectionDashboard />
      ) : (
        <MonitoringDashboard />
      )}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{
          background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${glow}, transparent)`,
        }}
      />
    </div>
  );
}
