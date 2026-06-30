import React from 'react';
import { Zap, Droplet, Wind, CloudFog } from 'lucide-react';

export default function ResourceMonitoring() {
  const resources = [
    { label: 'Electricity', current: 1450, max: 2000, unit: 'kW', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500' },
    { label: 'Water Flow', current: 320, max: 500, unit: 'L/m', icon: Droplet, color: 'text-blue-500', bg: 'bg-blue-500' },
    { label: 'Compressed Air', current: 110, max: 150, unit: 'PSI', icon: Wind, color: 'text-cyan-500', bg: 'bg-cyan-500' },
    { label: 'Carbon Emissions', current: 42, max: 100, unit: 'kg/h', icon: CloudFog, color: 'text-stone-500', bg: 'bg-stone-500' },
  ];

  return (
    <div className="flex flex-col gap-[18px] h-full justify-center">
      {resources.map((res, idx) => {
        const percentage = Math.round((res.current / res.max) * 100);
        return (
          <div key={idx} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <res.icon className={`w-4 h-4 ${res.color}`} />
                <span className="text-[12px] font-semibold text-secondary">{res.label}</span>
              </div>
              <span className="text-[12px] font-bold text-primary pr-3">
                {res.current} <span className="text-[10px] text-tertiary font-normal">{res.unit}</span>
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${res.bg}`} 
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
