// ============================================================
// ForgeMES — Reports Page
// ============================================================

import { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  BarChart3,
  CheckSquare,
  Search,
} from 'lucide-react';

const savedReports = [
  { id: 'REP-001', name: 'Weekly Production Summary', type: 'Production', frequency: 'Weekly', lastRun: '2026-06-28 18:00' },
  { id: 'REP-002', name: 'Quality Defect Analysis', type: 'Quality', frequency: 'Monthly', lastRun: '2026-06-01 08:00' },
  { id: 'REP-003', name: 'Machine Downtime Log', type: 'Maintenance', frequency: 'Daily', lastRun: '2026-06-29 06:00' },
  { id: 'REP-004', name: 'Inventory Stock Level', type: 'Inventory', frequency: 'On-demand', lastRun: '2026-06-25 14:30' },
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState('Production');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold transition-all" style={{ color: 'var(--text-primary)' }}>Reports Hub</h1>
          <p className="text-[13px] lg:text-[14px] mt-0.5 transition-all" style={{ color: 'var(--text-tertiary)' }}>
            Generate, schedule, and export factory reports
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Report Builder */}
        <div className="xl:col-span-2 space-y-6">
          <div className="card-elevated p-6">
            <h2 className="text-[15px] font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Filter className="w-5 h-5 text-primary-500" /> Report Builder
            </h2>

            <div className="space-y-5">
              {/* Report Type */}
              <div>
                <label className="block text-[12px] font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Report Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Production', 'Quality', 'Maintenance', 'Inventory'].map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className="p-3 border rounded-lg text-center transition-colors cursor-pointer"
                      style={{
                        borderColor: selectedType === type ? 'var(--color-primary-600)' : 'var(--border-default)',
                        background: selectedType === type ? 'var(--color-primary-50)' : 'var(--bg-surface)',
                        color: selectedType === type ? 'var(--color-primary-700)' : 'var(--text-secondary)',
                      }}
                    >
                      <span className="text-[13px] font-medium">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-[12px] font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Date Range</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                    <input type="date" className="w-full pl-10 pr-3 py-2 border rounded-lg text-[13px]" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
                  </div>
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                    <input type="date" className="w-full pl-10 pr-3 py-2 border rounded-lg text-[13px]" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
              </div>

              {/* Data Points */}
              <div>
                <label className="block text-[12px] font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Data to Include</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Overview Summary', 'Line-by-Line Breakdown', 'Machine Level Metrics', 'Operator Statistics', 'Defect Analysis', 'Downtime Log'].map(dp => (
                    <label key={dp} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-[var(--bg-surface-secondary)] transition-colors" style={{ borderColor: 'var(--border-default)' }}>
                      <input type="checkbox" className="w-5 h-5 rounded text-primary-600" defaultChecked />
                      <span className="text-[13px]" style={{ color: 'var(--text-primary)' }}>{dp}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <button className="px-4 py-2 border rounded-lg text-[13px] font-medium" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
                  Preview
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white bg-primary-600">
                  <Download className="w-5 h-5" /> Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Reports */}
        <div className="space-y-6">
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <FileText className="w-5 h-5 text-primary-500" /> Saved Reports
              </h2>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
              <input type="text" placeholder="Search templates..." className="w-full pl-9 pr-3 py-1.5 border rounded-lg text-[12px]" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)' }} />
            </div>

            <div className="space-y-3">
              {savedReports.map(report => (
                <div key={report.id} className="p-3 border rounded-lg cursor-pointer hover:border-primary-500 transition-colors" style={{ borderColor: 'var(--border-default)' }}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-[13px] font-bold truncate pr-2" style={{ color: 'var(--text-primary)' }}>{report.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0" style={{ background: 'var(--bg-surface-secondary)', color: 'var(--text-secondary)' }}>
                      {report.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {report.frequency}</span>
                    <span>Last: {report.lastRun}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
