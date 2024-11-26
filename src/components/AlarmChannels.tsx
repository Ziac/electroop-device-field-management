import React, { useState } from 'react';
import { Mail, MessageSquare, Webhook, Bell, Plus, AlertTriangle, CheckCircle, Settings } from 'lucide-react';
import { AddChannelModal } from './modals/AddChannelModal';
import { EditChannelModal } from './modals/EditChannelModal';

interface Channel {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'webhook' | 'slack' | 'teams';
  config: {
    recipients?: string[];
    url?: string;
    token?: string;
    channel?: string;
  };
  enabled: boolean;
  lastTested?: Date;
  status: 'active' | 'inactive' | 'error';
}

export const AlarmChannels: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: '1',
      name: 'Maintenance Team Email',
      type: 'email',
      config: {
        recipients: ['maintenance@example.com', 'support@example.com']
      },
      enabled: true,
      lastTested: new Date(2024, 2, 1),
      status: 'active'
    },
    {
      id: '2',
      name: 'Emergency SMS',
      type: 'sms',
      config: {
        recipients: ['+1234567890', '+9876543210']
      },
      enabled: true,
      lastTested: new Date(2024, 2, 1),
      status: 'active'
    },
    {
      id: '3',
      name: 'Slack Alerts',
      type: 'slack',
      config: {
        url: 'https://hooks.slack.com/services/xxx',
        channel: '#ev-alerts'
      },
      enabled: true,
      lastTested: new Date(2024, 2, 1),
      status: 'active'
    }
  ]);

  const [showAddChannel, setShowAddChannel] = useState(false);
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail size={20} className="text-blue-500" />;
      case 'sms':
        return <MessageSquare size={20} className="text-green-500" />;
      case 'webhook':
        return <Webhook size={20} className="text-purple-500" />;
      case 'slack':
        return <MessageSquare size={20} className="text-yellow-500" />;
      case 'teams':
        return <MessageSquare size={20} className="text-blue-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  const handleAddChannel = (channel: Channel) => {
    setChannels([...channels, channel]);
  };

  const handleUpdateChannel = (updatedChannel: Channel) => {
    setChannels(channels.map(ch => 
      ch.id === updatedChannel.id ? updatedChannel : ch
    ));
    setEditingChannel(null);
  };

  const handleDeleteChannel = (id: string) => {
    if (window.confirm('Are you sure you want to delete this channel?')) {
      setChannels(channels.filter(ch => ch.id !== id));
    }
  };

  const handleToggleChannel = (id: string) => {
    setChannels(channels.map(ch =>
      ch.id === id ? { ...ch, enabled: !ch.enabled } : ch
    ));
  };

  const handleTestChannel = async (channel: Channel) => {
    // Simulate testing the channel
    const success = Math.random() > 0.1; // 90% success rate
    if (success) {
      alert('Test message sent successfully!');
    } else {
      alert('Failed to send test message. Please check the configuration.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Alarm Channels</h2>
          <p className="text-gray-600">Manage notification delivery methods</p>
        </div>
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
          <div key={channel.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getChannelIcon(channel.type)}
                <div>
                  <h3 className="font-medium text-gray-900">{channel.name}</h3>
                  <p className="text-sm text-gray-600">
                    {channel.type.toUpperCase()} • 
                    {channel.config.recipients ? 
                      ` ${channel.config.recipients.length} recipients` :
                      channel.config.channel ?
                      ` ${channel.config.channel}` :
                      ' Webhook endpoint'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  channel.status === 'active' ? 'bg-green-100 text-green-800' :
                  channel.status === 'error' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {channel.status.toUpperCase()}
                </span>
                <button
                  onClick={() => handleToggleChannel(channel.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    channel.enabled ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {channel.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                {channel.lastTested && (
                  <span>Last tested: {channel.lastTested.toLocaleDateString()}</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleTestChannel(channel)}
                  className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Test
                </button>
                <button
                  onClick={() => setEditingChannel(channel)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Settings size={16} />
                </button>
                <button
                  onClick={() => handleDeleteChannel(channel.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <AlertTriangle size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddChannel && (
        <AddChannelModal
          onClose={() => setShowAddChannel(false)}
          onSave={handleAddChannel}
        />
      )}

      {editingChannel && (
        <EditChannelModal
          channel={editingChannel}
          onClose={() => setEditingChannel(null)}
          onSave={handleUpdateChannel}
        />
      )}
    </div>
  );
};