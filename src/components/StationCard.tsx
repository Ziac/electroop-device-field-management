import React from 'react';
import { Battery, AlertTriangle, CheckCircle, Clock, Wifi, Signal, Wrench } from 'lucide-react';

interface StationCardProps {
  id: string;
  location: string;
  status: 'operational' | 'warning' | 'error';
  power: number;
  lastMaintenance: string;
  nextMaintenance: string;
  alerts?: string[];
  networkStatus: {
    wifi: number;
    cellular: number;
  };
  index: number;
  onMaintenanceClick: () => void;
}

const statusColors = {
  operational: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800'
};

const statusIcons = {
  operational: CheckCircle,
  warning: AlertTriangle,
  error: AlertTriangle
};

const getSignalStrength = (level: number) => {
  if (level >= 80) return 'text-green-500';
  if (level >= 60) return 'text-yellow-500';
  return 'text-red-500';
};

export const StationCard: React.FC<StationCardProps> = ({
  id,
  location,
  status,
  power,
  lastMaintenance,
  nextMaintenance,
  alerts = [],
  networkStatus,
  onMaintenanceClick
}) => {
  const StatusIcon = statusIcons[status];

  const handleMaintenanceClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    onMaintenanceClick();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Station {id}</h3>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Wifi size={16} className={getSignalStrength(networkStatus.wifi)} />
            <Signal size={16} className={getSignalStrength(networkStatus.cellular)} />
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusColors[status]}`}>
            <StatusIcon size={16} />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Battery className="text-gray-500" size={20} />
          <div>
            <p className="text-sm font-medium text-gray-900">{power} kW</p>
            <p className="text-xs text-gray-600">Power Output</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="text-gray-500" size={20} />
          <div>
            <p className="text-sm font-medium text-gray-900">{nextMaintenance}</p>
            <p className="text-xs text-gray-600">Next Service</p>
          </div>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="mt-4 bg-red-50 rounded-md p-3">
          <h4 className="text-sm font-medium text-red-800 flex items-center gap-2">
            <AlertTriangle size={16} />
            Active Alerts
          </h4>
          <ul className="mt-2 text-sm text-red-700">
            {alerts.map((alert, index) => (
              <li key={index} className="flex items-center gap-1">
                <span>•</span>
                {alert}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button 
          onClick={handleMaintenanceClick}
          className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center justify-center gap-2"
        >
          <Wrench size={16} />
          Start Maintenance
        </button>
      </div>
    </div>
  );
};