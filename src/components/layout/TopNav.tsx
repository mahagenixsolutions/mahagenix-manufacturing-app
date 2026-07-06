// ============================================================
// ForgeMES — Top Navigation Bar
// ============================================================

import { useAppStore } from "@/store/useAppStore";
import { factories } from "@/mock/data";
import { useNavigate } from "react-router-dom";
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
  Menu,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function TopNav() {
  const {
    darkMode,
    toggleDarkMode,
    selectedFactory,
    setSelectedFactory,
    openCommandPalette,
    unreadCount,
    toggleNotificationPanel,
    toggleMobileSidebar,
  } = useAppStore();

  const navigate = useNavigate();
  const [factoryOpen, setFactoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const factoryRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        factoryRef.current &&
        !factoryRef.current.contains(e.target as Node)
      ) {
        setFactoryOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Ctrl+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        openCommandPalette();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openCommandPalette]);

  const handleProfileMenuClick = (action: string) => {
    setProfileOpen(false);
    if (action === "settings") {
      navigate("/settings");
    } else if (action === "profile") {
      navigate("/employees");
    } else if (action === "support") {
      alert("Help & Support module coming soon!");
    } else if (action === "logout") {
      alert("Sign Out functionality coming soon!");
    }
  };

  return (
    <header
      className="fixed right-0 top-0 z-30 flex items-center justify-between px-3 md:px-6 border-b transition-all duration-300 w-full"
      style={{
        height: "var(--spacing-topnav)",
        background: "var(--bg-topnav)",
        borderColor: "var(--border-default)",
      }}
    >
      <style>{`
        header { width: 100%; }
        @media (min-width: 768px) {
          header { width: calc(100% - var(--spacing-sidebar-collapsed)); }
        }
        @media (min-width: 1280px) {
          header { width: calc(100% - var(--spacing-sidebar)); }
        }
      `}</style>

      {/* Left: Mobile Menu & Factory Selector */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          {/* Collapse Toggle (Mobile only) */}
          <button
            onClick={toggleMobileSidebar}
            className="xl:hidden p-2 -ml-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover transition-colors cursor-pointer"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          
          {/* Mobile Logo */}
          <div className="flex sm:hidden items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary-600 flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-primary">ForgeMES</h1>
          </div>
        </div>

        <div className="relative min-w-0 shrink flex-1 max-w-[200px] hidden sm:block" ref={factoryRef}>
          <button
            onClick={() => setFactoryOpen(!factoryOpen)}
            className="flex items-center w-full gap-1.5 px-2 py-1.5 lg:px-3 rounded-lg border bg-surface-secondary/50 hover:bg-surface-secondary transition-colors cursor-pointer group"
            style={{ borderColor: "var(--border-default)" }}
          >
            <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full shrink-0 bg-success-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            <span
              className="text-[12px] lg:text-[13px] font-medium transition-colors truncate text-left"
              style={{ color: "var(--text-secondary)" }}
            >
              {selectedFactory.name}
            </span>
            <ChevronDown
              className="w-3.5 h-3.5 lg:w-4 lg:h-4 opacity-50 shrink-0 group-hover:opacity-100 transition-opacity ml-auto"
              style={{ color: "var(--text-tertiary)" }}
            />
          </button>

          {factoryOpen && (
            <div
              className="absolute top-full left-0 mt-1 w-64 rounded-lg border py-1 z-50"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border-default)",
                boxShadow: "var(--shadow-dropdown)",
                animation: "var(--animate-scale-in)",
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
                    color:
                      f.id === selectedFactory.id
                        ? "var(--color-primary-600)"
                        : "var(--text-primary)",
                    background:
                      f.id === selectedFactory.id
                        ? "var(--color-primary-50)"
                        : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (f.id !== selectedFactory.id)
                      (e.target as HTMLElement).style.background =
                        "var(--bg-surface-hover)";
                  }}
                  onMouseLeave={(e) => {
                    if (f.id !== selectedFactory.id)
                      (e.target as HTMLElement).style.background =
                        "transparent";
                  }}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      f.id === selectedFactory.id
                        ? "bg-success-500"
                        : "bg-surface-300"
                    }`}
                  />
                  <div>
                    <div className="font-medium">{f.name}</div>
                    <div
                      className="text-[11px]"
                      style={{ color: "var(--text-tertiary)" }}
                    >
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
      <div className="flex items-center gap-1 md:gap-2">
        {/* Search */}
        <button
          onClick={openCommandPalette}
          className="hidden sm:flex items-center justify-between px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg border bg-surface hover:bg-surface-secondary transition-colors text-left group min-w-[200px] lg:min-w-[280px]"
          style={{
            borderColor: "var(--border-default)",
            color: "var(--text-tertiary)",
          }}
        >
          <div className="flex items-center gap-2 lg:gap-2.5">
            <Search className="w-[15px] h-[15px] lg:w-4 lg:h-4 group-hover:text-primary-500 transition-colors" />
            <span className="text-[12px] lg:text-[14px]">Search...</span>
          </div>
          <kbd
            className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] lg:text-[11px] font-medium border"
            style={{
              borderColor: "var(--border-default)",
              color: "var(--text-tertiary)",
            }}
          >
            Ctrl K
          </kbd>
        </button>

        {/* Quick Actions */}
        <button
          className="hidden sm:block p-2 rounded-lg transition-colors cursor-pointer"
          style={{ color: "var(--text-tertiary)" }}
          title="Quick Actions"
        >
          <Zap className="w-[18px] h-[18px]" />
        </button>

        {/* Language */}
        <button
          className="hidden sm:block p-2 rounded-lg transition-colors cursor-pointer"
          style={{ color: "var(--text-tertiary)" }}
          title="Language"
        >
          <Globe className="w-[18px] h-[18px]" />
        </button>

        {/* Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg transition-colors cursor-pointer"
          style={{ color: "var(--text-tertiary)" }}
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? (
            <Sun className="w-[18px] h-[18px]" />
          ) : (
            <Moon className="w-[18px] h-[18px]" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative hidden sm:block">
          <button
            onClick={toggleNotificationPanel}
            className="p-2 lg:p-2.5 rounded-lg transition-colors cursor-pointer group"
            style={{ color: "var(--text-tertiary)" }}
            title="Notifications"
          >
            <Bell className="w-[18px] h-[18px] lg:w-5 lg:h-5 group-hover:text-primary transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 lg:top-2.5 lg:right-2.5 w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-danger-500 border-2 border-[var(--bg-surface)]" />
            )}
          </button>
        </div>

        {/* Divider */}
        <div
          className="hidden sm:block w-px h-8 mx-2"
          style={{ background: "var(--border-default)" }}
        />

        {/* Profile */}
        <div className="relative shrink-0 hidden sm:block" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs lg:text-sm font-bold transition-all shrink-0">
              AM
            </div>
            {!profileOpen && (
              <div className="hidden md:block text-left shrink-0">
                <div
                  className="text-[13px] lg:text-[15px] font-medium transition-all"
                  style={{ color: "var(--text-primary)" }}
                >
                  Arvind Mehta
                </div>
                <div
                  className="text-[11px] lg:text-[12px] transition-all"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Plant Manager
                </div>
              </div>
            )}
          </button>

          {profileOpen && (
            <div
              className="absolute top-full right-0 mt-1 w-56 rounded-lg border py-1 z-50"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border-default)",
                boxShadow: "var(--shadow-dropdown)",
                animation: "var(--animate-scale-in)",
              }}
            >
              <div
                className="px-4 py-3 border-b"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <div
                  className="text-[13px] font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Arvind Mehta
                </div>
                <div
                  className="text-[11px]"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  arvind.mehta@forgemes.com
                </div>
              </div>
              {[
                { icon: User, label: "My Profile", action: "profile" },
                { icon: Settings, label: "Settings", action: "settings" },
                {
                  icon: HelpCircle,
                  label: "Help & Support",
                  action: "support",
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleProfileMenuClick(item.action)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[13px] transition-colors cursor-pointer hover:bg-[var(--bg-surface-hover)]"
                  style={{ color: "var(--text-primary)" }}
                >
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: "var(--text-tertiary)" }}
                  />
                  {item.label}
                </button>
              ))}
              <div
                className="border-t my-1"
                style={{ borderColor: "var(--border-subtle)" }}
              />
              <button
                onClick={() => handleProfileMenuClick("logout")}
                className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-danger-600 transition-colors cursor-pointer hover:bg-danger-50"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
