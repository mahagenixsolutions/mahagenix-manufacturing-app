import React from "react";
import { Zap, Droplet, Flame, Leaf, ArrowDown } from "lucide-react";

export default function EnergySustainability() {
  const sustainabilityMetrics = [
    { name: "Electricity Consumption", value: "48.2 kWh", cost: "₹4,820", reduction: "-4.2%", icon: Zap, color: "text-amber-500", bg: "rgba(245, 158, 11, 0.1)" },
    { name: "Water Usage", value: "1,240 L", cost: "₹248", reduction: "-2.1%", icon: Droplet, color: "text-blue-500", bg: "rgba(59, 130, 246, 0.1)" },
    { name: "Natural Gas Flow", value: "320 m³", cost: "₹1,600", reduction: "-1.0%", icon: Flame, color: "text-orange-500", bg: "rgba(249, 115, 22, 0.1)" },
    { name: "Carbon Emission Equivalent", value: "1.4 tCO2e", cost: "0.4t saved", reduction: "-8.4%", icon: Leaf, color: "text-emerald-500", bg: "rgba(16, 185, 129, 0.1)" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Metrics list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sustainabilityMetrics.map((met, idx) => {
          const Icon = met.icon;
          return (
            <div key={idx} className="p-4 rounded-xl border border-subtle bg-surface flex flex-col justify-between min-h-[110px]">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-40 h-40 rounded-lg flex items-center justify-center shrink-0 ${met.color}`} style={{ backgroundColor: met.bg }}>
                  <Icon className="w-20 h-20" />
                </div>
                <div className="flex items-center gap-0.5 text-[10px] font-bold text-success-600 bg-success-500/10 px-2 py-0.5 rounded-full border border-success-200/20">
                  <ArrowDown className="w-12 h-12 shrink-0" />
                  {met.reduction}
                </div>
              </div>

              <div>
                <p className="text-[16px] font-extrabold text-primary">{met.value}</p>
                <div className="flex items-center justify-between mt-1 text-[10px] text-tertiary font-bold uppercase tracking-wide gap-2">
                  <span className="truncate flex-1 min-w-0" title={met.name}>{met.name}</span>
                  <span className="font-mono text-secondary shrink-0">{met.cost}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
