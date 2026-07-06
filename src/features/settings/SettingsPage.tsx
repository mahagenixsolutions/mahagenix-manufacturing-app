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
    <div className="max-w-6xl mx-auto w-full space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-subtle pb-6">
        <div>
          <h1 className="text-2xl font-black text-primary tracking-tight">Settings</h1>
          <p className="text-[13px] text-tertiary mt-1">
            System configuration, integrations & user management
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm cursor-pointer">
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-56 shrink-0 flex flex-col gap-1.5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 font-bold shadow-sm'
                  : 'text-secondary hover:bg-surface-secondary hover:text-primary font-medium'
              }`}
            >
              <tab.icon className={`w-5 h-5 shrink-0 ${activeTab === tab.id ? 'text-primary-600 dark:text-primary-400' : 'text-tertiary'}`} />
              <span className="text-[13px]">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === 'general' && (
            <div className="card-elevated p-6 sm:p-8 space-y-10">
              
              {/* Appearance Section */}
              <div>
                <h2 className="text-[15px] font-bold text-primary mb-5 border-b border-subtle pb-3">Appearance</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => { if (darkMode) toggleDarkMode(); }}
                    className={`p-5 border rounded-xl flex flex-col items-center gap-3 transition-all cursor-pointer ${
                      !darkMode 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-700 shadow-sm' 
                        : 'border-subtle bg-surface text-secondary hover:border-primary-300'
                    }`}
                  >
                    <Sun className={`w-5 h-5 ${!darkMode ? 'text-primary-600' : 'text-tertiary'}`} />
                    <span className="text-[13px] font-semibold">Light</span>
                  </button>
                  <button
                    onClick={() => { if (!darkMode) toggleDarkMode(); }}
                    className={`p-5 border rounded-xl flex flex-col items-center gap-3 transition-all cursor-pointer ${
                      darkMode 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-400 shadow-sm' 
                        : 'border-subtle bg-surface text-secondary hover:border-primary-300'
                    }`}
                  >
                    <Moon className={`w-5 h-5 ${darkMode ? 'text-primary-400' : 'text-tertiary'}`} />
                    <span className="text-[13px] font-semibold">Dark</span>
                  </button>
                  <button
                    className="p-5 border rounded-xl flex flex-col items-center gap-3 transition-all cursor-pointer border-subtle bg-surface text-secondary hover:border-primary-300"
                  >
                    <Monitor className="w-5 h-5 text-tertiary" />
                    <span className="text-[13px] font-semibold">System Default</span>
                  </button>
                </div>
              </div>

              {/* Localization Section */}
              <div>
                <h2 className="text-[15px] font-bold text-primary mb-5 border-b border-subtle pb-3">Localization</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] font-semibold text-secondary mb-2">Language</label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                      <select className="w-full pl-11 pr-4 py-2.5 bg-surface border border-subtle rounded-xl text-[13px] text-primary focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/50 appearance-none cursor-pointer">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-secondary mb-2">Timezone</label>
                    <select className="w-full px-4 py-2.5 bg-surface border border-subtle rounded-xl text-[13px] text-primary focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/50 appearance-none cursor-pointer">
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
            <div className="card-elevated p-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-surface-secondary flex items-center justify-center mb-5">
                <SettingsIcon className="w-8 h-8 text-tertiary opacity-50" />
              </div>
              <h2 className="text-[16px] font-bold text-primary mb-2">
                {tabs.find(t => t.id === activeTab)?.label} Settings
              </h2>
              <p className="text-[13px] text-tertiary max-w-sm">
                Configuration options for this module will be available in the next system update.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
