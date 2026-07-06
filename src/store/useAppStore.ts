// ============================================================
// ForgeMES — App Store (Zustand)
// ============================================================

import { create } from "zustand";
import type { Factory, Notification } from "@/types";
import { factories, notifications as mockNotifications } from "@/mock/data";

interface AppState {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  mobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;

  // Dark mode
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Factory selector
  selectedFactory: Factory;
  setSelectedFactory: (factory: Factory) => void;

  // Command palette
  commandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;

  // Notifications
  notifications: Notification[];
  unreadCount: number;
  notificationPanelOpen: boolean;
  toggleNotificationPanel: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;

  // Global search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Sidebar
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  mobileSidebarOpen: false,
  toggleMobileSidebar: () =>
    set((s) => ({ mobileSidebarOpen: !s.mobileSidebarOpen })),
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),

  // Dark mode
  darkMode: false,
  toggleDarkMode: () =>
    set((s) => {
      const next = !s.darkMode;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("forgemes-dark-mode", JSON.stringify(next));
      return { darkMode: next };
    }),

  // Factory
  selectedFactory: factories[0],
  setSelectedFactory: (factory) => set({ selectedFactory: factory }),

  // Command palette
  commandPaletteOpen: false,
  openCommandPalette: () => set({ commandPaletteOpen: true }),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),

  // Notifications
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.read).length,
  notificationPanelOpen: false,
  toggleNotificationPanel: () =>
    set((s) => ({ notificationPanelOpen: !s.notificationPanelOpen })),
  markAsRead: (id) =>
    set((s) => {
      const updated = s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),
  markAllAsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  // Search
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
