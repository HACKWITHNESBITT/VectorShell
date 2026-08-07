import React from 'react';
import { Terminal, Shield, Download, HardDrive, Cpu, HelpCircle, Code } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onQuickDownload: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onQuickDownload }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Status */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white tracking-wide text-lg">VectorShell</span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Offline Suite
                </span>
              </div>
              <p className="text-xs text-slate-400">Zero Dependencies • USB Portable</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'simulator'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Live Terminal</span>
            </button>

            <button
              onClick={() => setActiveTab('generator')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'generator'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Script Builder</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Python Code</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'guide'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>USB Setup Guide</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'docs'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Cheatsheet</span>
            </button>
          </nav>

          {/* Quick Action Button */}
          <button
            onClick={onQuickDownload}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-md shadow-cyan-500/20 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download .PY</span>
          </button>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex space-x-1 pb-3 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'simulator' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'
            }`}
          >
            Live Terminal
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'generator' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'
            }`}
          >
            Script Builder
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'code' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'
            }`}
          >
            Python Code
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'guide' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'
            }`}
          >
            USB Setup
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'docs' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'
            }`}
          >
            Cheatsheet
          </button>
        </div>
      </div>
    </header>
  );
};
