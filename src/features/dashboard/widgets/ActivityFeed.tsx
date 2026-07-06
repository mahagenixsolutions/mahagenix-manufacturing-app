import React from "react";
import { PlayCircle, StopCircle, Wrench, AlertTriangle, Users, ArrowDownToLine, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "start" | "stop" | "maintenance" | "quality" | "inventory" | "auth";
  title: string;
  description: string;
  time: string;
}

const activities: ActivityItem[] = [
  { id: "act-1", type: "quality", title: "Defect Threshold Crossed", description: "Inspection Line A1 logged 3 scrap events", time: "2 min ago" },
  { id: "act-2", type: "maintenance", title: "Emergency Repair Finished", description: "CNC Lathe Unit 4 recalibrated successfully", time: "15 min ago" },
  { id: "act-3", type: "inventory", title: "Material Dispatch Received", description: "45.0 tons of aluminum ingots unloaded in warehouse B", time: "45 min ago" },
  { id: "act-4", type: "stop", title: "Line A3 Bottleneck Stoppage", description: "Robot assembly tool arm calibration triggered stop", time: "1 hour ago" },
  { id: "act-5", type: "auth", title: "Shift A Supervisor Login", description: "Vikram Singh checked in on Line A2 console", time: "2 hours ago" },
];

const typeConfigs = {
  start: { icon: PlayCircle, color: "text-success-600 dark:text-success-500", bg: "bg-success-50 dark:bg-success-900/30" },
  stop: { icon: StopCircle, color: "text-danger-600 dark:text-danger-500", bg: "bg-danger-50 dark:bg-danger-900/30" },
  maintenance: { icon: Wrench, color: "text-primary-600 dark:text-primary-500", bg: "bg-primary-50 dark:bg-primary-900/30" },
  quality: { icon: AlertTriangle, color: "text-warning-600 dark:text-warning-500", bg: "bg-warning-50 dark:bg-warning-900/30" },
  inventory: { icon: ArrowDownToLine, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/30" },
  auth: { icon: Users, color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-100 dark:bg-slate-800" },
};

export default function ActivityFeed() {
  return (
    <div className="flex flex-col gap-4 max-h-[380px] overflow-y-auto pr-2 no-scrollbar">
      <div className="space-y-4">
        {activities.map((act) => {
          const cfg = typeConfigs[act.type] || typeConfigs.auth;
          const Icon = cfg.icon;

          return (
            <div key={act.id} className="flex gap-3.5 items-start">
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.color} ${cfg.bg}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="w-[1.5px] h-10 bg-subtle mt-1.5" style={{ backgroundColor: "var(--border-default)" }} />
              </div>

              {/* Event details text */}
              <div className="flex-1 min-w-0 bg-surface-secondary/20 p-3 rounded-xl border border-subtle">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[12px] font-bold text-primary truncate">{act.title}</h4>
                  <span className="text-[10px] text-tertiary flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {act.time}
                  </span>
                </div>
                <p className="text-[11px] text-secondary leading-snug">
                  {act.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
