import React from 'react';
import { Network, MapPin, Zap } from 'lucide-react';
import { DateRangePicker } from './DateRangePicker';

interface HierarchyFilterProps {
  selectedApplication?: string;
  selectedLocation?: string;
  selectedDevice?: string;
  dateRange: { start: Date; end: Date };
  onFilterChange: (type: 'application' | 'location' | 'device', value: string) => void;
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
}

export const HierarchyFilter: React.FC<HierarchyFilterProps> = ({
  selectedApplication,
  selectedLocation,
  selectedDevice,
  dateRange,
  onFilterChange,
  onDateRangeChange,
}) => {
  const applications = ['Shopping Mall', 'Office', 'Retail', 'Highway', 'Public Parking'];
  const locations = ['North Region', 'South Region', 'East Region', 'West Region'];
  const devices = ['DC Fast Charger', 'AC Level 2', 'Ultra-Fast Charger'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-3 gap-4 flex-1 mr-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              <div className="flex items-center gap-1">
                <Network size={14} />
                Application Type
              </div>
            </label>
            <select
              value={selectedApplication}
              onChange={(e) => onFilterChange('application', e.target.value)}
              className="form-select w-full text-sm"
            >
              <option value="">All Applications</option>
              {applications.map(app => (
                <option key={app} value={app}>{app}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                Location
              </div>
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="form-select w-full text-sm"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              <div className="flex items-center gap-1">
                <Zap size={14} />
                Device Type
              </div>
            </label>
            <select
              value={selectedDevice}
              onChange={(e) => onFilterChange('device', e.target.value)}
              className="form-select w-full text-sm"
            >
              <option value="">All Devices</option>
              {devices.map(device => (
                <option key={device} value={device}>{device}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">Date Range</label>
          <DateRangePicker
            startDate={dateRange.start}
            endDate={dateRange.end}
            onChange={onDateRangeChange}
          />
        </div>
      </div>
    </div>
  );
};