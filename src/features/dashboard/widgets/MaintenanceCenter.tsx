import React from "react";
import { Wrench, AlertOctagon, UserCheck, Calendar } from "lucide-react";

interface MaintenanceRoster {
  technician: string;
  role: string;
  status: "active" | "standby" | "off";
}

interface MaintenanceTask {
  id: string;
  machineId: string;
  type: "routine" | "calib" | "breakdown";
  scheduleTime: string;
  priority: "high" | "medium" | "low";
}

const technicians: MaintenanceRoster[] = [
  { technician: "Rohan Das", role: "Mechanical Lead", status: "active" },
  { technician: "Karan Johar", role: "Robotics Tech", status: "standby" },
  { technician: "Meera Sen", role: "Electrical Spec", status: "active" },
];

const activeTasks: MaintenanceTask[] = [
  { id: "MT-4821", machineId: "PRS-603", type: "breakdown", scheduleTime: "Immediate", priority: "high" },
  { id: "MT-4825", machineId: "CNC-204", type: "routine", scheduleTime: "14:00 (handover)", priority: "medium" },
  { id: "MT-4830", machineId: "ASM-118", type: "calib", scheduleTime: "Tomorrow 09:00", priority: "low" },
];

export default function MaintenanceCenter() {
  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      {/* Active Schedules */}
      <div className="w-full md:w-3/5 flex flex-col justify-between">
        <div>
          <h4 className="text-[12px] font-bold text-tertiary uppercase tracking-wider mb-3">Service & Calibration Queue</h4>
          <div className="space-y-3">
            {activeTasks.map((t) => {
              const borderStyle = t.priority === "high" ? "border-danger-200/50 bg-danger-50/10" : "border-subtle bg-surface-secondary/15";
              const tagStyle = t.priority === "high" ? "text-danger-600 bg-danger-500/10 border-danger-200" : t.priority === "medium" ? "text-warning-600 bg-warning-500/10 border-warning-200" : "text-primary-600 bg-primary-500/10 border-primary-200";

              return (
                <div key={t.id} className={`p-3 rounded-xl border flex items-center justify-between gap-4 ${borderStyle}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center border border-subtle">
                      <Wrench className="w-4.5 h-4.5 text-secondary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold text-primary">{t.machineId}</span>
                        <span className="text-[10px] text-tertiary font-medium">#{t.id}</span>
                      </div>
                      <p className="text-[11px] text-secondary mt-0.5">Sched: {t.scheduleTime}</p>
                    </div>
                  </div>

                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${tagStyle}`}>
                    {t.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech Roster status */}
      <div className="w-full md:w-2/5 flex flex-col justify-between self-stretch">
        <div>
          <h4 className="text-[12px] font-bold text-tertiary uppercase tracking-wider mb-3">On-Duty Technicians</h4>
          <div className="space-y-3">
            {technicians.map((tech, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-subtle bg-surface-secondary/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 text-[11px] font-extrabold">
                    {tech.technician.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-primary leading-none">{tech.technician}</p>
                    <p className="text-[10px] text-tertiary mt-1">{tech.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${tech.status === "active" ? "bg-success-500 animate-pulse" : tech.status === "standby" ? "bg-warning-500" : "bg-slate-400"}`} />
                  <span className="text-[10px] font-bold text-secondary capitalize">{tech.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
