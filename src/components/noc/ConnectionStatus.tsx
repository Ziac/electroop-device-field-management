import React from 'react';
import { Wifi, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Connection {
  id: string;
  stationId: string;
  status: 'connected' | 'disconnected' | 'unstable';
  latency: number;
  signalStrength: number;
  lastHeartbeat: Date;
  protocol: string;
  ipAddress: string;
}

const mockConnections: Connection[] = [
  {
    id: '1',
    stationId: 'CS001',
    status: 'connected',
    latency: 45,
    signalStrength: 85,
    lastHeartbeat: new Date(),
    protocol: 'OCPP 1.6',
    ipAddress: '192.168.1.101'
  },
  {
    id: '2',
    stationId: 'CS002',
    status: 'unstable',
    latency: 150,
    signalStrength: 60,
    lastHeartbeat: new Date(),
    protocol: 'OCPP 1.6',
    ipAddress: '192.168.1.102'
  },
  {
    id: '3',
    stationId: 'CS003',
    status: 'disconnected',
    latency: 0,
    signalStrength: 0,
    lastHeartbeat: new Date(Date.now() - 3600000),
    protocol: 'OCPP 1.6',
    ipAddress: '192.168.1.103'
  }
];

export const ConnectionStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Connection Status</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm">Connected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm">Unstable</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm">Disconnected</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Station ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Latency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Signal Strength
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Heartbeat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Protocol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockConnections.map((connection) => (
              <tr key={connection.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {connection.stationId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    connection.status === 'connected' ? 'bg-green-100 text-green-800' :
                    connection.status === 'unstable' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {connection.status === 'connected' && <CheckCircle size={12} className="mr-1" />}
                    {connection.status === 'unstable' && <AlertTriangle size={12} className="mr-1" />}
                    {connection.status === 'disconnected' && <AlertTriangle size={12} className="mr-1" />}
                    {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {connection.latency > 0 ? `${connection.latency}ms` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Wifi size={16} className={`mr-2 ${
                      connection.signalStrength >= 80 ? 'text-green-500' :
                      connection.signalStrength >= 50 ? 'text-yellow-500' :
                      'text-red-500'
                    }`} />
                    <span className="text-sm text-gray-500">{connection.signalStrength}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-2" />
                    {connection.lastHeartbeat.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {connection.protocol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {connection.ipAddress}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};