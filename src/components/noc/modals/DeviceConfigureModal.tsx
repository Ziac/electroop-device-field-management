import React, { useState } from 'react';
import { XCircle, Save, Settings } from 'lucide-react';

interface DeviceConfigureModalProps {
  device: any;
  onClose: () => void;
  onConfigure: (result: any) => void;
}

export const DeviceConfigureModal: React.FC<DeviceConfigureModalProps> = ({
  device,
  onClose,
  onConfigure
}) => {
  const [config, setConfig] = useState({
    networkMode: device.type === 'router' ? 'bridge' : 'client',
    ipAddress: device.ipAddress,
    subnetMask: '255.255.255.0',
    gateway: '192.168.1.1',
    dns1: '8.8.8.8',
    dns2: '8.8.4.4',
    mtu: '1500',
    powerLimit: device.powerOutput || 150,
    firmware: device.firmware
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate configuration update
    setTimeout(() => {
      onConfigure({
        success: true,
        timestamp: new Date(),
        message: 'Device configuration updated successfully',
        config
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-2">
            <Settings size={24} className="text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Configure Device</h2>
              <p className="text-sm text-gray-600">{device.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Network Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Network Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Network Mode
                </label>
                <select
                  value={config.networkMode}
                  onChange={(e) => setConfig({ ...config, networkMode: e.target.value })}
                  className="form-select w-full"
                >
                  <option value="bridge">Bridge</option>
                  <option value="client">Client</option>
                  <option value="ap">Access Point</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  IP Address
                </label>
                <input
                  type="text"
                  value={config.ipAddress}
                  onChange={(e) => setConfig({ ...config, ipAddress: e.target.value })}
                  className="form-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Subnet Mask
                </label>
                <input
                  type="text"
                  value={config.subnetMask}
                  onChange={(e) => setConfig({ ...config, subnetMask: e.target.value })}
                  className="form-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Gateway
                </label>
                <input
                  type="text"
                  value={config.gateway}
                  onChange={(e) => setConfig({ ...config, gateway: e.target.value })}
                  className="form-input w-full"
                />
              </div>
            </div>
          </div>

          {/* DNS Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">DNS Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Primary DNS
                </label>
                <input
                  type="text"
                  value={config.dns1}
                  onChange={(e) => setConfig({ ...config, dns1: e.target.value })}
                  className="form-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Secondary DNS
                </label>
                <input
                  type="text"
                  value={config.dns2}
                  onChange={(e) => setConfig({ ...config, dns2: e.target.value })}
                  className="form-input w-full"
                />
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Advanced Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  MTU Size
                </label>
                <input
                  type="number"
                  value={config.mtu}
                  onChange={(e) => setConfig({ ...config, mtu: e.target.value })}
                  className="form-input w-full"
                />
              </div>
              {device.type === 'charger' && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Power Limit (kW)
                  </label>
                  <input
                    type="number"
                    value={config.powerLimit}
                    onChange={(e) => setConfig({ ...config, powerLimit: Number(e.target.value) })}
                    className="form-input w-full"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <>
                  <Save size={16} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};