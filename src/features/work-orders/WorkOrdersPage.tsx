// ============================================================
// ForgeMES — Work Orders Page
// ============================================================

import { useState } from 'react';
import { workOrders } from '@/mock/data';
import StatusBadge from '@/components/common/StatusBadge';
import type { WorkOrder, WorkOrderStatus, Priority } from '@/types';
import {
  Search,
  Filter,
  Download,
  Plus,
  ChevronRight,
  X,
  Package,
  Calendar,
  User,
  ClipboardList,
  FileText,
} from 'lucide-react';

function WorkOrderDetail({ wo, onClose }: { wo: WorkOrder; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'timeline'>('details');
  const tabs = [
    { key: 'details' as const, label: 'Details', icon: ClipboardList },
    { key: 'materials' as const, label: 'Materials', icon: Package },
    { key: 'timeline' as const, label: 'Timeline', icon: Calendar },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
      <div
        className="fixed right-0 top-0 h-screen w-[560px] z-50 border-l flex flex-col"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
          boxShadow: 'var(--shadow-modal)',
          animation: 'var(--animate-slide-in-right)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b shrink-0" style={{ borderColor: 'var(--border-default)' }}>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-bold font-mono" style={{ color: 'var(--color-primary-600)' }}>{wo.id}</h2>
              <StatusBadge status={wo.status} size="md" />
              <StatusBadge status={wo.priority} size="md" />
            </div>
            <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{wo.product}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg cursor-pointer" style={{ color: 'var(--text-tertiary)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium" style={{ color: 'var(--text-secondary)' }}>Progress</span>
            <span className="text-[14px] font-bold" style={{ color: 'var(--text-primary)' }}>
              {wo.completed.toLocaleString()} / {wo.quantity.toLocaleString()} units ({wo.progress}%)
            </span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-secondary)' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${wo.progress}%`,
                background: wo.status === 'delayed' ? 'var(--color-danger-500)' : wo.progress >= 75 ? 'var(--color-success-500)' : 'var(--color-primary-500)',
              }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b shrink-0" style={{ borderColor: 'var(--border-default)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex items-center gap-1.5 px-5 py-3 text-[12px] font-medium transition-colors cursor-pointer border-b-2"
              style={{
                color: activeTab === tab.key ? 'var(--color-primary-600)' : 'var(--text-tertiary)',
                borderColor: activeTab === tab.key ? 'var(--color-primary-600)' : 'transparent',
              }}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{wo.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Production Line', value: wo.line },
                  { label: 'Machine', value: wo.machine },
                  { label: 'Operator', value: wo.operator },
                  { label: 'Supervisor', value: wo.supervisor },
                  { label: 'Start Date', value: wo.startDate },
                  { label: 'Deadline', value: wo.deadline },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-lg" style={{ background: 'var(--bg-surface-secondary)' }}>
                    <p className="text-[10px] font-medium mb-0.5" style={{ color: 'var(--text-tertiary)' }}>{item.label}</p>
                    <p className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                  </div>
                ))}
              </div>
              {wo.notes.length > 0 && (
                <div>
                  <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Notes</h4>
                  <div className="space-y-2">
                    {wo.notes.map((note, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 rounded-lg border" style={{ borderColor: 'var(--border-subtle)' }}>
                        <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--text-tertiary)' }} />
                        <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === 'materials' && (
            <div className="space-y-3">
              {wo.materials.map((mat) => (
                <div key={mat.sku} className="p-3 rounded-lg border" style={{ borderColor: 'var(--border-default)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-mono font-medium" style={{ color: 'var(--color-primary-600)' }}>{mat.sku}</span>
                    <span className="text-[11px]" style={{ color: mat.allocated < mat.required ? 'var(--color-danger-600)' : 'var(--color-success-600)' }}>
                      {mat.allocated}/{mat.required} {mat.unit}
                    </span>
                  </div>
                  <p className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{mat.name}</p>
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-secondary)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min((mat.allocated / mat.required) * 100, 100)}%`,
                        background: mat.allocated >= mat.required ? 'var(--color-success-500)' : 'var(--color-warning-500)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'timeline' && (
            <div className="space-y-3">
              {[
                { time: wo.startDate, event: 'Work order created', status: 'completed' },
                { time: wo.startDate, event: 'Materials allocated', status: 'completed' },
                { time: wo.startDate, event: 'Production started', status: 'completed' },
                { time: 'In progress', event: `${wo.completed}/${wo.quantity} units completed`, status: 'active' },
                { time: wo.deadline, event: 'Quality inspection', status: 'pending' },
                { time: wo.deadline, event: 'Delivery deadline', status: 'pending' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-4 h-4 rounded-full border-2 shrink-0"
                      style={{
                        borderColor: item.status === 'completed' ? 'var(--color-success-500)' : item.status === 'active' ? 'var(--color-primary-500)' : 'var(--border-default)',
                        background: item.status === 'completed' ? 'var(--color-success-500)' : 'transparent',
                      }}
                    />
                    {i < 5 && <div className="w-px h-8" style={{ background: 'var(--border-default)' }} />}
                  </div>
                  <div className="-mt-0.5">
                    <p className="text-[12px] font-medium" style={{ color: 'var(--text-primary)' }}>{item.event}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function WorkOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<WorkOrderStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWO, setSelectedWO] = useState<WorkOrder | null>(null);

  const filtered = workOrders.filter((wo) => {
    if (statusFilter !== 'all' && wo.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && wo.priority !== priorityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return wo.id.toLowerCase().includes(q) || wo.product.toLowerCase().includes(q) || wo.operator.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold transition-all" style={{ color: 'var(--text-primary)' }}>Work Orders</h1>
          <p className="text-[13px] lg:text-[14px] mt-0.5 transition-all" style={{ color: 'var(--text-tertiary)' }}>
            {workOrders.length} total work orders · {workOrders.filter(w => w.status === 'in-progress').length} in progress
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center justify-center shrink-0 gap-1.5 px-3 py-2 rounded-lg border text-[12px] font-medium cursor-pointer" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center justify-center shrink-0 gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium text-white bg-primary-600 cursor-pointer">
            <Plus className="w-4 h-4" /> New Work Order
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Search work orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-3 py-1.5 rounded-lg border text-[12px] w-56 shrink-0 min-w-[160px]"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as WorkOrderStatus | 'all')}
            className="pl-10 pr-3 py-1.5 rounded-lg border text-[12px] cursor-pointer appearance-none shrink-0 min-w-[130px]"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
          >
            <option value="all">All Status</option>
            <option value="queued">Queued</option>
            <option value="in-progress">In Progress</option>
            <option value="quality-check">Quality Check</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>

        <div className="relative">
          <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
            className="pl-10 pr-3 py-1.5 rounded-lg border text-[12px] cursor-pointer appearance-none shrink-0 min-w-[130px]"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
          >
            <option value="all">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <span className="text-[12px] ml-auto" style={{ color: 'var(--text-tertiary)' }}>
          Showing {filtered.length} of {workOrders.length}
        </span>
      </div>

      {/* Table */}
      <div className="card-elevated overflow-hidden">
        <div className="table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>WO #</th>
                <th>Product</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Priority</th>
                <th>Line</th>
                <th>Machine</th>
                <th>Operator</th>
                <th>Supervisor</th>
                <th>Qty</th>
                <th>Deadline</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((wo) => (
                <tr key={wo.id} className="cursor-pointer" onClick={() => setSelectedWO(wo)}>
                  <td data-label="WO #"><span className="font-mono font-bold text-[12px]" style={{ color: 'var(--color-primary-600)' }}>{wo.id}</span></td>
                  <td data-label="Product"><span className="font-medium text-[12px]">{wo.product}</span></td>
                  <td data-label="Status"><StatusBadge status={wo.status} /></td>
                  <td data-label="Progress">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-secondary)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${wo.progress}%`,
                            background: wo.status === 'delayed' ? 'var(--color-danger-500)' : wo.progress >= 75 ? 'var(--color-success-500)' : 'var(--color-primary-500)',
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>{wo.progress}%</span>
                    </div>
                  </td>
                  <td data-label="Priority"><StatusBadge status={wo.priority} /></td>
                  <td data-label="Line" className="text-[12px]">{wo.line}</td>
                  <td data-label="Machine" className="text-[12px] font-mono">{wo.machine}</td>
                  <td data-label="Operator" className="text-[12px]">{wo.operator}</td>
                  <td data-label="Supervisor" className="text-[12px]">{wo.supervisor}</td>
                  <td data-label="Qty" className="text-[12px] font-mono">{wo.completed.toLocaleString()}/{wo.quantity.toLocaleString()}</td>
                  <td data-label="Deadline">
                    <span
                      className="text-[12px] font-mono"
                      style={{
                        color: new Date(wo.deadline) < new Date() && wo.status !== 'completed' ? 'var(--color-danger-600)' : 'var(--text-secondary)',
                      }}
                    >
                      {wo.deadline}
                    </span>
                  </td>
                  <td data-label="Action"><ChevronRight className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedWO && <WorkOrderDetail wo={selectedWO} onClose={() => setSelectedWO(null)} />}
    </div>
  );
}
