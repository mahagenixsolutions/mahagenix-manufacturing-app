import React from "react";
import ReactECharts from "echarts-for-react";

export default function QualityDashboard() {
  const defectCategories = [
    { name: "Dimensional Error", value: 42, percentage: 38 },
    { name: "Surface Scratches", value: 31, percentage: 28 },
    { name: "Material Inclusions", value: 20, percentage: 18 },
    { name: "Assembly Misalignment", value: 18, percentage: 16 },
  ];

  // ECharts gauge for Quality Pass Rate
  const passRateOption = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        radius: "100%",
        center: ["50%", "75%"],
        progress: {
          show: true,
          width: 8,
          itemStyle: { color: "#10b981" },
        },
        pointer: { show: false },
        axisLine: { lineStyle: { width: 8, color: [[1, "rgba(0,0,0,0.04)"]] } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        anchor: { show: false },
        title: { show: false },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, -10],
          fontSize: 22,
          fontWeight: "extrabold",
          formatter: "{value}%",
          color: "var(--text-primary)",
        },
        data: [{ value: 99.2 }],
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      {/* Gauge and Hero Stats */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="relative w-44 h-28 overflow-hidden">
          <ReactECharts option={passRateOption} style={{ height: "140px", width: "100%" }} />
        </div>
        <div className="text-center mt-2">
          <p className="text-[12px] font-bold text-success-600 uppercase tracking-wider">Quality Pass Rate</p>
          <p className="text-[11px] text-tertiary mt-0.5">Shift Target: 98.5% nominal</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mt-4">
          <div className="p-3 rounded-xl border border-subtle bg-surface-secondary/20 text-center">
            <p className="text-[10px] uppercase font-bold text-tertiary">Rejected Units</p>
            <p className="text-[16px] font-extrabold text-primary mt-1">12 units</p>
          </div>
          <div className="p-3 rounded-xl border border-subtle bg-surface-secondary/20 text-center">
            <p className="text-[10px] uppercase font-bold text-tertiary">Inspection Queue</p>
            <p className="text-[16px] font-extrabold text-primary mt-1">4 batches</p>
          </div>
        </div>
      </div>

      {/* Defect Categories List */}
      <div className="w-full md:w-1/2 flex flex-col justify-between self-stretch">
        <div>
          <h4 className="text-[12px] font-bold text-tertiary uppercase tracking-wider mb-3">Defect Root Causes</h4>
          <div className="space-y-3">
            {defectCategories.map((def, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-secondary">
                  <span>{def.name}</span>
                  <span>{def.value} cases ({def.percentage}%)</span>
                </div>
                <div className="w-full h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full" 
                    style={{ width: `${def.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
