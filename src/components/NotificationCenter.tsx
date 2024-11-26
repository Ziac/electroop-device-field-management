import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, Clock, Plus, Filter, RefreshCw } from 'lucide-react';
import { AddNotificationModal } from './modals/AddNotificationModal';
import { NotificationDetailModal } from './modals/NotificationDetailModal';
import { AlarmChannels } from './AlarmChannels';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'success' | 'info';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  ruleId: string;
  ruleName: string;
  condition: {
    parameter: string;
    operator: string;
    value: number;
    unit: string;
  };
  actions: string[];
  relatedEvents: {
    timestamp: Date;
    description: string;
    type: string;
  }[];
  ocppCode?: string;
  status: 'active' | 'resolved' | 'acknowledged';
  assignedTo?: string;
  category: 'system' | 'hardware' | 'network' | 'security' | 'maintenance';
  escalationLevel: number;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  resolvedBy?: string;
  resolvedAt?: Date;
  notes?: string[];
}

export const NotificationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'channels'>('notifications');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Critical Temperature Alert',
      message: 'Temperature exceeds threshold (80°C)',
      type: 'error',
      timestamp: new Date(2024, 2, 1, 14, 30),
      read: false,
      priority: 'high',
      ruleId: '1',
      ruleName: 'High Temperature Alert',
      condition: {
        parameter: 'temperature',
        operator: '>',
        value: 75,
        unit: '°C'
      },
      actions: [
        'Reduce charging power immediately',
        'Notify maintenance team',
        'Monitor temperature trends'
      ],
      relatedEvents: [
        {
          timestamp: new Date(2024, 2, 1, 14, 25),
          description: 'Temperature warning threshold reached (75°C)',
          type: 'warning'
        }
      ],
      ocppCode: 'HighTemperature',
      status: 'active',
      category: 'hardware',
      escalationLevel: 1,
      notes: ['Initial investigation required']
    }
  ]);

  const [filter, setFilter] = useState<{
    status: string;
    priority: string;
    category: string;
    type: string;
    dateRange: string;
  }>({
    status: 'all',
    priority: 'all',
    category: 'all',
    type: 'all',
    dateRange: 'all'
  });

  const [showAddNotification, setShowAddNotification] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleAddNotification = (newNotification: Notification) => {
    setNotifications([newNotification, ...notifications]);
  };

  const handleUpdateNotification = (updatedNotification: Notification) => {
    setNotifications(notifications.map(notif =>
      notif.id === updatedNotification.id ? updatedNotification : notif
    ));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleAcknowledge = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? {
        ...notif,
        status: 'acknowledged',
        acknowledgedBy: 'Current User',
        acknowledgedAt: new Date()
      } : notif
    ));
  };

  const handleResolve = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? {
        ...notif,
        status: 'resolved',
        resolvedBy: 'Current User',
        resolvedAt: new Date()
      } : notif
    ));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter.status !== 'all' && notif.status !== filter.status) return false;
    if (filter.priority !== 'all' && notif.priority !== filter.priority) return false;
    if (filter.category !== 'all' && notif.category !== filter.category) return false;
    if (filter.type !== 'all' && notif.type !== filter.type) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            <p className="text-gray-600">
              {notifications.filter(n => !n.read).length} unread notifications
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddNotification(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" />
              Add Notification
            </button>
            <button
              onClick={() => setActiveTab('channels')}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Bell size={16} className="mr-2" />
              Manage Channels
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-5 gap-4">
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="form-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="form-select"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="form-select"
          >
            <option value="all">All Categories</option>
            <option value="system">System</option>
            <option value="hardware">Hardware</option>
            <option value="network">Network</option>
            <option value="security">Security</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className="form-select"
          >
            <option value="all">All Types</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
          </select>

          <select
            value={filter.dateRange}
            onChange={(e) => setFilter({ ...filter, dateRange: e.target.value })}
            className="form-select"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.read ? 'bg-white' : 'bg-blue-50'
              } ${
                notification.type === 'error' ? 'border-red-200' :
                notification.type === 'warning' ? 'border-yellow-200' :
                notification.type === 'success' ? 'border-green-200' :
                'border-blue-200'
              } cursor-pointer hover:bg-gray-50`}
              onClick={() => setSelectedNotification(notification)}
            >
              <div className="flex items-start space-x-3">
                {notification.type === 'error' && <AlertTriangle className="text-red-500" size={20} />}
                {notification.type === 'warning' && <AlertTriangle className="text-yellow-500" size={20} />}
                {notification.type === 'success' && <CheckCircle className="text-green-500" size={20} />}
                {notification.type === 'info' && <Info className="text-blue-500" size={20} />}
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                        notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {notification.priority.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        notification.status === 'active' ? 'bg-red-100 text-red-800' :
                        notification.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {notification.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {notification.timestamp.toLocaleString()}
                    </span>
                    {notification.ruleName && (
                      <span>Rule: {notification.ruleName}</span>
                    )}
                    {notification.category && (
                      <span className="capitalize">Category: {notification.category}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddNotification && (
        <AddNotificationModal
          onClose={() => setShowAddNotification(false)}
          onSave={handleAddNotification}
        />
      )}

      {selectedNotification && (
        <NotificationDetailModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
          onMarkAsRead={markAsRead}
          onAcknowledge={handleAcknowledge}
          onResolve={handleResolve}
          onUpdate={handleUpdateNotification}
        />
      )}

      {activeTab === 'channels' && <AlarmChannels />}
    </div>
  );
};