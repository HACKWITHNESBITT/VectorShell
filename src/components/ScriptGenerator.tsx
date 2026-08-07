import React, { useState } from 'react';
import { ScriptConfig } from '../types';
import { generatePythonScript } from '../data/pythonScriptGenerator';
import { Settings, Download, Shield, Cpu, FolderArchive, Bot, Terminal, FileCode, Check, RefreshCw, Zap } from 'lucide-react';

interface ScriptGeneratorProps {
  config: ScriptConfig;
  setConfig: React.Dispatch<React.SetStateAction<ScriptConfig>>;
  onViewCode: () => void;
}

export const ScriptGenerator: React.FC<ScriptGeneratorProps> = ({ config, setConfig, onViewCode }) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const presets = [
    {
      name: 'Full Power (Recommended)',
      desc: 'Includes all modules: Offline AI, Security Vault, System Tools, USB File Organizer & Tkinter GUI.',
      config: {
        includeGui: true,
        includeVault: true,
        includeUsbOrganizer: true,
        includeAssistant: true,
        includeSystemTools: true,
        includeNotes: true,
        includeNetworkTools: true,
        scriptName: 'vectorshell.py',
        defaultPasscode: 'VectorShellKey123',
      },
    },
    {
      name: 'Security & Vault Edition',
      desc: 'Focuses on multi-pass shredder, file encryption, password generator, and vault notes.',
      config: {
        includeGui: true,
        includeVault: true,
        includeUsbOrganizer: false,
        includeAssistant: false,
        includeSystemTools: true,
        includeNotes: true,
        includeNetworkTools: false,
        scriptName: 'usb_vault.py',
        defaultPasscode: 'VaultSecret99',
      },
    },
    {
      name: 'Lightweight CLI Edition',
      desc: 'Ultra-fast, terminal-only script with zero GUI dependencies for low-spec or headless machines.',
      config: {
        includeGui: false,
        includeVault: true,
        includeUsbOrganizer: true,
        includeAssistant: true,
        includeSystemTools: true,
        includeNotes: true,
        includeNetworkTools: true,
        scriptName: 'usb_cli.py',
        defaultPasscode: 'VectorShellKey123',
      },
    },
  ];

  const handleDownloadPy = () => {
    const code = generatePythonScript(config);
    const blob = new Blob([code], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = config.scriptName || 'vectorshell.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(`${config.scriptName || 'vectorshell.py'} downloaded successfully!`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleDownloadBat = () => {
    const bat = `@echo off
TITLE VectorShell Portable Suite
cls
echo Launching VectorShell Portable Suite...
python "%~dp0${config.scriptName || 'vectorshell.py'}" %*
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Python 3 was not found on system PATH.
    echo Please install Python or copy portable Python to your USB drive.
    pause
)
`;
    const blob = new Blob([bat], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'RUN_USB.bat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSh = () => {
    const sh = `#!/usr/bin/env bash
DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "Launching VectorShell Portable Suite..."
python3 "$DIR/${config.scriptName || 'vectorshell.py'}" "$@"
`;
    const blob = new Blob([sh], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'run_usb.sh';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Settings className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">USB Script Customizer & Builder</h2>
            </div>
            <p className="text-sm text-slate-400">
              Configure which offline modules to include in your standalone Python script.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDownloadPy}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-cyan-500/20 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download {config.scriptName}</span>
            </button>
            <button
              onClick={onViewCode}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-700 transition-all"
            >
              <FileCode className="w-4 h-4" />
              <span>Inspect Source</span>
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl flex items-center space-x-2 animate-fade-in">
            <Check className="w-4 h-4" />
            <span>{downloadSuccess}</span>
          </div>
        )}
      </div>

      {/* Preset Selector */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>Quick Configuration Presets</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {presets.map((preset) => (
            <div
              key={preset.name}
              onClick={() => setConfig(preset.config)}
              className="bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                  {preset.name}
                </h4>
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{preset.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Module Toggles */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <span>Select Included Offline Modules</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Offline Assistant */}
          <label className="flex items-start space-x-3 p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={config.includeAssistant}
              onChange={(e) => setConfig({ ...config, includeAssistant: e.target.checked })}
              className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 border-slate-700 bg-slate-900"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white">VectorShell Offline AI Engine</span>
              </div>
              <p className="text-xs text-slate-400">
                Rule-based NLP parser, math evaluator, offline knowledge base, and code explanation mentor.
              </p>
            </div>
          </label>

          {/* Security Vault */}
          <label className="flex items-start space-x-3 p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={config.includeVault}
              onChange={(e) => setConfig({ ...config, includeVault: e.target.checked })}
              className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 border-slate-700 bg-slate-900"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">Security & Encryption Vault</span>
              </div>
              <p className="text-xs text-slate-400">
                Multi-pass file shredding, stream file encryption (.agv), and cryptographic password generator.
              </p>
            </div>
          </label>

          {/* USB Organizer */}
          <label className="flex items-start space-x-3 p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={config.includeUsbOrganizer}
              onChange={(e) => setConfig({ ...config, includeUsbOrganizer: e.target.checked })}
              className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 border-slate-700 bg-slate-900"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <FolderArchive className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white">USB File Organizer & Duplicate Cleaner</span>
              </div>
              <p className="text-xs text-slate-400">
                Auto-sort files into Documents, Media, Code folders & detect duplicate files using SHA-256.
              </p>
            </div>
          </label>

          {/* System Diagnostics */}
          <label className="flex items-start space-x-3 p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={config.includeSystemTools}
              onChange={(e) => setConfig({ ...config, includeSystemTools: e.target.checked })}
              className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 border-slate-700 bg-slate-900"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-white">Hardware & Storage Inspector</span>
              </div>
              <p className="text-xs text-slate-400">
                Detailed CPU, RAM, OS release, disk usage analysis, and temporary file cleaner.
              </p>
            </div>
          </label>

          {/* Tkinter Desktop GUI */}
          <label className="flex items-start space-x-3 p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={config.includeGui}
              onChange={(e) => setConfig({ ...config, includeGui: e.target.checked })}
              className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 border-slate-700 bg-slate-900"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-bold text-white">Dual Mode: Desktop GUI + Terminal CLI</span>
              </div>
              <p className="text-xs text-slate-400">
                Includes optional Tkinter Graphical Interface launcher alongside terminal CLI interface.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Auxiliary Companion Script Exporters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Download className="w-5 h-5 text-cyan-400" />
          <span>Download USB Launcher Helpers</span>
        </h3>
        <p className="text-sm text-slate-400">
          Download 1-click batch and shell launchers to place right next to <code className="text-cyan-300">{config.scriptName}</code> on your USB drive.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button
            onClick={handleDownloadBat}
            className="flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl transition-all group"
          >
            <div className="text-left">
              <div className="font-bold text-white text-sm group-hover:text-cyan-400">RUN_USB.bat</div>
              <div className="text-xs text-slate-400">1-Click Launcher for Windows PCs</div>
            </div>
            <Download className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
          </button>

          <button
            onClick={handleDownloadSh}
            className="flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl transition-all group"
          >
            <div className="text-left">
              <div className="font-bold text-white text-sm group-hover:text-cyan-400">run_usb.sh</div>
              <div className="text-xs text-slate-400">Executable Launcher for Linux & macOS</div>
            </div>
            <Download className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
