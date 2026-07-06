import React from "react";
import { Users, Award, TrendingUp, ShieldCheck } from "lucide-react";

interface OperatorStat {
  name: string;
  productivity: number; // percentage
  status: "excellent" | "nominal" | "warning";
  rank: number;
}

const performers: OperatorStat[] = [
  { name: "Priya Sharma", productivity: 98.4, status: "excellent", rank: 1 },
  { name: "Rajesh Kumar", productivity: 95.8, status: "excellent", rank: 2 },
  { name: "Sunita Reddy", productivity: 94.2, status: "nominal", rank: 3 },
];

export default function EmployeePerformance() {
  return (
    <div className="flex flex-col md:flex-row gap-6 h-full justify-between">
      {/* Attendance & Shift Summary */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div className="space-y-4">
          <h4 className="text-[12px] font-bold text-tertiary uppercase tracking-wider mb-2">Shift Attendance Index</h4>
          
          <div className="flex items-center justify-between p-3.5 bg-surface-secondary/20 rounded-xl border border-subtle">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400">
                <Users className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-primary">Shift Attendance</p>
                <p className="text-[10px] text-tertiary mt-0.5">24 operators checked in</p>
              </div>
            </div>
            <span className="text-[16px] font-extrabold text-success-600">96.2%</span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-surface-secondary/20 rounded-xl border border-subtle">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success-500/10 text-success-600 dark:text-success-400">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-primary">Safety Compliance Ratio</p>
                <p className="text-[10px] text-tertiary mt-0.5">Zero gear violations today</p>
              </div>
            </div>
            <span className="text-[16px] font-extrabold text-success-600">100%</span>
          </div>
        </div>
      </div>

      {/* Top Performers list */}
      <div className="w-full md:w-1/2 flex flex-col justify-between self-stretch">
        <div>
          <h4 className="text-[12px] font-bold text-tertiary uppercase tracking-wider mb-3">Top Operators (Productivity)</h4>
          <div className="space-y-3">
            {performers.map((op, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-subtle bg-surface-secondary/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-extrabold text-[11px]">
                    #{op.rank}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-primary leading-none">{op.name}</p>
                    <p className="text-[10px] text-tertiary mt-1">Shift A Operator</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="text-[12px] font-extrabold text-primary">{op.productivity}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
