import React from 'react';
import { XCircle, AlertTriangle, Wrench, Clock, MapPin } from 'lucide-react';

interface CriticalIssuesProps {
  stations: any[];
  onClose: () => void;
}

export const CriticalIssues: React.FC<CriticalIssuesProps> = ({ stations, onClose }) => {
  const criticalStations = stations.filter(s => s.status === 'error');

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Critical Issues</h2>
            <p className="text-gray-600">{criticalStations.length} stations require immediate attention</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {criticalStations.map((station) => (
            <div key={station.id} className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Station {station.id}</h3>
                    <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                      Critical
                    </span>
                  </div>
                  
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      {station.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-2" />
                      Issue detected 2 hours ago
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Active Alerts:</h4>
                    <ul className="space-y-2">
                      {station.alerts?.map((alert: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-red-700">
                          <span className="mt-1">•</span>
                          <span>{alert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                      <Wrench size={16} className="mr-2" />
                      Start Maintenance
                    </button>
                    <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};