import React, { useState } from 'react';
import { XCircle, FileText } from 'lucide-react';

interface DiagnosticsModalProps {
  onClose: () => void;
  onRequest: (stationId: string, location: string) => void;
}

export const DiagnosticsModal: React.FC<DiagnosticsModalProps> = ({ onClose, onRequest }) => {
  const [stationId, setStationId] = useState('');
  const [uploadLocation, setUploadLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [stopTime, setStopTime] = useState('');

  const handleSubmit = () => {
    if (!stationId || !uploadLocation) {
      alert('Please fill in all required fields');
      return;
    }

    onRequest(stationId, uploadLocation);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Request Diagnostics</h2>
            <p className="text-gray-600">Get diagnostic files from charging station</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Station ID *
            </label>
            <input
              type="text"
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter station ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Location (URL) *
            </label>
            <input
              type="text"
              value={uploadLocation}
              onChange={(e) => setUploadLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter URL for diagnostic file upload"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stop Time
              </label>
              <input
                type="datetime-local"
                value={stopTime}
                onChange={(e) => setStopTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
            >
              <FileText size={16} className="mr-2" />
              Request Diagnostics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};