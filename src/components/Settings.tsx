import React, { useState } from 'react';
import { 
  Shield, 
  Globe, 
  Database, 
  Bell, 
  Users, 
  Clock, 
  Zap,
  Network,
  HardDrive,
  Key,
  Mail,
  Sliders,
  Save,
  AlertTriangle
} from 'lucide-react';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);

  // General Settings Form
  const [generalSettings, setGeneralSettings] = useState({
    systemName: 'EV Charging Network',
    timezone: 'UTC+00:00',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h',
    language: 'en',
    currency: 'USD',
    defaultPowerLimit: 150,
    autoLogout: 30
  });

  // Security Settings Form
  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: 30,
    passwordExpiry: 90,
    mfaEnabled: true,
    ipWhitelist: '',
    auditLogRetention: 90,
    failedLoginAttempts: 3,
    passwordComplexity: 'high',
    sslEnabled: true
  });

  // Network Settings Form
  const [networkSettings, setNetworkSettings] = useState({
    heartbeatInterval: 60,
    connectionTimeout: 30,
    retryAttempts: 3,
    sslEnabled: true,
    proxyEnabled: false,
    proxyUrl: '',
    ocppVersion: '1.6',
    wsKeepAlive: 60
  });

  // Notification Settings Form
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    dailyReports: true,
    alertThreshold: 'medium',
    maintenanceAlerts: true,
    errorNotifications: true,
    statusUpdates: true
  });

  // Maintenance Settings Form
  const [maintenanceSettings, setMaintenanceSettings] = useState({
    autoSchedule: true,
    maintenanceWindow: '00:00-04:00',
    preventiveMaintenance: 30,
    backupFrequency: 'daily',
    dataRetention: 365,
    diagnosticsEnabled: true,
    autoUpdates: true
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sections: SettingsSection[] = [
    {
      id: 'general',
      title: 'General Settings',
      icon: <Sliders className="text-gray-500" size={20} />,
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System Name
              </label>
              <input
                type="text"
                value={generalSettings.systemName}
                onChange={(e) => setGeneralSettings({...generalSettings, systemName: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={generalSettings.timezone}
                onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="UTC+00:00">UTC+00:00</option>
                <option value="UTC+01:00">UTC+01:00</option>
                <option value="UTC+02:00">UTC+02:00</option>
                <option value="UTC+03:00">UTC+03:00</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Format
              </label>
              <select
                value={generalSettings.dateFormat}
                onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Format
              </label>
              <select
                value={generalSettings.timeFormat}
                onChange={(e) => setGeneralSettings({...generalSettings, timeFormat: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="24h">24-hour</option>
                <option value="12h">12-hour</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Power Limit (kW)
              </label>
              <input
                type="number"
                value={generalSettings.defaultPowerLimit}
                onChange={(e) => setGeneralSettings({...generalSettings, defaultPowerLimit: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto Logout (minutes)
              </label>
              <input
                type="number"
                value={generalSettings.autoLogout}
                onChange={(e) => setGeneralSettings({...generalSettings, autoLogout: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield className="text-gray-500" size={20} />,
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Expiry (days)
              </label>
              <input
                type="number"
                value={securitySettings.passwordExpiry}
                onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Failed Login Attempts
              </label>
              <input
                type="number"
                value={securitySettings.failedLoginAttempts}
                onChange={(e) => setSecuritySettings({...securitySettings, failedLoginAttempts: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Complexity
              </label>
              <select
                value={securitySettings.passwordComplexity}
                onChange={(e) => setSecuritySettings({...securitySettings, passwordComplexity: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={securitySettings.mfaEnabled}
                onChange={(e) => setSecuritySettings({...securitySettings, mfaEnabled: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Enable Two-Factor Authentication</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={securitySettings.sslEnabled}
                onChange={(e) => setSecuritySettings({...securitySettings, sslEnabled: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Enable SSL/TLS</span>
            </label>
          </div>
        </div>
      )
    },
    {
      id: 'network',
      title: 'Network & OCPP',
      icon: <Network className="text-gray-500" size={20} />,
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heartbeat Interval (seconds)
              </label>
              <input
                type="number"
                value={networkSettings.heartbeatInterval}
                onChange={(e) => setNetworkSettings({...networkSettings, heartbeatInterval: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Connection Timeout (seconds)
              </label>
              <input
                type="number"
                value={networkSettings.connectionTimeout}
                onChange={(e) => setNetworkSettings({...networkSettings, connectionTimeout: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OCPP Version
              </label>
              <select
                value={networkSettings.ocppVersion}
                onChange={(e) => setNetworkSettings({...networkSettings, ocppVersion: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="1.6">OCPP 1.6</option>
                <option value="2.0">OCPP 2.0</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WebSocket Keep-Alive (seconds)
              </label>
              <input
                type="number"
                value={networkSettings.wsKeepAlive}
                onChange={(e) => setNetworkSettings({...networkSettings, wsKeepAlive: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={networkSettings.proxyEnabled}
                onChange={(e) => setNetworkSettings({...networkSettings, proxyEnabled: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Enable Proxy</span>
            </label>
            {networkSettings.proxyEnabled && (
              <input
                type="text"
                value={networkSettings.proxyUrl}
                onChange={(e) => setNetworkSettings({...networkSettings, proxyUrl: e.target.value})}
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter proxy URL"
              />
            )}
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell className="text-gray-500" size={20} />,
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Threshold
              </label>
              <select
                value={notificationSettings.alertThreshold}
                onChange={(e) => setNotificationSettings({...notificationSettings, alertThreshold: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Email Notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notificationSettings.smsNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, smsNotifications: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notificationSettings.pushNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Push Notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notificationSettings.dailyReports}
                onChange={(e) => setNotificationSettings({...notificationSettings, dailyReports: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Daily Reports</span>
            </label>
          </div>
        </div>
      )
    },
    {
      id: 'maintenance',
      title: 'Maintenance',
      icon: <HardDrive className="text-gray-500" size={20} />,
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maintenance Window
              </label>
              <input
                type="text"
                value={maintenanceSettings.maintenanceWindow}
                onChange={(e) => setMaintenanceSettings({...maintenanceSettings, maintenanceWindow: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="HH:MM-HH:MM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preventive Maintenance (days)
              </label>
              <input
                type="number"
                value={maintenanceSettings.preventiveMaintenance}
                onChange={(e) => setMaintenanceSettings({...maintenanceSettings, preventiveMaintenance: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Backup Frequency
              </label>
              <select
                value={maintenanceSettings.backupFrequency}
                onChange={(e) => setMaintenanceSettings({...maintenanceSettings, backupFrequency: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Retention (days)
              </label>
              <input
                type="number"
                value={maintenanceSettings.dataRetention}
                onChange={(e) => setMaintenanceSettings({...maintenanceSettings, dataRetention: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={maintenanceSettings.autoSchedule}
                onChange={(e) => setMaintenanceSettings({...maintenanceSettings, autoSchedule: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Enable Auto-Scheduling</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={maintenanceSettings.diagnosticsEnabled}
                onChange={(e) => setMaintenanceSettings({...maintenanceSettings, diagnosticsEnabled: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Enable Diagnostics</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={maintenanceSettings.autoUpdates}
                onChange={(e) => setMaintenanceSettings({...maintenanceSettings, autoUpdates: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Enable Auto-Updates</span>
            </label>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600">Configure system preferences and parameters</p>
        </div>
        {saved && (
          <div className="flex items-center text-green-600">
            <CheckCircle size={20} className="mr-2" />
            <span>Settings saved successfully</span>
          </div>
        )}
      </div>

      <div className="flex space-x-6">
        <div className="w-64 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium ${
                activeSection === section.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {section.icon}
              <span>{section.title}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 bg-gray-50 p-6 rounded-lg">
          {sections.find(s => s.id === activeSection)?.component}

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setActiveSection(sections[0].id)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};