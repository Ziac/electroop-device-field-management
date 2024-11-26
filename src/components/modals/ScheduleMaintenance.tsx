import React, { useState } from 'react';
import { XCircle, Calendar, Clock, Wrench, Users, AlertTriangle } from 'lucide-react';

interface ScheduleMaintenanceProps {
  stations: any[];
  onClose: () => void;
}

export const ScheduleMaintenance: React.FC<ScheduleMaintenanceProps> = ({ stations, onClose }) => {
  const [selectedStation, setSelectedStation] = useState('');
  const [maintenanceType, setMaintenanceType] = useState('routine');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [technician, setTechnician] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Schedule Maintenance</h2>
            <p className="text-gray-600">Plan maintenance work for charging stations</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Station
            </label>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="form-select w-full"
            >
              <option value="">Choose a station...</option>
              {stations.map((station) => (
                <option key={station.id} value={station.id}>
                  Station {station.id} - {station.location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maintenance Type
            </label>
            <select
              value={maintenanceType}
              onChange={(e) => setMaintenanceType(e.target.value)}
              className="form-select w-full"
            >
              <option value="routine">Routine Inspection</option>
              <option value="repair">Repair Work</option>
              <option value="upgrade">System Upgrade</option>
              <option value="emergency">Emergency Maintenance</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-select w-full"
                />
                <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="form-select w-full"
                />
                <Clock className="absolute right-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="form-select w-full"
              min="30"
              step="30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign Technician
            </label>
            <select
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
              className="form-select w-full"
            >
              <option value="">Select technician...</option>
              <option value="tech1">John Smith</option>
              <option value="tech2">Sarah Johnson</option>
              <option value="tech3">Mike Wilson</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maintenance Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-24 p-2 border border-gray-300 rounded-md text-sm"
              placeholder="Add any specific instructions or notes..."
            />
          </div>

          {maintenanceType === 'emergency' && (
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="text-red-600 mr-2" size={20} />
                <p className="text-sm text-red-700">
                  Emergency maintenance will take the station offline immediately
                </p>
              </div>
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
            >
              <Wrench size={16} className="mr-2" />
              Schedule Maintenance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};