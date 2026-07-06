import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  HelpCircle,
  Check,
  X,
} from "lucide-react";

interface AlertItem {
  id: string;
  category: "incident" | "warning" | "approval";
  title: string;
  message: string;
  timestamp: string;
}

const initialAlerts: AlertItem[] = [
  {
    id: "al-1",
    category: "incident",
    title: "Critical Stoppage on Press 3",
    message:
      "Hydraulic pressure failure logged during cycle #480. Maintenance dispatch is required immediately.",
    timestamp: "5 min ago",
  },
  {
    id: "al-2",
    category: "approval",
    title: "Override Authorization Requested",
    message:
      "Operator Amit Patel requested quality bypass on batch #948 for sheet thickness deviation.",
    timestamp: "12 min ago",
  },
  {
    id: "al-3",
    category: "warning",
    title: "Warning: High temperature on CNC Spindle A12",
    message:
      "Spindle core temp registered at 82°C (nominal max is 85°C). Performance throttle applied.",
    timestamp: "20 min ago",
  },
];

export default function CriticalAlerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);

  const handleAction = (id: string, action: "approve" | "dismiss") => {
    setAlerts((prev) => prev.filter((al) => al.id !== id));
    alert(`Alert ${id} action: ${action}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {alerts.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-subtle rounded-xl bg-surface-secondary/15">
          <p className="text-[12px] font-semibold text-secondary">
            All Alerts Solved
          </p>
          <p className="text-[11px] text-tertiary mt-1">
            Zero critical events pending operator review.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {alerts.map((al) => {
            const isIncident = al.category === "incident";
            const isApproval = al.category === "approval";
            const borderStyle = isIncident
              ? "border-danger-200/50 bg-danger-50/10"
              : isApproval
                ? "border-primary-200/50 bg-primary-50/10"
                : "border-warning-200/50 bg-warning-50/10";

            const categoryLabel = al.category.toUpperCase();
            const labelColor = isIncident
              ? "text-danger-700 bg-danger-500/10"
              : isApproval
                ? "text-primary-700 bg-primary-500/10"
                : "text-warning-700 bg-warning-500/10";

            return (
              <div
                key={al.id}
                className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${borderStyle}`}
              >
                <div className="flex items-start gap-3 p-1">
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-current shrink-0 mt-2 ${isIncident ? "text-danger-500" : isApproval ? "text-primary-500" : "text-warning-500"}`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${labelColor}`}
                      >
                        {categoryLabel}
                      </span>
                      <span className="text-[11px] text-tertiary">
                        {al.timestamp}
                      </span>
                    </div>
                    <h4 className="text-[13px] font-bold text-primary mt-1.5">
                      {al.title}
                    </h4>
                    <p className="text-[12px] text-secondary mt-1 leading-snug">
                      {al.message}
                    </p>
                  </div>
                </div>

                {/* Actions row */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  {isApproval ? (
                    <>
                      <button
                        onClick={() => handleAction(al.id, "dismiss")}
                        className="p-1.5 rounded-lg border border-subtle bg-white text-danger-600 hover:bg-danger-50 transition-colors cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction(al.id, "approve")}
                        className="p-1.5 rounded-lg border border-success-200 bg-success-50 text-success-600 hover:bg-success-100 transition-colors cursor-pointer"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleAction(al.id, "dismiss")}
                      className="px-3 py-1.5 rounded-lg border border-subtle bg-white text-[11px] font-semibold text-secondary hover:bg-surface-secondary transition-colors cursor-pointer"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
