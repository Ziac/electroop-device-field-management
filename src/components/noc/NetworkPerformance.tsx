import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Activity, AlertTriangle, Clock } from 'lucide-react';

const mockPerformanceData = [
  { time: '00:00', cpu: 45, memory: 60, disk: 55, network: 70 },
  { time: '01:00', cpu: 55, memory: 65, disk: 58, network: 75 },
  { time: '02:00', cpu: 65, memory: 70, disk: 60, network: 80 },
  // ... more data points
];

export const NetworkPerformance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">System Performance</h3>
        <div className="flex items-center space-x-4">
          <select className="form-select text-sm">
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium mb-4">CPU & Memory Usage</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="#2563eb" 
                  name="CPU (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="memory" 
                  stroke="#dc2626" 
                  name="Memory (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium mb-4">Disk & Network I/O</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="disk" 
                  stroke="#eab308" 
                  name="Disk I/O (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="network" 
                  stroke="#8b5cf6" 
                  name="Network I/O (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* System Health Indicators */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Zap className="text-blue-500 mr-2" size={20} />
              <span className="text-sm font-medium">CPU Load</span>
            </div>
            <span className="text-xl font-bold">45%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }} />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Activity className="text-red-500 mr-2" size={20} />
              <span className="text-sm font-medium">Memory</span>
            </div>
            <span className="text-xl font-bold">60%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-red-500 rounded-full" style={{ width: '60%' }} />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <AlertTriangle className="text-yellow-500 mr-2" size={20} />
              <span className="text-sm font-medium">Disk Usage</span>
            </div>
            <span className="text-xl font-bold">55%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '55%' }} />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Clock className="text-purple-500 mr-2" size={20} />
              <span className="text-sm font-medium">Uptime</span>
            </div>
            <span className="text-xl font-bold">99.9%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-purple-500 rounded-full" style={{ width: '99.9%' }} />
          </div>
        </div>
      </div>

      {/* Performance Alerts */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium mb-4">Performance Alerts</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-md">
            <div className="flex items-center">
              <AlertTriangle className="text-yellow-500 mr-2" size={16} />
              <span className="text-sm">High CPU usage detected on Server Node 3</span>
            </div>
            <span className="text-xs text-gray-500">5 minutes ago</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-red-50 rounded-md">
            <div className="flex items-center">
              <AlertTriangle className="text-red-500 mr-2" size={16} />
              <span className="text-sm">Memory usage exceeded threshold on Gateway 2</span>
            </div>
            <span className="text-xs text-gray-500">15 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};