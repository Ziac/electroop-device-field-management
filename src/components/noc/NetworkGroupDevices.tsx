import React, { useState } from 'react';
import { Wifi, Battery, AlertTriangle, Clock, Signal, Settings, Power, RefreshCw } from 'lucide-react';
import { NetworkStatusBadge } from './NetworkStatusBadge';
import { DeviceRestartModal } from './modals/DeviceRestartModal';
import { DeviceConfigureModal } from './modals/DeviceConfigureModal';
import { DeviceDiagnosticsModal } from './modals/DeviceDiagnosticsModal';

interface Device {
  id: string;
  name: string;
  type: 'charger' | 'router' | 'gateway';
  model: string;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  lastSeen: Date;
  powerOutput?: number;
  signalStrength?: number;
  firmware: string;
  ipAddress: string;
  location: string;
  alerts: number;
  uptime: number;
}

interface NetworkGroupDevicesProps {
  devices: Device[];
  onDeviceAction?: (deviceId: string, action: 'restart' | 'configure' | 'diagnose') => void;
}

type ActionModalType = 'restart' | 'configure' | 'diagnose' | null;

export const NetworkGroupDevices: React.FC<NetworkGroupDevicesProps> = ({ devices, onDeviceAction }) => {
  const [sortField, setSortField] = useState<keyof Device>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [activeModal, setActiveModal] = useState<ActionModalType>(null);

  const handleSort = (field: keyof Device) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDeviceAction = (device: Device, action: ActionModalType) => {
    setSelectedDevice(device);
    setActiveModal(action);
  };

  const handleModalClose = () => {
    setSelectedDevice(null);
    setActiveModal(null);
  };

  const handleActionComplete = (action: string, result: any) => {
    console.log(`${action} completed for device ${selectedDevice?.id}:`, result);
    onDeviceAction?.(selectedDevice?.id!, action as any);
    handleModalClose();
  };

  const filteredAndSortedDevices = devices
    .filter(device => filterStatus === 'all' || device.status === filterStatus)
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * direction;
      }
      if (aValue < bValue) return -1 * direction;
      if (aValue > bValue) return 1 * direction;
      return 0;
    });

  return (
    <div className="space-y-4">
      {/* Filters and Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select text-sm"
          >
            <option value="all">All Status</option>
            <option value="healthy">Healthy</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
            Export List
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Signal
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Power
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Seen
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedDevices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {device.type === 'charger' && <Battery className="h-5 w-5 text-gray-400" />}
                        {device.type === 'router' && <Wifi className="h-5 w-5 text-gray-400" />}
                        {device.type === 'gateway' && <Signal className="h-5 w-5 text-gray-400" />}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <NetworkStatusBadge status={device.status} size="sm" />
                    {device.alerts > 0 && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        {device.alerts} alerts
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.signalStrength !== undefined && (
                      <div className="flex items-center">
                        <div className="flex-1 h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              device.signalStrength >= 70 ? 'bg-green-500' :
                              device.signalStrength >= 40 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${device.signalStrength}%` }}
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{device.signalStrength}%</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.powerOutput !== undefined ? (
                      <span className="text-sm text-gray-900">{device.powerOutput} kW</span>
                    ) : (
                      <span className="text-sm text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{device.uptime}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.lastSeen.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleDeviceAction(device, 'restart')}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Restart Device"
                      >
                        <RefreshCw size={16} />
                      </button>
                      <button
                        onClick={() => handleDeviceAction(device, 'configure')}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Configure Device"
                      >
                        <Settings size={16} />
                      </button>
                      <button
                        onClick={() => handleDeviceAction(device, 'diagnose')}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Run Diagnostics"
                      >
                        <AlertTriangle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modals */}
      {selectedDevice && activeModal === 'restart' && (
        <DeviceRestartModal
          device={selectedDevice}
          onClose={handleModalClose}
          onRestart={(result) => handleActionComplete('restart', result)}
        />
      )}

      {selectedDevice && activeModal === 'configure' && (
        <DeviceConfigureModal
          device={selectedDevice}
          onClose={handleModalClose}
          onConfigure={(result) => handleActionComplete('configure', result)}
        />
      )}

      {selectedDevice && activeModal === 'diagnose' && (
        <DeviceDiagnosticsModal
          device={selectedDevice}
          onClose={handleModalClose}
          onDiagnose={(result) => handleActionComplete('diagnose', result)}
        />
      )}
    </div>
  );
};