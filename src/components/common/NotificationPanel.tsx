// ============================================================
// ForgeMES — Notification Panel
// ============================================================

import { useAppStore } from '@/store/useAppStore';
import {
  X,
  AlertTriangle,
  Factory,
  Wrench,
  Warehouse,
  ShieldCheck,
  CheckCheck,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const categoryIcons: Record<string, React.ReactNode> = {
  critical: <AlertTriangle className="w-4 h-4 text-danger-500" />,
  production: <Factory className="w-4 h-4 text-primary-500" />,
  maintenance: <Wrench className="w-4 h-4 text-warning-500" />,
  inventory: <Warehouse className="w-4 h-4 text-primary-500" />,
  quality: <ShieldCheck className="w-4 h-4 text-success-500" />,
};

export default function NotificationPanel() {
  const {
    notifications,
    notificationPanelOpen,
    toggleNotificationPanel,
    markAsRead,
    markAllAsRead,
    unreadCount,
  } = useAppStore();

  if (!notificationPanelOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={toggleNotificationPanel}
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 h-screen w-96 z-50 border-l flex flex-col"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
          boxShadow: 'var(--shadow-modal)',
          animation: 'var(--animate-slide-in-right)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b shrink-0"
          style={{ borderColor: 'var(--border-default)' }}
        >
          <div>
            <h2 className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>
              Notifications
            </h2>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
              {unreadCount} unread
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer"
              style={{ color: 'var(--color-primary-600)' }}
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
            <button
              onClick={toggleNotificationPanel}
              className="p-1.5 rounded-lg transition-colors cursor-pointer"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.map((ntf) => (
            <button
              key={ntf.id}
              onClick={() => markAsRead(ntf.id)}
              className="w-full flex items-start gap-3 px-5 py-3.5 text-left border-b transition-colors cursor-pointer hover:bg-[var(--bg-surface-hover)]"
              style={{
                borderColor: 'var(--border-subtle)',
                background: ntf.read ? 'transparent' : 'var(--bg-surface-secondary)',
              }}
            >
              <div className="mt-0.5 shrink-0">
                {categoryIcons[ntf.category] || categoryIcons.production}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                    {ntf.title}
                  </span>
                  {!ntf.read && (
                    <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                  )}
                </div>
                <p className="text-[12px] mt-0.5 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {ntf.message}
                </p>
                <p className="text-[10px] mt-1" style={{ color: 'var(--text-tertiary)' }}>
                  {formatDistanceToNow(new Date(ntf.timestamp), { addSuffix: true })}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
