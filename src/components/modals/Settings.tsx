import React, { useState } from 'react';
import { XCircle, Moon, Sun, Bell, Globe, Clock, Save, RotateCw } from 'lucide-react';
import { useSettingsStore } from '../../stores/settingsStore';
import toast from 'react-hot-toast';

interface SettingsProps {
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { theme, language, notifications, autoSync, syncInterval, dateFormat, timeFormat, updateSettings, resetSettings } = useSettingsStore();

  const [formState, setFormState] = useState({
    theme,
    language,
    notifications,
    autoSync,
    syncInterval,
    dateFormat,
    timeFormat,
  });

  const handleSave = () => {
    updateSettings(formState);
    toast.success('Settings saved successfully');
    onClose();
  };

  const handleReset = () => {
    resetSettings();
    toast.success('Settings reset to defaults');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <p className="text-gray-600">Customize your experience</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setFormState({ ...formState, theme: 'light' })}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      formState.theme === 'light'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Sun size={16} className="mr-2" />
                    Light
                  </button>
                  <button
                    onClick={() => setFormState({ ...formState, theme: 'dark' })}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      formState.theme === 'dark'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Moon size={16} className="mr-2" />
                    Dark
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={formState.language}
                  onChange={(e) => setFormState({ ...formState, language: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formState.notifications}
                  onChange={(e) => setFormState({ ...formState, notifications: e.target.checked })}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Enable notifications</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sync Settings</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formState.autoSync}
                  onChange={(e) => setFormState({ ...formState, autoSync: e.target.checked })}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Enable auto-sync</span>
              </label>

              {formState.autoSync && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sync Interval (seconds)</label>
                  <input
                    type="number"
                    value={formState.syncInterval}
                    onChange={(e) => setFormState({ ...formState, syncInterval: Number(e.target.value) })}
                    min="60"
                    step="60"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Date & Time</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                <select
                  value={formState.dateFormat}
                  onChange={(e) => setFormState({ ...formState, dateFormat: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                <select
                  value={formState.timeFormat}
                  onChange={(e) => setFormState({ ...formState, timeFormat: e.target.value as '12h' | '24h' })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="12h">12-hour</option>
                  <option value="24h">24-hour</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Reset to Defaults
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};