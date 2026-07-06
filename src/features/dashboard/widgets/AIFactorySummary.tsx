import React, { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  category: "risk" | "optimization" | "trend";
  summary: string;
  detail: string;
  actionText: string;
}

const recommendationsList: Recommendation[] = [
  {
    id: "rec-1",
    title: "Machine A12 (CNC Lathe) Maintenance Alert",
    category: "risk",
    summary: "Vibration telemetry has exceeded nominal thresholds by 14.8%. High risk of spindle bearing failure within 48 hours.",
    detail: "Spindle bearing friction is rising due to lubrication breakdown. The thermal profile has risen by 8°C. Performing a 15-minute lubrication cycle during the shift handover at 14:00 will prevent an estimated 4-hour unscheduled stoppage.",
    actionText: "Schedule Preventive Run",
  },
  {
    id: "rec-2",
    title: "Raw Material Shortage Anticipated (Steel Sheets)",
    category: "risk",
    summary: "Supplier dispatch logs indicate a 24-hour delay in steel shipments. Stock buffer drops below safe operating limits tomorrow night.",
    detail: "To prevent line stoppages, re-route Active Work Order #WO-2024-0852 to Line A4, which utilizes alternative aluminum sheet feedstock currently in surplus. This preserves operators' productivity index.",
    actionText: "Re-route Work Order",
  },
  {
    id: "rec-3",
    title: "Optimize Cycle Time on Assembly Line A2",
    category: "optimization",
    summary: "Robot Arm 18 is experiencing micro-delays (240ms per pick-and-place operation) due to sensor dust build-up.",
    detail: "A simple sensor lens clean will recalibrate the path planning algorithm, yielding an estimated +1.8% efficiency jump on Line A2 output without speed adjustments.",
    actionText: "Trigger Cleaning Task",
  },
];

export default function AIFactorySummary() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="card-elevated p-6 bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/30 dark:from-slate-900/30 dark:via-slate-900/10 dark:to-indigo-950/10 border-indigo-200/50 dark:border-indigo-900/30 shadow-md">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h2 className="text-[16px] font-bold text-primary">AI Factory Agent Summary</h2>
          <p className="text-[12px] text-tertiary">Real-time predictive insights and operational advice</p>
        </div>
      </div>

      {/* Hero Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl border border-success-200/50 bg-success-50/20 dark:bg-success-950/10 dark:border-success-900/30 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-success-500/10 text-success-600 dark:text-success-400 mt-0.5">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-success-800 dark:text-success-300">Production Velocity</h4>
            <p className="text-[13px] text-secondary mt-1 leading-relaxed">
              Overall output is running <span className="font-bold text-success-600 dark:text-success-400">7.2% ahead</span> of today's target index.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-danger-200/50 bg-danger-50/20 dark:bg-danger-950/10 dark:border-danger-900/30 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-danger-500/10 text-danger-600 dark:text-danger-400 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-danger-800 dark:text-danger-300">Predictive Risks</h4>
            <p className="text-[13px] text-secondary mt-1 leading-relaxed">
              2 maintenance risks identified, including one critical spindle warning on A12.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-indigo-200/50 bg-indigo-50/20 dark:bg-indigo-950/10 dark:border-indigo-900/30 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mt-0.5">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-indigo-800 dark:text-indigo-300">Energy & Output Optimization</h4>
            <p className="text-[13px] text-secondary mt-1 leading-relaxed">
              1 low-complexity robot arm lens cleaning task could increase assembly line output by 1.8%.
            </p>
          </div>
        </div>
      </div>

      {/* Expandable Recommendations list */}
      <div className="space-y-3">
        <h3 className="text-[12px] font-bold text-tertiary uppercase tracking-wide mb-2">Recommended Operational Adjustments</h3>
        
        {recommendationsList.map((rec) => {
          const isExpanded = expandedId === rec.id;
          const isRisk = rec.category === "risk";
          const borderStyle = isRisk 
            ? "border-danger-100 hover:border-danger-200 dark:border-danger-950/30" 
            : "border-indigo-100 hover:border-indigo-200 dark:border-indigo-950/30";

          return (
            <div 
              key={rec.id} 
              className={`rounded-xl border bg-white dark:bg-surface-secondary/20 transition-all ${borderStyle}`}
            >
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleExpand(rec.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${isRisk ? "bg-danger-500" : "bg-indigo-500"}`} />
                  <div>
                    <h4 className="text-[13px] font-bold text-primary">{rec.title}</h4>
                    <p className="text-[11px] text-tertiary mt-0.5">{rec.summary}</p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-tertiary" /> : <ChevronDown className="w-5 h-5 text-tertiary" />}
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-subtle">
                  <p className="text-[12px] text-secondary leading-relaxed mt-2">
                    {rec.detail}
                  </p>
                  <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-subtle">
                    <button 
                      onClick={() => setExpandedId(null)}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-secondary hover:bg-surface-secondary transition-colors cursor-pointer border border-subtle"
                    >
                      Dismiss Advice
                    </button>
                    <button 
                      className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
                    >
                      {rec.actionText}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
