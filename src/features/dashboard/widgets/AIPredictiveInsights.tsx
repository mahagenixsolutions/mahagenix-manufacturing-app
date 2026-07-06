import React from "react";
import { Sparkles, TrendingUp, AlertTriangle, ShieldCheck, Activity } from "lucide-react";

interface Insight {
  category: string;
  title: string;
  probability: string;
  timeframe: string;
  impact: string;
  impactType: "negative" | "positive";
}

const predictiveList: Insight[] = [
  {
    category: "Machine Failure Anomaly",
    title: "Press 3 Spindle motor thermal stress warning",
    probability: "84%",
    timeframe: "within 3 days",
    impact: "High (Potential 6h stop)",
    impactType: "negative",
  },
  {
    category: "Market Demand Forecast",
    title: "Seasonal casting order ramp (+14% shift load)",
    probability: "92%",
    timeframe: "starting next Monday",
    impact: "Positive (₹1.8M shift revenue)",
    impactType: "positive",
  },
  {
    category: "Supply Chain Risk",
    title: "Hydraulic seal inventory stockout scenario",
    probability: "70%",
    timeframe: "within 5 days",
    impact: "Medium (Workaround available)",
    impactType: "negative",
  },
];

export default function AIPredictiveInsights() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictiveList.map((ins, idx) => {
          const impactColor = ins.impactType === "positive" ? "text-success-600 bg-success-500/10 border-success-200" : "text-danger-600 bg-danger-500/10 border-danger-200";

          return (
            <div key={idx} className="p-4 rounded-xl border border-subtle bg-surface hover:border-indigo-300 dark:hover:border-indigo-900 transition-colors flex flex-col justify-between min-h-[140px] relative group">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                    {ins.category}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-tertiary">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{ins.probability} Prob</span>
                  </div>
                </div>

                <h4 className="text-[13px] font-bold text-primary leading-snug">
                  {ins.title}
                </h4>
              </div>

              {/* Timeframe & Impact */}
              <div className="mt-4 pt-3 border-t border-subtle flex items-center justify-between text-[11px]">
                <span className="text-tertiary font-semibold">{ins.timeframe}</span>
                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${impactColor}`}>
                  {ins.impact}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
