import React, { useState } from "react";
import { alerts as mockAlerts } from "@/mock/data";
import { formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  Cpu,
  ShieldCheck,
  Warehouse,
  Wrench,
  AlertOctagon,
  CheckCircle,
  Eye,
  UserPlus,
  ArrowUpRight,
} from "lucide-react";

const categoryConfig: Record<string, any> = {
  "machine-failure": {
    icon: Cpu,
    color: "text-danger-500",
    bg: "bg-danger-500/15",
  },
  "quality-issue": {
    icon: ShieldCheck,
    color: "text-warning-500",
    bg: "bg-warning-500/15",
  },
  "low-inventory": {
    icon: Warehouse,
    color: "text-warning-600",
    bg: "bg-warning-600/15",
  },
  "maintenance-due": {
    icon: Wrench,
    color: "text-primary-500",
    bg: "bg-primary-500/15",
  },
  safety: {
    icon: AlertOctagon,
    color: "text-danger-600",
    bg: "bg-danger-600/15",
  },
};

const severityColors: Record<string, string> = {
  critical: "bg-danger-50 text-danger-700",
  warning: "bg-warning-50 text-warning-700",
  info: "bg-primary-50 text-primary-700",
};

export default function RecentAlerts() {
  const [alerts, setAlerts] = useState(
    mockAlerts.map((a) => ({ ...a, status: a.read ? "acknowledged" : "new" })),
  );

  const handleAction = (
    id: string,
    action: "acknowledge" | "resolve" | "escalate",
  ) => {
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id === id) {
          if (action === "acknowledge")
            return { ...alert, status: "acknowledged", read: true };
          if (action === "resolve") return { ...alert, status: "resolved" };
          if (action === "escalate") return { ...alert, severity: "critical" };
        }
        return alert;
      }),
    );
  };

  const activeAlerts = alerts
    .filter((a) => a.status !== "resolved")
    .slice(0, 8);

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-4 overflow-y-auto no-scrollbar">
        {activeAlerts.map((alert) => {
          const config =
            categoryConfig[alert.category] || categoryConfig["machine-failure"];
          const Icon = config.icon;

          return (
            <div
              key={alert.id}
              className={`group flex flex-col p-5 rounded-lg border border-subtle transition-all cursor-pointer ${
                alert.status === "new"
                  ? "bg-surface hover:bg-surface-hover"
                  : "bg-surface-secondary/50 hover:bg-surface-secondary"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${config.bg} ${config.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-[12px] font-bold text-primary truncate">
                      {alert.title}
                    </span>
                    {alert.status === "new" && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary-100 text-primary-700 uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-secondary truncate-2 mb-2.5 leading-snug">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${severityColors[alert.severity]}`}
                    >
                      {alert.severity}
                    </span>
                    <span className="text-[10px] text-tertiary">
                      {formatDistanceToNow(new Date(alert.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Bar (Revealed on hover) */}
              <div className="mt-2 pt-2 border-t border-subtle flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {alert.status === "new" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction(alert.id, "acknowledge");
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" /> Acknowledge
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(alert.id, "escalate");
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold text-warning-600 hover:bg-warning-50 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" /> Escalate
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(alert.id, "resolve");
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold text-success-600 hover:bg-success-50 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" /> Resolve
                </button>
              </div>
            </div>
          );
        })}
        {activeAlerts.length === 0 && (
          <div className="p-6 text-center text-secondary text-[12px] font-medium">
            No active incidents.
          </div>
        )}
      </div>
    </div>
  );
}
