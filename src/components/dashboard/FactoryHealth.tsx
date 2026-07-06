import React from "react";
import { Activity, Server, Zap, Factory } from "lucide-react";

export default function FactoryHealth() {
  const metrics = [
    {
      label: "Overall Plant OEE",
      value: "87.4%",
      status: "optimal",
      icon: Activity,
      trend: "+2.1%",
    },
    {
      label: "System Health",
      value: "99.9%",
      status: "optimal",
      icon: Server,
      trend: "Stable",
    },
    {
      label: "Factory Utilization",
      value: "92.0%",
      status: "warning",
      icon: Factory,
      trend: "-1.5%",
    },
    {
      label: "Energy Load",
      value: "85%",
      status: "optimal",
      icon: Zap,
      trend: "-3.2%",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 h-full">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="flex flex-col p-3 sm:p-5 rounded-lg border border-subtle bg-surface-secondary/50 min-h-[100px]"
        >
          <div className="flex items-start sm:items-center gap-2 mb-3 sm:mb-4 lg:mb-6">
            <metric.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary-500 shrink-0 mt-0.5 sm:mt-0 transition-all" />
            <span className="text-[11px] sm:text-[12px] lg:text-[14px] font-semibold text-secondary leading-tight transition-all">
              {metric.label}
            </span>
          </div>
          <div className="flex flex-wrap items-baseline justify-between mt-auto gap-1 sm:gap-3">
            <span className="text-lg sm:text-xl lg:text-3xl font-bold text-primary leading-none transition-all">
              {metric.value}
            </span>
            <span
              className={`text-[11px] font-medium ${metric.status === "optimal" ? "text-success-600" : "text-warning-600"}`}
            >
              {metric.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
