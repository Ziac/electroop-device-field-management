import React, { useState } from 'react';
import { Zap, AlertTriangle, Calendar, Download, RefreshCw, Settings as SettingsIcon } from 'lucide-react';
import { PowerManagement } from './modals/PowerManagement';
import { Settings } from './modals/Settings';
import { CriticalIssues } from './modals/CriticalIssues';
import { ExportReport } from './modals/ExportReport';
import { ScheduleMaintenance } from './modals/ScheduleMaintenance';
import { SyncStatus } from './SyncStatus';

interface QuickActionsProps {
  stations: any[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({ stations }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const criticalStations = stations.filter(s => s.status === 'error').length;

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button 
              onClick={() => setActiveModal('critical')}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-all"
            >
              <AlertTriangle size={24} className="mb-2" />
              <span className="text-sm font-medium">Critical Issues ({criticalStations})</span>
            </button>

            <button 
              onClick={() => setActiveModal('maintenance')}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-all"
            >
              <Calendar size={24} className="mb-2" />
              <span className="text-sm font-medium">Schedule Maintenance</span>
            </button>

            <button 
              onClick={() => setActiveModal('export')}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-all"
            >
              <Download size={24} className="mb-2" />
              <span className="text-sm font-medium">Export Report</span>
            </button>

            <button 
              onClick={() => setActiveModal('power')}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-all"
            >
              <Zap size={24} className="mb-2" />
              <span className="text-sm font-medium">Power Management</span>
            </button>

            <button 
              onClick={() => setActiveModal('settings')}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-all"
            >
              <SettingsIcon size={24} className="mb-2" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>

          <SyncStatus />
        </div>
      </div>

      {activeModal === 'power' && (
        <PowerManagement stations={stations} onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'settings' && (
        <Settings onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'critical' && (
        <CriticalIssues stations={stations} onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'export' && (
        <ExportReport stations={stations} onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'maintenance' && (
        <ScheduleMaintenance stations={stations} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
};