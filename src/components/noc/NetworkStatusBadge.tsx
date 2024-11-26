import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface NetworkStatusBadgeProps {
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const NetworkStatusBadge: React.FC<NetworkStatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'healthy':
        return {
          icon: CheckCircle,
          color: 'bg-green-100 text-green-800',
          label: 'Healthy'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'bg-yellow-100 text-yellow-800',
          label: 'Warning'
        };
      case 'critical':
        return {
          icon: AlertTriangle,
          color: 'bg-red-100 text-red-800',
          label: 'Critical'
        };
      case 'offline':
        return {
          icon: XCircle,
          color: 'bg-gray-100 text-gray-800',
          label: 'Offline'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.color} ${sizeClasses[size]}`}>
      {showIcon && <Icon size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} className="mr-1.5" />}
      {config.label}
    </span>
  );
};