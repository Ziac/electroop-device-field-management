import React, { useState, useRef } from 'react';
import { XCircle, Bell, Plus, Settings, Trash2, Mail, MessageSquare, Webhook, BellRing } from 'lucide-react';
import { useClickOutside } from '../hooks/useClickOutside';

interface NotificationChannel {
  id: string;
  type: 'email' | 'slack' | 'webhook' | 'sms' | 'push';
  name: string;
  config: Record<string, string>;
  enabled: boolean;
}

interface NotificationCenterProps {
  onClose: () => void;
}

const mockChannels: NotificationChannel[] = [
  {
    id: '1',
    type: 'email',
    name: 'Maintenance Team Email',
    config: { email: 'maintenance@example.com' },
    enabled: true
  },
  {
    id: '2',
    type: 'slack',
    name: 'Tech Support Channel',
    config: { webhook: 'https://slack.com/webhook/xyz' },
    enabled: true
  }
];

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [channels, setChannels] = useState<NotificationChannel[]>(mockChannels);
  const [showAddChannel, setShowAddChannel] = useState(false);
  const [newChannel, setNewChannel] = useState<Partial<NotificationChannel>>({
    type: 'email',
    name: '',
    config: {}
  });

  useClickOutside(modalRef, onClose);

  const handleDeleteChannel = (id: string) => {
    setChannels(channels.filter(channel => channel.id !== id));
  };

  const handleToggleChannel = (id: string) => {
    setChannels(channels.map(channel =>
      channel.id === id ? { ...channel, enabled: !channel.enabled } : channel
    ));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div ref={modalRef} className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Notification Center</h2>
            <p className="text-gray-600">Manage notification channels and preferences</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowAddChannel(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={16} className="mr-2" />
            Add Channel
          </button>
        </div>

        <div className="space-y-4">
          {channels.map((channel) => (
            <div key={channel.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {channel.type === 'email' && <Mail size={20} className="text-gray-500" />}
                  {channel.type === 'slack' && <MessageSquare size={20} className="text-gray-500" />}
                  {channel.type === 'webhook' && <Webhook size={20} className="text-gray-500" />}
                  <div>
                    <h3 className="font-medium text-gray-900">{channel.name}</h3>
                    <p className="text-sm text-gray-600">{channel.type.toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleChannel(channel.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      channel.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {channel.enabled ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => handleDeleteChannel(channel.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showAddChannel && (
          <div className="mt-6 p-4 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-4">Add New Channel</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Channel Type</label>
                <select
                  value={newChannel.type}
                  onChange={(e) => setNewChannel({ ...newChannel, type: e.target.value as any })}
                  className="form-select w-full"
                >
                  <option value="email">Email</option>
                  <option value="slack">Slack</option>
                  <option value="webhook">Webhook</option>
                  <option value="sms">SMS</option>
                  <option value="push">Push Notification</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Channel Name</label>
                <input
                  type="text"
                  value={newChannel.name}
                  onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                  className="form-select w-full"
                  placeholder="Enter channel name"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddChannel(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Add Channel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};