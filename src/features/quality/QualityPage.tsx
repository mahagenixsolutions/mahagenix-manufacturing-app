// ============================================================
// ForgeMES — Quality Control Page
// ============================================================

import { qualityInspections } from '@/mock/data';
import StatusBadge from '@/components/common/StatusBadge';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Search,
} from 'lucide-react';

export default function QualityPage() {
  const stats = {
    total: qualityInspections.length,
    pending: qualityInspections.filter((q) => q.status === 'pending').length,
    passed: qualityInspections.filter((q) => q.status === 'passed').length,
    failed: qualityInspections.filter((q) => q.status === 'failed').length,
    inReview: qualityInspections.filter((q) => q.status === 'in-review').length,
  };

  const avgPassRate = qualityInspections.filter((q) => q.passRate > 0).reduce((sum, q) => sum + q.passRate, 0) /
    qualityInspections.filter((q) => q.passRate > 0).length;

  const defectChartOption = useMemo(() => ({
    tooltip: { trigger: 'item' as const, backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-default)', textStyle: { fontSize: 12, color: 'var(--text-primary)' } },
    legend: { bottom: 0, textStyle: { fontSize: 11, color: 'var(--text-tertiary)' }, itemWidth: 10, itemHeight: 10 },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      avoidLabelOverlap: false,
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 13, fontWeight: 'bold' } },
      data: [
        { value: 3, name: 'Solder Bridge', itemStyle: { color: '#ef4444' } },
        { value: 2, name: 'Missing Component', itemStyle: { color: '#f59e0b' } },
        { value: 3, name: 'Cold Solder Joint', itemStyle: { color: '#2563eb' } },
        { value: 1, name: 'Surface Blemish', itemStyle: { color: '#8b5cf6' } },
        { value: 1, name: 'Paint Adhesion', itemStyle: { color: '#06b6d4' } },
        { value: 1, name: 'Dimensional Dev', itemStyle: { color: '#22c55e' } },
      ],
      animationDuration: 800,
    }],
  }), []);

  const passRateChart = useMemo(() => ({
    tooltip: { trigger: 'axis' as const, backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-default)', textStyle: { fontSize: 12, color: 'var(--text-primary)' } },
    grid: { left: 40, right: 16, top: 16, bottom: 24 },
    xAxis: { type: 'category' as const, data: qualityInspections.filter(q => q.passRate > 0).map(q => q.id.split('-').pop()), axisLabel: { fontSize: 10, color: 'var(--text-tertiary)' }, axisLine: { lineStyle: { color: 'var(--border-default)' } } },
    yAxis: { type: 'value' as const, min: 85, max: 100, axisLabel: { fontSize: 10, color: 'var(--text-tertiary)', formatter: '{value}%' }, splitLine: { lineStyle: { color: 'var(--border-subtle)', type: 'dashed' as const } } },
    series: [{
      type: 'bar',
      data: qualityInspections.filter(q => q.passRate > 0).map(q => ({
        value: q.passRate,
        itemStyle: { color: q.passRate >= 98 ? '#22c55e' : q.passRate >= 95 ? '#f59e0b' : '#ef4444', borderRadius: [4, 4, 0, 0] },
      })),
      barWidth: '50%',
      animationDuration: 800,
    }],
  }), []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold transition-all" style={{ color: 'var(--text-primary)' }}>Quality Control</h1>
        <p className="text-[13px] lg:text-[14px] mt-0.5 transition-all" style={{ color: 'var(--text-tertiary)' }}>Inspection dashboard & defect tracking</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Inspections', value: stats.total, icon: Eye, color: 'var(--color-primary-500)' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'var(--color-warning-500)' },
          { label: 'Passed', value: stats.passed, icon: CheckCircle2, color: 'var(--color-success-500)' },
          { label: 'Failed', value: stats.failed, icon: XCircle, color: 'var(--color-danger-500)' },
          { label: 'Avg Pass Rate', value: `${avgPassRate.toFixed(1)}%`, icon: AlertTriangle, color: 'var(--color-primary-600)' },
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="card-elevated p-5">
          <h3 className="text-[14px] font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Defect Distribution</h3>
          <p className="text-[11px] mb-3" style={{ color: 'var(--text-tertiary)' }}>By defect type across all inspections</p>
          <ReactECharts option={defectChartOption} style={{ height: 250 }} opts={{ renderer: 'svg' }} />
        </div>
        <div className="card-elevated p-5">
          <h3 className="text-[14px] font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Pass Rate by Batch</h3>
          <p className="text-[11px] mb-3" style={{ color: 'var(--text-tertiary)' }}>Inspection pass rates (goal: &gt;98%)</p>
          <ReactECharts option={passRateChart} style={{ height: 250 }} opts={{ renderer: 'svg' }} />
        </div>
      </div>

      {/* Inspections Table */}
      <div className="card-elevated p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>Inspection Queue</h3>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>All quality inspections</p>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
            <input type="text" placeholder="Search..." className="pl-10 pr-3 py-1.5 rounded-lg border text-[12px] w-48 shrink-0 min-w-[140px]" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Inspection ID</th>
                <th>Work Order</th>
                <th>Product</th>
                <th>Inspector</th>
                <th>Status</th>
                <th>Defects</th>
                <th>Pass Rate</th>
                <th>Batch/Sample</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {qualityInspections.map((qi) => (
                <tr key={qi.id} className="cursor-pointer">
                  <td data-label="Inspection ID"><span className="font-mono font-bold text-[12px]" style={{ color: 'var(--color-primary-600)' }}>{qi.id}</span></td>
                  <td data-label="Work Order"><span className="font-mono text-[12px]">{qi.workOrder}</span></td>
                  <td data-label="Product" className="text-[12px] font-medium">{qi.product}</td>
                  <td data-label="Inspector" className="text-[12px]">{qi.inspector}</td>
                  <td data-label="Status"><StatusBadge status={qi.status} /></td>
                  <td data-label="Defects">
                    <span className={`text-[12px] font-bold ${qi.defectsFound > 0 ? 'text-danger-600' : 'text-success-600'}`}>
                      {qi.defectsFound}
                    </span>
                  </td>
                  <td data-label="Pass Rate">
                    <span className={`text-[12px] font-bold ${qi.passRate === 0 ? '' : qi.passRate >= 98 ? 'text-success-600' : qi.passRate >= 95 ? 'text-warning-600' : 'text-danger-600'}`}>
                      {qi.passRate > 0 ? `${qi.passRate}%` : '—'}
                    </span>
                  </td>
                  <td data-label="Batch/Sample" className="text-[12px] font-mono">{qi.batchSize}/{qi.sampleSize}</td>
                  <td data-label="Date" className="text-[12px] font-mono">{qi.inspectionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
