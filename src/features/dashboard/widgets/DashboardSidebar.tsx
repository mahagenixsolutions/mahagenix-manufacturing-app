import React, { useState } from "react";
import {
  ShieldCheck,
  CloudSun,
  Calendar,
  FileText,
  ChevronRight,
  ChevronLeft,
  Plus,
  Download,
} from "lucide-react";
import ReactECharts from "echarts-for-react";

interface FileReport {
  name: string;
  size: string;
  date: string;
}

const reports: FileReport[] = [
  { name: "Shift_A_OEE_Log.pdf", size: "2.4 MB", date: "Today 14:10" },
  { name: "Maintenance_Invoice_PRS603.pdf", size: "1.8 MB", date: "Yesterday" },
  {
    name: "Quality_Audit_Q2_Summary.xlsx",
    size: "4.2 MB",
    date: "28 Jun 2026",
  },
];

export default function DashboardSidebar() {
  const [notes, setNotes] = useState("");
  const [noteList, setNoteList] = useState<string[]>([
    "Call Priya regarding welder calibration",
    "Inspect warehouse C low stock warning",
  ]);

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;
    setNoteList([notes, ...noteList]);
    setNotes("");
  };

  return (
    <div className="flex flex-col gap-6 h-full p-4 border-l border-subtle bg-surface-secondary/5 dark:bg-slate-900/10">
      {/* Current Shift Schedule details */}
      {/* <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/20 border border-subtle">
        <h4 className="text-[12px] font-bold text-tertiary uppercase tracking-wider mb-3">On-Going shift</h4>
        <div className="space-y-3 text-[12px]">
          <div className="flex justify-between items-center">
            <span className="text-secondary font-medium">Shift Leader</span>
            <span className="font-semibold text-primary">Vikram Singh</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary font-medium">Active Operators</span>
            <span className="font-semibold text-primary">24 / 26 checked in</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary font-medium">Active Lines</span>
            <span className="font-semibold text-primary">6 / 6 online</span>
          </div>
        </div>
      </div> */}

      {/* Quick Notes Panel */}
      {/* <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/20 border border-subtle">
        <h4 className="text-[12px] font-bold text-tertiary uppercase tracking-wider mb-3">Shop Floor Notes</h4>
        
        <form onSubmit={addNote} className="relative mb-3">
          <input
            type="text"
            placeholder="Add quick note..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full pl-3 pr-10 py-2 rounded-xl text-[12px] bg-surface-secondary/40 border border-subtle focus:outline-none focus:border-primary-400 text-primary font-medium"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 p-0.5 rounded bg-primary text-inverse hover:bg-primary-600 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 no-scrollbar">
          {noteList.map((note, idx) => (
            <div key={idx} className="p-2.5 rounded-lg border border-subtle bg-surface-secondary/10 text-[11px] text-secondary leading-snug">
              {note}
            </div>
          ))}
        </div>
      </div> */}

      {/* Recent Files Download */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/20 border border-subtle">
        <h4 className="text-[12px] font-bold text-tertiary uppercase tracking-wider mb-3">
          Pinned PDF Reports
        </h4>
        <div className="space-y-2.5">
          {reports.map((rep, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 text-[11px]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-5 h-5 text-tertiary shrink-0" />
                <div className="truncate">
                  <p className="font-bold text-primary truncate">{rep.name}</p>
                  <p className="text-[9px] text-tertiary mt-0.5">
                    {rep.size} · {rep.date}
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert(`Downloading ${rep.name}...`)}
                className="p-1 rounded-lg border border-subtle hover:bg-surface-secondary text-secondary transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
