import React from "react";
import { Package, ShieldAlert, ArrowRight, AlertTriangle } from "lucide-react";

interface StockItem {
  name: string;
  category: "raw" | "finished";
  stockLevel: number; // percentage
  status: "nominal" | "warning" | "critical";
  val: string;
}

const stockLevels: StockItem[] = [
  { name: "Hot-Rolled Steel Sheets", category: "raw", stockLevel: 34, status: "warning", val: "12.4 tons" },
  { name: "Aluminum Cast Ingots", category: "raw", stockLevel: 82, status: "nominal", val: "45.0 tons" },
  { name: "Nominal 2.4L Gearboxes", category: "finished", stockLevel: 94, status: "nominal", val: "1,240 units" },
  { name: "Copper Wiring Bundles", category: "raw", stockLevel: 14, status: "critical", val: "1.2 tons" },
];

export default function InventoryOverview() {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center h-full">
      {/* Occupancy Indicator */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-r border-subtle pr-0 md:pr-6 md:border-b-0 pb-6 md:pb-0">
        <div className="relative w-28 h-28 flex items-center justify-center rounded-full border-8 border-subtle" style={{ borderTopColor: "var(--color-primary-500)" }}>
          <div className="text-center">
            <p className="text-[20px] font-extrabold text-primary">78.4%</p>
            <p className="text-[9px] uppercase font-bold text-tertiary mt-0.5">Occupancy</p>
          </div>
        </div>
        <p className="text-[11px] text-tertiary mt-3 text-center">Warehouse A, B & C combined capacity status.</p>
      </div>

      {/* Materials List */}
      <div className="w-full md:w-2/3 flex flex-col justify-between self-stretch">
        <div>
          <h4 className="text-[12px] font-bold text-tertiary uppercase tracking-wider mb-3 font-sans">Material Stock Indexes</h4>
          <div className="space-y-3.5">
            {stockLevels.map((item, idx) => {
              const indicatorColor = item.status === "critical" ? "bg-danger-500" : item.status === "warning" ? "bg-warning-500" : "bg-success-500";
              const tagStyle = item.status === "critical" ? "text-danger-600 bg-danger-500/10 border-danger-200" : item.status === "warning" ? "text-warning-600 bg-warning-500/10 border-warning-200" : "text-success-600 bg-success-500/10 border-success-200";

              return (
                <div key={idx} className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${indicatorColor}`} />
                      <span className="text-[12px] font-bold text-primary truncate">{item.name}</span>
                    </div>
                    {/* Visual bar slider */}
                    <div className="w-full h-1 bg-surface-secondary rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${indicatorColor}`} style={{ width: `${item.stockLevel}%` }} />
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${tagStyle}`}>
                    {item.val}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
