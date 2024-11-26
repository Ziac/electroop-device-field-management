import React, { useState } from 'react';
import { AlertTriangle, Zap, Thermometer, Activity, BellRing, Clock, Power, Wifi, AlertCircle, Battery } from 'lucide-react';
import { AddRuleModal } from './modals/AddRuleModal';

interface Rule {
  id: string;
  name: string;
  condition: {
    parameter: string;
    operator: string;
    value: number;
    unit: string;
  };
  actions: string[];
  severity: 'low' | 'medium' | 'high';
  enabled: boolean;
  lastTriggered?: Date;
  ocppCode?: string;
}

export const RuleEngine: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      name: 'High Temperature Alert',
      condition: {
        parameter: 'temperature',
        operator: '>',
        value: 75,
        unit: '°C'
      },
      actions: [
        'Send notification to maintenance team',
        'Reduce charging power by 20%',
        'Log event in system'
      ],
      severity: 'high',
      enabled: true,
      lastTriggered: new Date(2024, 2, 1, 14, 30),
      ocppCode: 'HighTemperature'
    },
    // ... (previous rules remain the same)
  ]);

  const [showAddRule, setShowAddRule] = useState(false);

  const handleToggleRule = (id: string) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const handleDeleteRule = (id: string) => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      setRules(rules.filter(rule => rule.id !== id));
    }
  };

  const handleAddRule = (newRule: Rule) => {
    setRules([...rules, newRule]);
  };

  const getParameterIcon = (parameter: string) => {
    switch (parameter) {
      case 'temperature':
        return <Thermometer size={20} className="text-gray-500" />;
      case 'power_output':
      case 'voltage_variation':
        return <Zap size={20} className="text-gray-500" />;
      case 'heartbeat_interval':
        return <Wifi size={20} className="text-gray-500" />;
      case 'fault_duration':
        return <AlertCircle size={20} className="text-gray-500" />;
      case 'connector_errors':
        return <Battery size={20} className="text-gray-500" />;
      default:
        return <Activity size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rule Engine</h2>
          <p className="text-gray-600">Manage automated responses to OCPP events</p>
        </div>
        <button
          onClick={() => setShowAddRule(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Rule
        </button>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getParameterIcon(rule.condition.parameter)}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{rule.name}</h3>
                  <p className="text-sm text-gray-600">
                    When {rule.condition.parameter.replace(/_/g, ' ')} is {rule.condition.operator} {rule.condition.value}{rule.condition.unit}
                  </p>
                  {rule.ocppCode && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                      OCPP: {rule.ocppCode}
                    </span>
                  )}
                </div>
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
                  {rule.enabled ? 'Active' : 'Disabled'}
                </button>
                <button
                  onClick={() => handleDeleteRule(rule.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <AlertTriangle size={16} />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Actions:</h4>
              <ul className="space-y-1">
                {rule.actions.map((action, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <BellRing size={16} className="mr-2 text-gray-400" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            {rule.lastTriggered && (
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-2" />
                Last triggered: {rule.lastTriggered.toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddRule && (
        <AddRuleModal
          onClose={() => setShowAddRule(false)}
          onSave={handleAddRule}
        />
      )}
    </div>
  );
};