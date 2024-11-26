import React, { useState } from 'react';
import { XCircle, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface GroupDiagnosticsModalProps {
  onClose: () => void;
  onRequest: (groupId: string, config: any) => void;
}

interface StationGroup {
  id: string;
  name: string;
  stations: string[];
  status: 'healthy' | 'warning' | 'critical';
}

const mockGroups: StationGroup[] = [
  {
    id: 'group1',
    name: 'Mall Stations',
    stations: ['CS001', 'CS002', 'CS003'],
    status: 'healthy'
  },
  {
    id: 'group2',
    name: 'Airport Stations',
    stations: ['CS004', 'CS005'],
    status: 'warning'
  },
  {
    id: 'group3',
    name: 'Downtown Stations',
    stations: ['CS006', 'CS007', 'CS008'],
    status: 'critical'
  }
];

export const GroupDiagnosticsModal: React.FC<GroupDiagnosticsModalProps> = ({
  onClose,
  onRequest
}) => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [diagnosticTests, setDiagnosticTests] = useState({
    powerOutput: true,
    connectivity: true,
    groundFault: true,
    temperature: true,
    authorization: true
  });
  const [scheduleTime, setScheduleTime] = useState('');
  const [priority, setPriority] = useState('normal');

  const handleRequest = () => {
    if (!selectedGroup) {
      alert('Please select a station group');
      return;
    }

    const config = {
      tests: diagnosticTests,
      scheduleTime: scheduleTime || 'immediate',
      priority
    };

    onRequest(selectedGroup, config);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Group Diagnostics</h2>
            <p className="text-gray-600">Request diagnostics for multiple charging stations</p>
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
              {mockGroups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.name} ({group.stations.length} stations)
                </option>
              ))}
            </select>
          </div>

          {/* Diagnostic Tests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnostic Tests
            </label>
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={diagnosticTests.powerOutput}
                  onChange={(e) => setDiagnosticTests(prev => ({
                    ...prev,
                    powerOutput: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Power Output Test</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={diagnosticTests.connectivity}
                  onChange={(e) => setDiagnosticTests(prev => ({
                    ...prev,
                    connectivity: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Network Connectivity Test</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={diagnosticTests.groundFault}
                  onChange={(e) => setDiagnosticTests(prev => ({
                    ...prev,
                    groundFault: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Ground Fault Test</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={diagnosticTests.temperature}
                  onChange={(e) => setDiagnosticTests(prev => ({
                    ...prev,
                    temperature: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Temperature Sensor Test</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={diagnosticTests.authorization}
                  onChange={(e) => setDiagnosticTests(prev => ({
                    ...prev,
                    authorization: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Authorization System Test</span>
              </label>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule (Optional)
            </label>
            <input
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Selected Group Info */}
          {selectedGroup && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Group Details</h3>
              {mockGroups.map(group => group.id === selectedGroup && (
                <div key={group.id} className="space-y-2">
                  <p className="text-sm"><strong>Name:</strong> {group.name}</p>
                  <p className="text-sm"><strong>Stations:</strong> {group.stations.join(', ')}</p>
                  <p className="text-sm">
                    <strong>Status:</strong>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      group.status === 'healthy' ? 'bg-green-100 text-green-800' :
                      group.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {group.status.toUpperCase()}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleRequest}
              disabled={!selectedGroup}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              <Activity size={16} className="mr-2" />
              Request Diagnostics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};