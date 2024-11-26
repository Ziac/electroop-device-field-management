import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download, Upload, Clock, Activity } from 'lucide-react';

const mockTimeSeriesData = [
  { time: '00:00', bandwidth: 85, latency: 45, packetLoss: 0.1, activeConnections: 142 },
  { time: '01:00', bandwidth: 78, latency: 48, packetLoss: 0.2, activeConnections: 138 },
  { time: '02:00', bandwidth: 82, latency: 42, packetLoss: 0.1, activeConnections: 145 },
  // ... more data points
];

export const NetworkMetrics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Bandwidth Usage */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Bandwidth Usage</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTimeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="bandwidth" 
                  stroke="#2563eb" 
                  name="Bandwidth (Mbps)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Network Latency */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Network Latency</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTimeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="latency" 
                  stroke="#dc2626" 
                  name="Latency (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Packet Loss */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Packet Loss</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTimeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="packetLoss" 
                  stroke="#eab308" 
                  name="Packet Loss (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Connections */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Active Connections</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockTimeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="activeConnections" 
                  fill="#2563eb" 
                  name="Active Connections"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Download className="text-green-500 mr-2" size={20} />
              <span className="text-sm font-medium">Download</span>
            </div>
            <span className="text-xl font-bold">85 Mbps</span>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Upload className="text-blue-500 mr-2" size={20} />
              <span className="text-sm font-medium">Upload</span>
            </div>
            <span className="text-xl font-bold">35 Mbps</span>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="text-purple-500 mr-2" size={20} />
              <span className="text-sm font-medium">Avg Response</span>
            </div>
            <span className="text-xl font-bold">45 ms</span>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="text-yellow-500 mr-2" size={20} />
              <span className="text-sm font-medium">Uptime</span>
            </div>
            <span className="text-xl font-bold">99.9%</span>
          </div>
        </div>
      </div>
    </div>
  );
};