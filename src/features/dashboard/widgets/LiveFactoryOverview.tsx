import React, { useState } from "react";
import { Cpu, Users, Eye, X, CheckCircle, AlertTriangle, AlertCircle, Wrench } from "lucide-react";
import { productionLines } from "@/mock/data";
import type { ProductionLine } from "@/types";

const statusConfig = {
  running: { fill: "#22c55e", bg: "rgba(34, 197, 94, 0.1)", color: "text-success-600", label: "Running", icon: CheckCircle },
  idle: { fill: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)", color: "text-warning-600", label: "Idle", icon: AlertTriangle },
  stopped: { fill: "#ef4444", bg: "rgba(239, 68, 68, 0.1)", color: "text-danger-600", label: "Stopped", icon: AlertCircle },
  maintenance: { fill: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)", color: "text-primary-600", label: "Maintenance", icon: Wrench },
};

export default function LiveFactoryOverview() {
  const [selectedLine, setSelectedLine] = useState<ProductionLine | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {/* Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-[12px] font-bold text-tertiary uppercase tracking-wider">Active Shop Floor Digital Twin</h3>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-surface-secondary/40 px-3 py-1 rounded-full border border-subtle self-start sm:self-auto">
          {Object.entries(statusConfig).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: val.fill }} />
              <span className="text-[10px] font-semibold text-secondary">{val.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Production line grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productionLines.map((line) => {
          const cfg = statusConfig[line.status] || statusConfig.running;
          const StatusIcon = cfg.icon;

          return (
            <div
              key={line.id}
              onClick={() => setSelectedLine(line)}
              className="card-elevated p-5 flex flex-col justify-between hover:border-primary-400 transition-all hover:scale-[1.01] cursor-pointer relative group"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-2.5 w-2.5">
                    {line.status === "running" && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: cfg.fill }} />
                    )}
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: cfg.fill }} />
                  </div>
                  <span className="font-extrabold text-[14px] text-primary">{line.name}</span>
                </div>

                <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${cfg.color}`} style={{ backgroundColor: cfg.bg, borderColor: cfg.fill + "20" }}>
                  <StatusIcon className="w-4 h-4" />
                  {cfg.label}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 my-2">
                <div>
                  <p className="text-[10px] uppercase font-bold text-tertiary">Efficiency</p>
                  <p className="text-[16px] font-extrabold text-primary mt-0.5">{line.efficiency}%</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-tertiary">Output Tracker</p>
                  <p className="text-[16px] font-extrabold text-primary mt-0.5">
                    {line.currentOutput} <span className="text-[11px] font-semibold text-tertiary">/ {line.targetOutput}</span>
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-surface-secondary rounded-full overflow-hidden mb-4">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${line.efficiency}%`, background: cfg.fill }}
                />
              </div>

              {/* Footer details */}
              <div className="flex items-center justify-between text-[11px] text-tertiary pt-3 border-t border-subtle">
                <div className="flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-tertiary" />
                  <span>{line.machines?.length || 4} Machines</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-tertiary" />
                  <span>{line.activeOperators || 2} Operators</span>
                </div>
                <span className="text-[9px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  View Twin <Eye className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal Overlay */}
      {selectedLine && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedLine(null)}>
          <div 
            className="card-elevated w-full max-w-lg bg-surface p-6 overflow-hidden relative shadow-2xl flex flex-col gap-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedLine(null)} 
              className="absolute top-4 right-4 p-1 rounded-lg text-tertiary hover:bg-surface-secondary transition-colors cursor-pointer border border-subtle"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 rounded-full" style={{ background: statusConfig[selectedLine.status]?.fill }} />
              <div>
                <h3 className="text-[18px] font-bold text-primary">{selectedLine.name} Detail Twin</h3>
                <p className="text-[12px] text-tertiary mt-0.5">Live shop floor telemetry log · ID: {selectedLine.id}</p>
              </div>
            </div>

            <hr className="border-subtle" />

            {/* Performance breakdown grid */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="p-3 bg-surface-secondary/20 rounded-xl border border-subtle">
                <p className="text-[10px] uppercase font-bold text-tertiary">Efficiency (OEE)</p>
                <p className="text-[20px] font-extrabold text-primary mt-1">{selectedLine.efficiency}%</p>
              </div>
              <div className="p-3 bg-surface-secondary/20 rounded-xl border border-subtle">
                <p className="text-[10px] uppercase font-bold text-tertiary">Real-Time Performance</p>
                <p className="text-[20px] font-extrabold text-primary mt-1">98.4% nominal</p>
              </div>
              <div className="p-3 bg-surface-secondary/20 rounded-xl border border-subtle">
                <p className="text-[10px] uppercase font-bold text-tertiary">Current Shift Output</p>
                <p className="text-[20px] font-extrabold text-primary mt-1">{selectedLine.currentOutput} units</p>
              </div>
              <div className="p-3 bg-surface-secondary/20 rounded-xl border border-subtle">
                <p className="text-[10px] uppercase font-bold text-tertiary">Target Shift Output</p>
                <p className="text-[20px] font-extrabold text-primary mt-1">{selectedLine.targetOutput} units</p>
              </div>
            </div>

            {/* Machines Checklist */}
            <div>
              <p className="text-[11px] font-bold text-tertiary uppercase tracking-wider mb-2">Assigned Line Units</p>
              <div className="space-y-2">
                {selectedLine.machines?.map((m: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-subtle bg-surface-secondary/10">
                    <span className="text-[12px] font-semibold text-primary">{m.name || `Machine Unit ${idx+1}`}</span>
                    <span className="text-[10px] font-mono text-tertiary">{m.status || "online"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-subtle">
              <button 
                onClick={() => setSelectedLine(null)} 
                className="px-4 py-2 rounded-lg text-[12px] font-semibold text-secondary hover:bg-surface-secondary border border-subtle transition-colors cursor-pointer"
              >
                Close
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-[12px] font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-sm transition-colors cursor-pointer"
                onClick={() => {
                  alert(`Requesting operator dispatch to ${selectedLine.name}...`);
                  setSelectedLine(null);
                }}
              >
                Dispatch Operator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
