// ============================================================
// ForgeMES — Production Page
// ============================================================

import { useState } from 'react';
import { workOrders } from '@/mock/data';
import StatusBadge from '@/components/common/StatusBadge';
import type { WorkOrder, WorkOrderStatus } from '@/types';
import {
  LayoutGrid,
  GanttChart,
  Calendar,
  List,
  Clock,
  User,
  ChevronRight,
} from 'lucide-react';

type ViewMode = 'kanban' | 'gantt' | 'calendar' | 'list';

const kanbanColumns: { key: WorkOrderStatus; label: string; color: string }[] = [
  { key: 'queued', label: 'Queued', color: 'var(--color-surface-400)' },
  { key: 'in-progress', label: 'In Progress', color: 'var(--color-primary-500)' },
  { key: 'quality-check', label: 'Quality Check', color: 'var(--color-warning-500)' },
  { key: 'completed', label: 'Completed', color: 'var(--color-success-500)' },
];

function KanbanCard({ wo }: { wo: WorkOrder }) {
  const priorityColor = {
    critical: 'var(--color-danger-500)',
    high: 'var(--color-warning-500)',
    medium: 'var(--color-primary-500)',
    low: 'var(--color-surface-400)',
  }[wo.priority];

  return (
    <div className="card-elevated p-3 cursor-pointer group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-mono font-bold" style={{ color: 'var(--color-primary-600)' }}>{wo.id}</span>
        <StatusBadge status={wo.priority} />
      </div>
      <p className="text-[12px] font-semibold mb-2 truncate" style={{ color: 'var(--text-primary)' }}>{wo.product}</p>

      {/* Progress */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Progress</span>
          <span className="text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>{wo.progress}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-secondary)' }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${wo.progress}%`, background: priorityColor }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{wo.operator}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{wo.deadline}</span>
        </div>
      </div>
    </div>
  );
}

function GanttView() {
  const activeOrders = workOrders.filter((wo) => wo.status !== 'cancelled');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="card-elevated overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="flex border-b" style={{ borderColor: 'var(--border-default)' }}>
            <div className="w-56 shrink-0 p-3 text-[11px] font-semibold uppercase" style={{ color: 'var(--text-tertiary)' }}>Work Order</div>
            <div className="flex-1 flex">
              {days.map((day) => (
                <div key={day} className="flex-1 p-3 text-center text-[11px] font-semibold uppercase border-l" style={{ color: 'var(--text-tertiary)', borderColor: 'var(--border-subtle)' }}>
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          {activeOrders.slice(0, 10).map((wo, index) => {
            const startDay = index % 5;
            const duration = Math.min(3 + (index % 4), 7 - startDay);
            const barColor = {
              critical: '#ef4444',
              high: '#f59e0b',
              medium: '#2563eb',
              low: '#94a3b8',
            }[wo.priority];

            return (
              <div key={wo.id} className="flex border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="w-56 shrink-0 p-3 flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold" style={{ color: 'var(--color-primary-600)' }}>{wo.id}</span>
                  <span className="text-[10px] truncate" style={{ color: 'var(--text-secondary)' }}>{wo.product}</span>
                </div>
                <div className="flex-1 flex relative">
                  {days.map((day) => (
                    <div key={day} className="flex-1 h-12 border-l" style={{ borderColor: 'var(--border-subtle)' }} />
                  ))}
                  {/* Gantt bar */}
                  <div
                    className="absolute top-2 h-8 rounded-md flex items-center px-2"
                    style={{
                      left: `${(startDay / 7) * 100}%`,
                      width: `${(duration / 7) * 100}%`,
                      background: `${barColor}20`,
                      border: `1px solid ${barColor}`,
                    }}
                  >
                    <span className="text-[9px] font-bold truncate" style={{ color: barColor }}>{wo.progress}%</span>
                    {/* Progress fill */}
                    <div
                      className="absolute left-0 top-0 h-full rounded-md opacity-20"
                      style={{ width: `${wo.progress}%`, background: barColor }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CalendarView() {
  const daysInMonth = 30;
  const firstDayOffset = 0; // Monday
  const woByDay: Record<number, WorkOrder[]> = {};

  workOrders.forEach((wo) => {
    const deadlineDay = parseInt(wo.deadline.split('-')[2]);
    if (!woByDay[deadlineDay]) woByDay[deadlineDay] = [];
    woByDay[deadlineDay].push(wo);
  });

  return (
    <div className="card-elevated p-4">
      <div className="grid grid-cols-7 gap-px" style={{ background: 'var(--border-subtle)' }}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="p-2 text-center text-[10px] font-semibold uppercase" style={{ background: 'var(--bg-surface-secondary)', color: 'var(--text-tertiary)' }}>
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2 min-h-[80px]" style={{ background: 'var(--bg-surface)' }} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const orders = woByDay[day] || [];
          return (
            <div key={day} className="p-2 min-h-[80px] border-r border-b" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
              <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>{day}</span>
              <div className="mt-1 space-y-0.5">
                {orders.slice(0, 2).map((wo) => (
                  <div
                    key={wo.id}
                    className="text-[8px] font-medium px-1 py-0.5 rounded truncate"
                    style={{
                      background: wo.priority === 'critical' ? 'var(--color-danger-50)' : wo.priority === 'high' ? 'var(--color-warning-50)' : 'var(--color-primary-50)',
                      color: wo.priority === 'critical' ? 'var(--color-danger-700)' : wo.priority === 'high' ? 'var(--color-warning-700)' : 'var(--color-primary-700)',
                    }}
                  >
                    {wo.id}
                  </div>
                ))}
                {orders.length > 2 && (
                  <span className="text-[8px]" style={{ color: 'var(--text-tertiary)' }}>+{orders.length - 2} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProductionPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');

  const views = [
    { key: 'kanban' as const, label: 'Kanban', icon: LayoutGrid },
    { key: 'gantt' as const, label: 'Gantt', icon: GanttChart },
    { key: 'calendar' as const, label: 'Calendar', icon: Calendar },
    { key: 'list' as const, label: 'List', icon: List },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold transition-all" style={{ color: 'var(--text-primary)' }}>Production</h1>
          <p className="text-[13px] lg:text-[14px] mt-0.5 transition-all" style={{ color: 'var(--text-tertiary)' }}>
            Production schedule, queue & job tracking
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border p-1" style={{ borderColor: 'var(--border-default)' }}>
          {views.map((v) => (
            <button
              key={v.key}
              onClick={() => setViewMode(v.key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors cursor-pointer"
              style={{
                background: viewMode === v.key ? 'var(--color-primary-600)' : 'transparent',
                color: viewMode === v.key ? '#fff' : 'var(--text-tertiary)',
              }}
            >
              <v.icon className="w-3.5 h-3.5" />
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory gap-4 -mx-5 px-5 sm:mx-0 sm:px-0 sm:overflow-visible sm:grid sm:grid-cols-4">
          {kanbanColumns.map((col) => {
            const colOrders = workOrders.filter((wo) => wo.status === col.key);
            return (
              <div key={col.key} className="min-w-[280px] sm:min-w-0 flex-1 snap-start">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                    <span className="text-[12px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {col.label}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: 'var(--bg-surface-secondary)', color: 'var(--text-tertiary)' }}
                  >
                    {colOrders.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {colOrders.map((wo) => (
                    <KanbanCard key={wo.id} wo={wo} />
                  ))}
                  {colOrders.length === 0 && (
                    <div className="p-4 rounded-lg border-2 border-dashed text-center" style={{ borderColor: 'var(--border-default)' }}>
                      <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>No orders</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Gantt View */}
      {viewMode === 'gantt' && <GanttView />}

      {/* Calendar View */}
      {viewMode === 'calendar' && <CalendarView />}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="card-elevated overflow-hidden table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>WO #</th>
                <th>Product</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Progress</th>
                <th>Line</th>
                <th>Operator</th>
                <th>Deadline</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((wo) => (
                <tr key={wo.id} className="cursor-pointer">
                  <td data-label="WO #"><span className="font-mono font-bold text-[12px]" style={{ color: 'var(--color-primary-600)' }}>{wo.id}</span></td>
                  <td data-label="Product" className="text-[12px] font-medium">{wo.product}</td>
                  <td data-label="Status"><StatusBadge status={wo.status} /></td>
                  <td data-label="Priority"><StatusBadge status={wo.priority} /></td>
                  <td data-label="Progress">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-secondary)' }}>
                        <div className="h-full rounded-full bg-primary-500" style={{ width: `${wo.progress}%` }} />
                      </div>
                      <span className="text-[10px]">{wo.progress}%</span>
                    </div>
                  </td>
                  <td data-label="Line" className="text-[12px]">{wo.line}</td>
                  <td data-label="Operator" className="text-[12px]">{wo.operator}</td>
                  <td data-label="Deadline" className="text-[12px] font-mono">{wo.deadline}</td>
                  <td data-label="Action"><ChevronRight className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
