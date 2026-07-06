import React from "react";
import { CloudSun, ShieldCheck, Zap, Activity, Users } from "lucide-react";

export default function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-primary-950 via-slate-900 to-primary-900 text-white p-6 md:p-8 shadow-lg border border-primary-800/30">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-primary-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-50px] left-[10%] w-64 h-64 bg-success-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6 z-10">
        <div>
          <span className="text-[11px] font-bold tracking-wider text-primary-400 uppercase bg-primary-950/60 px-3 py-1 rounded-full border border-primary-800/40">
            Smart Factory Control Center
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3 text-white leading-tight">
            Good Morning, Arvind 👋
          </h1>
          <p className="text-[14px] md:text-[15px] mt-2 text-slate-300 font-medium max-w-2xl leading-relaxed">
            Plant A — Mumbai is operating at <span className="text-success-400 font-bold">94.2% OEE</span> today. Production is running 7% ahead of schedule with 0 active quality stops.
          </p>
        </div>

        {/* Action / Context Stats */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Weather Widget */}
          <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
            <CloudSun className="w-5 h-5 text-amber-400" />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-slate-400">Weather</p>
              <p className="text-[12px] font-bold text-slate-200">28°C · Sunny</p>
            </div>
          </div>

          {/* Plant Status */}
          <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500" />
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-slate-400">Status</p>
              <p className="text-[12px] font-bold text-slate-200">Optimal Mode</p>
            </div>
          </div>

          {/* Current Shift */}
          <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
            <Users className="w-5 h-5 text-primary-400" />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-slate-400">Shift</p>
              <p className="text-[12px] font-bold text-slate-200">A (06:00 - 14:00)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
