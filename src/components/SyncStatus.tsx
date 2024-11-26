import React from 'react';
import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useSyncStore } from '../stores/syncStore';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export const SyncStatus: React.FC = () => {
  const { lastSync, isSyncing, syncStatus, error, setSyncing, setLastSync, setSyncStatus, setError } = useSyncStore();

  const handleSync = async () => {
    if (isSyncing) return;

    setSyncing(true);
    setSyncStatus('syncing');
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setLastSync(new Date());
      setSyncStatus('success');
      toast.success('Sync completed successfully');
    } catch (err) {
      setSyncStatus('error');
      setError(err instanceof Error ? err.message : 'Sync failed');
      toast.error('Failed to sync data');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleSync}
        disabled={isSyncing}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium ${
          isSyncing
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
        }`}
      >
        <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
        <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
      </button>

      <div className="flex items-center space-x-2 text-sm">
        {syncStatus === 'success' && <CheckCircle size={16} className="text-green-500" />}
        {syncStatus === 'error' && <XCircle size={16} className="text-red-500" />}
        {lastSync && (
          <div className="flex items-center text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>Last sync: {format(lastSync, 'HH:mm:ss')}</span>
          </div>
        )}
      </div>

      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};