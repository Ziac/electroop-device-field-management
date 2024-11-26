import React, { useState } from 'react';
import { XCircle, FileText, Download, Calendar, Filter, BarChart3, Table } from 'lucide-react';

interface NetworkGroupReportProps {
  group: {
    id: string;
    name: string;
    type: string;
    status: string;
    deviceCount: number;
    activeAlerts: number;
    uptime: number;
    details: {
      location?: string;
      manager?: string;
      lastUpdated: Date;
      bandwidth: number;
      connectedDevices: number;
    };
  };
  onClose: () => void;
  onGenerate: (config: any) => void;
}

export const NetworkGroupReport: React.FC<NetworkGroupReportProps> = ({
  group,
  onClose,
  onGenerate
}) => {
  const [reportConfig, setReportConfig] = useState({
    timeRange: 'last7days',
    format: 'pdf',
    sections: {
      overview: true,
      performance: true,
      devices: true,
      alerts: true,
      maintenance: true
    },
    includeCharts: true,
    includeRawData: false
  });

  const handleGenerate = () => {
    // Here you would typically make an API call to generate the report
    onGenerate(reportConfig);
    
    // Simulate report generation
    setTimeout(() => {
      const filename = `${group.name.toLowerCase().replace(/\s+/g, '-')}-report.${reportConfig.format}`;
      alert(`Report "${filename}" has been generated and is ready for download!`);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Generate Report</h2>
            <p className="text-gray-600">Configure and generate a detailed report for {group.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Time Range Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Range
            </label>
            <select
              value={reportConfig.timeRange}
              onChange={(e) => setReportConfig(prev => ({ ...prev, timeRange: e.target.value }))}
              className="form-select w-full"
            >
              <option value="last24h">Last 24 Hours</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Report Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Format
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['pdf', 'excel', 'csv'].map(format => (
                <button
                  key={format}
                  onClick={() => setReportConfig(prev => ({ ...prev, format }))}
                  className={`p-4 border rounded-lg text-sm font-medium flex flex-col items-center ${
                    reportConfig.format === format
                      ? 'border-blue-500 text-blue-700 bg-blue-50'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FileText size={20} className="mb-2" />
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Report Sections */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Include Sections
            </label>
            <div className="space-y-3">
              {Object.entries(reportConfig.sections).map(([section, included]) => (
                <label key={section} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={included}
                    onChange={(e) => setReportConfig(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        [section]: e.target.checked
                      }
                    }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">
                    {section} Report
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Options
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={reportConfig.includeCharts}
                  onChange={(e) => setReportConfig(prev => ({
                    ...prev,
                    includeCharts: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Include Charts and Graphs</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={reportConfig.includeRawData}
                  onChange={(e) => setReportConfig(prev => ({
                    ...prev,
                    includeRawData: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Include Raw Data</span>
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Report Preview</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Network Group: {group.name}</p>
              <p>• Time Range: {reportConfig.timeRange.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
              <p>• Format: {reportConfig.format.toUpperCase()}</p>
              <p>• Sections: {Object.entries(reportConfig.sections)
                .filter(([_, included]) => included)
                .map(([section]) => section)
                .join(', ')}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
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