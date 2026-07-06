import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

export default function ProductionAnalytics() {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [metric, setMetric] = useState<"output" | "oee" | "downtime">("output");

  // Mock chart configurations depending on states
  const chartData = {
    daily: {
      labels: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
      output: [1200, 1450, 1600, 1300, 1550, 1800, 1650],
      oee: [88, 91, 93, 89, 92, 94, 91],
      downtime: [5, 0, 10, 0, 0, 5, 0],
    },
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      output: [12200, 13400, 13800, 13000, 14200, 14500, 14842],
      oee: [89.5, 90.1, 91.2, 89.8, 92.4, 93.1, 92.4],
      downtime: [45, 30, 15, 60, 20, 10, 15],
    },
    monthly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      output: [48000, 52000, 51000, 58000],
      oee: [88.5, 91.0, 90.5, 92.4],
      downtime: [180, 140, 190, 110],
    },
  };

  const activeSeries = chartData[timeframe][metric];
  const activeLabels = chartData[timeframe].labels;

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      borderColor: "rgba(15, 23, 42, 0.9)",
      textStyle: { color: "#fff", fontSize: 11 },
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "3%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: activeLabels,
      axisLine: { lineStyle: { color: "var(--border-default)" } },
      axisLabel: { color: "var(--text-secondary)", fontSize: 10 },
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: "rgba(0,0,0,0.04)" } },
      axisLabel: { color: "var(--text-secondary)", fontSize: 10 },
    },
    series: [
      {
        name: metric.toUpperCase(),
        data: activeSeries,
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: metric === "oee" ? "#10b981" : metric === "downtime" ? "#ef4444" : "#3b82f6",
          width: 3,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: metric === "oee" ? "rgba(16, 185, 129, 0.2)" : metric === "downtime" ? "rgba(239, 68, 68, 0.2)" : "rgba(59, 130, 246, 0.2)" },
              { offset: 1, color: "rgba(255, 255, 255, 0)" }
            ]
          }
        }
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4 h-full justify-between">
      {/* Top Header controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        {/* Metric selection selectors */}
        <div className="flex items-center gap-1 sm:gap-2 bg-surface-secondary/40 p-1 sm:px-2 sm:py-1 rounded-xl border border-subtle overflow-x-auto no-scrollbar">
          <button
            onClick={() => setMetric("output")}
            className={`flex-1 sm:flex-none whitespace-nowrap px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-[12px] font-bold transition-all cursor-pointer ${metric === "output" ? "bg-primary-600 text-white shadow-sm border-transparent" : "text-tertiary hover:text-secondary bg-transparent"}`}
          >
            Output Volume
          </button>
          <button
            onClick={() => setMetric("oee")}
            className={`flex-1 sm:flex-none whitespace-nowrap px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-[12px] font-bold transition-all cursor-pointer ${metric === "oee" ? "bg-primary-600 text-white shadow-sm border-transparent" : "text-tertiary hover:text-secondary bg-transparent"}`}
          >
            OEE Trends
          </button>
          <button
            onClick={() => setMetric("downtime")}
            className={`flex-1 sm:flex-none whitespace-nowrap px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-[12px] font-bold transition-all cursor-pointer ${metric === "downtime" ? "bg-primary-600 text-white shadow-sm border-transparent" : "text-tertiary hover:text-secondary bg-transparent"}`}
          >
            Downtime
          </button>
        </div>

        {/* Timeframe switchers */}
        <div className="flex items-center gap-1.5 bg-surface-secondary/40 p-1 rounded-xl border border-subtle self-start xl:self-auto">
          <button
            onClick={() => setTimeframe("daily")}
            className={`flex-1 sm:flex-none whitespace-nowrap px-3 py-1 rounded-lg text-[11px] sm:text-[12px] font-bold transition-all cursor-pointer ${timeframe === "daily" ? "bg-primary-600 text-white shadow-sm border-transparent" : "text-tertiary hover:text-secondary bg-transparent"}`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeframe("weekly")}
            className={`flex-1 sm:flex-none whitespace-nowrap px-3 py-1 rounded-lg text-[11px] sm:text-[12px] font-bold transition-all cursor-pointer ${timeframe === "weekly" ? "bg-primary-600 text-white shadow-sm border-transparent" : "text-tertiary hover:text-secondary bg-transparent"}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe("monthly")}
            className={`flex-1 sm:flex-none whitespace-nowrap px-3 py-1 rounded-lg text-[11px] sm:text-[12px] font-bold transition-all cursor-pointer ${timeframe === "monthly" ? "bg-primary-600 text-white shadow-sm border-transparent" : "text-tertiary hover:text-secondary bg-transparent"}`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart Panel wrapper */}
      <div className="flex-1 mt-4">
        <ReactECharts option={option} style={{ height: "300px", width: "100%" }} />
      </div>
    </div>
  );
}
