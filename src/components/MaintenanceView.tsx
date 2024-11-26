import React, { useState } from 'react';
import { Wrench, ClipboardCheck, XCircle, AlertTriangle } from 'lucide-react';

interface MaintenanceViewProps {
  station: {
    id: string;
    location: string;
    status: string;
    alerts?: string[];
  };
  onClose: () => void;
}

interface MaintenanceTask {
  id: string;
  task: string;
  priority: 'high' | 'medium' | 'low';
  category: 'safety' | 'electrical' | 'mechanical' | 'software' | 'general';
}

export const MaintenanceView: React.FC<MaintenanceViewProps> = ({ station, onClose }) => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const maintenanceTasks: MaintenanceTask[] = [
    // Safety Checks
    { id: 'safety-1', task: 'Test emergency stop button functionality', priority: 'high', category: 'safety' },
    { id: 'safety-2', task: 'Inspect cable insulation and connectors', priority: 'high', category: 'safety' },
    { id: 'safety-3', task: 'Check ground fault protection system', priority: 'high', category: 'safety' },
    { id: 'safety-4', task: 'Verify safety signage and warnings', priority: 'medium', category: 'safety' },
    { id: 'safety-5', task: 'Test fault detection mechanisms', priority: 'high', category: 'safety' },

    // Electrical Systems
    { id: 'elec-1', task: 'Measure input voltage stability', priority: 'high', category: 'electrical' },
    { id: 'elec-2', task: 'Test charging output voltage', priority: 'high', category: 'electrical' },
    { id: 'elec-3', task: 'Inspect power factor correction', priority: 'medium', category: 'electrical' },
    { id: 'elec-4', task: 'Check circuit breaker operation', priority: 'high', category: 'electrical' },
    { id: 'elec-5', task: 'Calibrate power metering system', priority: 'medium', category: 'electrical' },

    // Mechanical Components
    { id: 'mech-1', task: 'Clean cooling system and fans', priority: 'medium', category: 'mechanical' },
    { id: 'mech-2', task: 'Inspect cable management system', priority: 'medium', category: 'mechanical' },
    { id: 'mech-3', task: 'Check charging connector wear', priority: 'high', category: 'mechanical' },
    { id: 'mech-4', task: 'Test cable retraction system', priority: 'medium', category: 'mechanical' },
    { id: 'mech-5', task: 'Lubricate moving parts', priority: 'low', category: 'mechanical' },

    // Software and Communications
    { id: 'soft-1', task: 'Update firmware to latest version', priority: 'medium', category: 'software' },
    { id: 'soft-2', task: 'Test network connectivity', priority: 'high', category: 'software' },
    { id: 'soft-3', task: 'Verify payment system operation', priority: 'high', category: 'software' },
    { id: 'soft-4', task: 'Check diagnostic systems', priority: 'medium', category: 'software' },
    { id: 'soft-5', task: 'Test user interface functionality', priority: 'medium', category: 'software' },

    // General Maintenance
    { id: 'gen-1', task: 'Clean display screen and interface', priority: 'low', category: 'general' },
    { id: 'gen-2', task: 'Inspect station housing integrity', priority: 'medium', category: 'general' },
    { id: 'gen-3', task: 'Check lighting system', priority: 'low', category: 'general' },
    { id: 'gen-4', task: 'Document maintenance findings', priority: 'medium', category: 'general' },
    { id: 'gen-5', task: 'Verify station identification labels', priority: 'low', category: 'general' }
  ];

  const toggleTask = (taskId: string) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const priorityColors = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-blue-600',
  };

  const categoryLabels = {
    all: 'All Tasks',
    safety: 'Safety Checks',
    electrical: 'Electrical Systems',
    mechanical: 'Mechanical Components',
    software: 'Software & Communications',
    general: 'General Maintenance'
  };

  const filteredTasks = activeCategory === 'all'
    ? maintenanceTasks
    : maintenanceTasks.filter(task => task.category === activeCategory);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Maintenance - Station {station.id}
            </h2>
            <p className="text-gray-600">{station.location}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={24} />
          </button>
        </div>

        {station.alerts && station.alerts.length > 0 && (
          <div className="mb-6 bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-red-800 flex items-center gap-2">
              <AlertTriangle size={16} />
              Active Alerts
            </h3>
            <ul className="mt-2 text-sm text-red-700">
              {station.alerts.map((alert, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span>•</span>
                  {alert}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    activeCategory === key
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    id={task.id}
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => toggleTask(task.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={task.id}
                    className="ml-3 flex-1 text-sm text-gray-700"
                  >
                    {task.task}
                  </label>
                  <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Notes</h3>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded-md text-sm"
              placeholder="Add maintenance notes..."
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-600">
              <ClipboardCheck className="mr-2" size={16} />
              {selectedTasks.length} of {maintenanceTasks.length} tasks completed
            </div>
            <div className="space-x-4">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Save Draft
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Complete Maintenance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};