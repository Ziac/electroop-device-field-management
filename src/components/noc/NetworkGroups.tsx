import React, { useState } from 'react';
import { FolderTree, Server, Wifi, Signal, AlertTriangle, Users, ChevronRight, ChevronDown } from 'lucide-react';
import { NetworkGroupDetails } from './NetworkGroupDetails';
import { NetworkStatusBadge } from './NetworkStatusBadge';

interface NetworkGroup {
  id: string;
  name: string;
  type: 'region' | 'site' | 'cluster';
  status: 'healthy' | 'warning' | 'critical';
  deviceCount: number;
  activeAlerts: number;
  uptime: number;
  children?: NetworkGroup[];
  details: {
    location?: string;
    manager?: string;
    lastUpdated: Date;
    bandwidth: number;
    connectedDevices: number;
  };
}

const mockGroups: NetworkGroup[] = [
  {
    id: 'reg-1',
    name: 'North Region',
    type: 'region',
    status: 'healthy',
    deviceCount: 45,
    activeAlerts: 2,
    uptime: 99.8,
    details: {
      location: 'Northern District',
      manager: 'John Smith',
      lastUpdated: new Date(),
      bandwidth: 850,
      connectedDevices: 42
    },
    children: [
      {
        id: 'site-1',
        name: 'Mall of Technology',
        type: 'site',
        status: 'healthy',
        deviceCount: 20,
        activeAlerts: 1,
        uptime: 99.9,
        details: {
          location: 'Tech Mall, North District',
          manager: 'Sarah Johnson',
          lastUpdated: new Date(),
          bandwidth: 400,
          connectedDevices: 18
        },
        children: [
          {
            id: 'cluster-1',
            name: 'Parking Level 1',
            type: 'cluster',
            status: 'healthy',
            deviceCount: 8,
            activeAlerts: 0,
            uptime: 100,
            details: {
              location: 'P1, Tech Mall',
              manager: 'Mike Wilson',
              lastUpdated: new Date(),
              bandwidth: 160,
              connectedDevices: 7
            }
          },
          {
            id: 'cluster-2',
            name: 'Parking Level 2',
            type: 'cluster',
            status: 'warning',
            deviceCount: 12,
            activeAlerts: 1,
            uptime: 98.5,
            details: {
              location: 'P2, Tech Mall',
              manager: 'Mike Wilson',
              lastUpdated: new Date(),
              bandwidth: 240,
              connectedDevices: 11
            }
          }
        ]
      }
    ]
  },
  {
    id: 'reg-2',
    name: 'South Region',
    type: 'region',
    status: 'warning',
    deviceCount: 38,
    activeAlerts: 4,
    uptime: 98.2,
    details: {
      location: 'Southern District',
      manager: 'Emma Davis',
      lastUpdated: new Date(),
      bandwidth: 720,
      connectedDevices: 35
    },
    children: [
      {
        id: 'site-2',
        name: 'Central Station Hub',
        type: 'site',
        status: 'critical',
        deviceCount: 15,
        activeAlerts: 3,
        uptime: 95.5,
        details: {
          location: 'Main Station, South',
          manager: 'Robert Brown',
          lastUpdated: new Date(),
          bandwidth: 280,
          connectedDevices: 12
        }
      },
      {
        id: 'site-3',
        name: 'Airport Complex',
        type: 'site',
        status: 'healthy',
        deviceCount: 23,
        activeAlerts: 1,
        uptime: 99.5,
        details: {
          location: 'International Airport',
          manager: 'Lisa Anderson',
          lastUpdated: new Date(),
          bandwidth: 440,
          connectedDevices: 23
        }
      }
    ]
  }
];

export const NetworkGroups: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<NetworkGroup | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['reg-1', 'reg-2']);
  const [showDetails, setShowDetails] = useState(false);

  const toggleExpand = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const renderGroup = (group: NetworkGroup, level: number = 0) => {
    const isExpanded = expandedGroups.includes(group.id);
    const hasChildren = group.children && group.children.length > 0;

    return (
      <div key={group.id} className="space-y-2">
        <div
          className={`flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer ${
            selectedGroup?.id === group.id ? 'bg-blue-50' : ''
          }`}
          style={{ paddingLeft: `${level * 1.5 + 1}rem` }}
        >
          <div className="flex-1 flex items-center space-x-3">
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(group.id);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
            {!hasChildren && <div className="w-7" />}
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {group.type === 'region' && <FolderTree size={20} className="text-blue-500" />}
                {group.type === 'site' && <Server size={20} className="text-purple-500" />}
                {group.type === 'cluster' && <Wifi size={20} className="text-green-500" />}
                <div>
                  <p className="font-medium text-gray-900">{group.name}</p>
                  <p className="text-sm text-gray-500">{group.deviceCount} devices</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{group.uptime}% uptime</p>
                  <p className="text-sm text-gray-500">{group.activeAlerts} alerts</p>
                </div>
                <NetworkStatusBadge status={group.status} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGroup(group);
                    setShowDetails(true);
                  }}
                  className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {group.children!.map(child => renderGroup(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Network Groups</h3>
          <p className="text-sm text-gray-600">Manage and monitor network hierarchies</p>
        </div>
        <div className="flex space-x-4">
          <select className="form-select text-sm">
            <option value="all">All Regions</option>
            <option value="north">North Region</option>
            <option value="south">South Region</option>
          </select>
          <select className="form-select text-sm">
            <option value="all">All Status</option>
            <option value="healthy">Healthy</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {mockGroups.map(group => renderGroup(group))}
      </div>

      {showDetails && selectedGroup && (
        <NetworkGroupDetails
          group={selectedGroup}
          onClose={() => {
            setShowDetails(false);
            setSelectedGroup(null);
          }}
        />
      )}
    </div>
  );
};