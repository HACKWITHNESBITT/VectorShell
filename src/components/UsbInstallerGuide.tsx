import React from 'react';
import { HardDrive, Play, ShieldAlert, Cpu, Terminal, CheckCircle2, Copy, Download } from 'lucide-react';

export const UsbInstallerGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro Hero */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">USB Drive Installation & Offline Guide</h2>
            <p className="text-sm text-slate-400">
              Follow these simple steps to deploy VectorShell onto any USB flash drive.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Step 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg relative overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-sm">
            1
          </div>
          <h3 className="font-bold text-white text-lg">Download Files to USB Root</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Download <code className="text-cyan-300 font-mono">vectorshell.py</code>, <code className="text-cyan-300 font-mono">RUN_USB.bat</code>, and <code className="text-cyan-300 font-mono">run_usb.sh</code> and place them directly in the root directory of your USB drive (e.g., <code className="text-slate-300">E:\</code> or <code className="text-slate-300">/media/usb/</code>).
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
            <div>E:\</div>
            <div> ├── vectorshell.py</div>
            <div> ├── RUN_USB.bat</div>
            <div> └── run_usb.sh</div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg relative overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-sm">
            2
          </div>
          <h3 className="font-bold text-white text-lg">Plug & Run on Any PC</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Plug your USB drive into any host computer (Windows, Linux, or Mac) and run the launcher:
          </p>
          <ul className="text-xs text-slate-300 space-y-2 pt-1">
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span><strong>Windows:</strong> Double click <code className="text-cyan-300">RUN_USB.bat</code></span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span><strong>Linux / macOS:</strong> Open terminal and run <code className="text-cyan-300">./run_usb.sh</code></span>
            </li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg relative overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-sm">
            3
          </div>
          <h3 className="font-bold text-white text-lg">Optional: Standalone Portable Python</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            If the target host PC has no Python installed, copy an embeddable Python zip (like WinPython or Official Python Embeddable Package) into a <code className="text-cyan-300 font-mono">\python_portable\</code> folder on your USB drive.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300">
            E:\python_portable\python.exe E:\vectorshell.py
          </div>
        </div>

      </div>

      {/* Troubleshooting & System Capabilities */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-cyan-400" />
          <span>Offline Guarantees & Features</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero Internet Requirement</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every operation (encryption, file organizing, hardware diagnostics, offline assistant, notes vault) runs strictly locally in memory or writes to local USB disk files.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cross-Platform Python 3.6+</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uses standard library modules (<code className="text-slate-300">sys</code>, <code className="text-slate-300">os</code>, <code className="text-slate-300">subprocess</code>, <code className="text-slate-300">shutil</code>, <code className="text-slate-300">json</code>, <code className="text-slate-300">hashlib</code>). Works seamlessly on Windows, macOS, Linux, and Raspberry Pi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
