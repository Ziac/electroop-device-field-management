import React, { useState } from 'react';
import { XCircle, Upload, Calendar, Clock, AlertTriangle, Server, Plus } from 'lucide-react';
import { FirmwareUpdateScheduleModal } from './FirmwareUpdateScheduleModal';

interface FirmwareUpdateModalProps {
  onClose: () => void;
  onUpdate: (stationId: string, location: string, version: string) => void;
}

interface StationGroup {
  id: string;
  name: string;
  stations: string[];
  currentVersion: string;
  lastUpdate?: Date;
  scheduledUpdates?: {
    version: string;
    scheduledTime: Date;
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
  }[];
}

const mockGroups: StationGroup[] = [
  {
    id: 'group1',
    name: 'Mall Stations',
    stations: ['CS001', 'CS002', 'CS003'],
    currentVersion: '2.1.0',
    lastUpdate: new Date(2024, 1, 15),
    scheduledUpdates: [
      {
        version: '2.1.1',
        scheduledTime: new Date(2024, 2, 15, 2, 0),
        status: 'pending'
      }
    ]
  },
  {
    id: 'group2',
    name: 'Airport Stations',
    stations: ['CS004', 'CS005'],
    currentVersion: '2.0.5',
    lastUpdate: new Date(2024, 1, 20),
    scheduledUpdates: []
  }
];

const mockFirmwareVersions = [
  {
    version: '2.1.1',
    releaseDate: new Date(2024, 2, 1),
    type: 'stable',
    changelog: [
      'Improved charging efficiency',
      'Enhanced network stability',
      'Fixed payment processing issues'
    ],
    size: '24.5 MB',
    compatibility: ['EV-2000X', 'EV-3000'],
    requiredVersion: '2.0.0'
  },
  {
    version: '2.1.0',
    releaseDate: new Date(2024, 1, 15),
    type: 'stable',
    changelog: [
      'Added support for new payment methods',
      'Improved error handling',
      'Updated security protocols'
    ],
    size: '23.8 MB',
    compatibility: ['EV-2000X', 'EV-3000'],
    requiredVersion: '2.0.0'
  }
];

export const FirmwareUpdateModal: React.FC<FirmwareUpdateModalProps> = ({
  onClose,
  onUpdate
}) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [activeTab, setActiveTab] = useState<'scheduled' | 'available' | 'history'>('scheduled');

  const handleScheduleUpdate = (config: any) => {
    console.log('Scheduling update with config:', config);
    setShowScheduleModal(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full m-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Firmware Management</h2>
            <p className="text-gray-600">Manage and schedule firmware updates for charging stations</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'scheduled', label: 'Scheduled Updates' },
              { id: 'available', label: 'Available Updates' },
              { id: 'history', label: 'Update History' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Schedule Update
          </button>
        </div>

        {/* Content */}
        {activeTab === 'scheduled' && (
          <div className="space-y-4">
            {mockGroups.map(group => (
              <div key={group.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-600">
                      {group.stations.length} stations • Current version: {group.currentVersion}
                    </p>
                  </div>
                  {group.lastUpdate && (
                    <div className="text-sm text-gray-500">
                      Last updated: {group.lastUpdate.toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Scheduled Updates */}
                {group.scheduledUpdates && group.scheduledUpdates.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Scheduled Updates</h4>
                    {group.scheduledUpdates.map((update, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded-md">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-sm font-medium">Version {update.version}</p>
                            <p className="text-xs text-gray-500">
                              Scheduled for {update.scheduledTime.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(update.status)}`}>
                          {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No updates scheduled</p>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'available' && (
          <div className="space-y-4">
            {mockFirmwareVersions.map((firmware) => (
              <div key={firmware.version} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Version {firmware.version}</h3>
                    <p className="text-sm text-gray-600">
                      Released: {firmware.releaseDate.toLocaleDateString()} • Size: {firmware.size}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    firmware.type === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {firmware.type.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Changelog</h4>
                    <ul className="mt-2 space-y-1">
                      {firmware.changelog.map((change, index) => (
                        <li key={index} className="text-sm text-gray-600">• {change}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Compatibility</h4>
                    <p className="text-sm text-gray-600">
                      Compatible models: {firmware.compatibility.join(', ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      Required version: {firmware.requiredVersion} or higher
                    </p>
                  </div>

                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Schedule Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {/* Add update history content here */}
          </div>
        )}

        {showScheduleModal && (
          <FirmwareUpdateScheduleModal
            groups={mockGroups}
            onClose={() => setShowScheduleModal(false)}
            onSchedule={handleScheduleUpdate}
          />
        )}
      </div>
    </div>
  );
};