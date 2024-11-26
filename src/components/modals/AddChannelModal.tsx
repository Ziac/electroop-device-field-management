import React, { useState } from 'react';
import { XCircle, Plus, Trash2 } from 'lucide-react';

interface AddChannelModalProps {
  onClose: () => void;
  onSave: (channel: any) => void;
}

export const AddChannelModal: React.FC<AddChannelModalProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'email' | 'sms' | 'webhook' | 'slack' | 'teams'>('email');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [newRecipient, setNewRecipient] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookToken, setWebhookToken] = useState('');
  const [slackChannel, setSlackChannel] = useState('');

  const handleAddRecipient = () => {
    if (newRecipient.trim()) {
      setRecipients([...recipients, newRecipient.trim()]);
      setNewRecipient('');
    }
  };

  const handleRemoveRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!name) {
      alert('Please enter a channel name');
      return;
    }

    if (type === 'email' || type === 'sms') {
      if (recipients.length === 0) {
        alert('Please add at least one recipient');
        return;
      }
    }

    if ((type === 'webhook' && !webhookUrl) || 
        (type === 'slack' && !webhookUrl) || 
        (type === 'teams' && !webhookUrl)) {
      alert('Please enter webhook URL');
      return;
    }

    const config: any = {};
    if (type === 'email' || type === 'sms') {
      config.recipients = recipients;
    } else {
      config.url = webhookUrl;
      if (webhookToken) config.token = webhookToken;
      if (slackChannel) config.channel = slackChannel;
    }

    const newChannel = {
      id: Date.now().toString(),
      name,
      type,
      config,
      enabled: true,
      status: 'active',
      lastTested: new Date()
    };

    onSave(newChannel);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add Alarm Channel</h2>
            <p className="text-gray-600">Configure a new notification channel</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Channel Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter channel name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Channel Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="webhook">Webhook</option>
              <option value="slack">Slack</option>
              <option value="teams">Microsoft Teams</option>
            </select>
          </div>

          {(type === 'email' || type === 'sms') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  placeholder={type === 'email' ? "Enter email address" : "Enter phone number"}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddRecipient()}
                />
                <button
                  onClick={handleAddRecipient}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="space-y-2">
                {recipients.map((recipient, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                    <span className="text-sm text-gray-700">{recipient}</span>
                    <button
                      onClick={() => handleRemoveRecipient(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(type === 'webhook' || type === 'slack' || type === 'teams') && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter webhook URL"
                />
              </div>
              
              {type === 'webhook' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Authentication Token (Optional)</label>
                  <input
                    type="text"
                    value={webhookToken}
                    onChange={(e) => setWebhookToken(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter authentication token"
                  />
                </div>
              )}

              {type === 'slack' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Channel Name</label>
                  <input
                    type="text"
                    value={slackChannel}
                    onChange={(e) => setSlackChannel(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter Slack channel (e.g., #alerts)"
                  />
                </div>
              )}
            </div>
          )}

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
              Add Channel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};