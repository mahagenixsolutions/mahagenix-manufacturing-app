// ============================================================
// ForgeMES — Maintenance Page
// ============================================================

import { useState } from 'react';
import { maintenanceRecords } from '@/mock/data';
import StatusBadge from '@/components/common/StatusBadge';
import {
  Search,
  Filter,
  Plus,
  Wrench,
  CalendarDays,
  CheckCircle,
  AlertOctagon,
  ChevronRight,
} from 'lucide-react';
import type { MaintenanceType, MaintenanceStatus } from '@/types';

export default function MaintenancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<MaintenanceStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<MaintenanceType | 'all'>('all');

  const stats = {
    total: maintenanceRecords.length,
    scheduled: maintenanceRecords.filter(m => m.status === 'scheduled').length,
    inProgress: maintenanceRecords.filter(m => m.status === 'in-progress').length,
    completed: maintenanceRecords.filter(m => m.status === 'completed').length,
  };

  const filtered = maintenanceRecords.filter((record) => {
    if (statusFilter !== 'all' && record.status !== statusFilter) return false;
    if (typeFilter !== 'all' && record.type !== typeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return record.id.toLowerCase().includes(q) || record.machineName.toLowerCase().includes(q) || record.machine.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold transition-all" style={{ color: 'var(--text-primary)' }}>Maintenance</h1>
          <p className="text-[13px] lg:text-[14px] mt-0.5 transition-all" style={{ color: 'var(--text-tertiary)' }}>
            Equipment health, scheduling, and active tickets
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium text-white bg-primary-600 cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> Schedule Maintenance
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: stats.total, icon: Wrench, color: 'var(--color-primary-500)' },
          { label: 'Scheduled', value: stats.scheduled, icon: CalendarDays, color: 'var(--color-warning-500)' },
          { label: 'In Progress', value: stats.inProgress, icon: AlertOctagon, color: 'var(--color-danger-500)' },
          { label: 'Completed (Last 30 Days)', value: stats.completed, icon: CheckCircle, color: 'var(--color-success-500)' },
        ].map((kpi) => (
          <div key={kpi.label} className="card-elevated p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center transition-all" style={{ background: `${kpi.color}15` }}>
                <kpi.icon className="w-5 h-5 lg:w-5 lg:h-5 transition-all" style={{ color: kpi.color }} />
              </div>
            </div>
            <p className="text-[10px] lg:text-[12px] font-medium transition-all" style={{ color: 'var(--text-tertiary)' }}>{kpi.label}</p>
            <p className="text-xl lg:text-2xl font-bold transition-all" style={{ color: 'var(--text-primary)' }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Search machine or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-3 py-1.5 rounded-lg border text-[12px] w-56 shrink-0 min-w-[160px]"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as MaintenanceStatus | 'all')}
            className="pl-10 pr-3 py-1.5 rounded-lg border text-[12px] cursor-pointer appearance-none shrink-0 min-w-[130px]"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as MaintenanceType | 'all')}
          className="px-3 py-1.5 rounded-lg border text-[12px] cursor-pointer appearance-none shrink-0 min-w-[130px]"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
        >
          <option value="all">All Types</option>
          <option value="preventive">Preventive</option>
          <option value="corrective">Corrective</option>
          <option value="predictive">Predictive</option>
          <option value="emergency">Emergency</option>
        </select>
      </div>

      {/* Table */}
      <div className="card-elevated overflow-hidden">
        <div className="table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Machine</th>
                <th>Type</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Description</th>
                <th>Assigned To</th>
                <th>Scheduled Date</th>
                <th>Duration (mins)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr key={record.id} className="cursor-pointer">
                  <td data-label="ID"><span className="font-mono font-bold text-[12px]" style={{ color: 'var(--color-primary-600)' }}>{record.id}</span></td>
                  <td data-label="Machine">
                    <div>
                      <span className="font-medium text-[12px]">{record.machineName}</span>
                      <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{record.machine}</p>
                    </div>
                  </td>
                  <td data-label="Type"><span className="capitalize text-[12px]">{record.type}</span></td>
                  <td data-label="Status"><StatusBadge status={record.status} /></td>
                  <td data-label="Priority"><StatusBadge status={record.priority} /></td>
                  <td data-label="Description"><span className="text-[12px] truncate max-w-[200px] inline-block">{record.description}</span></td>
                  <td data-label="Assigned To" className="text-[12px]">{record.assignedTo}</td>
                  <td data-label="Scheduled Date" className="text-[12px] font-mono">{record.scheduledDate}</td>
                  <td data-label="Duration (mins)" className="text-[12px] font-mono">{record.estimatedDuration}</td>
                  <td data-label="Action"><ChevronRight className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
                    No maintenance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
