// ============================================================
// ForgeMES — Shift Summary
// ============================================================

import { shifts } from '@/mock/data';
import { Sun, Sunset, Moon, Users, CheckCircle2, Play, AlertTriangle } from 'lucide-react';

const shiftIcons = {
  morning: Sun,
  evening: Sunset,
  night: Moon,
};

const shiftColors = {
  morning: { bg: 'bg-warning-50 dark:bg-warning-500/10', accent: 'var(--color-warning-500)', border: 'border-warning-200 dark:border-warning-500/20' },
  evening: { bg: 'bg-primary-50 dark:bg-primary-500/10', accent: 'var(--color-primary-500)', border: 'border-primary-200 dark:border-primary-500/20' },
  night: { bg: 'bg-surface-100 dark:bg-surface-800', accent: 'var(--color-surface-500)', border: 'border-surface-200 dark:border-surface-700' },
};

export default function ShiftSummary() {
  return (
    <div className="flex flex-col gap-3 h-full">
      {shifts.map((shift) => {
        const Icon = shiftIcons[shift.type];
        const colors = shiftColors[shift.type];

        return (
          <div
            key={shift.type}
            className={`rounded-lg border p-3 flex-1 flex flex-col justify-center relative overflow-hidden transition-colors ${colors.border} ${
              shift.isActive ? 'ring-1 ring-primary-500/30' : ''
            }`}
            style={{ background: shift.isActive ? 'var(--color-primary-50)' : 'var(--bg-surface)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colors.bg}`}
                >
                  <Icon className="w-5 h-5" style={{ color: colors.accent }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {shift.label}
                    </p>
                    {shift.isActive && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary-600 text-white text-[9px] font-bold tracking-wider">
                        <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] mt-0.5 font-medium" style={{ color: 'var(--text-tertiary)' }}>
                    {shift.startTime} — {shift.endTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-auto">
              <div className="flex flex-col gap-1 p-1.5 rounded-md bg-surface-secondary/50 border border-subtle">
                <span className="flex items-center justify-center text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                  <CheckCircle2 className="w-4 h-4 text-success-500 mr-1" /> Done
                </span>
                <span className="text-[13px] font-bold text-center" style={{ color: 'var(--text-primary)' }}>{shift.completed}</span>
              </div>
              <div className="flex flex-col gap-1 p-1.5 rounded-md bg-surface-secondary/50 border border-subtle">
                <span className="flex items-center justify-center text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                  <Play className="w-4 h-4 text-primary-500 mr-1" /> Run
                </span>
                <span className="text-[13px] font-bold text-center" style={{ color: 'var(--text-primary)' }}>{shift.running}</span>
              </div>
              <div className="flex flex-col gap-1 p-1.5 rounded-md bg-surface-secondary/50 border border-subtle">
                <span className="flex items-center justify-center text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                  <AlertTriangle className="w-4 h-4 text-danger-500 mr-1" /> Delay
                </span>
                <span className="text-[13px] font-bold text-center" style={{ color: 'var(--text-primary)' }}>{shift.delayed}</span>
              </div>
              <div className="flex flex-col gap-1 p-1.5 rounded-md bg-surface-secondary/50 border border-subtle">
                <span className="flex items-center justify-center text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                  <Users className="w-4 h-4 text-tertiary mr-1" /> Crew
                </span>
                <span className="text-[13px] font-bold text-center" style={{ color: 'var(--text-primary)' }}>{shift.operators}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
