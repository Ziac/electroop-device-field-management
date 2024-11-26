import { create } from 'zustand';

interface SyncState {
  lastSync: Date | null;
  isSyncing: boolean;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  error: string | null;
  setSyncing: (status: boolean) => void;
  setLastSync: (date: Date) => void;
  setSyncStatus: (status: 'idle' | 'syncing' | 'success' | 'error') => void;
  setError: (error: string | null) => void;
}

export const useSyncStore = create<SyncState>((set) => ({
  lastSync: null,
  isSyncing: false,
  syncStatus: 'idle',
  error: null,
  setSyncing: (status) => set({ isSyncing: status }),
  setLastSync: (date) => set({ lastSync: date }),
  setSyncStatus: (status) => set({ syncStatus: status }),
  setError: (error) => set({ error }),
}));