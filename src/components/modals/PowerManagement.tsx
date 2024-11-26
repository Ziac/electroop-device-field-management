import React, { useState } from 'react';
import { XCircle, Zap, Battery, AlertTriangle, Power } from 'lucide-react';

interface PowerManagementProps {
  stations: any[];
  onClose: () => void;
}

export const PowerManagement: React.FC<PowerManagementProps> = ({ stations, onClose }) => {
  const [powerLimits, setPowerLimits] = useState<Record<string, number>>(
    Object.fromEntries(stations.map(s => [s.id, s.power]))
  );

  const handlePowerChange = (stationId: string, value: number) => {
    setPowerLimits(prev => ({
      ...prev,
      [stationId]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Power Management</h2>
            <p className="text-gray-600">Adjust power output limits for charging stations</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="text-yellow-700 mr-2" size={20} />
              <p className="text-sm text-yellow-700">
                Adjusting power limits may affect charging times and user experience
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {stations.map((station) => (
              <div key={station.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Station {station.id}</h3>
                    <p className="text-sm text-gray-600">{station.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Power size={16} className={station.status === 'operational' ? 'text-green-500' : 'text-gray-400'} />
                    <span className={`text-sm ${station.status === 'operational' ? 'text-green-600' : 'text-gray-500'}`}>
                      {station.status === 'operational' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Power Limit</span>
                    <span>{powerLimits[station.id]} kW</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="350"
                    value={powerLimits[station.id]}
                    onChange={(e) => handlePowerChange(station.id, Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0 kW</span>
                    <span>350 kW</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Current Load</p>
                      <p className="font-medium">{station.power} kW</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Efficiency</p>
                      <p className="font-medium">95%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};