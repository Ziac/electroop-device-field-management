import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  AlertCircle, 
  Info, 
  CheckCircle, 
  Clock, 
  Zap, 
  Wifi, 
  CreditCard, 
  Power,
  Filter,
  Search,
  Calendar,
  Download
} from 'lucide-react';

interface Log {
  id: string;
  timestamp: Date;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  stationId: string;
  details?: string;
  ocppCode?: string;
  component?: string;
}

interface LogViewerProps {
  logs: Log[];
  onLogSelect: (log: Log) => void;
}

const logIcons = {
  error: <AlertCircle className="text-red-500" size={16} />,
  warning: <AlertCircle className="text-yellow-500" size={16} />,
  info: <Info className="text-blue-500" size={16} />,
  success: <CheckCircle className="text-green-500" size={16} />
};

const logStyles = {
  error: 'border-red-100 bg-red-50',
  warning: 'border-yellow-100 bg-yellow-50',
  info: 'border-blue-100 bg-blue-50',
  success: 'border-green-100 bg-green-50'
};

const mockOCPPLogs: Log[] = [
  {
    id: '1',
    timestamp: new Date(2024, 2, 1, 14, 30),
    type: 'error',
    stationId: 'CS003',
    message: 'Authorization Failed',
    details: 'Invalid RFID card presented (Card ID: RF789012)',
    ocppCode: 'AuthorizationFailed',
    component: 'Authorization'
  },
  {
    id: '2',
    timestamp: new Date(2024, 2, 1, 14, 25),
    type: 'error',
    stationId: 'CS002',
    message: 'Ground Fault',
    details: 'Ground fault circuit interrupter triggered - Phase 2 fault detected',
    ocppCode: 'GroundFault',
    component: 'PowerElectronics'
  },
  {
    id: '3',
    timestamp: new Date(2024, 2, 1, 14, 20),
    type: 'warning',
    stationId: 'CS004',
    message: 'High Temperature',
    details: 'Charging unit temperature: 75°C (Threshold: 70°C)',
    ocppCode: 'HighTemperature',
    component: 'Temperature'
  },
  {
    id: '4',
    timestamp: new Date(2024, 2, 1, 14, 15),
    type: 'success',
    stationId: 'CS001',
    message: 'Charging Session Completed',
    details: 'Session duration: 45min, Energy delivered: 32.5kWh',
    ocppCode: 'StopTransaction',
    component: 'ChargingSession'
  },
  {
    id: '5',
    timestamp: new Date(2024, 2, 1, 14, 10),
    type: 'warning',
    stationId: 'CS002',
    message: 'Weak Signal',
    details: 'Signal strength: -95dBm (Minimum required: -85dBm)',
    ocppCode: 'WeakSignal',
    component: 'Communication'
  },
  {
    id: '6',
    timestamp: new Date(2024, 2, 1, 14, 5),
    type: 'error',
    stationId: 'CS003',
    message: 'Payment System Error',
    details: 'Transaction failed - Gateway timeout (ID: TX456789)',
    ocppCode: 'PaymentError',
    component: 'Payment'
  },
  {
    id: '7',
    timestamp: new Date(2024, 2, 1, 14, 0),
    type: 'info',
    stationId: 'CS001',
    message: 'Firmware Update Available',
    details: 'New version: 2.1.5 (Current: 2.1.4)',
    ocppCode: 'FirmwareStatusNotification',
    component: 'System'
  },
  {
    id: '8',
    timestamp: new Date(2024, 2, 1, 13, 55),
    type: 'warning',
    stationId: 'CS004',
    message: 'Power Limit Reached',
    details: 'Current limit: 32A, Requested: 35A',
    ocppCode: 'CurrentLimitReached',
    component: 'PowerManagement'
  },
  {
    id: '9',
    timestamp: new Date(2024, 2, 1, 13, 50),
    type: 'success',
    stationId: 'CS002',
    message: 'Heartbeat Successful',
    details: 'Response time: 45ms',
    ocppCode: 'Heartbeat',
    component: 'Communication'
  },
  {
    id: '10',
    timestamp: new Date(2024, 2, 1, 13, 45),
    type: 'info',
    stationId: 'CS003',
    message: 'Scheduled Maintenance',
    details: 'Maintenance window: 2024-03-15 02:00 AM',
    ocppCode: 'MaintenanceNotification',
    component: 'System'
  }
];

const getComponentIcon = (component: string) => {
  switch (component) {
    case 'PowerElectronics':
    case 'PowerManagement':
      return <Zap size={14} className="text-gray-500" />;
    case 'Communication':
      return <Wifi size={14} className="text-gray-500" />;
    case 'Payment':
      return <CreditCard size={14} className="text-gray-500" />;
    case 'ChargingSession':
    case 'Connector':
      return <Power size={14} className="text-gray-500" />;
    default:
      return <Info size={14} className="text-gray-500" />;
  }
};

export const LogViewer: React.FC<LogViewerProps> = ({ logs = mockOCPPLogs, onLogSelect }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStation, setFilterStation] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredLogs = logs.filter(log => {
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesStation = filterStation === 'all' || log.stationId === filterStation;
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ocppCode?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStation && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">System Logs</h2>
            <p className="text-sm text-gray-600">OCPP 1.6J Events and Errors</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <Calendar size={16} className="mr-2" />
              Last 24 hours
            </button>
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <select
            className="form-select min-w-[150px]"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="error">Errors</option>
            <option value="warning">Warnings</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
          </select>

          <select
            className="form-select min-w-[150px]"
            value={filterStation}
            onChange={(e) => setFilterStation(e.target.value)}
          >
            <option value="all">All Stations</option>
            <option value="CS001">Station CS001</option>
            <option value="CS002">Station CS002</option>
            <option value="CS003">Station CS003</option>
            <option value="CS004">Station CS004</option>
          </select>
        </div>
      </div>

      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Info size={24} className="mx-auto mb-2" />
            <p>No logs match your current filters</p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${logStyles[log.type]} border-l-4`}
              onClick={() => onLogSelect(log)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">{logIcons[log.type]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900">
                        Station {log.stationId}
                      </p>
                      {log.component && (
                        <span className="flex items-center space-x-1 text-xs text-gray-500">
                          {getComponentIcon(log.component)}
                          <span>{log.component}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {format(log.timestamp, 'MMM d, HH:mm:ss')}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{log.message}</p>
                  {log.details && (
                    <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                  )}
                  {log.ocppCode && (
                    <span className="inline-flex items-center px-2 py-0.5 mt-2 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      OCPP: {log.ocppCode}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};