import React from 'react';
import { Activity, Server, Zap, Factory } from 'lucide-react';

export default function FactoryHealth() {
  const metrics = [
    { label: 'Overall Plant OEE', value: '87.4%', status: 'optimal', icon: Activity, trend: '+2.1%' },
    { label: 'System Health', value: '99.9%', status: 'optimal', icon: Server, trend: 'Stable' },
    { label: 'Factory Utilization', value: '92.0%', status: 'warning', icon: Factory, trend: '-1.5%' },
    { label: 'Energy Load', value: '85%', status: 'optimal', icon: Zap, trend: '-3.2%' },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 h-full">
      {metrics.map((metric, idx) => (
        <div key={idx} className="flex flex-col p-5 rounded-lg border border-subtle bg-surface-secondary/50">
          <div className="flex items-center gap-2 mb-4">
            <metric.icon className="w-4 h-4 text-primary-500" />
            <span className="text-[12px] font-semibold text-secondary">{metric.label}</span>
          </div>
          <div className="flex items-end justify-between mt-auto gap-3">
            <span className="text-xl font-bold text-primary leading-none">{metric.value}</span>
            <span className={`text-[11px] font-medium ${metric.status === 'optimal' ? 'text-success-600' : 'text-warning-600'}`}>
              {metric.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
