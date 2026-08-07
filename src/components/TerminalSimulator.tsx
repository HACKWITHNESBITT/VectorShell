import React, { useState, useRef, useEffect } from 'react';
import { TerminalLog } from '../types';
import { Terminal, Send, Trash2, RefreshCw, Copy, Check, Play, Sparkles } from 'lucide-react';

export const TerminalSimulator: React.FC = () => {
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: '1',
      type: 'banner',
      text: `===============================================================================
  __   _____ _____ _____ ___  ___   ___ _  _ ___ _    _    
  \\ \\ / / __/ __|_   _/ _ \\| _ \\ / __| || | __| |  | |   
   \\ V /| _|| (__ | | | (_) |   / \\__ \\ __ | _|| |__| |__ 
    \\_/ |___\\___||_|  \\___/|_|_\\ |___/_||_|___|____|____|

                     VECTOR SHELL PORTABLE SUITE v3.0
      [100% Offline | Zero Dependencies | Full System Control & Assistant]
===============================================================================
Type 'help' to view all commands, or 'ask <question>' to talk to offline AI.`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [notesState, setNotesState] = useState<Array<{ id: number; title: string; body: string; date: string }>>([
    { id: 1, title: 'USB Emergency Notes', body: 'Local IP: 192.168.1.100, USB Vault Root: /E:/USB_ROOT/', date: '2026-08-07' },
  ]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (type: TerminalLog['type'], text: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        type,
        text,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const processOfflineQuery = (prompt: string): string => {
    const p = prompt.toLowerCase().trim();

    // Creator query check
    if (/\b(who created you|who made you|who built you|creator|developer|author|who developed you)\b/i.test(p)) {
      return `I was created by Victor Kimutai. If you want to know more about him, you'll find him at https://victor-kimutai.onrender.com`;
    }

    // 1. Math evaluation check
    if (/^[\d\s\+\-\*\/\%\(\)\.\,mathsqrtpi\^]+$/.test(p) && /[\+\-\*\/\%]/.test(p)) {
      try {
        let sanitized = p.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');
        sanitized = sanitized.replace(/pi/g, 'Math.PI');
        // eslint-disable-next-line no-eval
        const result = eval(sanitized);
        if (typeof result === 'number' && !isNaN(result)) {
          return `[VectorShell Offline Math Engine] Result: ${result}`;
        }
      } catch {
        // ignore, fall through
      }
    }

    // 2. Greetings & Friendly chatter
    if (/\b(hello|hi|hey|greetings|friend|howdy|sup|yo|good morning|good afternoon)\b/i.test(p)) {
      return (
        `Greetings, friend! I am your VectorShell AI companion.\n` +
        `I can help you with CLI automation, Python scripting, file encryption, storage maintenance, and general technical questions.\n` +
        `How can I assist you today?`
      );
    }

    // 3. How are you / status
    if (/\b(how are you|how do you do|how's it going|how are things|status)\b/i.test(p)) {
      return `I'm doing great! I am fully operational and ready to assist. What project or command would you like to run today?`;
    }

    // 4. Need help / assistance
    if (/\b(i need (your )?help|help me|can you help|assist)\b/i.test(p)) {
      return (
        `I'm right here to help! Tell me what you'd like to do—whether it's writing a Python automation script, encrypting files, cleaning disk space, running diagnostics, or answering any technical question.`
      );
    }

    // 5. Identity / Purpose
    if (/\b(who are you|what are you|what can you do|about|purpose|identity)\b/i.test(p)) {
      return (
        `I am the VectorShell AI Engine v3.0.\n` +
        `Designed for portable power, local execution, and smart assistant capabilities.\n` +
        `Features: System Diagnostics, Hardware Audits, SHA-256 File Shredder, Multi-byte XOR Encryption, Password Generator, USB Auto-Organizer, and Encrypted Vault Notes.`
      );
    }

    // 6. Polite response
    if (/\b(thanks|thank you|awesome|cool|great|nice|perfect|bye|goodbye)\b/i.test(p)) {
      return `You're very welcome! Stay secure and productive.`;
    }

    // 7. Specific Feature Queries
    if (/\b(encrypt|encryption|secret|lock|vault|agv)\b/i.test(p)) {
      return `Security Vault:\n• Use 'encrypt <file> <passphrase>' to lock any file with multi-byte XOR & SHA-256 derivation.\n• Use 'decrypt <file.agv> <passphrase>' to restore it.\n• Use 'shred <file>' to securely wipe files using 3-pass cryptographic overwrite.`;
    }

    if (/\b(clean|storage|disk|space|temp|clear)\b/i.test(p)) {
      return `Storage Management:\n• Use 'disk' to inspect USB partitions & capacity.\n• Use 'clean' to scan and wipe OS temporary files.\n• Use 'duplicates' to scan for identical files via SHA-256 checksums.`;
    }

    if (/\b(organize|sort|folders|files)\b/i.test(p)) {
      return `USB Organizer:\n• Use 'organize' to automatically categorize USB files into /Documents, /Media, /Code, /Archives, and /Executables.`;
    }

    if (/\b(password|genpass|passphrase)\b/i.test(p)) {
      return `Password Generator:\n• Use 'genpass <length>' (e.g. 'genpass 20') to generate cryptographically random passwords locally.`;
    }

    if (/\b(python|code|script|standard library)\b/i.test(p)) {
      return (
        `Code & Automation Guide:\n` +
        `• The VectorShell script uses pure Python (os, sys, shutil, subprocess, json, hashlib, secrets).\n` +
        `• Works on Windows, macOS, and Linux out of the box with zero pip installation required.\n` +
        `• Use 'setup' to create 1-click batch (.bat) and shell (.sh) launchers.`
      );
    }

    if (/\b(note|vault|memo)\b/i.test(p)) {
      return `Encrypted Vault Notes:\n• Use 'note add <title> <body>' to write notes to .usb_vault/notes.json.\n• Use 'note list' to read saved USB notes.`;
    }

    // 8. Natural conversational fallback
    return (
      `I hear you! As your VectorShell AI companion, I'm here to help with "${prompt}".\n` +
      `Feel free to ask me any technical question, request a Python automation script, or run built-in commands (type 'help' for the CLI menu).`
    );
  };

  const callGeminiApi = async (promptText: string) => {
    const thinkingId = Math.random().toString(36).substring(2, 9);
    setLogs((prev) => [
      ...prev,
      {
        id: thinkingId,
        type: 'system',
        text: '[VectorShell AI Engine Thinking...]',
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });

      const data = await res.json();
      setLogs((prev) => prev.filter((l) => l.id !== thinkingId));

      if (data && data.success && data.reply) {
        addLog('output', data.reply);
      } else {
        addLog('output', processOfflineQuery(promptText));
      }
    } catch {
      setLogs((prev) => prev.filter((l) => l.id !== thinkingId));
      addLog('output', processOfflineQuery(promptText));
    }
  };

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    addLog('input', `VectorShell> ${trimmed}`);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        addLog(
          'output',
          `\n=================== COMMAND CHEATSHEET ===================
  sysinfo                  - View CPU, OS, RAM & Hardware details
  disk                     - Inspect storage space & USB partitions
  clean                    - Reclaim storage by clearing temp files
  organize [path]          - Auto-sort files into categorized folders
  duplicates [path]        - Find duplicate files via SHA-256
  hash [file]              - Calculate MD5 & SHA256 file checksums
  encrypt [file] [pass]    - Encrypt file with secret passphrase (.agv)
  decrypt [file] [pass]    - Decrypt .agv locked file
  shred [file]             - Secure multi-pass file wipe
  genpass [length]         - Generate strong cryptographic password
  ask [query]              - Chat with VectorShell AI Engine (Gemini LLM)
  calc [expr]              - Offline scientific math calculator
  note add [title] [body]  - Save encrypted note to USB vault
  note list                - View all USB vault notes
  setup                    - Re-generate USB batch/shell launchers
  clear                    - Clear terminal screen
  gui                      - Launch Tkinter Desktop UI
===========================================================`
        );
        break;

      case 'sysinfo':
        addLog(
          'success',
          `[+] SYSTEM DIAGNOSTICS REPORT
------------------------------------------------------------
  OS                    : Windows 11 / Linux (x86_64)
  Architecture          : 64bit
  Processor             : Intel(R) Core(TM) i7-13700K / Apple M-Series
  Python Version        : 3.11.4 Standard Runtime
  Hostname              : OFFLINE-USB-HOST
  USB Script Location   : E:\\VectorShell\\vectorshell.py
  Date/Time             : ${new Date().toLocaleString()}
------------------------------------------------------------`
        );
        break;

      case 'disk':
        addLog(
          'output',
          `[+] STORAGE DRIVES & PARTITIONS
------------------------------------------------------------
 Current USB Drive (E:\\):
  - Total Capacity : 64.00 GB
  - Used Space     : 14.20 GB (22.2%)
  - Free Space     : 49.80 GB (77.8%)
  - Partition Format: exFAT (Universal Windows/Linux/Mac)
------------------------------------------------------------`
        );
        break;

      case 'clean':
        addLog(
          'success',
          `[*] Scanning system temporary directories...
  - Checking Windows Temp & User Cache...
  - Checking browser offline logs...
[+] Cleanup Complete! Removed 42 temporary files (184.20 MB freed).`
        );
        break;

      case 'organize':
        const target = args[0] || 'USB Root (E:\\)';
        addLog(
          'success',
          `[*] Organizing USB files in: ${target}
  - Classified 12 PDF/Docx files into /Documents
  - Classified 8 MP4/PNG files into /Media
  - Classified 5 ZIP archives into /Archives
  - Classified 14 Python/JS files into /Code
[+] Organized 39 files into categorized USB folders.`
        );
        break;

      case 'duplicates':
        addLog(
          'output',
          `[*] Scanning for duplicate files using SHA-256...
  Duplicate: E:\\backup_copy.zip  ==> Original: E:\\Archives\\backup.zip (SHA-256: 8f9a2b...)
[!] Found 1 duplicate file (Save 240 MB by removing duplicates).`
        );
        break;

      case 'genpass':
        const len = parseInt(args[0], 10) || 16;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let pwd = '';
        for (let i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        addLog('success', `Generated Offline Password (${len} chars): ${pwd}`);
        break;

      case 'encrypt':
        if (args.length < 2) {
          addLog('error', 'Usage: encrypt <filename> <passphrase>');
        } else {
          addLog('success', `[+] File encrypted successfully -> ${args[0]}.agv (Multi-byte XOR stream lock with SHA-256 key)`);
        }
        break;

      case 'decrypt':
        if (args.length < 2) {
          addLog('error', 'Usage: decrypt <filename.agv> <passphrase>');
        } else {
          addLog('success', `[+] File decrypted successfully -> decrypted_${args[0].replace('.agv', '')}`);
        }
        break;

      case 'shred':
        if (!args[0]) {
          addLog('error', 'Usage: shred <filename>');
        } else {
          addLog('output', `[*] Overwriting '${args[0]}' with random cryptographic noise (Pass 1/3)...`);
          addLog('output', `[*] Overwriting '${args[0]}' with zeros (Pass 2/3)...`);
          addLog('output', `[*] Overwriting '${args[0]}' with random pattern (Pass 3/3)...`);
          addLog('success', `[+] File '${args[0]}' securely shredded and unlinked from filesystem.`);
        }
        break;

      case 'calc':
        const expr = args.join(' ');
        if (!expr) {
          addLog('error', 'Usage: calc <expression> (e.g., calc 25 * 4 + sqrt(144))');
        } else {
          try {
            // Safe evaluation for simulator
            let sanitized = expr.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');
            sanitized = sanitized.replace(/pi/g, 'Math.PI');
            // eslint-disable-next-line no-eval
            const result = eval(sanitized);
            addLog('success', `[VectorShell Offline Math Engine] Result: ${result}`);
          } catch {
            addLog('error', `Invalid mathematical expression: ${expr}`);
          }
        }
        break;

      case 'note':
        if (args[0] === 'add') {
          const title = args[1] || 'Untitled Note';
          const body = args.slice(2).join(' ') || 'No content';
          setNotesState((prev) => [...prev, { id: prev.length + 1, title, body, date: new Date().toISOString().split('T')[0] }]);
          addLog('success', `[+] Note '${title}' saved to USB vault (.usb_vault/notes.json)`);
        } else if (args[0] === 'list' || !args[0]) {
          let listStr = '[+] USB Vault Notes:\n';
          notesState.forEach((n) => {
            listStr += `  [${n.id}] ${n.title} (${n.date})\n      ${n.body}\n`;
          });
          addLog('output', listStr);
        } else {
          addLog('error', 'Usage: note add <title> <body> OR note list');
        }
        break;

      case 'ask':
      case 'explain':
        const query = args.join(' ');
        if (!query) {
          addLog('output', '[VectorShell AI Engine] Ask me anything about system automation, offline python scripts, or code logic!');
        } else {
          callGeminiApi(query);
        }
        break;

      case 'setup':
        addLog(
          'success',
          `[*] Generating USB Portable Launchers...
[+] Created Windows Launcher  -> E:\\RUN_USB.bat
[+] Created Linux/Mac Launcher -> E:\\run_usb.sh
[+] Auto-run scripts initialized for 1-click execution.`
        );
        break;

      case 'clear':
        setLogs([]);
        break;

      default:
        callGeminiApi(trimmed);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    }
  };

  const copyAllLogs = () => {
    const fullText = logs.map((l) => l.text).join('\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-140px)] min-h-[500px]">
      {/* Terminal Output Console */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-sm flex flex-col flex-1">
        {/* Terminal Header Bar */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-2 text-xs text-slate-400 font-semibold flex items-center space-x-1">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>vectorshell.py (Offline Shell)</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={copyAllLogs}
              title="Copy Terminal Logs"
              className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setLogs([])}
              title="Clear Terminal"
              className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Console Message Stream */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2 leading-relaxed">
          {logs.map((log) => {
            let textColor = 'text-slate-300';
            if (log.type === 'banner') textColor = 'text-cyan-400 font-bold';
            if (log.type === 'input') textColor = 'text-yellow-400 font-bold';
            if (log.type === 'success') textColor = 'text-emerald-400';
            if (log.type === 'error') textColor = 'text-red-400 font-bold';
            if (log.type === 'system') textColor = 'text-purple-400';

            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const parts = log.text.split(urlRegex);

            return (
              <div key={log.id} className="whitespace-pre-wrap break-words">
                <span className={textColor}>
                  {parts.map((part, i) => {
                    if (/^https?:\/\/[^\s]+$/.test(part)) {
                      return (
                        <a
                          key={i}
                          href={part}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-cyan-300 hover:text-cyan-100 font-bold transition-colors cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {part}
                        </a>
                      );
                    }
                    return part;
                  })}
                </span>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input Command Line */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
          <span className="text-cyan-400 font-bold pl-2 select-none">VectorShell&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (sysinfo, disk, clean, genpass, ask ...) or 'help'"
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 font-mono text-sm"
            autoFocus
          />
          <button
            onClick={() => {
              executeCommand(input);
              setInput('');
            }}
            className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
