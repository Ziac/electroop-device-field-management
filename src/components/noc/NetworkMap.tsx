import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPin, AlertTriangle, Wifi, Signal, Server } from 'lucide-react';

// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZWxlY3Ryb29wIiwiYSI6ImNtM29yNHo2OTA2dXIybHNkcjY5ZjRyZ3EifQ.s5jsrWLxbJ55ZwWqeMWK8Q';

interface Location {
  id: string;
  type: 'station' | 'router' | 'cellular' | 'controller';
  name: string;
  status: 'active' | 'warning' | 'error';
  coordinates: [number, number];
  details: {
    address?: string;
    deviceCount?: number;
    networkType?: string;
    signalStrength?: number;
    lastSeen?: Date;
  };
}

const mockLocations: Location[] = [
  {
    id: 'LOC1',
    type: 'station',
    name: 'Mall Charging Hub',
    status: 'active',
    coordinates: [29.0225, 41.0138], // Istanbul coordinates
    details: {
      address: 'Istanbul Mall, Turkey',
      deviceCount: 5,
      networkType: '4G LTE',
      signalStrength: 85,
      lastSeen: new Date()
    }
  },
  {
    id: 'LOC2',
    type: 'router',
    name: 'Airport Network Hub',
    status: 'warning',
    coordinates: [28.9784, 41.0082],
    details: {
      address: 'Istanbul Airport, Turkey',
      deviceCount: 8,
      networkType: 'Fiber + 4G Backup',
      signalStrength: 95,
      lastSeen: new Date()
    }
  },
  {
    id: 'LOC3',
    type: 'cellular',
    name: 'Highway Station Group',
    status: 'error',
    coordinates: [29.1228, 41.0214],
    details: {
      address: 'E-5 Highway, Istanbul',
      deviceCount: 3,
      networkType: '5G',
      signalStrength: 45,
      lastSeen: new Date()
    }
  }
];

export const NetworkMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [29.0225, 41.0138], // Istanbul
      zoom: 11
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    // Add locations to map
    mockLocations.forEach(location => {
      const el = document.createElement('div');
      el.className = 'marker';
      
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = `w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
        location.status === 'active' ? 'bg-green-500' :
        location.status === 'warning' ? 'bg-yellow-500' :
        'bg-red-500'
      }`;
      
      // Add icon based on type
      const icon = document.createElement('span');
      icon.className = 'text-white';
      switch (location.type) {
        case 'station':
          icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0Z"/>
            <path d="M11 11h4"/>
            <path d="M11 15h4"/>
          </svg>`;
          break;
        case 'router':
          icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="8" rx="2"/>
            <rect x="2" y="14" width="20" height="8" rx="2"/>
            <line x1="6" y1="6" x2="6" y2="6"/>
            <line x1="6" y1="18" x2="6" y2="18"/>
          </svg>`;
          break;
        case 'cellular':
          icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 2h-3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
            <path d="M10 6H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"/>
          </svg>`;
          break;
        default:
          icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="2"/>
            <path d="M12 7v10"/>
            <path d="M7 12h10"/>
          </svg>`;
      }
      
      markerElement.appendChild(icon);
      el.appendChild(markerElement);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .addTo(map.current);

      // Add click handler
      el.addEventListener('click', () => {
        setSelectedLocation(location);
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Network Map</h3>
        <div className="flex items-center space-x-4">
          <select className="form-select text-sm">
            <option value="all">All Regions</option>
            <option value="north">North Region</option>
            <option value="south">South Region</option>
            <option value="east">East Region</option>
            <option value="west">West Region</option>
          </select>
          <select className="form-select text-sm">
            <option value="all">All Devices</option>
            <option value="stations">Charging Stations</option>
            <option value="routers">Network Routers</option>
            <option value="cellular">Cellular Devices</option>
          </select>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div ref={mapContainer} className="w-full h-[600px]" />
      </div>

      {selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">{selectedLocation.name}</h3>
            <div className="space-y-2">
              <p><strong>Type:</strong> {selectedLocation.type}</p>
              <p><strong>Status:</strong> {selectedLocation.status}</p>
              <p><strong>Address:</strong> {selectedLocation.details.address}</p>
              <p><strong>Network Type:</strong> {selectedLocation.details.networkType}</p>
              <p><strong>Signal Strength:</strong> {selectedLocation.details.signalStrength}%</p>
              <p><strong>Connected Devices:</strong> {selectedLocation.details.deviceCount}</p>
              <p><strong>Last Seen:</strong> {selectedLocation.details.lastSeen?.toLocaleString()}</p>
            </div>
            <button
              onClick={() => setSelectedLocation(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};