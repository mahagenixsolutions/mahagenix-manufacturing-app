import React from 'react';
import { Calendar, Users, Package, Wrench } from 'lucide-react';

export default function TodaySchedule() {
  const schedule = [
    { time: '08:00 AM', event: 'Shift A Briefing', type: 'meeting', icon: Users, color: 'text-blue-600' },
    { time: '10:30 AM', event: 'CNC Maintenance', type: 'maintenance', icon: Wrench, color: 'text-warning-600' },
    { time: '02:00 PM', event: 'Raw Material Delivery', type: 'delivery', icon: Package, color: 'text-success-600' },
    { time: '04:00 PM', event: 'Plant Manager Sync', type: 'meeting', icon: Users, color: 'text-blue-600' },
  ];

  return (
    <div className="flex flex-col h-full relative pl-2 pt-1">
      <div className="absolute left-[18px] top-4 bottom-4 w-px bg-subtle" />
      {schedule.map((item, idx) => (
        <div key={idx} className="relative flex items-start gap-3 mb-4 last:mb-0">
          <div className="relative z-10 w-5 h-5 rounded-full bg-surface border-2 border-primary-500 flex items-center justify-center mt-0.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
          </div>
          <div className="pl-1">
            <div className="text-[12px] font-bold text-primary">{item.time}</div>
            <div className="flex items-center gap-2 mt-1">
              <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span className="text-[11px] font-medium text-secondary">{item.event}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
