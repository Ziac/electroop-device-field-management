import React, { useState } from 'react';
import { Network, Map, Activity, AlertTriangle, BarChart3, Server, Wifi, Upload } from 'lucide-react';
import { NetworkTopology } from './noc/NetworkTopology';
import { NetworkMetrics } from './noc/NetworkMetrics';
import { NetworkMap } from './noc/NetworkMap';
import { NetworkAlerts } from './noc/NetworkAlerts';
import { NetworkPerformance } from './noc/NetworkPerformance';
import { NetworkDevices } from './noc/NetworkDevices';
import { ConnectionStatus } from './noc/ConnectionStatus';
import { NetworkGroups } from './noc/NetworkGroups';
import { FirmwareUpdateModal } from './modals/FirmwareUpdateModal';

type ViewType = 'topology' | 'metrics' | 'map' | 'alerts' | 'performance' | 'devices' | 'connections' | 'groups' | 'firmware';

export const NetworkOperationsCenter: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('groups');
  const [showFirmwareModal, setShowFirmwareModal] = useState(false);

  const views = [
    { id: 'groups', label: 'Network Groups', icon: Server },
    { id: 'topology', label: 'Network Topology', icon: Network },
    { id: 'metrics', label: 'Network Metrics', icon: BarChart3 },
    { id: 'map', label: 'Network Map', icon: Map },
    { id: 'alerts', label: 'Network Alerts', icon: AlertTriangle },
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'devices', label: 'Network Devices', icon: Network },
    { id: 'connections', label: 'Connection Status', icon: Wifi },
    { id: 'firmware', label: 'Firmware Management', icon: Upload }
  ];

  const handleViewChange = (view: ViewType) => {
    if (view === 'firmware') {
      setShowFirmwareModal(true);
    } else {
      setActiveView(view);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Network Operations Center</h2>
            <p className="text-gray-600">Monitor and manage your charging network infrastructure</p>
          </div>
        </div>

        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => handleViewChange(view.id as ViewType)}
              className={`flex items-center px-4 py-2 rounded-md whitespace-nowrap ${
                activeView === view.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <view.icon size={16} className="mr-2" />
              {view.label}
            </button>
          ))}
        </div>

        {/* Active View Content */}
        <div className="bg-gray-50 rounded-lg p-6">
          {activeView === 'groups' && <NetworkGroups />}
          {activeView === 'topology' && <NetworkTopology />}
          {activeView === 'metrics' && <NetworkMetrics />}
          {activeView === 'map' && <NetworkMap />}
          {activeView === 'alerts' && <NetworkAlerts />}
          {activeView === 'performance' && <NetworkPerformance />}
          {activeView === 'devices' && <NetworkDevices />}
          {activeView === 'connections' && <ConnectionStatus />}
        </div>
      </div>

      {/* Firmware Management Modal */}
      {showFirmwareModal && (
        <FirmwareUpdateModal
          onClose={() => setShowFirmwareModal(false)}
          onUpdate={(stationId, location, version) => {
            console.log('Updating firmware:', { stationId, location, version });
            setShowFirmwareModal(false);
          }}
        />
      )}
    </div>
  );
};