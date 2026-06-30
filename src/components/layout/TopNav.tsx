// ============================================================
// ForgeMES — Top Navigation Bar
// ============================================================

import { useAppStore } from '@/store/useAppStore';
import { factories } from '@/mock/data';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Globe,
  Zap,
  User,
  LogOut,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function TopNav() {
  const {
    darkMode,
    toggleDarkMode,
    selectedFactory,
    setSelectedFactory,
    openCommandPalette,
    unreadCount,
    toggleNotificationPanel,
  } = useAppStore();

  const navigate = useNavigate();
  const [factoryOpen, setFactoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const factoryRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (factoryRef.current && !factoryRef.current.contains(e.target as Node)) {
        setFactoryOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Ctrl+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openCommandPalette();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [openCommandPalette]);

  const handleProfileMenuClick = (action: string) => {
    setProfileOpen(false);
    if (action === 'settings') {
      navigate('/settings');
    } else if (action === 'profile') {
      navigate('/employees');
    } else if (action === 'support') {
      alert('Help & Support module coming soon!');
    } else if (action === 'logout') {
      alert('Sign Out functionality coming soon!');
    }
  };

  return (
    <header
      className="fixed right-0 top-0 z-30 flex items-center justify-between px-6 border-b"
      style={{
        height: 'var(--spacing-topnav)',
        background: 'var(--bg-topnav)',
        borderColor: 'var(--border-default)',
      }}
    >
      {/* Left: Factory Selector */}
      <div className="flex items-center gap-4">
        <div className="relative" ref={factoryRef}>
          <button
            onClick={() => setFactoryOpen(!factoryOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer"
            style={{
              background: 'var(--bg-surface-secondary)',
              color: 'var(--text-primary)',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
            <span>{selectedFactory.name}</span>
            <ChevronDown className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
          </button>

          {factoryOpen && (
            <div
              className="absolute top-full left-0 mt-1 w-64 rounded-lg border py-1 z-50"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                boxShadow: 'var(--shadow-dropdown)',
                animation: 'var(--animate-scale-in)',
              }}
            >
              {factories.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedFactory(f);
                    setFactoryOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-[13px] transition-colors cursor-pointer"
                  style={{
                    color: f.id === selectedFactory.id ? 'var(--color-primary-600)' : 'var(--text-primary)',
                    background: f.id === selectedFactory.id ? 'var(--color-primary-50)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (f.id !== selectedFactory.id)
                      (e.target as HTMLElement).style.background = 'var(--bg-surface-hover)';
                  }}
                  onMouseLeave={(e) => {
                    if (f.id !== selectedFactory.id)
                      (e.target as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      f.id === selectedFactory.id ? 'bg-success-500' : 'bg-surface-300'
                    }`}
                  />
                  <div>
                    <div className="font-medium">{f.name}</div>
                    <div className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                      {f.location}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Search */}
        <button
          onClick={openCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] transition-colors cursor-pointer"
          style={{
            background: 'var(--bg-surface-secondary)',
            color: 'var(--text-tertiary)',
          }}
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Search...</span>
          <kbd
            className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium border"
            style={{
              borderColor: 'var(--border-default)',
              color: 'var(--text-tertiary)',
            }}
          >
            Ctrl K
          </kbd>
        </button>

        {/* Quick Actions */}
        <button
          className="p-2 rounded-lg transition-colors cursor-pointer"
          style={{ color: 'var(--text-tertiary)' }}
          title="Quick Actions"
        >
          <Zap className="w-[18px] h-[18px]" />
        </button>

        {/* Language */}
        <button
          className="p-2 rounded-lg transition-colors cursor-pointer"
          style={{ color: 'var(--text-tertiary)' }}
          title="Language"
        >
          <Globe className="w-[18px] h-[18px]" />
        </button>

        {/* Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg transition-colors cursor-pointer"
          style={{ color: 'var(--text-tertiary)' }}
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>

        {/* Notifications */}
        <button
          onClick={toggleNotificationPanel}
          className="p-2 rounded-lg transition-colors relative cursor-pointer"
          style={{ color: 'var(--text-tertiary)' }}
          title="Notifications"
        >
          <Bell className="w-[18px] h-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-danger-500 text-white text-[9px] font-bold flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-8 mx-2" style={{ background: 'var(--border-default)' }} />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
              AM
            </div>
            {!profileOpen && (
              <div className="hidden md:block text-left">
                <div className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>
                  Arvind Mehta
                </div>
                <div className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                  Plant Manager
                </div>
              </div>
            )}
          </button>

          {profileOpen && (
            <div
              className="absolute top-full right-0 mt-1 w-56 rounded-lg border py-1 z-50"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                boxShadow: 'var(--shadow-dropdown)',
                animation: 'var(--animate-scale-in)',
              }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Arvind Mehta
                </div>
                <div className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                  arvind.mehta@forgemes.com
                </div>
              </div>
              {[
                { icon: User, label: 'My Profile', action: 'profile' },
                { icon: Settings, label: 'Settings', action: 'settings' },
                { icon: HelpCircle, label: 'Help & Support', action: 'support' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleProfileMenuClick(item.action)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[13px] transition-colors cursor-pointer hover:bg-[var(--bg-surface-hover)]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <item.icon className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  {item.label}
                </button>
              ))}
              <div className="border-t my-1" style={{ borderColor: 'var(--border-subtle)' }} />
              <button
                onClick={() => handleProfileMenuClick('logout')}
                className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-danger-600 transition-colors cursor-pointer hover:bg-danger-50"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
