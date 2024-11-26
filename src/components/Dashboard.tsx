import React, { useState } from 'react';
import { StationCard } from './StationCard';
import { QuickActions } from './QuickActions';
import { StationMetrics } from './StationMetrics';
import { AnalyticsPanel } from './AnalyticsPanel';
import { LogViewer } from './LogViewer';
import { HierarchyFilter } from './HierarchyFilter';
import { StationDetails } from './StationDetails';
import { MaintenanceView } from './MaintenanceView';
import { subDays } from 'date-fns';

const mockStations = [
  {
    id: 'CS001',
    location: 'North Mall Parking',
    status: 'operational',
    power: 150,
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-03-01',
    alerts: [],
    networkStatus: {
      wifi: 85,
      cellular: 90
    },
    utilization: 75,
    uptime: 99.8,
    powerQuality: {
      voltage: 230,
      current: 125,
      frequency: 50,
      temperature: 42
    },
    currentSession: {
      duration: '45 min',
      energy: '32.5 kWh',
      user: 'USER123'
    }
  },
  {
    id: 'CS002',
    location: 'South Station',
    status: 'warning',
    power: 120,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15',
    alerts: ['High temperature warning'],
    networkStatus: {
      wifi: 65,
      cellular: 75
    },
    utilization: 60,
    uptime: 98.5,
    powerQuality: {
      voltage: 228,
      current: 118,
      frequency: 49.8,
      temperature: 55
    }
  },
  {
    id: 'CS003',
    location: 'East Plaza',
    status: 'error',
    power: 0,
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-02-20',
    alerts: ['Communication error', 'Power output failure'],
    networkStatus: {
      wifi: 30,
      cellular: 45
    },
    utilization: 0,
    uptime: 85.2,
    powerQuality: {
      voltage: 0,
      current: 0,
      frequency: 0,
      temperature: 38
    }
  }
];

export const Dashboard: React.FC = () => {
  const [stations] = useState(mockStations);
  const [selectedStation, setSelectedStation] = useState<any | null>(null);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 7),
    end: new Date()
  });
  const [filters, setFilters] = useState({
    application: '',
    location: '',
    device: ''
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    setDateRange(range);
  };

  const handleStationClick = (station: any) => {
    setSelectedStation(station);
  };

  const handleMaintenanceClick = (station: any) => {
    setSelectedStation(station);
    setShowMaintenance(true);
  };

  return (
    <div className="space-y-6">
      {/* Filters and Date Range */}
      <HierarchyFilter
        selectedApplication={filters.application}
        selectedLocation={filters.location}
        selectedDevice={filters.device}
        dateRange={dateRange}
        onFilterChange={handleFilterChange}
        onDateRangeChange={handleDateRangeChange}
      />

      {/* Quick Actions */}
      <QuickActions stations={stations} />

      {/* Station Metrics */}
      <StationMetrics stations={stations} />

      {/* Station Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map((station, index) => (
          <div
            key={station.id}
            onClick={() => handleStationClick(station)}
            className="cursor-pointer transform transition-transform hover:scale-105"
          >
            <StationCard
              {...station}
              index={index}
              onMaintenanceClick={() => handleMaintenanceClick(station)}
            />
          </div>
        ))}
      </div>

      {/* Analytics Panel */}
      <AnalyticsPanel
        stations={stations}
        dateRange={dateRange}
      />

      {/* Log Viewer */}
      <LogViewer
        logs={[]} // Pass your logs data here
        onLogSelect={(log) => console.log('Selected log:', log)}
      />

      {/* Station Details Modal */}
      {selectedStation && !showMaintenance && (
        <StationDetails
          station={selectedStation}
          onClose={() => setSelectedStation(null)}
        />
      )}

      {/* Maintenance View Modal */}
      {showMaintenance && selectedStation && (
        <MaintenanceView
          station={selectedStation}
          onClose={() => {
            setShowMaintenance(false);
            setSelectedStation(null);
          }}
        />
      )}
    </div>
  );
};