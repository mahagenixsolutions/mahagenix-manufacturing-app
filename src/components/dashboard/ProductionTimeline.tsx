// ============================================================
// ForgeMES — Production Timeline (Hourly)
// ============================================================

import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { productionTimeline } from "@/mock/data";

export default function ProductionTimeline() {
  const option = useMemo(
    () => ({
      tooltip: {
        trigger: "axis" as const,
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-default)",
        textStyle: { fontSize: 12, color: "var(--text-primary)" },
        axisPointer: { type: "shadow" as const },
      },
      legend: {
        data: ["Production", "Downtime", "Maintenance", "Alerts"],
        bottom: 0,
        textStyle: { fontSize: 11, color: "var(--text-tertiary)" },
        itemWidth: 12,
        itemHeight: 8,
        itemGap: 20,
      },
      grid: { left: 48, right: 24, top: 24, bottom: 48 },
      xAxis: {
        type: "category" as const,
        data: productionTimeline.map((d) => d.hour),
        axisLine: { lineStyle: { color: "var(--border-default)" } },
        axisTick: { show: false },
        axisLabel: { fontSize: 10, color: "var(--text-tertiary)" },
      },
      yAxis: {
        type: "value" as const,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          lineStyle: { color: "var(--border-subtle)", type: "dashed" as const },
        },
        axisLabel: { fontSize: 10, color: "var(--text-tertiary)" },
      },
      series: [
        {
          name: "Production",
          type: "bar",
          stack: "total",
          data: productionTimeline.map((d) => d.production),
          itemStyle: { color: "#2563eb", borderRadius: [0, 0, 0, 0] },
          barWidth: "60%",
          animationDuration: 800,
        },
        {
          name: "Downtime",
          type: "bar",
          stack: "total",
          data: productionTimeline.map((d) => d.downtime),
          itemStyle: { color: "#ef4444" },
          animationDuration: 800,
          animationDelay: 200,
        },
        {
          name: "Maintenance",
          type: "bar",
          stack: "total",
          data: productionTimeline.map((d) => d.maintenance),
          itemStyle: { color: "#f59e0b" },
          animationDuration: 800,
          animationDelay: 400,
        },
        {
          name: "Alerts",
          type: "bar",
          stack: "total",
          data: productionTimeline.map((d) => d.alerts),
          itemStyle: { color: "#8b5cf6", borderRadius: [3, 3, 0, 0] },
          animationDuration: 800,
          animationDelay: 600,
        },
      ],
    }),
    [],
  );

  // Find current hour index for indicator
  const currentHour = new Date().getHours();
  const currentHourFormatted = `${currentHour.toString().padStart(2, "0")}:00`;
  const currentIdx = productionTimeline.findIndex(
    (d) => d.hour === currentHourFormatted,
  );

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-end mb-2">
        {currentIdx >= 0 && (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-[10px] font-medium text-primary-600">
              Live
            </span>
          </div>
        )}
      </div>
      <ReactECharts
        option={option}
        style={{ height: 300 }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
}
