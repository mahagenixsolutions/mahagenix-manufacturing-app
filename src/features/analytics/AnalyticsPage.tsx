// ============================================================
// ForgeMES — Analytics Page
// ============================================================

import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { monthlyProductionData, machineUtilizationData } from '@/mock/data';
import { Download, Calendar, BarChart3, TrendingUp, Cpu, Factory } from 'lucide-react';

export default function AnalyticsPage() {
  const oeeTrendOption = useMemo(() => ({
    tooltip: { trigger: 'axis', backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-default)', textStyle: { color: 'var(--text-primary)' } },
    legend: { bottom: 0, textStyle: { color: 'var(--text-tertiary)' } },
    grid: { left: 40, right: 20, top: 20, bottom: 40 },
    xAxis: { type: 'category', data: monthlyProductionData.map(d => d.month), axisLine: { lineStyle: { color: 'var(--border-default)' } } },
    yAxis: { type: 'value', min: 70, max: 100, axisLabel: { formatter: '{value}%' }, splitLine: { lineStyle: { type: 'dashed', color: 'var(--border-subtle)' } } },
    series: [
      {
        name: 'OEE',
        type: 'line',
        data: monthlyProductionData.map(d => d.efficiency),
        lineStyle: { color: '#2563eb', width: 3 },
        symbolSize: 8,
        itemStyle: { color: '#2563eb' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(37, 99, 235, 0.2)' }, { offset: 1, color: 'rgba(37, 99, 235, 0)' }],
          },
        },
      },
    ],
  }), []);

  const utilizationOption = useMemo(() => ({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-default)', textStyle: { color: 'var(--text-primary)' } },
    legend: { bottom: 0, textStyle: { color: 'var(--text-tertiary)' } },
    grid: { left: 60, right: 20, top: 20, bottom: 40 },
    xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' }, splitLine: { lineStyle: { type: 'dashed', color: 'var(--border-subtle)' } } },
    yAxis: { type: 'category', data: machineUtilizationData.map(d => d.name), axisLine: { lineStyle: { color: 'var(--border-default)' } } },
    series: [
      { name: 'Running', type: 'bar', stack: 'total', data: machineUtilizationData.map(d => d.utilization), itemStyle: { color: '#22c55e' } },
      { name: 'Idle', type: 'bar', stack: 'total', data: machineUtilizationData.map(d => d.idle), itemStyle: { color: '#f59e0b' } },
      { name: 'Downtime', type: 'bar', stack: 'total', data: machineUtilizationData.map(d => d.downtime), itemStyle: { color: '#ef4444' } },
    ],
  }), []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold transition-all" style={{ color: 'var(--text-primary)' }}>Factory Analytics</h1>
          <p className="text-[13px] lg:text-[14px] mt-0.5 transition-all" style={{ color: 'var(--text-tertiary)' }}>
            Deep dive into production metrics, OEE, and utilization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] bg-surface" style={{ borderColor: 'var(--border-default)' }}>
            <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
            <span style={{ color: 'var(--text-primary)' }}>Last 6 Months</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-white bg-primary-600 cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Average OEE (6mo)', value: '85.4%', trend: '+2.1%', icon: TrendingUp },
          { label: 'Total Output (6mo)', value: '165,500 units', trend: '-1.2%', icon: Factory },
          { label: 'Machine Utilization', value: '88.2%', trend: '+0.5%', icon: Cpu },
        ].map((kpi, i) => (
          <div key={i} className="card-elevated p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center transition-all">
                <kpi.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary-600 transition-all" />
              </div>
              <span className={`text-[12px] lg:text-[14px] font-bold transition-all ${kpi.trend.startsWith('+') ? 'text-success-600' : 'text-danger-600'}`}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-[12px] lg:text-[13px] font-medium mb-1 transition-all" style={{ color: 'var(--text-tertiary)' }}>{kpi.label}</p>
            <p className="text-2xl lg:text-3xl font-bold transition-all" style={{ color: 'var(--text-primary)' }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="card-elevated p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>OEE Trend</h3>
              <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>Overall Equipment Effectiveness over 6 months</p>
            </div>
            <BarChart3 className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <ReactECharts option={oeeTrendOption} style={{ height: 320 }} opts={{ renderer: 'svg' }} />
        </div>

        <div className="card-elevated p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>Machine Utilization</h3>
              <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>Running vs Idle vs Downtime percentage</p>
            </div>
            <Cpu className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <ReactECharts option={utilizationOption} style={{ height: 320 }} opts={{ renderer: 'svg' }} />
        </div>
      </div>
    </div>
  );
}
