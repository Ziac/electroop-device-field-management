import React from 'react';
import { XCircle, AlertTriangle, CheckCircle, Info, Clock, User, Bell, ExternalLink } from 'lucide-react';

interface NotificationDetailModalProps {
  notification: {
    id: string;
    title: string;
    message: string;
    type: 'error' | 'warning' | 'success' | 'info';
    timestamp: Date;
    stationId?: string;
    read: boolean;
    priority?: 'low' | 'medium' | 'high';
    actions?: string[];
    relatedEvents?: {
      timestamp: Date;
      description: string;
      type: string;
    }[];
  };
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

export const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
  notification,
  onClose,
  onMarkAsRead,
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="text-red-500" size={24} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={24} />;
      case 'success':
        return <CheckCircle className="text-green-500" size={24} />;
      default:
        return <Info className="text-blue-500" size={24} />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start space-x-4">
            {getNotificationIcon(notification.type)}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{notification.title}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <Clock size={14} className="text-gray-400" />
                <span className="text-sm text-gray-500">
                  {notification.timestamp.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            {notification.stationId && (
              <span className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-md text-sm">
                <User size={14} />
                <span>Station {notification.stationId}</span>
              </span>
            )}
            {notification.priority && (
              <span className={`px-2 py-1 rounded-md text-sm ${getPriorityColor(notification.priority)}`}>
                {notification.priority.toUpperCase()} Priority
              </span>
            )}
            {!notification.read && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Mark as read
              </button>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">{notification.message}</p>
          </div>

          {notification.actions && notification.actions.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Recommended Actions:</h3>
              <div className="space-y-2">
                {notification.actions.map((action, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                    <Bell size={14} className="text-gray-400" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notification.relatedEvents && notification.relatedEvents.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Related Events:</h3>
              <div className="space-y-2">
                {notification.relatedEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded-md border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{event.description}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {event.timestamp.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            {notification.stationId && (
              <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                <ExternalLink size={16} className="mr-2" />
                View Station Details
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};