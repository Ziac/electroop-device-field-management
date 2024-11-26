import React, { useState } from 'react';
import { XCircle, FileText, Download, Calendar, Filter } from 'lucide-react';

interface ExportReportProps {
  stations: any[];
  onClose: () => void;
}

export const ExportReport: React.FC<ExportReportProps> = ({ stations, onClose }) => {
  const [reportType, setReportType] = useState('performance');
  const [dateRange, setDateRange] = useState('last7days');
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const [format, setFormat] = useState('pdf');

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Export Report</h2>
            <p className="text-gray-600">Generate and download station reports</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="form-select w-full"
            >
              <option value="performance">Performance Report</option>
              <option value="maintenance">Maintenance History</option>
              <option value="usage">Usage Statistics</option>
              <option value="errors">Error Logs</option>
              <option value="financial">Financial Summary</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="form-select w-full"
            >
              <option value="last24h">Last 24 Hours</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stations</label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
              {stations.map((station) => (
                <label key={station.id} className="flex items-center p-2 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedStations.includes(station.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStations([...selectedStations, station.id]);
                      } else {
                        setSelectedStations(selectedStations.filter(id => id !== station.id));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Station {station.id}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setFormat('pdf')}
                className={`p-3 border rounded-lg text-sm font-medium flex flex-col items-center ${
                  format === 'pdf'
                    ? 'border-blue-500 text-blue-700 bg-blue-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText size={20} className="mb-1" />
                PDF
              </button>
              <button
                onClick={() => setFormat('excel')}
                className={`p-3 border rounded-lg text-sm font-medium flex flex-col items-center ${
                  format === 'excel'
                    ? 'border-blue-500 text-blue-700 bg-blue-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText size={20} className="mb-1" />
                Excel
              </button>
              <button
                onClick={() => setFormat('csv')}
                className={`p-3 border rounded-lg text-sm font-medium flex flex-col items-center ${
                  format === 'csv'
                    ? 'border-blue-500 text-blue-700 bg-blue-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText size={20} className="mb-1" />
                CSV
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};