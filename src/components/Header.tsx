import React from 'react';
import { BellRing, Settings, User, Sliders, LayoutDashboard, Network, FileText, Upload } from 'lucide-react';

interface HeaderProps {
  activeView: 'dashboard' | 'rules' | 'notifications' | 'settings' | 'noc' | 'diagnostics' | 'firmware';
  onViewChange: (view: 'dashboard' | 'rules' | 'notifications' | 'settings' | 'noc' | 'diagnostics' | 'firmware') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onViewChange }) => {
  return (
    <header className="bg-primary-400 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-primary-600" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 60L100 20L160 60V140L100 180L40 140V60Z" fill="currentColor"/>
              <path d="M85 70L115 70L105 95H120L85 130L95 100H80L85 70Z" fill="white"/>
            </svg>
            <h1 className="text-2xl font-bold text-white ml-2">G-Charge Cockpit</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="flex items-center space-x-4">
              <button
                onClick={() => onViewChange('dashboard')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'dashboard'
                    ? 'bg-primary-600 text-white'
                    : 'text-white hover:bg-primary-500 hover:text-white'
                }`}
              >
                <LayoutDashboard size={18} className="mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => onViewChange('rules')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'rules'
                    ? 'bg-primary-600 text-white'
                    : 'text-white hover:bg-primary-500 hover:text-white'
                }`}
              >
                <Sliders size={18} className="mr-2" />
                Rules
              </button>
              <button
                onClick={() => onViewChange('notifications')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'notifications'
                    ? 'bg-primary-600 text-white'
                    : 'text-white hover:bg-primary-500 hover:text-white'
                }`}
              >
                <BellRing size={18} className="mr-2" />
                Notifications
              </button>
              <button
                onClick={() => onViewChange('noc')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'noc'
                    ? 'bg-primary-600 text-white'
                    : 'text-white hover:bg-primary-500 hover:text-white'
                }`}
              >
                <Network size={18} className="mr-2" />
                NOC
              </button>
              <button
                onClick={() => onViewChange('diagnostics')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'diagnostics'
                    ? 'bg-primary-600 text-white'
                    : 'text-white hover:bg-primary-500 hover:text-white'
                }`}
              >
                <FileText size={18} className="mr-2" />
                Diagnostics
              </button>
              <button
                onClick={() => onViewChange('firmware')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'firmware'
                    ? 'bg-primary-600 text-white'
                    : 'text-white hover:bg-primary-500 hover:text-white'
                }`}
              >
                <Upload size={18} className="mr-2" />
                Firmware
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onViewChange('settings')}
                className="p-2 text-white hover:text-primary-100"
              >
                <Settings size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white">John Tech</span>
                <button className="p-2 text-white hover:text-primary-100">
                  <User size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};