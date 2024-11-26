import React from 'react';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';

interface NetworkAlertCardProps {
  alert: {
    id: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    location: string;
    timestamp: Date;
    status: 'active' | 'acknowledged' | 'resolved';
  };
  onAcknowledge?: (id: string) => void;
  onResolve?: (id: string) => void;
}

export const NetworkAlertCard: React.FC<NetworkAlertCardProps> = ({
  alert,
  onAcknowledge,
  onResolve
}) => {
  const getAlertStyle = () => {
    switch (alert.type) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getStatusStyle = () => {
    switch (alert.status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'acknowledged':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getAlertStyle()}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <AlertTriangle 
            className={alert.type === 'critical' ? 'text-red-500' : 
                       alert.type === 'warning' ? 'text-yellow-500' : 
                       'text-blue-500'} 
            size={20} 
          />
          <div>
            <h4 className="font-medium text-gray-900">{alert.message}</h4>
            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <MapPin size={14} className="mr-1" />
                {alert.location}
              </span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {alert.timestamp.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle()}`}>
          {alert.status.toUpperCase()}
        </span>
      </div>

      {alert.status === 'active' && (
        <div className="mt-4 flex justify-end space-x-3">
          {onAcknowledge && (
            <button
              onClick={() => onAcknowledge(alert.id)}
              className="px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-md hover:bg-yellow-200"
            >
              Acknowledge
            </button>
          )}
          {onResolve && (
            <button
              onClick={() => onResolve(alert.id)}
              className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
            >
              Resolve
            </button>
          )}
        </div>
      )}
    </div>
  );
};