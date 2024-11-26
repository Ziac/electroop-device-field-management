import React, { useState } from 'react';
import { XCircle, Upload, Calendar, Clock, AlertTriangle, Server } from 'lucide-react';

interface FirmwareUpdateScheduleModalProps {
  groups: {
    id: string;
    name: string;
    stations: string[];
    currentVersion: string;
  }[];
  onClose: () => void;
  onSchedule: (config: any) => void;
}

export const FirmwareUpdateScheduleModal: React.FC<FirmwareUpdateScheduleModalProps> = ({
  groups,
  onClose,
  onSchedule
}) => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [updateConfig, setUpdateConfig] = useState({
    version: '',
    scheduledTime: '',
    strategy: 'rolling',
    retryAttempts: 3,
    retryInterval: 30,
    rollbackEnabled: true,
    maintenanceWindow: false,
    notifyUsers: true
  });

  const handleSchedule = () => {
    if (!selectedGroup || !updateConfig.version) {
      alert('Please fill in all required fields');
      return;
    }

    onSchedule({
      groupId: selectedGroup,
      ...updateConfig
    });
    onClose();
  };

  const selectedGroupInfo = groups.find(g => g.id === selectedGroup);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Schedule Firmware Update</h2>
            <p className="text-gray-600">Plan and schedule firmware updates for station groups</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Group Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Station Group
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a group...</option>
              {groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.name} ({group.stations.length} stations)
                </option>
              ))}
            </select>
            {selectedGroupInfo && (
              <p className="mt-1 text-sm text-gray-500">
                Current version: {selectedGroupInfo.currentVersion}
              </p>
            )}
          </div>

          {/* Update Configuration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Version
              </label>
              <input
                type="text"
                value={updateConfig.version}
                onChange={(e) => setUpdateConfig({ ...updateConfig, version: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., 2.1.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule Time
              </label>
              <input
                type="datetime-local"
                value={updateConfig.scheduledTime}
                onChange={(e) => setUpdateConfig({ ...updateConfig, scheduledTime: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Update Strategy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update Strategy
            </label>
            <select
              value={updateConfig.strategy}
              onChange={(e) => setUpdateConfig({ ...updateConfig, strategy: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="rolling">Rolling Update (Sequential)</option>
              <option value="parallel">Parallel Update (All at once)</option>
              <option value="batched">Batched Update (Groups of 5)</option>
            </select>
          </div>

          {/* Advanced Options */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Advanced Options</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retry Attempts
                </label>
                <input
                  type="number"
                  value={updateConfig.retryAttempts}
                  onChange={(e) => setUpdateConfig({ ...updateConfig, retryAttempts: Number(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="0"
                  max="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retry Interval (minutes)
                </label>
                <input
                  type="number"
                  value={updateConfig.retryInterval}
                  onChange={(e) => setUpdateConfig({ ...updateConfig, retryInterval: Number(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="15"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={updateConfig.rollbackEnabled}
                  onChange={(e) => setUpdateConfig({ ...updateConfig, rollbackEnabled: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Enable automatic rollback on failure</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={updateConfig.maintenanceWindow}
                  onChange={(e) => setUpdateConfig({ ...updateConfig, maintenanceWindow: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Schedule during maintenance window only</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={updateConfig.notifyUsers}
                  onChange={(e) => setUpdateConfig({ ...updateConfig, notifyUsers: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Notify users before update</span>
              </label>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="text-yellow-700 mt-0.5 mr-3" size={20} />
              <div className="text-sm text-yellow-700">
                <p className="font-medium">Important Note:</p>
                <p>Firmware updates will temporarily interrupt charging services. Please ensure updates are scheduled during off-peak hours.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSchedule}
              disabled={!selectedGroup || !updateConfig.version}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              <Upload size={16} className="mr-2" />
              Schedule Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};