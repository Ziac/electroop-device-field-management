import React, { useState, useEffect } from 'react';
import { XCircle, AlertTriangle, Activity, CheckCircle, Clock } from 'lucide-react';

interface DeviceDiagnosticsModalProps {
  device: any;
  onClose: () => void;
  onDiagnose: (result: any) => void;
}

interface DiagnosticTest {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: string;
  progress?: number;
}

export const DeviceDiagnosticsModal: React.FC<DeviceDiagnosticsModalProps> = ({
  device,
  onClose,
  onDiagnose
}) => {
  const [tests, setTests] = useState<DiagnosticTest[]>([
    { id: 'network', name: 'Network Connectivity', status: 'pending' },
    { id: 'hardware', name: 'Hardware Health Check', status: 'pending' },
    { id: 'firmware', name: 'Firmware Verification', status: 'pending' },
    { id: 'power', name: 'Power Systems', status: 'pending' },
    { id: 'memory', name: 'Memory Usage', status: 'pending' }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState(0);

  useEffect(() => {
    if (isRunning && currentTest < tests.length) {
      const timer = setTimeout(() => {
        setTests(prev => prev.map((test, index) => {
          if (index === currentTest) {
            return {
              ...test,
              status: Math.random() > 0.2 ? 'completed' : 'failed',
              result: Math.random() > 0.2 ? 'OK' : 'Error detected'
            };
          }
          return test;
        }));
        setCurrentTest(prev => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (isRunning && currentTest >= tests.length) {
      setIsRunning(false);
      const results = {
        success: tests.every(test => test.status === 'completed'),
        timestamp: new Date(),
        tests: tests.map(test => ({
          name: test.name,
          status: test.status,
          result: test.result
        }))
      };
      onDiagnose(results);
    }
  }, [isRunning, currentTest, tests]);

  const handleStartDiagnostics = () => {
    setIsRunning(true);
    setTests(prev => prev.map(test => ({ ...test, status: 'pending', result: undefined })));
    setCurrentTest(0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-gray-400" />;
      case 'running':
        return <Activity size={16} className="text-blue-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'failed':
        return <AlertTriangle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full m-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Run Diagnostics</h2>
            <p className="text-sm text-gray-600">{device.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Device Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Device Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Type:</strong> {device.type}</p>
                <p><strong>Model:</strong> {device.model}</p>
              </div>
              <div>
                <p><strong>IP Address:</strong> {device.ipAddress}</p>
                <p><strong>Firmware:</strong> {device.firmware}</p>
              </div>
            </div>
          </div>

          {/* Diagnostic Tests */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Diagnostic Tests</h3>
            <div className="space-y-3">
              {tests.map((test, index) => (
                <div
                  key={test.id}
                  className={`p-3 rounded-lg ${
                    test.status === 'failed' ? 'bg-red-50' :
                    test.status === 'completed' ? 'bg-green-50' :
                    index === currentTest && isRunning ? 'bg-blue-50' :
                    'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(index === currentTest && isRunning ? 'running' : test.status)}
                      <span className="text-sm font-medium">{test.name}</span>
                    </div>
                    {test.result && (
                      <span className={`text-sm ${
                        test.status === 'failed' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {test.result}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={isRunning}
            >
              Close
            </button>
            <button
              onClick={handleStartDiagnostics}
              disabled={isRunning}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              {isRunning ? (
                <>
                  <Activity size={16} className="mr-2 animate-spin" />
                  Running Diagnostics...
                </>
              ) : (
                <>
                  <Activity size={16} className="mr-2" />
                  Start Diagnostics
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};