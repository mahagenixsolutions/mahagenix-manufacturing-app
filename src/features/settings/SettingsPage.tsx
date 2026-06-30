// ============================================================
// ForgeMES — Settings Page
// ============================================================

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import {
  Settings as SettingsIcon,
  Factory,
  Bell,
  Shield,
  Users,
  Database,
  Moon,
  Sun,
  Monitor,
  Globe,
  Save,
} from 'lucide-react';

const tabs = [
  { id: 'general', label: 'General', icon: SettingsIcon },
  { id: 'factory', label: 'Factory Setup', icon: Factory },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security & Access', icon: Shield },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'integrations', label: 'Integrations', icon: Database },
];

export default function SettingsPage() {
  const { darkMode, toggleDarkMode } = useAppStore();
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
          <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            System configuration and preferences
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white bg-primary-600 cursor-pointer">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer"
              style={{
                background: activeTab === tab.id ? 'var(--color-primary-50)' : 'transparent',
                color: activeTab === tab.id ? 'var(--color-primary-700)' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.id ? 600 : 500,
              }}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-[13px]">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === 'general' && (
            <div className="card-elevated p-6 space-y-8">
              <div>
                <h2 className="text-[15px] font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Appearance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => !darkMode && toggleDarkMode()}
                    className={`p-4 border rounded-xl flex flex-col items-center gap-3 transition-colors ${!darkMode ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10' : ''}`}
                    style={{ borderColor: !darkMode ? 'var(--color-primary-500)' : 'var(--border-default)', color: 'var(--text-primary)' }}
                  >
                    <Sun className="w-6 h-6" />
                    <span className="text-[13px] font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => darkMode && toggleDarkMode()}
                    className={`p-4 border rounded-xl flex flex-col items-center gap-3 transition-colors ${darkMode ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10' : ''}`}
                    style={{ borderColor: darkMode ? 'var(--color-primary-500)' : 'var(--border-default)', color: 'var(--text-primary)' }}
                  >
                    <Moon className="w-6 h-6" />
                    <span className="text-[13px] font-medium">Dark</span>
                  </button>
                  <button
                    className="p-4 border rounded-xl flex flex-col items-center gap-3 transition-colors"
                    style={{ borderColor: 'var(--border-default)', color: 'var(--text-tertiary)' }}
                  >
                    <Monitor className="w-6 h-6" />
                    <span className="text-[13px] font-medium">System Default</span>
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-[15px] font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Localization</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Language</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                      <select className="w-full pl-10 pr-3 py-2 border rounded-lg text-[13px]" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Timezone</label>
                    <select className="w-full px-3 py-2 border rounded-lg text-[13px]" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
                      <option>Asia/Kolkata (IST)</option>
                      <option>America/New_York (EST)</option>
                      <option>Europe/London (GMT)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'general' && (
            <div className="card-elevated p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-surface-secondary flex items-center justify-center mb-4 text-tertiary">
                <SettingsIcon className="w-8 h-8 opacity-50" />
              </div>
              <h2 className="text-[16px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {tabs.find(t => t.id === activeTab)?.label} Settings
              </h2>
              <p className="text-[13px] max-w-sm" style={{ color: 'var(--text-tertiary)' }}>
                Configuration options for this module will be available in the next system update.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
