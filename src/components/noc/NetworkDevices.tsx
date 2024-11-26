import React, { useState } from 'react';
import { Router, Wifi, Signal, Server, AlertTriangle, Settings, RefreshCw, Power } from 'lucide-react';
import { NetworkDeviceModal } from '../modals/NetworkDeviceModal';

interface NetworkDevice {
  id: string;
  name: string;
  type: 'cellular' | 'router' | 'controller';
  model: string;
  manufacturer: string;
  ipAddress: string;
  macAddress: string;
  firmwareVersion: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: Date;
  signalStrength?: number;
  cellularInfo?: {
    provider: string;
    imei: string;
    simStatus: string;
    signalStrength: number;
    technology: string;
    band: string;
    roaming: boolean;
  };
  routerInfo?: {
    ssid?: string;
    encryption?: string;
    channel?: number;
    dhcpEnabled: boolean;
    vpnStatus?: string;
    connectedClients: number;
  };
  controllerInfo?: {
    controllerType: string;
    connectedStations: string[];
    loadBalancing: boolean;
    failoverEnabled: boolean;
  };
  stations: string[];
}

const mockDevices: NetworkDevice[] = [
  {
    id: 'DEV001',
    name: 'Teltonika RUT950',
    type: 'router',
    model: 'RUT950',
    manufacturer: 'Teltonika',
    ipAddress: '192.168.1.1',
    macAddress: '00:11:22:33:44:55',
    firmwareVersion: 'RUT9XX_R_00.07.04.2',
    status: 'online',
    lastSeen: new Date(),
    routerInfo: {
      ssid: 'EV_Network_5G',
      encryption: 'WPA3',
      channel: 36,
      dhcpEnabled: true,
      vpnStatus: 'Connected',
      connectedClients: 3
    },
    stations: ['CS001', 'CS002', 'CS003']
  },
  {
    id: 'DEV002',
    name: 'Sierra Wireless MP70',
    type: 'cellular',
    model: 'MP70',
    manufacturer: 'Sierra Wireless',
    ipAddress: '10.0.0.2',
    macAddress: 'AA:BB:CC:DD:EE:FF',
    firmwareVersion: 'SWI9X07A_00.02.05.00',
    status: 'online',
    lastSeen: new Date(),
    signalStrength: 85,
    cellularInfo: {
      provider: 'Vodafone',
      imei: '123456789012345',
      simStatus: 'Active',
      signalStrength: 85,
      technology: '4G LTE',
      band: 'B20 (800 MHz)',
      roaming: false
    },
    stations: ['CS004']
  },
  {
    id: 'DEV003',
    name: 'Local Controller Hub',
    type: 'controller',
    model: 'OCPPHub-1000',
    manufacturer: 'ChargePro',
    ipAddress: '192.168.1.10',
    macAddress: '11:22:33:44:55:66',
    firmwareVersion: '2.1.0',
    status: 'warning',
    lastSeen: new Date(),
    controllerInfo: {
      controllerType: 'OCPP Local Controller',
      connectedStations: ['CS005', 'CS006', 'CS007'],
      loadBalancing: true,
      failoverEnabled: true
    },
    stations: ['CS005', 'CS006', 'CS007']
  }
];

export const NetworkDevices: React.FC = () => {
  const [devices, setDevices] = useState<NetworkDevice[]>(mockDevices);
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'router':
        return <Router size={20} />;
      case 'cellular':
        return <Signal size={20} />;
      case 'controller':
        return <Server size={20} />;
      default:
        return <Wifi size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'offline':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleRefreshDevice = (deviceId: string) => {
    // Implement device refresh logic
    console.log('Refreshing device:', deviceId);
  };

  const handleRebootDevice = (deviceId: string) => {
    if (window.confirm('Are you sure you want to reboot this device?')) {
      // Implement device reboot logic
      console.log('Rebooting device:', deviceId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Network Devices</h3>
        <button
          onClick={() => setShowDeviceModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Settings size={16} className="mr-2" />
          Add Device
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between">
              <div className="flex items-start space-x-4">
                <div className={`${getStatusColor(device.status)}`}>
                  {getDeviceIcon(device.type)}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{device.name}</h4>
                  <p className="text-sm text-gray-500">
                    {device.manufacturer} {device.model} • {device.type.toUpperCase()}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                    <span>IP: {device.ipAddress}</span>
                    <span>MAC: {device.macAddress}</span>
                    <span>Firmware: {device.firmwareVersion}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <button
                  onClick={() => handleRefreshDevice(device.id)}
                  className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  onClick={() => handleRebootDevice(device.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                >
                  <Power size={16} />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {/* Device-specific information */}
              {device.type === 'cellular' && device.cellularInfo && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Cellular Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provider:</span>
                      <span className="font-medium">{device.cellularInfo.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Technology:</span>
                      <span className="font-medium">{device.cellularInfo.technology}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Signal:</span>
                      <span className="font-medium">{device.cellularInfo.signalStrength}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Roaming:</span>
                      <span className="font-medium">{device.cellularInfo.roaming ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              )}

              {device.type === 'router' && device.routerInfo && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Router Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">SSID:</span>
                      <span className="font-medium">{device.routerInfo.ssid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Security:</span>
                      <span className="font-medium">{device.routerInfo.encryption}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">VPN:</span>
                      <span className="font-medium">{device.routerInfo.vpnStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Clients:</span>
                      <span className="font-medium">{device.routerInfo.connectedClients}</span>
                    </div>
                  </div>
                </div>
              )}

              {device.type === 'controller' && device.controllerInfo && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Controller Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{device.controllerInfo.controllerType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Connected Stations:</span>
                      <span className="font-medium">{device.controllerInfo.connectedStations.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Load Balancing:</span>
                      <span className="font-medium">{device.controllerInfo.loadBalancing ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Failover:</span>
                      <span className="font-medium">{device.controllerInfo.failoverEnabled ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Connected Stations */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Connected Stations</h5>
                <div className="space-y-2">
                  {device.stations.map((station) => (
                    <div key={station} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{station}</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-gray-700">Connected</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {device.status === 'warning' && (
              <div className="mt-4 flex items-center bg-yellow-50 p-3 rounded-lg">
                <AlertTriangle className="text-yellow-500 mr-2" size={16} />
                <span className="text-sm text-yellow-700">
                  Performance degradation detected. Check device logs for more information.
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {showDeviceModal && (
        <NetworkDeviceModal
          onClose={() => setShowDeviceModal(false)}
          onSave={(device) => {
            setDevices([...devices, device]);
            setShowDeviceModal(false);
          }}
        />
      )}
    </div>
  );
};