import React, { useState } from 'react';
import { FileText, Download, Upload, RefreshCw, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { TestProgressModal } from './modals/TestProgressModal';
import { GroupDiagnosticsModal } from './modals/GroupDiagnosticsModal';

interface DiagnosticsStatus {
  stationId: string;
  status: 'idle' | 'uploading' | 'uploaded' | 'failed';
  lastUpload?: Date;
  fileUrl?: string;
  error?: string;
  tests?: {
    powerOutput: boolean;
    connectivity: boolean;
    groundFault: boolean;
    temperature: boolean;
    authorization: boolean;
  };
}

export const DiagnosticsManager: React.FC = () => {
  const [showTestProgress, setShowTestProgress] = useState(false);
  const [showGroupDiagnostics, setShowGroupDiagnostics] = useState(false);
  const [selectedStation, setSelectedStation] = useState<string>('');
  const [runningTests, setRunningTests] = useState<string[]>([]);
  const [diagnosticsStatus, setDiagnosticsStatus] = useState<DiagnosticsStatus[]>([
    {
      stationId: 'CS001',
      status: 'uploaded',
      lastUpload: new Date(2024, 2, 1),
      fileUrl: 'https://example.com/diagnostics/CS001.log'
    },
    {
      stationId: 'CS002',
      status: 'failed',
      lastUpload: new Date(2024, 2, 1),
      error: 'Upload timeout'
    }
  ]);

  const handleRunTests = async (stationId: string) => {
    setRunningTests(prev => [...prev, stationId]);
    setShowTestProgress(true);
    setSelectedStation(stationId);
  };

  const handleGroupDiagnostics = () => {
    setShowGroupDiagnostics(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">System Management</h2>
            <p className="text-gray-600">Diagnostics and System Health</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleGroupDiagnostics}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FileText size={16} className="mr-2" />
              Group Diagnostics
            </button>
          </div>
        </div>

        {/* Diagnostics Status */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Diagnostics Status</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Station ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Test
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Results
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {diagnosticsStatus.map((status) => (
                  <tr key={status.stationId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {status.stationId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        status.status === 'uploaded' ? 'bg-green-100 text-green-800' :
                        status.status === 'uploading' ? 'bg-yellow-100 text-yellow-800' :
                        status.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {status.status === 'uploaded' && <CheckCircle size={12} className="mr-1" />}
                        {status.status === 'uploading' && <RefreshCw size={12} className="mr-1" />}
                        {status.status === 'failed' && <AlertTriangle size={12} className="mr-1" />}
                        {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {status.lastUpload?.toLocaleString() || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {status.fileUrl ? (
                        <a
                          href={status.fileUrl}
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <Download size={16} className="mr-1" />
                          Download
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleRunTests(status.stationId)}
                        disabled={runningTests.includes(status.stationId)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Run Tests
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Test Progress Modal */}
      {showTestProgress && selectedStation && (
        <TestProgressModal
          stationId={selectedStation}
          onClose={() => {
            setShowTestProgress(false);
            setSelectedStation('');
            setRunningTests(prev => prev.filter(id => id !== selectedStation));
          }}
          onComplete={(results) => {
            setDiagnosticsStatus(prev => prev.map(status =>
              status.stationId === selectedStation
                ? {
                    ...status,
                    status: 'uploaded',
                    lastUpload: new Date(),
                    tests: {
                      powerOutput: results.results[0].status === 'completed',
                      connectivity: results.results[1].status === 'completed',
                      groundFault: results.results[2].status === 'completed',
                      temperature: results.results[3].status === 'completed',
                      authorization: results.results[4].status === 'completed'
                    }
                  }
                : status
            ));
          }}
        />
      )}

      {/* Group Diagnostics Modal */}
      {showGroupDiagnostics && (
        <GroupDiagnosticsModal
          onClose={() => setShowGroupDiagnostics(false)}
          onRequest={(groupId, config) => {
            console.log('Requesting diagnostics for group:', groupId, 'with config:', config);
            setShowGroupDiagnostics(false);
          }}
        />
      )}
    </div>
  );
};