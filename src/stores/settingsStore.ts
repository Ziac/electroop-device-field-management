import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Settings {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  autoSync: boolean;
  syncInterval: number;
  dateFormat: string;
  timeFormat: '12h' | '24h';
}

interface SettingsState extends Settings {
  updateSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  theme: 'light',
  language: 'en',
  notifications: true,
  autoSync: true,
  syncInterval: 300, // 5 minutes
  dateFormat: 'YYYY-MM-DD',
  timeFormat: '24h',
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'g-charge-settings',
    }
  )
);