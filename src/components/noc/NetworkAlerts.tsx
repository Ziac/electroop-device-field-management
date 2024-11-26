import React from 'react';
import { AlertTriangle, CheckCircle, Clock, MapPin, Activity } from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  location: string;
  timestamp: Date;
  status: 'active' | 'acknowledged' | 'resolved';
  metric?: string;
  value?: string;
  threshold?: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    message: 'Multiple station disconnections detected',
    location: 'North Mall Hub',
    timestamp: new Date(),
    status: 'active',
    metric: 'Connection Status',
    value: 'Offline',
    threshold: 'Online'
  },
  {
    id: '2',
    type: 'warning',
    message: 'High latency detected in network segment',
    location: 'Airport Terminal',
    timestamp: new Date(),
    status: 'acknowledged',
    metric: 'Latency',
    value: '250ms',
    threshold: '100ms'
  },
  // ... more alerts
];

export const NetworkAlerts: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Network Alerts</h3>
        <div className="flex items-center space-x-4">
          <select className="form-select text-sm">
            <option value="all">All Alerts</option>
            <option value="critical">Critical Only</option>
            <option value="warning">Warnings Only</option>
            <option value="info">Info Only</option>
          </select>
          <select className="form-select text-sm">
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {mockAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border ${
              alert.type === 'critical' ? 'border-red-200 bg-red-50' :
              alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
              'border-blue-200 bg-blue-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {alert.type === 'critical' && <AlertTriangle className="text-red-500" size={20} />}
                  {alert.type === 'warning' && <AlertTriangle className="text-yellow-500" size={20} />}
                  {alert.type === 'info' && <CheckCircle className="text-blue-500" size={20} />}
                </div>
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
                  {alert.metric && (
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <span className="flex items-center">
                        <Activity size={14} className="mr-1" />
                        {alert.metric}:
                      </span>
                      <span className={alert.type === 'critical' ? 'text-red-600' : 'text-yellow-600'}>
                        {alert.value}
                      </span>
                      <span className="text-gray-500">
                        Threshold: {alert.threshold}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                alert.status === 'active' ? 'bg-red-100 text-red-800' :
                alert.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {alert.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};