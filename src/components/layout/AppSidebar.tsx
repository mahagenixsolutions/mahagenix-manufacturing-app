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

import { useEffect } from 'react';

export default function AppSidebar() {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const toggle = useAppStore((s) => s.toggleSidebar);
  const mobileOpen = useAppStore((s) => s.mobileSidebarOpen);
  const setMobileOpen = useAppStore((s) => s.setMobileSidebarOpen);

  // Close sidebar on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, setMobileOpen]);

  return (
    <>
      <style>{`
        .app-sidebar {
          width: var(--spacing-sidebar);
          transform: translateX(-100%);
        }
        .app-sidebar.mobile-open {
          transform: translateX(0);
        }
        @media (min-width: 768px) {
          .app-sidebar {
            width: var(--spacing-sidebar-collapsed);
            transform: translateX(0);
          }
        }
        @media (min-width: 1280px) {
          .app-sidebar {
            width: ${collapsed ? 'var(--spacing-sidebar-collapsed)' : 'var(--spacing-sidebar)'};
          }
        }
      `}</style>
      <aside
        className={`app-sidebar fixed left-0 top-0 h-screen z-40 flex flex-col transition-all duration-300 border-r ${mobileOpen ? 'mobile-open' : ''}`}
        style={{
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
          <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-lg bg-primary-600 flex items-center justify-center shrink-0 transition-all">
            <Zap className="w-5 h-5 xl:w-5 xl:h-5 text-white" />
          </div>
          <div className="overflow-hidden whitespace-nowrap hidden xl:block mobile-logo">
            <style>{`
              @media (max-width: 767px) { .mobile-logo { display: block !important; } }
              ${collapsed ? '.mobile-logo { display: none !important; }' : ''}
            `}</style>
            <h1 className="text-base xl:text-lg font-bold tracking-tight transition-all" style={{ color: 'var(--text-primary)' }}>
              Forge<span className="text-primary-600">MES</span>
            </h1>
            <p className="text-[10px] font-medium tracking-wider uppercase" style={{ color: 'var(--text-tertiary)' }}>
              Smart Factory
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 no-scrollbar">
          <div className="space-y-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 group
                  ${isActive
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'hover:bg-[var(--bg-surface-hover)]'
                  }
                  justify-center md:justify-center xl:justify-start nav-link-mobile`
                }
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                })}
                title={collapsed ? item.label : undefined}
              >
                <style>{`
                  @media (max-width: 767px) { .nav-link-mobile { justify-content: flex-start !important; } }
                  ${collapsed ? '.nav-link-mobile { justify-content: center !important; }' : ''}
                `}</style>
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                <span className="hidden xl:inline mobile-label whitespace-nowrap">
                  <style>{`
                    @media (max-width: 767px) { .mobile-label { display: inline !important; } }
                    ${collapsed ? '.mobile-label { display: none !important; }' : ''}
                  `}</style>
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Collapse Toggle */}
        <div
          className="px-3 py-3 border-t shrink-0 hidden xl:block"
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
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
