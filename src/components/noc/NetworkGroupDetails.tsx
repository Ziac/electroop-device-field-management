import React, { useState } from 'react';
import { XCircle, Server, AlertTriangle, Activity, Clock, MapPin, Users, Wifi, Signal, BarChart3, Battery, Download } from 'lucide-react';
import { NetworkChart } from './NetworkChart';
import { NetworkStatusBadge } from './NetworkStatusBadge';
import { NetworkMetricsCard } from './NetworkMetricsCard';
import { NetworkGroupDevices } from './NetworkGroupDevices';
import { NetworkGroupReport } from './NetworkGroupReport';

interface NetworkGroupDetailsProps {
  group: {
    id: string;
    name: string;
    type: string;
    status: string;
    deviceCount: number;
    activeAlerts: number;
    uptime: number;
    details: {
      location?: string;
      manager?: string;
      lastUpdated: Date;
      bandwidth: number;
      connectedDevices: number;
    };
  };
  onClose: () => void;
}

const mockDevices = [
  {
    id: 'dev-1',
    name: 'Charger Station A1',
    type: 'charger',
    model: 'EV-2000X',
    status: 'healthy',
    lastSeen: new Date(),
    powerOutput: 150,
    signalStrength: 85,
    firmware: '2.1.0',
    ipAddress: '192.168.1.101',
    location: 'North Wing',
    alerts: 0,
    uptime: 99.9
  },
  {
    id: 'dev-2',
    name: 'Router R1',
    type: 'router',
    model: 'NET-450',
    status: 'warning',
    lastSeen: new Date(),
    signalStrength: 65,
    firmware: '3.0.2',
    ipAddress: '192.168.1.1',
    location: 'Control Room',
    alerts: 1,
    uptime: 98.5
  }
];

const mockPerformanceData = [
  { time: '00:00', bandwidth: 85, latency: 45, errors: 0 },
  { time: '04:00', bandwidth: 92, latency: 42, errors: 1 },
  { time: '08:00', bandwidth: 78, latency: 48, errors: 0 },
  { time: '12:00', bandwidth: 95, latency: 40, errors: 0 },
  { time: '16:00', bandwidth: 88, latency: 43, errors: 2 },
  { time: '20:00', bandwidth: 90, latency: 41, errors: 0 }
];

export const NetworkGroupDetails: React.FC<NetworkGroupDetailsProps> = ({ group, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'devices'>('overview');
  const [showReport, setShowReport] = useState(false);

  const handleDeviceAction = (deviceId: string, action: 'restart' | 'configure' | 'diagnose') => {
    console.log(`Performing ${action} on device ${deviceId}`);
  };

  const handleGenerateReport = (config: any) => {
    console.log('Generating report with config:', config);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full m-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-gray-900">{group.name}</h2>
              <NetworkStatusBadge status={group.status as any} />
            </div>
            <p className="text-gray-600 mt-1">
              {group.type.charAt(0).toUpperCase() + group.type.slice(1)} • {group.deviceCount} devices
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'devices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Devices
            </button>
          </nav>
        </div>

        {activeTab === 'overview' ? (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <NetworkMetricsCard
                title="Uptime"
                value={group.uptime}
                unit="%"
                icon={<Activity className="text-blue-500" size={20} />}
                color="blue"
                percentage={group.uptime}
              />
              <NetworkMetricsCard
                title="Active Alerts"
                value={group.activeAlerts}
                icon={<AlertTriangle className="text-yellow-500" size={20} />}
                color="yellow"
              />
              <NetworkMetricsCard
                title="Bandwidth Usage"
                value={group.details.bandwidth}
                unit="Mbps"
                icon={<Activity className="text-green-500" size={20} />}
                color="green"
                percentage={75}
              />
              <NetworkMetricsCard
                title="Connected Devices"
                value={group.details.connectedDevices}
                icon={<Server className="text-purple-500" size={20} />}
                color="purple"
                percentage={(group.details.connectedDevices / group.deviceCount) * 100}
              />
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-2 gap-6">
              <NetworkChart
                data={mockPerformanceData}
                dataKey="bandwidth"
                title="Bandwidth Usage"
                stroke="#2563eb"
                yAxisLabel="Mbps"
              />
              <NetworkChart
                data={mockPerformanceData}
                dataKey="latency"
                title="Network Latency"
                stroke="#dc2626"
                yAxisLabel="ms"
              />
            </div>

            {/* Group Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Group Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="text-gray-400 mr-2" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{group.details.location || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="text-gray-400 mr-2" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Manager</p>
                      <p className="font-medium">{group.details.manager || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="text-gray-400 mr-2" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{group.details.lastUpdated.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Signal className="text-gray-400 mr-2" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Network Status</p>
                      <NetworkStatusBadge status={group.status as any} size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NetworkGroupDevices
            devices={mockDevices}
            onDeviceAction={handleDeviceAction}
          />
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={() => setShowReport(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
          >
            <Download size={16} className="mr-2" />
            Generate Report
          </button>
        </div>

        {/* Report Modal */}
        {showReport && (
          <NetworkGroupReport
            group={group}
            onClose={() => setShowReport(false)}
            onGenerate={handleGenerateReport}
          />
        )}
      </div>
    </div>
  );
};