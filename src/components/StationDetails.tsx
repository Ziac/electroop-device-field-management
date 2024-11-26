import React, { useState } from 'react';
import { Battery, Clock, Thermometer, Zap, Activity, BarChart3, XCircle, Wifi, Signal, Calendar, Download, History } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StationDetailsProps {
  station: {
    id: string;
    location: string;
    status: string;
    power: number;
    lastMaintenance: string;
    nextMaintenance: string;
    alerts?: string[];
    networkStatus?: {
      wifi: number;
      cellular: number;
    };
    powerQuality?: {
      voltage: number;
      current: number;
      frequency: number;
      temperature: number;
    };
    currentSession?: {
      duration: string;
      energy: string;
      user: string;
    };
  };
  onClose: () => void;
}

const mockPowerData = [
  { time: '00:00', power: 120 },
  { time: '04:00', power: 95 },
  { time: '08:00', power: 150 },
  { time: '12:00', power: 180 },
  { time: '16:00', power: 140 },
  { time: '20:00', power: 160 },
];

const getSignalQuality = (level: number) => {
  if (level >= 80) return { color: 'text-green-500', text: 'Excellent' };
  if (level >= 60) return { color: 'text-yellow-500', text: 'Good' };
  if (level >= 40) return { color: 'text-orange-500', text: 'Fair' };
  return { color: 'text-red-500', text: 'Poor' };
};

export const StationDetails: React.FC<StationDetailsProps> = ({ station, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'power' | 'network' | 'maintenance'>('overview');
  const networkStatus = station.networkStatus || { wifi: 85, cellular: 75 };
  const wifiQuality = getSignalQuality(networkStatus.wifi);
  const cellularQuality = getSignalQuality(networkStatus.cellular);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'power', label: 'Power Quality' },
    { id: 'network', label: 'Network' },
    { id: 'maintenance', label: 'Maintenance' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-gray-900">Station {station.id}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                station.status === 'operational' ? 'bg-green-100 text-green-800' :
                station.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                station.status === 'error' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {station.status.charAt(0).toUpperCase() + station.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-600">{station.location}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={24} />
          </button>
        </div>

        <div className="mb-6">
          <nav className="flex space-x-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {station.currentSession && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Active Charging Session</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-blue-600">Duration</p>
                    <p className="text-lg font-medium">{station.currentSession.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600">Energy Delivered</p>
                    <p className="text-lg font-medium">{station.currentSession.energy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600">User ID</p>
                    <p className="text-lg font-medium">{station.currentSession.user}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Power Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="text-gray-500" size={20} />
                      <span className="text-sm text-gray-600">Current Output</span>
                    </div>
                    <span className="text-sm font-medium">{station.power} kW</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="text-gray-500" size={20} />
                      <span className="text-sm text-gray-600">Efficiency</span>
                    </div>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="text-gray-500" size={20} />
                      <span className="text-sm text-gray-600">Temperature</span>
                    </div>
                    <span className="text-sm font-medium">42°C</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Network Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wifi className={wifiQuality.color} size={20} />
                      <span className="text-sm text-gray-600">WiFi Signal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{networkStatus.wifi}%</span>
                      <span className={`text-xs ${wifiQuality.color}`}>({wifiQuality.text})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Signal className={cellularQuality.color} size={20} />
                      <span className="text-sm text-gray-600">Cellular Signal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{networkStatus.cellular}%</span>
                      <span className={`text-xs ${cellularQuality.color}`}>({cellularQuality.text})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Power Output (Last 24h)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPowerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="power" stroke="#2563eb" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'power' && (
          <div className="space-y-6">
            {station.powerQuality && (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Voltage & Current</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Input Voltage</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-medium">{station.powerQuality.voltage}V</span>
                        <span className="text-sm text-green-600">Normal</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full mt-2">
                        <div 
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${(station.powerQuality.voltage / 250) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Output Current</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-medium">{station.powerQuality.current}A</span>
                        <span className="text-sm text-green-600">Normal</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full mt-2">
                        <div 
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${(station.powerQuality.current / 150) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">System Health</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Frequency</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-medium">{station.powerQuality.frequency}Hz</span>
                        <span className="text-sm text-green-600">Stable</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full mt-2">
                        <div 
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${(station.powerQuality.frequency / 60) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Temperature</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-medium">{station.powerQuality.temperature}°C</span>
                        <span className="text-sm text-yellow-600">Monitor</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full mt-2">
                        <div 
                          className="h-2 bg-yellow-500 rounded-full"
                          style={{ width: `${(station.powerQuality.temperature / 80) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Power Quality Events</h3>
              <div className="space-y-2">
                {station.alerts?.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                    <Activity className="text-yellow-500 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium">{alert}</p>
                      <p className="text-xs text-gray-500">Detected at {new Date().toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Connection Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Wifi className={wifiQuality.color} size={20} />
                      <div>
                        <p className="text-sm font-medium">WiFi Signal</p>
                        <p className="text-xs text-gray-500">SSID: EV_Network_5G</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{networkStatus.wifi}%</p>
                      <p className={`text-xs ${wifiQuality.color}`}>{wifiQuality.text}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Signal className={cellularQuality.color} size={20} />
                      <div>
                        <p className="text-sm font-medium">Cellular Signal</p>
                        <p className="text-xs text-gray-500">4G LTE</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{networkStatus.cellular}%</p>
                      <p className={`text-xs ${cellularQuality.color}`}>{cellularQuality.text}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Network Metrics</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">Latency</p>
                    <p className="text-2xl font-medium">45ms</p>
                    <div className="h-2 bg-gray-200 rounded-full mt-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">Packet Loss</p>
                    <p className="text-2xl font-medium">0.1%</p>
                    <div className="h-2 bg-gray-200 rounded-full mt-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Connection History</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center space-x-2">
                    <History size={16} className="text-gray-500" />
                    <p className="text-sm">Last Connection Test</p>
                  </div>
                  <p className="text-sm text-gray-600">2 minutes ago</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center space-x-2">
                    <History size={16} className="text-gray-500" />
                    <p className="text-sm">Last Network Switch</p>
                  </div>
                  <p className="text-sm text-gray-600">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Maintenance Schedule</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-gray-500" size={20} />
                      <span className="text-sm text-gray-600">Last Service</span>
                    </div>
                    <span className="text-sm font-medium">{station.lastMaintenance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-blue-500" size={20} />
                      <span className="text-sm text-gray-600">Next Service</span>
                    </div>
                    <span className="text-sm font-medium">{station.nextMaintenance}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Documentation</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <Download size={16} className="text-gray-500" />
                      <span className="text-sm">Maintenance Manual</span>
                    </div>
                    <span className="text-xs text-gray-500">PDF</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <Download size={16} className="text-gray-500" />
                      <span className="text-sm">Troubleshooting Guide</span>
                    </div>
                    <span className="text-xs text-gray-500">PDF</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Maintenance History</h3>
              <div className="space-y-2">
                <div className="p-3 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Routine Inspection</p>
                    <span className="text-xs text-gray-500">2024-02-15</span>
                  </div>
                  <p className="text-xs text-gray-600">Performed regular maintenance checks and firmware updates</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Connector Replacement</p>
                    <span className="text-xs text-gray-500">2024-01-20</span>
                  </div>
                  <p className="text-xs text-gray-600">Replaced charging connector due to wear and tear</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Download Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
            Schedule Maintenance
          </button>
        </div>
      </div>
    </div>
  );
};