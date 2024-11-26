import React, { useState } from 'react';
import { XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface DeviceRestartModalProps {
  device: any;
  onClose: () => void;
  onRestart: (result: any) => void;
}

export const DeviceRestartModal: React.FC<DeviceRestartModalProps> = ({
  device,
  onClose,
  onRestart
}) => {
  const [isRestarting, setIsRestarting] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleRestart = async () => {
    if (confirmText !== device.name) {
      alert('Please enter the device name correctly to confirm restart');
      return;
    }

    setIsRestarting(true);
    
    // Simulate restart process
    setTimeout(() => {
      onRestart({
        success: true,
        timestamp: new Date(),
        message: 'Device restarted successfully'
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertTriangle size={24} />
            <h2 className="text-xl font-bold">Restart Device</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-700">
              Warning: Restarting this device will temporarily interrupt all active connections and services.
              This action cannot be undone.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Device Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm"><strong>Name:</strong> {device.name}</p>
              <p className="text-sm"><strong>Type:</strong> {device.type}</p>
              <p className="text-sm"><strong>Location:</strong> {device.location}</p>
              <p className="text-sm"><strong>IP Address:</strong> {device.ipAddress}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type the device name to confirm restart
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder={device.name}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={isRestarting}
            >
              Cancel
            </button>
            <button
              onClick={handleRestart}
              disabled={isRestarting || confirmText !== device.name}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              {isRestarting ? (
                <>
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                  Restarting...
                </>
              ) : (
                <>
                  <RefreshCw size={16} className="mr-2" />
                  Restart Device
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};