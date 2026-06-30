// ============================================================
// ForgeMES — Machine Monitoring Page
// ============================================================

import { useState } from 'react';
import { machines } from '@/mock/data';
import StatusBadge from '@/components/common/StatusBadge';
import ProgressRing from '@/components/common/ProgressRing';
import type { Machine, MachineStatus } from '@/types';
import {
  LayoutGrid,
  List,
  Search,
  Filter,
  Thermometer,
  Gauge,
  Zap,
  Clock,
  User,
  X,
  Activity,
  ChevronRight,
} from 'lucide-react';

function MachineCard({ machine, onSelect }: { machine: Machine; onSelect: (m: Machine) => void }) {
  const statusColor = {
    running: 'var(--color-success-500)',
    idle: 'var(--color-warning-500)',
    stopped: 'var(--color-danger-500)',
    maintenance: 'var(--color-primary-500)',
  }[machine.status];

  return (
    <div
      className="card-elevated p-4 cursor-pointer group"
      onClick={() => onSelect(machine)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: statusColor }}
          >
            {machine.id.substring(0, 2)}
          </div>
          <div>
            <p className="text-[12px] font-bold" style={{ color: 'var(--text-primary)' }}>
              {machine.id}
            </p>
            <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
              {machine.type}
            </p>
          </div>
        </div>
        <StatusBadge status={machine.status} />
      </div>

      {/* Machine name */}
      <p className="text-[13px] font-semibold mb-3 truncate" style={{ color: 'var(--text-primary)' }}>
        {machine.name}
      </p>

      {/* Metrics grid */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-1.5 rounded-md" style={{ background: 'var(--bg-surface-secondary)' }}>
          <Thermometer className="w-3 h-3 mx-auto mb-0.5" style={{ color: 'var(--text-tertiary)' }} />
          <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Temp</p>
          <p className="text-[12px] font-bold" style={{ color: 'var(--text-primary)' }}>{machine.temperature}°C</p>
        </div>
        <div className="text-center p-1.5 rounded-md" style={{ background: 'var(--bg-surface-secondary)' }}>
          <Gauge className="w-3 h-3 mx-auto mb-0.5" style={{ color: 'var(--text-tertiary)' }} />
          <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Speed</p>
          <p className="text-[12px] font-bold" style={{ color: 'var(--text-primary)' }}>{machine.speed > 0 ? machine.speed.toLocaleString() : '—'}</p>
        </div>
        <div className="text-center p-1.5 rounded-md" style={{ background: 'var(--bg-surface-secondary)' }}>
          <Zap className="w-3 h-3 mx-auto mb-0.5" style={{ color: 'var(--text-tertiary)' }} />
          <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Power</p>
          <p className="text-[12px] font-bold" style={{ color: 'var(--text-primary)' }}>{machine.power} kW</p>
        </div>
      </div>

      {/* Current task & progress */}
      {machine.currentTask && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>Current Task</p>
            <p className="text-[10px] font-mono font-medium" style={{ color: 'var(--color-primary-600)' }}>{machine.currentTask}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-secondary)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${machine.progress}%`,
                  background: machine.progress >= 75 ? 'var(--color-success-500)' : machine.progress >= 40 ? 'var(--color-primary-500)' : 'var(--color-warning-500)',
                }}
              />
            </div>
            <span className="text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>{machine.progress}%</span>
          </div>
        </div>
      )}

      {/* Footer: operator + runtime */}
      <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-1.5">
          <User className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
            {machine.operator || 'Unassigned'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
            {Math.floor(machine.runtime / 60)}h {machine.runtime % 60}m
          </span>
        </div>
      </div>
    </div>
  );
}

function MachineDetailDrawer({ machine, onClose }: { machine: Machine; onClose: () => void }) {
  const statusColor = {
    running: 'var(--color-success-500)',
    idle: 'var(--color-warning-500)',
    stopped: 'var(--color-danger-500)',
    maintenance: 'var(--color-primary-500)',
  }[machine.status];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
      <div
        className="fixed right-0 top-0 h-screen w-[480px] z-50 border-l flex flex-col overflow-y-auto"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
          boxShadow: 'var(--shadow-modal)',
          animation: 'var(--animate-slide-in-right)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b shrink-0" style={{ borderColor: 'var(--border-default)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: statusColor }}
            >
              {machine.id.substring(0, 2)}
            </div>
            <div>
              <h2 className="text-[15px] font-bold" style={{ color: 'var(--text-primary)' }}>{machine.id}</h2>
              <p className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>{machine.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg cursor-pointer" style={{ color: 'var(--text-tertiary)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status + OEE */}
        <div className="p-5 space-y-5">
          <div className="flex items-center gap-4">
            <StatusBadge status={machine.status} size="md" />
            <span className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>Line: {machine.line}</span>
          </div>

          {/* OEE Ring */}
          <div className="flex items-center gap-5 p-4 rounded-lg" style={{ background: 'var(--bg-surface-secondary)' }}>
            <ProgressRing value={machine.oee} size={72} strokeWidth={6} color={statusColor} />
            <div>
              <p className="text-[11px] font-medium" style={{ color: 'var(--text-tertiary)' }}>Overall Equipment Effectiveness</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{machine.oee}%</p>
            </div>
          </div>

          {/* Metrics */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
              Live Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Thermometer, label: 'Temperature', value: `${machine.temperature}°C`, warn: machine.temperature > 80 },
                { icon: Gauge, label: 'Speed', value: machine.speed > 0 ? `${machine.speed.toLocaleString()} RPM` : 'Stopped' },
                { icon: Zap, label: 'Power Draw', value: `${machine.power} kW` },
                { icon: Activity, label: 'OEE', value: `${machine.oee}%` },
                { icon: Clock, label: 'Runtime Today', value: `${Math.floor(machine.runtime / 60)}h ${machine.runtime % 60}m` },
                { icon: Clock, label: 'Downtime Today', value: `${machine.downtime} min`, warn: machine.downtime > 60 },
              ].map((metric, i) => (
                <div key={i} className="p-3 rounded-lg border" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <metric.icon className="w-3 h-3" style={{ color: metric.warn ? 'var(--color-danger-500)' : 'var(--text-tertiary)' }} />
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{metric.label}</span>
                  </div>
                  <p className="text-[14px] font-bold" style={{ color: metric.warn ? 'var(--color-danger-600)' : 'var(--text-primary)' }}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Task */}
          {machine.currentTask && (
            <div>
              <h3 className="text-[12px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                Current Task
              </h3>
              <div className="p-3 rounded-lg border" style={{ borderColor: 'var(--border-default)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-mono font-medium" style={{ color: 'var(--color-primary-600)' }}>{machine.currentTask}</span>
                  <span className="text-[11px] font-bold" style={{ color: 'var(--text-primary)' }}>{machine.progress}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-secondary)' }}>
                  <div className="h-full rounded-full" style={{ width: `${machine.progress}%`, background: statusColor }} />
                </div>
              </div>
            </div>
          )}

          {/* Operator */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
              Assigned Operator
            </h3>
            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-surface-secondary)' }}>
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
                {machine.operator ? machine.operator.split(' ').map(n => n[0]).join('') : '—'}
              </div>
              <div>
                <p className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>
                  {machine.operator || 'No operator assigned'}
                </p>
                <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{machine.line}</p>
              </div>
            </div>
          </div>

          {/* Maintenance */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
              Maintenance
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>Last Maintenance</span>
                <span className="text-[12px] font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{machine.lastMaintenance}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>Next Maintenance</span>
                <span className="text-[12px] font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{machine.nextMaintenance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function MachinesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<MachineStatus | 'all'>('all');
  const [lineFilter, setLineFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  const filtered = machines.filter((m) => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (lineFilter !== 'all' && m.line !== lineFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q) || m.type.toLowerCase().includes(q);
    }
    return true;
  });

  const lines = [...new Set(machines.map((m) => m.line))].sort();
  const statusCounts = {
    all: machines.length,
    running: machines.filter((m) => m.status === 'running').length,
    idle: machines.filter((m) => m.status === 'idle').length,
    stopped: machines.filter((m) => m.status === 'stopped').length,
    maintenance: machines.filter((m) => m.status === 'maintenance').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Machine Monitoring</h1>
          <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            Real-time status of {machines.length} machines across {lines.length} production lines
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-default)' }}>
            <button
              onClick={() => setViewMode('grid')}
              className="p-2 transition-colors cursor-pointer"
              style={{
                background: viewMode === 'grid' ? 'var(--color-primary-600)' : 'var(--bg-surface)',
                color: viewMode === 'grid' ? '#fff' : 'var(--text-tertiary)',
              }}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className="p-2 transition-colors cursor-pointer"
              style={{
                background: viewMode === 'list' ? 'var(--color-primary-600)' : 'var(--bg-surface)',
                color: viewMode === 'list' ? '#fff' : 'var(--text-tertiary)',
              }}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Status Filter Chips */}
      <div className="flex items-center gap-3 flex-wrap">
        {(Object.keys(statusCounts) as (MachineStatus | 'all')[]).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer border"
            style={{
              background: statusFilter === status ? 'var(--color-primary-600)' : 'var(--bg-surface)',
              color: statusFilter === status ? '#fff' : 'var(--text-secondary)',
              borderColor: statusFilter === status ? 'var(--color-primary-600)' : 'var(--border-default)',
            }}
          >
            <span className="capitalize">{status}</span>
            <span
              className="text-[10px] px-1 py-0.5 rounded-full"
              style={{
                background: statusFilter === status ? 'rgba(255,255,255,0.2)' : 'var(--bg-surface-secondary)',
              }}
            >
              {statusCounts[status]}
            </span>
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          {/* Line filter */}
          <div className="relative">
            <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
            <select
              value={lineFilter}
              onChange={(e) => setLineFilter(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border text-[12px] cursor-pointer appearance-none"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="all">All Lines</option>
              {lines.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search machines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border text-[12px] w-48"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Machine Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((machine) => (
            <MachineCard key={machine.id} machine={machine} onSelect={setSelectedMachine} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="card-elevated overflow-hidden">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Machine</th>
                <th>Type</th>
                <th>Line</th>
                <th>Status</th>
                <th>Temp</th>
                <th>Speed</th>
                <th>Power</th>
                <th>OEE</th>
                <th>Task</th>
                <th>Progress</th>
                <th>Operator</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="cursor-pointer" onClick={() => setSelectedMachine(m)}>
                  <td>
                    <div>
                      <span className="font-mono font-bold text-[12px]" style={{ color: 'var(--color-primary-600)' }}>{m.id}</span>
                      <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{m.name}</p>
                    </div>
                  </td>
                  <td className="text-[12px]">{m.type}</td>
                  <td className="text-[12px]">{m.line}</td>
                  <td><StatusBadge status={m.status} /></td>
                  <td className="text-[12px] font-mono">{m.temperature}°C</td>
                  <td className="text-[12px] font-mono">{m.speed > 0 ? m.speed.toLocaleString() : '—'}</td>
                  <td className="text-[12px] font-mono">{m.power} kW</td>
                  <td className="text-[12px] font-bold">{m.oee}%</td>
                  <td className="text-[12px] font-mono" style={{ color: 'var(--color-primary-600)' }}>{m.currentTask || '—'}</td>
                  <td>
                    {m.progress > 0 && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-secondary)' }}>
                          <div className="h-full rounded-full bg-primary-500" style={{ width: `${m.progress}%` }} />
                        </div>
                        <span className="text-[10px]">{m.progress}%</span>
                      </div>
                    )}
                  </td>
                  <td className="text-[12px]">{m.operator || '—'}</td>
                  <td><ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[14px] font-medium" style={{ color: 'var(--text-secondary)' }}>No machines found</p>
          <p className="text-[12px] mt-1" style={{ color: 'var(--text-tertiary)' }}>Try adjusting your filters</p>
        </div>
      )}

      {/* Detail Drawer */}
      {selectedMachine && (
        <MachineDetailDrawer machine={selectedMachine} onClose={() => setSelectedMachine(null)} />
      )}
    </div>
  );
}
