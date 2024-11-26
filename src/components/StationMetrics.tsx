import React from 'react';
import { BarChart, Battery, Zap } from 'lucide-react';

interface Station {
  id: string;
  utilization: number;
  uptime: number;
  power: number;
  status: string;
}

interface StationMetricsProps {
  stations: Station[];
}

export const StationMetrics: React.FC<StationMetricsProps> = ({ stations }) => {
  const totalPower = stations.reduce((acc, station) => acc + station.power, 0);
  const avgUtilization = stations.reduce((acc, station) => acc + station.utilization, 0) / stations.length;
  const avgUptime = stations.reduce((acc, station) => acc + station.uptime, 0) / stations.length;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold mb-6">Network Performance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Zap className="text-blue-500" size={20} />
              <span className="text-sm font-medium">Total Power Output</span>
            </div>
            <span className="text-2xl font-semibold">{totalPower}kW</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-blue-500 rounded-full" 
              style={{ width: `${(totalPower / (stations.length * 150)) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Battery className="text-green-500" size={20} />
              <span className="text-sm font-medium">Average Utilization</span>
            </div>
            <span className="text-2xl font-semibold">{avgUtilization.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-green-500 rounded-full" 
              style={{ width: `${avgUtilization}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <BarChart className="text-purple-500" size={20} />
              <span className="text-sm font-medium">Network Uptime</span>
            </div>
            <span className="text-2xl font-semibold">{avgUptime.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-purple-500 rounded-full" 
              style={{ width: `${avgUptime}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};