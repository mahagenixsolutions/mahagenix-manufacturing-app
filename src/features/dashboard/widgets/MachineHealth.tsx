import React, { useState } from "react";
import { Cpu, AlertTriangle, Gauge, Thermometer, Zap, ShieldAlert, Sparkles, X } from "lucide-react";
import { machines } from "@/mock/data";
import type { Machine } from "@/types";

export default function MachineHealth() {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  // We take first 4 machines for space constraints and premium layout density
  const machineList = machines.slice(0, 4);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {machineList.map((m) => {
          const isCritical = m.status === "stopped" || m.temperature > 80;
          const statusText = m.status === "running" ? "Nominal" : m.status === "stopped" ? "Stoppage" : "Idle";
          const statusColor = m.status === "running" ? "text-success-600 bg-success-500/10 border-success-200" : m.status === "stopped" ? "text-danger-600 bg-danger-500/10 border-danger-200" : "text-warning-600 bg-warning-500/10 border-warning-200";

          return (
            <div
              key={m.id}
              onClick={() => setSelectedMachine(m)}
              className="card-elevated p-4 flex flex-col justify-between hover:border-primary-400 cursor-pointer transition-all duration-300 relative group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-surface-secondary flex items-center justify-center border border-subtle shrink-0">
                    <Cpu className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-primary">{m.name}</h4>
                    <p className="text-[10px] text-tertiary font-mono">{m.id} · {m.type}</p>
                  </div>
                </div>
                
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${statusColor}`}>
                  {statusText}
                </span>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 my-2.5">
                <div className="p-2 rounded-lg bg-surface-secondary/30 border border-subtle/40">
                  <div className="flex items-center gap-1 text-tertiary">
                    <Thermometer className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-bold uppercase">Temp</span>
                  </div>
                  <p className="text-[14px] font-extrabold text-primary mt-0.5">{m.temperature}°C</p>
                </div>

                <div className="p-2 rounded-lg bg-surface-secondary/30 border border-subtle/40">
                  <div className="flex items-center gap-1 text-tertiary">
                    <Gauge className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-bold uppercase">Vibe</span>
                  </div>
                  <p className="text-[14px] font-extrabold text-primary mt-0.5">2.4 mm/s</p>
                </div>

                <div className="p-2 rounded-lg bg-surface-secondary/30 border border-subtle/40">
                  <div className="flex items-center gap-1 text-tertiary">
                    <Zap className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-bold uppercase">Power</span>
                  </div>
                  <p className="text-[14px] font-extrabold text-primary mt-0.5">{m.power} kW</p>
                </div>
              </div>

              {/* Status details footer */}
              <div className="flex items-center justify-between text-[11px] text-tertiary pt-2 border-t border-subtle">
                <span className="font-semibold text-secondary">OEE: {m.oee}%</span>
                <span>Next Service: 14d</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Popup Drawer */}
      {selectedMachine && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedMachine(null)}>
          <div 
            className="card-elevated w-full max-w-md bg-surface p-6 overflow-hidden relative shadow-2xl flex flex-col gap-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMachine(null)} 
              className="absolute top-4 right-4 p-1 rounded-lg text-tertiary hover:bg-surface-secondary transition-colors cursor-pointer border border-subtle"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-primary-500" />
              <div>
                <h3 className="text-[16px] font-bold text-primary">{selectedMachine.name} Telemetry Panel</h3>
                <p className="text-[12px] text-tertiary mt-0.5">Live sensor logs for unit {selectedMachine.id}</p>
              </div>
            </div>

            <hr className="border-subtle" />

            <div className="space-y-3">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-secondary font-medium">Temperature Index</span>
                <span className="font-mono text-primary font-bold">{selectedMachine.temperature}°C (nominal max 85°C)</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-secondary font-medium">Power consumption</span>
                <span className="font-mono text-primary font-bold">{selectedMachine.power} kW/h</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-secondary font-medium">Total Shift Runtime</span>
                <span className="font-mono text-primary font-bold">{selectedMachine.runtime} min</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-secondary font-medium">Estimated Spindle Health</span>
                <span className="font-mono text-primary font-bold text-success-600">96.8% - Excellent</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-secondary font-medium">Vibration Anomaly Ratio</span>
                <span className="font-mono text-danger-600 font-bold">1.04x (near threshold)</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-subtle">
              <button 
                onClick={() => setSelectedMachine(null)}
                className="px-4 py-2 rounded-lg text-[12px] font-semibold text-secondary hover:bg-surface-secondary border border-subtle transition-colors cursor-pointer"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  alert(`Maintenance checklist generated for ${selectedMachine.name}.`);
                  setSelectedMachine(null);
                }}
                className="px-4 py-2 rounded-lg text-[12px] font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm cursor-pointer"
              >
                Schedule Calibration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
