import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface NetworkChartProps {
  data: any[];
  dataKey: string;
  stroke?: string;
  title: string;
  height?: number;
  yAxisLabel?: string;
  xAxisLabel?: string;
}

export const NetworkChart: React.FC<NetworkChartProps> = ({
  data,
  dataKey,
  stroke = '#2563eb',
  title,
  height = 300,
  yAxisLabel,
  xAxisLabel
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div style={{ height: height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              label={xAxisLabel ? { value: xAxisLabel, position: 'bottom' } : undefined}
            />
            <YAxis
              label={yAxisLabel ? { 
                value: yAxisLabel, 
                angle: -90, 
                position: 'insideLeft' 
              } : undefined}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};