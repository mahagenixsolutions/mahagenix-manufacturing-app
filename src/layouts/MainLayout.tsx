// ============================================================
// ForgeMES — Main Layout
// ============================================================

import { Outlet } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import AppSidebar from '@/components/layout/AppSidebar';
import TopNav from '@/components/layout/TopNav';
import CommandPalette from '@/components/common/CommandPalette';
import NotificationPanel from '@/components/common/NotificationPanel';

export default function MainLayout() {
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <AppSidebar />

      {/* Top Nav */}
      <div
        className="transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? 'var(--spacing-sidebar-collapsed)' : 'var(--spacing-sidebar)',
        }}
      >
        <TopNav />
      </div>

      {/* Main Content */}
      <main
        className="transition-all duration-300 overflow-y-auto"
        style={{
          marginLeft: sidebarCollapsed ? 'var(--spacing-sidebar-collapsed)' : 'var(--spacing-sidebar)',
          marginTop: 'var(--spacing-topnav)',
          height: 'calc(100vh - var(--spacing-topnav))',
        }}
      >
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Overlays */}
      <CommandPalette />
      <NotificationPanel />
    </div>
  );
}
