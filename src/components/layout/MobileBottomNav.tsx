import React from "react";
import { Search, Zap, Globe, Bell } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";

export default function MobileBottomNav() {
  const { openCommandPalette, unreadCount, toggleNotificationPanel } = useAppStore();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 sm:hidden border-t bg-surface/90 backdrop-blur-md pb-safe" style={{ borderColor: "var(--border-default)" }}>
      <div className="flex items-center justify-around px-2 py-3">
        {/* Search */}
        <button
          onClick={openCommandPalette}
          className="p-2 rounded-lg text-tertiary hover:text-primary transition-colors flex flex-col items-center gap-1"
        >
          <Search className="w-[20px] h-[20px]" />
        </button>

        {/* Quick Actions */}
        <button
          className="p-2 rounded-lg text-tertiary hover:text-primary transition-colors flex flex-col items-center gap-1"
        >
          <Zap className="w-[20px] h-[20px]" />
        </button>

        {/* Language */}
        <button
          className="p-2 rounded-lg text-tertiary hover:text-primary transition-colors flex flex-col items-center gap-1"
        >
          <Globe className="w-[20px] h-[20px]" />
        </button>

        {/* Notifications */}
        <button
          onClick={toggleNotificationPanel}
          className="relative p-2 rounded-lg text-tertiary hover:text-primary transition-colors flex flex-col items-center gap-1"
        >
          <Bell className="w-[20px] h-[20px]" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-500 border-[1.5px] border-[var(--bg-surface)]" />
          )}
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate("/employees")}
          className="p-2 rounded-lg text-tertiary hover:text-primary transition-colors flex flex-col items-center gap-1"
        >
          <div className="w-[22px] h-[22px] rounded-full bg-primary-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            AM
          </div>
        </button>
      </div>
    </div>
  );
}
