import React, { useState, useRef } from 'react';
import { XCircle, Upload, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

interface Manufacturer {
  id: string;
  name: string;
  models: string[];
  firmwareVersions: any[];
}

interface FirmwareUploadModalProps {
  manufacturers: Manufacturer[];
  onClose: () => void;
  onUpload: (firmwareData: any) => void;
}

export const FirmwareUploadModal: React.FC<FirmwareUploadModalProps> = ({
  manufacturers,
  onClose,
  onUpload
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    manufacturer: '',
    model: '',
    version: '',
    type: 'stable',
    notes: '',
    requiredVersion: ''
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !formData.manufacturer || !formData.model || !formData.version) {
      alert('Please fill in all required fields and select a firmware file');
      return;
    }

    setIsUploading(true);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      const firmwareData = {
        ...formData,
        file: selectedFile,
        size: selectedFile.size,
        uploadDate: new Date(),
        hash: 'sha256:' + Math.random().toString(36).substring(7),
        signature: 'valid'
      };

      onUpload(firmwareData);
    }, 5000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upload Firmware</h2>
            <p className="text-gray-600">Upload new firmware for charging stations</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Manufacturer & Model Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manufacturer *
              </label>
              <select
                value={formData.manufacturer}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    manufacturer: e.target.value,
                    model: ''
                  });
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Manufacturer</option>
                {manufacturers.map(mfr => (
                  <option key={mfr.id} value={mfr.name}>{mfr.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model *
              </label>
              <select
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                disabled={!formData.manufacturer}
              >
                <option value="">Select Model</option>
                {formData.manufacturer && 
                  manufacturers
                    .find(mfr => mfr.name === formData.manufacturer)
                    ?.models.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))
                }
              </select>
            </div>
          </div>

          {/* Version Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Version Number *
              </label>
              <input
                type="text"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., 2.1.0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Version
              </label>
              <input
                type="text"
                value={formData.requiredVersion}
                onChange={(e) => setFormData({ ...formData, requiredVersion: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., 2.0.0"
              />
            </div>
          </div>

          {/* Release Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Release Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="stable">Stable</option>
              <option value="beta">Beta</option>
            </select>
          </div>

          {/* Release Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Release Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md h-32"
              placeholder="Enter release notes and changelog..."
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Firmware File *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      ref={fileInputRef}
                      type="file"
                      className="sr-only"
                      onChange={handleFileSelect}
                      accept=".bin,.hex,.fw"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  Supported formats: .bin, .hex, .fw
                </p>
              </div>
            </div>
            {selectedFile && (
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <FileText size={16} className="mr-2" />
                {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="text-yellow-700 mr-2" size={20} />
              <p className="text-sm text-yellow-700">
                Please ensure the firmware file is signed and verified before uploading.
                Invalid firmware can cause device malfunction.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              {isUploading ? (
                <>
                  <Upload size={16} className="mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} className="mr-2" />
                  Upload Firmware
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};