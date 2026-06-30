import React, { useState } from 'react';
import { Filter, Factory, Calendar, Clock, MapPin, Package, Cpu, Users } from 'lucide-react';

export default function DashboardFilterBar() {
  const [plant, setPlant] = useState('All Plants');
  const [department, setDepartment] = useState('All Departments');
  const [shift, setShift] = useState('All Shifts');
  const [dateRange, setDateRange] = useState('Today');

  return (
    <div className="bg-surface border-y border-subtle py-3 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 text-[12px] font-semibold text-secondary shrink-0">
          <Filter className="w-3.5 h-3.5 text-primary-600" />
          Global Filters:
        </div>

        <div className="flex items-center gap-3">
          {/* Plant */}
          <div className="flex items-center gap-2 bg-surface-secondary border border-subtle rounded-md px-3 py-1.5 text-[11px] hover:border-primary-300 transition-colors cursor-pointer">
            <Factory className="w-3.5 h-3.5 text-tertiary" />
            <select value={plant} onChange={e => setPlant(e.target.value)} className="bg-transparent text-primary outline-none cursor-pointer font-medium">
              <option>All Plants</option>
              <option>Berlin Gigafactory</option>
              <option>Austin Plant</option>
              <option>Shanghai Assembly</option>
            </select>
          </div>

          {/* Department */}
          <div className="flex items-center gap-2 bg-surface-secondary border border-subtle rounded-md px-3 py-1.5 text-[11px] hover:border-primary-300 transition-colors cursor-pointer">
            <MapPin className="w-3.5 h-3.5 text-tertiary" />
            <select value={department} onChange={e => setDepartment(e.target.value)} className="bg-transparent text-primary outline-none cursor-pointer font-medium">
              <option>All Departments</option>
              <option>Assembly Line A</option>
              <option>Quality Control</option>
              <option>Packaging</option>
              <option>CNC Machining</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2 bg-surface-secondary border border-subtle rounded-md px-3 py-1.5 text-[11px] hover:border-primary-300 transition-colors cursor-pointer">
            <Calendar className="w-3.5 h-3.5 text-tertiary" />
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="bg-transparent text-primary outline-none cursor-pointer font-medium">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>Custom Range...</option>
            </select>
          </div>

          {/* Shift */}
          <div className="flex items-center gap-2 bg-surface-secondary border border-subtle rounded-md px-3 py-1.5 text-[11px] hover:border-primary-300 transition-colors cursor-pointer">
            <Clock className="w-3.5 h-3.5 text-tertiary" />
            <select value={shift} onChange={e => setShift(e.target.value)} className="bg-transparent text-primary outline-none cursor-pointer font-medium">
              <option>All Shifts</option>
              <option>Morning (06:00 - 14:00)</option>
              <option>Evening (14:00 - 22:00)</option>
              <option>Night (22:00 - 06:00)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 pl-4 border-l border-subtle shrink-0">
         <button className="text-[11px] font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer">
           Reset
         </button>
      </div>
    </div>
  );
}
