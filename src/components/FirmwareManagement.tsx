import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, Clock, Server, Download, Plus } from 'lucide-react';
import { FirmwareUpdateModal } from './modals/FirmwareUpdateModal';
import { FirmwareUpdateScheduleModal } from './modals/FirmwareUpdateScheduleModal';
import { FirmwareUploadModal } from './modals/FirmwareUploadModal';

interface Manufacturer {
  id: string;
  name: string;
  models: string[];
  firmwareVersions: FirmwareVersion[];
}

interface FirmwareVersion {
  version: string;
  releaseDate: Date;
  type: 'stable' | 'beta';
  changelog: string[];
  size: string;
  compatibility: string[];
  requiredVersion: string;
  manufacturer: string;
  model: string;
  downloadUrl?: string;
  hash?: string;
  signature?: string;
}

interface StationGroup {
  id: string;
  name: string;
  stations: string[];
  manufacturer: string;
  model: string;
  currentVersion: string;
  lastUpdate?: Date;
  scheduledUpdates?: {
    version: string;
    scheduledTime: Date;
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
  }[];
}

const mockManufacturers: Manufacturer[] = [
  {
    id: 'autel',
    name: 'Autel',
    models: ['MaxiCharger AC', 'MaxiCharger DC'],
    firmwareVersions: []
  },
  {
    id: 'abb',
    name: 'ABB',
    models: ['Terra AC', 'Terra DC', 'Terra HP'],
    firmwareVersions: []
  },
  {
    id: 'gersan',
    name: 'Gersan',
    models: ['AC22', 'DC50', 'DC150'],
    firmwareVersions: []
  }
];

export const FirmwareManagement: React.FC = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<StationGroup | null>(null);

  const mockGroups: StationGroup[] = [
    {
      id: 'group1',
      name: 'Mall Stations',
      stations: ['CS001', 'CS002', 'CS003'],
      manufacturer: 'Autel',
      model: 'MaxiCharger DC',
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
      manufacturer: 'ABB',
      model: 'Terra DC',
      currentVersion: '2.0.5',
      lastUpdate: new Date(2024, 1, 20),
      scheduledUpdates: []
    }
  ];

  const mockVersions: FirmwareVersion[] = [
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
      compatibility: ['MaxiCharger DC'],
      requiredVersion: '2.0.0',
      manufacturer: 'Autel',
      model: 'MaxiCharger DC',
      hash: 'sha256:1234567890abcdef',
      signature: 'valid'
    },
    {
      version: '3.0.2',
      releaseDate: new Date(2024, 1, 15),
      type: 'stable',
      changelog: [
        'Added support for new payment methods',
        'Improved error handling',
        'Updated security protocols'
      ],
      size: '32.8 MB',
      compatibility: ['Terra DC', 'Terra HP'],
      requiredVersion: '3.0.0',
      manufacturer: 'ABB',
      model: 'Terra DC',
      hash: 'sha256:abcdef1234567890',
      signature: 'valid'
    }
  ];

  const handleScheduleUpdate = (config: any) => {
    console.log('Scheduling update with config:', config);
    setShowScheduleModal(false);
  };

  const handleFirmwareUpload = (firmwareData: any) => {
    console.log('Uploading firmware:', firmwareData);
    setShowUploadModal(false);
  };

  const filteredVersions = mockVersions.filter(version => {
    if (selectedManufacturer !== 'all' && version.manufacturer !== selectedManufacturer) return false;
    if (selectedModel !== 'all' && version.model !== selectedModel) return false;
    return true;
  });

  const filteredGroups = mockGroups.filter(group => {
    if (selectedManufacturer !== 'all' && group.manufacturer !== selectedManufacturer) return false;
    if (selectedModel !== 'all' && group.model !== selectedModel) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Firmware Management</h2>
            <p className="text-gray-600">Manage and deploy firmware updates across your charging network</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Plus size={16} className="mr-2" />
              Upload Firmware
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Upload size={16} className="mr-2" />
              Schedule Update
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex space-x-4">
          <select
            value={selectedManufacturer}
            onChange={(e) => {
              setSelectedManufacturer(e.target.value);
              setSelectedModel('all');
            }}
            className="form-select"
          >
            <option value="all">All Manufacturers</option>
            {mockManufacturers.map(mfr => (
              <option key={mfr.id} value={mfr.name}>{mfr.name}</option>
            ))}
          </select>

          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="form-select"
          >
            <option value="all">All Models</option>
            {selectedManufacturer !== 'all' && 
              mockManufacturers
                .find(mfr => mfr.name === selectedManufacturer)
                ?.models.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))
            }
          </select>
        </div>

        {/* Available Updates */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Available Updates</h3>
          <div className="space-y-4">
            {filteredVersions.map((version) => (
              <div key={version.version} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-medium text-gray-900">Version {version.version}</h4>
                      <span className="text-sm text-gray-600">({version.manufacturer} - {version.model})</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Released: {version.releaseDate.toLocaleDateString()} • Size: {version.size}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    version.type === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {version.type.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700">Changelog</h5>
                    <ul className="mt-2 space-y-1">
                      {version.changelog.map((change, index) => (
                        <li key={index} className="text-sm text-gray-600">• {change}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700">Compatibility</h5>
                    <p className="text-sm text-gray-600">
                      Compatible models: {version.compatibility.join(', ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      Required version: {version.requiredVersion} or higher
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <p>Hash: {version.hash}</p>
                      <p>Signature: {version.signature}</p>
                    </div>
                    <div className="space-x-3">
                      <button
                        onClick={() => window.open(version.downloadUrl)}
                        className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => setShowScheduleModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                      >
                        Schedule Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Station Groups */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Station Groups</h3>
          <div className="space-y-4">
            {filteredGroups.map((group) => (
              <div key={group.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-medium text-gray-900">{group.name}</h4>
                      <span className="text-sm text-gray-600">({group.manufacturer} - {group.model})</span>
                    </div>
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

                {group.scheduledUpdates && group.scheduledUpdates.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Scheduled Updates</h5>
                    <div className="space-y-2">
                      {group.scheduledUpdates.map((update, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-3 rounded-md">
                          <div>
                            <p className="text-sm font-medium">Version {update.version}</p>
                            <p className="text-xs text-gray-500">
                              Scheduled for {update.scheduledTime.toLocaleString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            update.status === 'completed' ? 'bg-green-100 text-green-800' :
                            update.status === 'failed' ? 'bg-red-100 text-red-800' :
                            update.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {update.status.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showUpdateModal && (
        <FirmwareUpdateModal
          onClose={() => setShowUpdateModal(false)}
          onUpdate={(stationId, location, version) => {
            console.log('Updating firmware:', { stationId, location, version });
            setShowUpdateModal(false);
          }}
        />
      )}

      {showScheduleModal && (
        <FirmwareUpdateScheduleModal
          groups={mockGroups}
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleScheduleUpdate}
        />
      )}

      {showUploadModal && (
        <FirmwareUploadModal
          manufacturers={mockManufacturers}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleFirmwareUpload}
        />
      )}
    </div>
  );
};