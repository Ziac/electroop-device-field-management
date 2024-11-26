import React from 'react';
import { Activity } from 'lucide-react';

interface NetworkMetricsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  icon?: React.ReactNode;
  color?: string;
  percentage?: number;
}

export const NetworkMetricsCard: React.FC<NetworkMetricsCardProps> = ({
  title,
  value,
  unit,
  change,
  icon = <Activity />,
  color = 'blue',
  percentage
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          {icon}
        </div>
        {change !== undefined && (
          <span className={`text-sm font-medium ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="mt-2 text-3xl font-bold">
          {value}
          {unit && <span className="text-lg font-medium text-gray-500 ml-1">{unit}</span>}
        </p>
      </div>
      {percentage !== undefined && (
        <div className="mt-4">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full bg-${color}-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};