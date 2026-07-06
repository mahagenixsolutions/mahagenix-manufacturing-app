import React from "react";
import {
  Sparkles,
  TrendingDown,
  AlertTriangle,
  ArrowUpRight,
  Wrench,
  BarChart3,
  ChevronRight,
  Activity,
} from "lucide-react";

const insights = [
  {
    icon: TrendingDown,
    color: "text-warning-500",
    bg: "bg-warning-500/15",
    title: "Efficiency Drop Detected",
    text: "Production Line A3 is operating 14% below average efficiency.",
    rootCause: "Welding station WLD-307 idle time",
    confidence: 94,
    actionText: "View Production Line",
    severity: "warning" as const,
  },
  {
    icon: Wrench,
    color: "text-danger-500",
    bg: "bg-danger-500/15",
    title: "Predictive Maintenance Alert",
    text: "Machine M204 (CNC Lathe Unit 4) vibration patterns suggest bearing wear.",
    rootCause: "High-frequency resonance at 1400RPM",
    confidence: 89,
    actionText: "Schedule Maintenance",
    severity: "critical" as const,
  },
  {
    icon: AlertTriangle,
    color: "text-warning-600",
    bg: "bg-warning-600/15",
    title: "Quality Deviation",
    text: "Quality defects increased by 8% this week on PCB Assembly.",
    rootCause: "Solder paste dispenser calibration drift",
    confidence: 91,
    actionText: "Inspect Quality Logs",
    severity: "warning" as const,
  },
  {
    icon: ArrowUpRight,
    color: "text-success-500",
    bg: "bg-success-500/15",
    title: "Throughput Optimization",
    text: "Line A2 efficiency improved by 4.2% after recent maintenance.",
    rootCause: "Optimal robot arm kinematics restored",
    confidence: 98,
    actionText: "View Analysis",
    severity: "info" as const,
  },
];

export default function AIInsights() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-surface to-primary-50/30 overflow-y-auto no-scrollbar relative">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-3xl bg-primary-500 pointer-events-none" />

      <div className="space-y-4 relative z-10">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <div
              key={i}
              className="flex flex-col gap-3 p-5 rounded-lg border border-subtle bg-surface shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${insight.bg} ${insight.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[12px] font-bold text-primary">
                    {insight.title}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded shrink-0">
                  <Sparkles className="w-2.5 h-2.5" /> {insight.confidence}%
                  Match
                </div>
              </div>

              <p className="text-[11px] text-secondary leading-snug">
                {insight.text}
              </p>

              <div className="bg-surface-secondary/50 p-2.5 rounded flex items-start gap-2 border border-subtle border-dashed mt-4">
                <Activity className="w-3.5 h-3.5 text-tertiary shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold text-tertiary uppercase tracking-wider block mb-0.5">
                    Root Cause
                  </span>
                  <span className="text-[11px] font-medium text-secondary">
                    {insight.rootCause}
                  </span>
                </div>
              </div>

              <div className="flex justify-end mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex items-center gap-1 text-[10px] font-bold text-primary-600 hover:text-primary-700">
                  {insight.actionText} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
