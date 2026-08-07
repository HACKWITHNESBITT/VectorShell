import React, { useState } from 'react';
import { ScriptConfig } from '../types';
import { generatePythonScript } from '../data/pythonScriptGenerator';
import { Copy, Check, Download, Search, Code, CheckCircle2 } from 'lucide-react';

interface CodeViewerProps {
  config: ScriptConfig;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ config }) => {
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');

  const fullCode = generatePythonScript(config);
  const lines = fullCode.split('\n');

  const filteredLines = search
    ? lines.map((line, idx) => ({ line, num: idx + 1 })).filter(({ line }) => line.toLowerCase().includes(search.toLowerCase()))
    : lines.map((line, idx) => ({ line, num: idx + 1 }));

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullCode], { type: 'text/x-python' });
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
    <div className="space-y-4">
      {/* Code Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Source Code: {config.scriptName}</h2>
          </div>
          <p className="text-sm text-slate-400">
            {lines.length} lines • Zero external packages • 100% Python Standard Library
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition-all shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs max-h-[600px] flex flex-col">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-slate-400 flex items-center justify-between text-[11px]">
          <span>Python 3.6+ Compliant</span>
          <span>{filteredLines.length} / {lines.length} lines shown</span>
        </div>

        <div className="p-4 overflow-y-auto space-y-1 leading-relaxed flex-1">
          {filteredLines.map(({ line, num }) => (
            <div key={num} className="flex hover:bg-slate-900/60 rounded px-1 transition-colors group">
              <span className="w-12 text-slate-600 select-none text-right pr-4 font-mono text-[11px] shrink-0 group-hover:text-slate-400">
                {num}
              </span>
              <span className="text-slate-200 whitespace-pre break-all">{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
