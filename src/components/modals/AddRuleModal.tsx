import React, { useState } from 'react';
import { XCircle, Plus } from 'lucide-react';

interface AddRuleModalProps {
  onClose: () => void;
  onSave: (rule: any) => void;
}

export const AddRuleModal: React.FC<AddRuleModalProps> = ({ onClose, onSave }) => {
  const [ruleName, setRuleName] = useState('');
  const [parameter, setParameter] = useState('temperature');
  const [operator, setOperator] = useState('>');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('°C');
  const [severity, setSeverity] = useState('medium');
  const [actions, setActions] = useState<string[]>([]);
  const [newAction, setNewAction] = useState('');

  const parameters = [
    { value: 'temperature', label: 'Temperature', unit: '°C' },
    { value: 'power_output', label: 'Power Output', unit: 'kW' },
    { value: 'ground_fault', label: 'Ground Fault', unit: 'mA' },
    { value: 'heartbeat_interval', label: 'Heartbeat Interval', unit: 'min' },
    { value: 'fault_duration', label: 'Fault Duration', unit: 'min' },
    { value: 'auth_failures', label: 'Authorization Failures', unit: 'attempts' },
    { value: 'connector_errors', label: 'Connector Errors', unit: 'times' },
    { value: 'voltage_variation', label: 'Voltage Variation', unit: '%' }
  ];

  const ocppCodes = {
    temperature: 'HighTemperature',
    power_output: 'PowerQuality',
    ground_fault: 'GroundFault',
    heartbeat_interval: 'HeartbeatFailure',
    fault_duration: 'PersistentFault',
    auth_failures: 'SecurityEvent',
    connector_errors: 'ConnectorError',
    voltage_variation: 'PowerQuality'
  };

  const handleParameterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = parameters.find(p => p.value === e.target.value);
    setParameter(e.target.value);
    if (selected) {
      setUnit(selected.unit);
    }
  };

  const handleAddAction = () => {
    if (newAction.trim()) {
      setActions([...actions, newAction.trim()]);
      setNewAction('');
    }
  };

  const handleRemoveAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!ruleName || !value || actions.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const newRule = {
      id: Date.now().toString(),
      name: ruleName,
      condition: {
        parameter,
        operator,
        value: Number(value),
        unit
      },
      actions,
      severity,
      enabled: true,
      ocppCode: ocppCodes[parameter as keyof typeof ocppCodes]
    };

    onSave(newRule);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Rule</h2>
            <p className="text-gray-600">Configure automated response for OCPP events</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rule Name</label>
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter rule name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parameter</label>
              <select
                value={parameter}
                onChange={handleParameterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {parameters.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Operator</label>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value=">">Greater than</option>
                <option value="<">Less than</option>
                <option value=">=">Greater than or equal</option>
                <option value="<=">Less than or equal</option>
                <option value="==">Equal to</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter threshold value"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
              <input
                type="text"
                value={unit}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter action"
                onKeyPress={(e) => e.key === 'Enter' && handleAddAction()}
              />
              <button
                onClick={handleAddAction}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-2">
              {actions.map((action, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                  <span className="text-sm text-gray-700">{action}</span>
                  <button
                    onClick={() => handleRemoveAction(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              ))}
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
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Save Rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};