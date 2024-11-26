import React, { useState, useRef } from 'react';
import { XCircle, Plus, AlertTriangle, Save, Trash2, Zap, Wifi, Thermometer, Power, Shield, Bell } from 'lucide-react';
import { useClickOutside } from '../hooks/useClickOutside';

interface Rule {
  id: string;
  name: string;
  condition: string;
  action: string;
  severity: 'low' | 'medium' | 'high';
  enabled: boolean;
}

interface RuleEngineProps {
  onClose: () => void;
}

const predefinedRules = [
  {
    id: '1',
    name: 'High Temperature Alert',
    condition: 'Temperature > 75°C',
    action: 'Send notification and reduce power',
    severity: 'high',
    enabled: true
  },
  {
    id: '2',
    name: 'Low Power Output',
    condition: 'Power Output < 50%',
    action: 'Send notification to maintenance',
    severity: 'medium',
    enabled: true
  }
] as Rule[];

export const RuleEngine: React.FC<RuleEngineProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [rules, setRules] = useState<Rule[]>(predefinedRules);
  const [showAddRule, setShowAddRule] = useState(false);

  useClickOutside(modalRef, onClose);

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleToggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div ref={modalRef} className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Rule Engine</h2>
            <p className="text-gray-600">Manage automated responses to events</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowAddRule(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={16} className="mr-2" />
            Add New Rule
          </button>
        </div>

        <div className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{rule.name}</h3>
                  <p className="text-sm text-gray-600">{rule.condition}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    rule.severity === 'high' ? 'bg-red-100 text-red-800' :
                    rule.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {rule.severity.toUpperCase()}
                  </span>
                  <button
                    onClick={() => handleToggleRule(rule.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      rule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {rule.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <strong>Action:</strong> {rule.action}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};