import React from "react";
import { 
  Percent, 
  Settings2, 
  Cpu, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, 
  ClipboardList, 
  Package, 
  ShieldAlert 
} from "lucide-react";

interface KPIData {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  comparison: string;
  unit: string;
  icon: React.ComponentType<any>;
  sparkline: number[];
  color: string;
}

const kpiItems: KPIData[] = [
  {
    label: "Overall Equipment Effectiveness",
    value: "92.4",
    trend: "+2.1%",
    isPositive: true,
    comparison: "vs yesterday",
    unit: "%",
    icon: Percent,
    sparkline: [88, 89, 91, 90, 92, 91, 92.4],
    color: "rgba(34, 197, 94, 0.1)", // Green
  },
  {
    label: "Production Output",
    value: "14,842",
    trend: "+5.4%",
    isPositive: true,
    comparison: "vs yesterday",
    unit: "units",
    icon: Settings2,
    sparkline: [12200, 13400, 13800, 13000, 14200, 14500, 14842],
    color: "rgba(59, 130, 246, 0.1)", // Blue
  },
  {
    label: "Machine Utilization",
    value: "88.6",
    trend: "-0.8%",
    isPositive: false,
    comparison: "vs yesterday",
    unit: "%",
    icon: Cpu,
    sparkline: [89.5, 89, 89.2, 88.9, 88.5, 88.7, 88.6],
    color: "rgba(239, 68, 68, 0.1)", // Red
  },
  {
    label: "Quality Score",
    value: "99.2",
    trend: "+0.1%",
    isPositive: true,
    comparison: "vs yesterday",
    unit: "%",
    icon: CheckCircle,
    sparkline: [98.9, 99.0, 99.1, 98.8, 99.2, 99.0, 99.2],
    color: "rgba(16, 185, 129, 0.1)", // Emerald
  },
  {
    label: "Today's Revenue",
    value: "4.8",
    trend: "+12.2%",
    isPositive: true,
    comparison: "vs yesterday",
    unit: "₹M",
    icon: IndianRupee,
    sparkline: [4.1, 4.3, 4.2, 4.5, 4.6, 4.7, 4.8],
    color: "rgba(245, 158, 11, 0.1)", // Amber
  },
  {
    label: "Active Work Orders",
    value: "38",
    trend: "+2",
    isPositive: true,
    comparison: "vs yesterday",
    unit: "orders",
    icon: ClipboardList,
    sparkline: [35, 36, 36, 38, 37, 36, 38],
    color: "rgba(139, 92, 246, 0.1)", // Purple
  },
  {
    label: "Inventory Health",
    value: "96.5",
    trend: "+0.4%",
    isPositive: true,
    comparison: "vs yesterday",
    unit: "%",
    icon: Package,
    sparkline: [96.0, 96.2, 96.1, 96.3, 96.4, 96.3, 96.5],
    color: "rgba(6, 182, 212, 0.1)", // Cyan
  },
  {
    label: "Safety Score",
    value: "100",
    trend: "0.0%",
    isPositive: true,
    comparison: "120 days accident-free",
    unit: "%",
    icon: ShieldAlert,
    sparkline: [100, 100, 100, 100, 100, 100, 100],
    color: "rgba(16, 185, 129, 0.1)", // Emerald
  },
];

function MiniSparkline({ data, isPositive }: { data: number[]; isPositive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min === 0 ? 1 : max - min;
  const width = 80;
  const height = 24;
  
  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  const color = isPositive ? "#22c55e" : "#ef4444";

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  );
}

export default function ExecutiveKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiItems.map((item, idx) => {
        const Icon = item.icon;
        const trendBg = item.isPositive
          ? "rgba(34, 197, 94, 0.1)"
          : "rgba(239, 68, 68, 0.1)";
        const trendText = item.isPositive ? "text-success-600" : "text-danger-600";

        return (
          <div 
            key={idx} 
            className="card-elevated p-4 flex flex-col justify-between relative overflow-hidden group hover:border-primary-300 transition-all duration-300 min-h-[140px]"
          >
            {/* Ambient hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="flex items-start justify-between relative z-10 mb-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-primary-200/20 shadow-sm"
                style={{ backgroundColor: item.color }}
              >
                <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>

              {/* Sparkline & Trend */}
              <div className="flex flex-col items-end gap-1">
                <MiniSparkline data={item.sparkline} isPositive={item.isPositive} />
                <div className={`flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${trendText}`} style={{ backgroundColor: trendBg, borderColor: item.isPositive ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)" }}>
                  {item.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {item.trend}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="relative z-10 mt-auto">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-primary tracking-tight leading-none">
                  {item.value}
                </span>
                <span className="text-[12px] font-bold text-tertiary">
                  {item.unit}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] font-bold text-tertiary uppercase tracking-wide truncate max-w-[140px]">
                  {item.label}
                </span>
                <span className="text-[10px] text-tertiary truncate">
                  {item.comparison}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
