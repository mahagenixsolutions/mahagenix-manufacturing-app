// ============================================================
// ForgeMES — Production Trend Charts
// ============================================================

import { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { dailyProductionData, weeklyProductionData, monthlyProductionData } from '@/mock/data';

type Period = 'daily' | 'weekly' | 'monthly';

const periodData = {
  daily: { data: dailyProductionData, xKey: 'date' },
  weekly: { data: weeklyProductionData, xKey: 'week' },
  monthly: { data: monthlyProductionData, xKey: 'month' },
};

export default function ProductionTrendCharts() {
  const [period, setPeriod] = useState<Period>('daily');

  const { data, xKey } = periodData[period];

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis' as const,
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-default)',
        textStyle: { fontSize: 12, color: 'var(--text-primary)' },
      },
      legend: {
        data: ['Output', 'Target', 'Efficiency'],
        bottom: 0,
        textStyle: { fontSize: 11, color: 'var(--text-tertiary)' },
        itemWidth: 12,
        itemHeight: 8,
        itemGap: 20,
      },
      grid: { left: 56, right: 56, top: 24, bottom: 48 },
      xAxis: {
        type: 'category' as const,
        data: data.map((d) => (d as Record<string, unknown>)[xKey] as string),
        axisLine: { lineStyle: { color: 'var(--border-default)' } },
        axisTick: { show: false },
        axisLabel: { fontSize: 10, color: 'var(--text-tertiary)' },
      },
      yAxis: [
        {
          type: 'value' as const,
          name: 'Units',
          nameTextStyle: { fontSize: 10, color: 'var(--text-tertiary)' },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: 'var(--border-subtle)', type: 'dashed' as const } },
          axisLabel: { fontSize: 10, color: 'var(--text-tertiary)' },
        },
        {
          type: 'value' as const,
          name: 'Efficiency %',
          nameTextStyle: { fontSize: 10, color: 'var(--text-tertiary)' },
          min: 60,
          max: 100,
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { fontSize: 10, color: 'var(--text-tertiary)', formatter: '{value}%' },
        },
      ],
      series: [
        {
          name: 'Output',
          type: 'bar',
          data: data.map((d) => d.output),
          itemStyle: { color: '#2563eb', borderRadius: [4, 4, 0, 0] },
          barWidth: '35%',
          animationDuration: 800,
        },
        {
          name: 'Target',
          type: 'line',
          data: data.map((d) => d.target),
          lineStyle: { color: '#94a3b8', type: 'dashed' as const, width: 2 },
          itemStyle: { color: '#94a3b8' },
          symbol: 'none',
          animationDuration: 800,
        },
        {
          name: 'Efficiency',
          type: 'line',
          yAxisIndex: 1,
          data: data.map((d) => d.efficiency),
          lineStyle: { color: '#22c55e', width: 2 },
          itemStyle: { color: '#22c55e' },
          symbol: 'circle',
          symbolSize: 6,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(34, 197, 94, 0.15)' },
                { offset: 1, color: 'rgba(34, 197, 94, 0)' },
              ],
            },
          },
          animationDuration: 800,
          animationDelay: 400,
        },
      ],
    }),
    [data, xKey]
  );

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-end mb-2">
        <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-default)' }}>
          {(['daily', 'weekly', 'monthly'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-3 py-1.5 text-[11px] font-medium transition-colors capitalize cursor-pointer"
              style={{
                background: period === p ? 'var(--color-primary-600)' : 'var(--bg-surface)',
                color: period === p ? '#fff' : 'var(--text-tertiary)',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <ReactECharts option={option} style={{ height: 300 }} opts={{ renderer: 'svg' }} />
    </div>
  );
}
