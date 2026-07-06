// ============================================================
// ForgeMES — Main Layout
// ============================================================

import { Outlet } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import AppSidebar from '@/components/layout/AppSidebar';
import TopNav from '@/components/layout/TopNav';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import CommandPalette from '@/components/common/CommandPalette';
import NotificationPanel from '@/components/common/NotificationPanel';

export default function MainLayout() {
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);
  const mobileSidebarOpen = useAppStore((s) => s.mobileSidebarOpen);
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen);

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[var(--bg-app)]">
      {/* Sidebar */}
      <AppSidebar />

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden animate-fade-in"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{
          marginLeft: 'var(--margin-left)',
        }}
      >
        <style>{`
          .flex-1 {
            --margin-left: 0px;
          }
          @media (min-width: 768px) {
            .flex-1 {
              --margin-left: var(--spacing-sidebar-collapsed);
            }
          }
          @media (min-width: 1280px) {
            .flex-1 {
              --margin-left: ${sidebarCollapsed ? 'var(--spacing-sidebar-collapsed)' : 'var(--spacing-sidebar)'};
            }
          }
        `}</style>
        
        {/* Top Nav */}
        <TopNav />

        {/* Main Content */}
        <main
          className="flex-1 overflow-y-auto w-full transition-all duration-300"
          style={{
            marginTop: 'var(--spacing-topnav)',
            height: 'calc(100vh - var(--spacing-topnav))',
          }}
        >
          <div className="h-full w-full max-w-[1920px] mx-auto min-h-0 relative">
            <div className="absolute inset-0 p-3 pb-[80px] md:p-6 overflow-x-hidden">
              <Outlet />
            </div>
          </div>
        </main>
        
        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>

      {/* Overlays */}
      <CommandPalette />
      <NotificationPanel />
    </div>
  );
}
