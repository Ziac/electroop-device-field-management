import React, { useState } from 'react';
import { XCircle, Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface AddNotificationModalProps {
  onClose: () => void;
  onSave: (notification: any) => void;
  rules: any[];
}

export const AddNotificationModal: React.FC<AddNotificationModalProps> = ({ onClose, onSave, rules }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'error' | 'warning' | 'success' | 'info'>('info');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedRuleId, setSelectedRuleId] = useState('');

  const handleSave = () => {
    if (!title || !message || !selectedRuleId) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedRule = rules.find(rule => rule.id === selectedRuleId);

    const newNotification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      priority,
      timestamp: new Date(),
      read: false,
      ruleId: selectedRuleId,
      ruleName: selectedRule?.name,
      condition: selectedRule?.condition
    };

    onSave(newNotification);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Notification</h2>
            <p className="text-gray-600">Associate notification with a rule</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Associated Rule</label>
            <select
              value={selectedRuleId}
              onChange={(e) => setSelectedRuleId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a rule...</option>
              {rules.map(rule => (
                <option key={rule.id} value={rule.id}>
                  {rule.name} ({rule.condition.parameter} {rule.condition.operator} {rule.condition.value}{rule.condition.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter notification title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md h-24"
              placeholder="Enter notification message"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="info">Information</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="success">Success</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
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
              Send Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};