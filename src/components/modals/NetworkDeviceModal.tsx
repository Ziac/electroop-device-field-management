import React, { useState } from 'react';
import { XCircle, Settings } from 'lucide-react';

interface NetworkDeviceModalProps {
  onClose: () => void;
  onSave: (device: any) => void;
}

interface Manufacturer {
  id: string;
  name: string;
  models: {
    [key: string]: string[]; // key is device type, value is array of models
  };
}

const manufacturers: Manufacturer[] = [
  {
    id: 'teltonika',
    name: 'Teltonika Networks',
    models: {
      router: ['RUT950', 'RUT955', 'RUTX11', 'RUTX12', 'RUT240'],
      cellular: ['TRB140', 'TRB245', 'TRM240']
    }
  },
  {
    id: 'mikrotik',
    name: 'MikroTik',
    models: {
      router: ['hAP ac³', 'RB4011', 'CCR2004', 'RB760iGS', 'wAP ac']
    }
  },
  {
    id: 'advantech',
    name: 'Advantech',
    models: {
      router: ['ICR-3231', 'ICR-3241', 'BB-SL30600000'],
      controller: ['UNO-2271G', 'UNO-2372G']
    }
  },
  {
    id: 'sierra',
    name: 'Sierra Wireless',
    models: {
      cellular: ['AirLink® MP70', 'AirLink® RV50X', 'AirLink® RV55']
    }
  },
  {
    id: 'digi',
    name: 'Digi International',
    models: {
      router: ['WR54', 'WR64', 'TX54'],
      cellular: ['IX20', 'EX15']
    }
  },
  {
    id: 'robustel',
    name: 'Robustel',
    models: {
      router: ['R3000', 'R3000 Quad', 'R2110'],
      cellular: ['M1200', 'R1510', 'R1520']
    }
  },
  {
    id: 'phoenix',
    name: 'Phoenix Contact',
    models: {
      controller: ['EV Charge Control', 'EV CC Basic', 'EV CC Advanced'],
      router: ['TC ROUTER', 'FL MGUARD']
    }
  },
  {
    id: 'inepro',
    name: 'Inepro Metering',
    models: {
      controller: ['Pro 380', 'Pro 2', 'Pro 1']
    }
  },
  {
    id: 'alfen',
    name: 'Alfen',
    models: {
      controller: ['NG920', 'ACE', 'Eve']
    }
  }
];

export const NetworkDeviceModal: React.FC<NetworkDeviceModalProps> = ({ onClose, onSave }) => {
  const [deviceType, setDeviceType] = useState('router');
  const [name, setName] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [connectivityTypes, setConnectivityTypes] = useState<string[]>(['ethernet']);
  const [firmwareVersion, setFirmwareVersion] = useState('');

  const availableManufacturers = manufacturers.filter(m => 
    Object.keys(m.models).includes(deviceType)
  );

  const availableModels = selectedManufacturer ? 
    manufacturers.find(m => m.id === selectedManufacturer)?.models[deviceType] || [] 
    : [];

  const handleManufacturerChange = (manufacturerId: string) => {
    setSelectedManufacturer(manufacturerId);
    setModel(''); // Reset model when manufacturer changes
  };

  const handleSubmit = () => {
    if (!name || !selectedManufacturer || !model || !ipAddress || !macAddress) {
      alert('Please fill in all required fields');
      return;
    }

    const manufacturer = manufacturers.find(m => m.id === selectedManufacturer);

    const newDevice = {
      id: Date.now().toString(),
      name,
      type: deviceType,
      manufacturer: manufacturer?.name,
      model,
      ipAddress,
      macAddress,
      firmwareVersion,
      status: 'online',
      lastSeen: new Date(),
      connectivityTypes,
      stations: []
    };

    onSave(newDevice);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add Network Device</h2>
            <p className="text-gray-600">Configure a new network device</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Device Type
            </label>
            <select
              value={deviceType}
              onChange={(e) => {
                setDeviceType(e.target.value);
                setSelectedManufacturer('');
                setModel('');
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="router">Router</option>
              <option value="cellular">Cellular Modem</option>
              <option value="controller">Local Controller</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Device Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter device name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manufacturer *
              </label>
              <select
                value={selectedManufacturer}
                onChange={(e) => handleManufacturerChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Manufacturer</option>
                {availableManufacturers.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model *
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                disabled={!selectedManufacturer}
              >
                <option value="">Select Model</option>
                {availableModels.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IP Address *
              </label>
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="192.168.1.1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MAC Address *
              </label>
              <input
                type="text"
                value={macAddress}
                onChange={(e) => setMacAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="00:11:22:33:44:55"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Firmware Version
            </label>
            <input
              type="text"
              value={firmwareVersion}
              onChange={(e) => setFirmwareVersion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter firmware version"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Connectivity Types
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={connectivityTypes.includes('ethernet')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setConnectivityTypes([...connectivityTypes, 'ethernet']);
                    } else {
                      setConnectivityTypes(connectivityTypes.filter(t => t !== 'ethernet'));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">Ethernet</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={connectivityTypes.includes('wifi')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setConnectivityTypes([...connectivityTypes, 'wifi']);
                    } else {
                      setConnectivityTypes(connectivityTypes.filter(t => t !== 'wifi'));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">Wi-Fi</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={connectivityTypes.includes('cellular')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setConnectivityTypes([...connectivityTypes, 'cellular']);
                    } else {
                      setConnectivityTypes(connectivityTypes.filter(t => t !== 'cellular'));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">Cellular</span>
              </label>
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
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
            >
              <Settings size={16} className="mr-2" />
              Add Device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};