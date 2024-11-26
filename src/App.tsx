import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { RuleEngine } from './components/RuleEngine';
import { NotificationCenter } from './components/NotificationCenter';
import { Settings } from './components/Settings';
import { NetworkOperationsCenter } from './components/NetworkOperationsCenter';
import { DiagnosticsManager } from './components/DiagnosticsManager';
import { FirmwareManagement } from './components/FirmwareManagement';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'rules' | 'notifications' | 'settings' | 'noc' | 'diagnostics' | 'firmware'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeView={activeView} onViewChange={setActiveView} />
      <main className="container mx-auto px-4 py-8">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'rules' && <RuleEngine />}
        {activeView === 'notifications' && <NotificationCenter />}
        {activeView === 'settings' && <Settings />}
        {activeView === 'noc' && <NetworkOperationsCenter />}
        {activeView === 'diagnostics' && <DiagnosticsManager />}
        {activeView === 'firmware' && <FirmwareManagement />}
      </main>
    </div>
  );
}

export default App;