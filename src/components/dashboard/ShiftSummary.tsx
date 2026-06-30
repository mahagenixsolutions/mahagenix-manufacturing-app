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
    <div className="grid grid-cols-3 gap-4 h-full">
      {shifts.map((shift) => {
        const Icon = shiftIcons[shift.type];
        const colors = shiftColors[shift.type];

        return (
          <div
            key={shift.type}
            className={`rounded-lg border p-4 relative overflow-hidden ${colors.border} ${
              shift.isActive ? 'ring-2 ring-primary-500/30' : ''
            }`}
            style={{ background: shift.isActive ? 'var(--color-primary-50)' : 'var(--bg-surface)' }}
          >
            {/* Active badge */}
            {shift.isActive && (
              <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary-600 text-white text-[9px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                ACTIVE
              </div>
            )}

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center ${colors.bg}`}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: colors.accent }} />
              </div>
              <div>
                <p className="text-[12px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {shift.label}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                  {shift.startTime} — {shift.endTime}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <CheckCircle2 className="w-3 h-3 text-success-500" /> Completed
                </span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{shift.completed}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <Play className="w-3 h-3 text-primary-500" /> Running
                </span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{shift.running}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <AlertTriangle className="w-3 h-3 text-danger-500" /> Delayed
                </span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{shift.delayed}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <Users className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} /> Operators
                </span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{shift.operators}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
