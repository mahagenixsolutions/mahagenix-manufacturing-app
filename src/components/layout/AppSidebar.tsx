// ============================================================
// ForgeMES — App Sidebar
// ============================================================

import { NavLink } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import {
  LayoutDashboard,
  Factory,
  Cpu,
  ClipboardList,
  ShieldCheck,
  Warehouse,
  Wrench,
  Users,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Production', icon: Factory, path: '/production' },
  { label: 'Machines', icon: Cpu, path: '/machines' },
  { label: 'Work Orders', icon: ClipboardList, path: '/work-orders' },
  { label: 'Quality', icon: ShieldCheck, path: '/quality' },
  { label: 'Inventory', icon: Warehouse, path: '/inventory' },
  { label: 'Maintenance', icon: Wrench, path: '/maintenance' },
  { label: 'Employees', icon: Users, path: '/employees' },
  { label: 'Analytics', icon: BarChart3, path: '/analytics' },
  { label: 'Reports', icon: FileText, path: '/reports' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function AppSidebar() {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const toggle = useAppStore((s) => s.toggleSidebar);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-40 flex flex-col transition-all duration-300 border-r`}
      style={{
        width: collapsed ? 'var(--spacing-sidebar-collapsed)' : 'var(--spacing-sidebar)',
        background: 'var(--bg-sidebar)',
        borderColor: 'var(--border-default)',
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 border-b shrink-0"
        style={{
          height: 'var(--spacing-topnav)',
          borderColor: 'var(--border-default)',
        }}
      >
        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
          <Zap className="w-4.5 h-4.5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Forge<span className="text-primary-600">MES</span>
            </h1>
            <p className="text-[10px] font-medium tracking-wider uppercase" style={{ color: 'var(--text-tertiary)' }}>
              Smart Factory
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 no-scrollbar">
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 group
                ${isActive
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'hover:bg-[var(--bg-surface-hover)]'
                }
                ${collapsed ? 'justify-center' : ''}`
              }
              style={({ isActive }) => ({
                color: isActive ? '#fff' : 'var(--text-secondary)',
              })}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div
        className="px-3 py-3 border-t shrink-0"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <button
          onClick={toggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer"
          style={{
            color: 'var(--text-tertiary)',
            background: 'var(--bg-surface-secondary)',
          }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
