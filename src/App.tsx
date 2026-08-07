import React, { useState } from 'react';
import { ScriptConfig, ActiveTab } from './types';
import { Header } from './components/Header';
import { TerminalSimulator } from './components/TerminalSimulator';
import { ScriptGenerator } from './components/ScriptGenerator';
import { CodeViewer } from './components/CodeViewer';
import { UsbInstallerGuide } from './components/UsbInstallerGuide';
import { OfflineDocs } from './components/OfflineDocs';
import { generatePythonScript } from './data/pythonScriptGenerator';
import { ShieldCheck, HardDrive, Cpu, Terminal, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulator');
  const [config, setConfig] = useState<ScriptConfig>({
    includeGui: true,
    includeVault: true,
    includeUsbOrganizer: true,
    includeAssistant: true,
    includeSystemTools: true,
    includeNotes: true,
    includeNetworkTools: true,
    scriptName: 'vectorshell.py',
    defaultPasscode: 'VectorShellKey123',
  });

  const handleQuickDownload = () => {
    const code = generatePythonScript(config);
    const blob = new Blob([code], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = config.scriptName || 'usb_antigravity.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Sticky Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} onQuickDownload={handleQuickDownload} />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'simulator' && <TerminalSimulator />}
        {activeTab === 'generator' && (
          <ScriptGenerator config={config} setConfig={setConfig} onViewCode={() => setActiveTab('code')} />
        )}
        {activeTab === 'code' && <CodeViewer config={config} />}
        {activeTab === 'guide' && <UsbInstallerGuide />}
        {activeTab === 'docs' && <OfflineDocs />}
      </main>

      {/* Bottom Footer & System Badges */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Offline Power Suite • Zero Dependencies • USB Flash Drive Portable</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Python 3.6+ Standard Library</span>
            </span>
            <span className="flex items-center space-x-1">
              <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
              <span>Universal OS (Win/Mac/Linux)</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
