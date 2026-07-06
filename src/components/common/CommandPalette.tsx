// ============================================================
// ForgeMES — Command Palette (Ctrl+K)
// ============================================================

import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { machines, employees, workOrders, inventoryItems } from '@/mock/data';
import {
  Search,
  Cpu,
  Users,
  ClipboardList,
  Warehouse,
  ArrowRight,
  LayoutDashboard,
  Factory,
  ShieldCheck,
  Wrench,
  BarChart3,
  FileText,
  Settings,
} from 'lucide-react';

interface SearchResult {
  id: string;
  label: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  path: string;
}

const pageResults: SearchResult[] = [
  { id: 'page-dashboard', label: 'Dashboard', description: 'Factory command center', category: 'Pages', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
  { id: 'page-production', label: 'Production', description: 'Production schedule & queue', category: 'Pages', icon: <Factory className="w-5 h-5" />, path: '/production' },
  { id: 'page-machines', label: 'Machines', description: 'Machine monitoring', category: 'Pages', icon: <Cpu className="w-5 h-5" />, path: '/machines' },
  { id: 'page-work-orders', label: 'Work Orders', description: 'Manage work orders', category: 'Pages', icon: <ClipboardList className="w-5 h-5" />, path: '/work-orders' },
  { id: 'page-quality', label: 'Quality Control', description: 'Inspection dashboard', category: 'Pages', icon: <ShieldCheck className="w-5 h-5" />, path: '/quality' },
  { id: 'page-inventory', label: 'Inventory', description: 'Warehouse management', category: 'Pages', icon: <Warehouse className="w-5 h-5" />, path: '/inventory' },
  { id: 'page-maintenance', label: 'Maintenance', description: 'Machine health & service', category: 'Pages', icon: <Wrench className="w-5 h-5" />, path: '/maintenance' },
  { id: 'page-employees', label: 'Employees', description: 'Workforce management', category: 'Pages', icon: <Users className="w-5 h-5" />, path: '/employees' },
  { id: 'page-analytics', label: 'Analytics', description: 'Production analytics', category: 'Pages', icon: <BarChart3 className="w-5 h-5" />, path: '/analytics' },
  { id: 'page-reports', label: 'Reports', description: 'Generate reports', category: 'Pages', icon: <FileText className="w-5 h-5" />, path: '/reports' },
  { id: 'page-settings', label: 'Settings', description: 'System settings', category: 'Pages', icon: <Settings className="w-5 h-5" />, path: '/settings' },
];

export default function CommandPalette() {
  const { commandPaletteOpen, closeCommandPalette } = useAppStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Build searchable results
  const allResults = useMemo<SearchResult[]>(() => {
    const machineResults: SearchResult[] = machines.map((m) => ({
      id: m.id,
      label: `${m.id} — ${m.name}`,
      description: `${m.type} · ${m.line} · ${m.status}`,
      category: 'Machines',
      icon: <Cpu className="w-5 h-5" />,
      path: '/machines',
    }));

    const employeeResults: SearchResult[] = employees.map((e) => ({
      id: e.id,
      label: e.name,
      description: `${e.role} · ${e.department} · ${e.shift} shift`,
      category: 'Employees',
      icon: <Users className="w-5 h-5" />,
      path: '/employees',
    }));

    const woResults: SearchResult[] = workOrders.map((wo) => ({
      id: wo.id,
      label: `${wo.id} — ${wo.product}`,
      description: `${wo.status} · ${wo.line} · ${wo.priority} priority`,
      category: 'Work Orders',
      icon: <ClipboardList className="w-5 h-5" />,
      path: '/work-orders',
    }));

    const invResults: SearchResult[] = inventoryItems.map((i) => ({
      id: i.sku,
      label: `${i.sku} — ${i.name}`,
      description: `${i.currentStock} ${i.unit} · ${i.status}`,
      category: 'Inventory',
      icon: <Warehouse className="w-5 h-5" />,
      path: '/inventory',
    }));

    return [...pageResults, ...machineResults, ...employeeResults, ...woResults, ...invResults];
  }, []);

  // Filter results
  const filtered = useMemo(() => {
    if (!query.trim()) return pageResults;
    const q = query.toLowerCase();
    return allResults.filter(
      (r) =>
        r.label.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
  }, [query, allResults]);

  // Group by category
  const grouped = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    filtered.forEach((r) => {
      if (!groups[r.category]) groups[r.category] = [];
      groups[r.category].push(r);
    });
    return groups;
  }, [filtered]);

  // Reset on open
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Keyboard nav
  useEffect(() => {
    if (!commandPaletteOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCommandPalette();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        const item = filtered[selectedIndex];
        if (item) {
          navigate(item.path);
          closeCommandPalette();
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [commandPaletteOpen, filtered, selectedIndex, navigate, closeCommandPalette]);

  if (!commandPaletteOpen) return null;

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeCommandPalette}
      />

      {/* Palette */}
      <div
        className="relative w-full max-w-xl rounded-xl border overflow-hidden"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
          boxShadow: 'var(--shadow-modal)',
          animation: 'var(--animate-scale-in)',
        }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--border-default)' }}>
          <Search className="w-5 h-5 shrink-0" style={{ color: 'var(--text-tertiary)' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search machines, employees, work orders, pages..."
            className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[var(--text-tertiary)]"
            style={{ color: 'var(--text-primary)' }}
          />
          <kbd
            className="px-1.5 py-0.5 rounded text-[10px] font-medium border"
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-tertiary)' }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
              No results found for "{query}"
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <div
                  className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {category}
                </div>
                {items.slice(0, 5).map((item) => {
                  flatIndex++;
                  const idx = flatIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.path);
                        closeCommandPalette();
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer ${
                        idx === selectedIndex ? 'bg-primary-600 text-white' : ''
                      }`}
                      style={
                        idx !== selectedIndex
                          ? { color: 'var(--text-primary)' }
                          : undefined
                      }
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div
                        className={`shrink-0 ${idx === selectedIndex ? 'text-white' : ''}`}
                        style={idx !== selectedIndex ? { color: 'var(--text-tertiary)' } : undefined}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium truncate">{item.label}</div>
                        <div
                          className={`text-[11px] truncate ${
                            idx === selectedIndex ? 'text-white/70' : ''
                          }`}
                          style={idx !== selectedIndex ? { color: 'var(--text-tertiary)' } : undefined}
                        >
                          {item.description}
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-3.5 h-3.5 shrink-0 opacity-0 ${
                          idx === selectedIndex ? 'opacity-100' : ''
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-2 border-t flex items-center gap-4 text-[11px]"
          style={{ borderColor: 'var(--border-default)', color: 'var(--text-tertiary)' }}
        >
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
}
