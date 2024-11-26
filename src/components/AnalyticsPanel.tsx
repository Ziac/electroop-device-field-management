import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AnalyticsPanelProps {
  stations: any[];
  dateRange: {
    start: Date;
    end: Date;
  };
}

const mockUsageData = [
  { time: '00:00', power: 120, temperature: 42, efficiency: 95 },
  { time: '03:00', power: 80, temperature: 45, efficiency: 93 },
  { time: '06:00', power: 150, temperature: 48, efficiency: 94 },
  { time: '09:00', power: 250, temperature: 52, efficiency: 92 },
  { time: '12:00', power: 320, temperature: 55, efficiency: 91 },
  { time: '15:00', power: 280, temperature: 50, efficiency: 93 },
  { time: '18:00', power: 350, temperature: 47, efficiency: 94 },
  { time: '21:00', power: 200, temperature: 44, efficiency: 95 }
];

const mockErrorData = [
  { day: 'Mon', errors: 2, warnings: 5 },
  { day: 'Tue', errors: 1, warnings: 3 },
  { day: 'Wed', errors: 3, warnings: 4 },
  { day: 'Thu', errors: 0, warnings: 2 },
  { day: 'Fri', errors: 2, warnings: 6 },
  { day: 'Sat', errors: 1, warnings: 3 },
  { day: 'Sun', errors: 0, warnings: 2 }
];

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ stations, dateRange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Power & Temperature Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Power Output & Temperature</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="power"
                  stroke="#2563eb"
                  name="Power (kW)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#dc2626"
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Error & Warning Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">System Issues (Last 7 Days)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockErrorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="errors" fill="#dc2626" name="Critical Errors" />
                <Bar dataKey="warnings" fill="#eab308" name="Warnings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Station Performance Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Technical Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Station ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Power Output
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stations.map((station) => (
                <tr key={station.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {station.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {station.uptime}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {station.powerQuality?.temperature || '-'}°C
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {station.power} kW
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    95%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${station.status === 'operational' ? 'bg-green-100 text-green-800' :
                        station.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        station.status === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {station.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};