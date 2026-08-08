import React, { useState, useRef, useEffect } from 'react';
import { TerminalLog } from '../types';
import { Terminal, Send, Trash2, Copy, Check } from 'lucide-react';
import logoImg from '../assets/images/vectorshell_logo_1786147436152.jpg';

// Subcomponent for ChatGPT-style Code Block with Copy button & syntax styling
const CodeSnippetBlock: React.FC<{ lang: string; code: string }> = ({ lang, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-lg overflow-hidden border border-slate-700 bg-slate-900/90 shadow-xl font-mono text-xs text-slate-200">
      {/* Code Header Bar */}
      <div className="bg-slate-800/90 px-3.5 py-1.5 flex items-center justify-between border-b border-slate-700 select-none">
        <span className="text-cyan-400 font-semibold tracking-wide uppercase text-[11px] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
          {lang || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-[11px]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Syntax Highlighted Code Content */}
      <div className="p-3.5 overflow-x-auto bg-slate-950/80 leading-relaxed text-emerald-300 font-mono">
        <pre className="whitespace-pre">{code.trim()}</pre>
      </div>
    </div>
  );
};

const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, i) => {
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
  });
};

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
      return `I was created by Victor Kimutai. If you want to know more about him, you'll find him at https://victorkimutai.onrender.com`;
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

    // 2. Greetings & Friendly chatter (only if prompt is primarily a greeting without a specific coding/script request)
    const isPureGreeting = /^(hello|hi|hey|greetings|friend|howdy|sup|yo|good morning|good afternoon)[\!\.\?]*$/i.test(p) ||
      (/\b(hello|hi|hey|greetings|howdy)\b/i.test(p) && p.length < 20 && !/\b(script|python|code|write|create|scan|virus|encrypt|file|how|build)\b/i.test(p));

    if (isPureGreeting) {
      return (
        `Greetings, friend! I am your VectorShell AI companion.\n` +
        `I can help you with CLI automation, Python scripting, file encryption, storage maintenance, and general technical questions.\n` +
        `How can I assist you today?`
      );
    }

    // 2b. Virus / File Scanner / Security script generation request
    if (/\b(virus|scan|scanner|malware|hash|threat|signature)\b/i.test(p) && /\b(script|python|code|create|build|write|make|generate)\b/i.test(p)) {
      return `Hello! I'd be happy to help you build a lightweight file & signature scanner in Python.

While full commercial antivirus software relies on complex kernel drivers and dynamic heuristic analysis, you can build a powerful **signature-based file scanner** in Python using SHA-256 hashes.

The script below recursively scans a specified directory, computes **SHA-256 hashes** for files (using chunked reading for memory efficiency), checks against a list of known malicious hashes, and flags suspicious file characteristics (such as hidden double extensions like \`invoice.pdf.exe\`).

### 🐍 VectorShell Virus & Hash Scanner Script

\`\`\`python
import os
import hashlib
import sys
from datetime import datetime

# --- CONFIGURATION ---
# Add known malicious SHA-256 hashes (in lowercase)
KNOWN_BAD_HASHES = {
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", # Sample hash
}

SUSPICIOUS_EXTENSIONS = {".exe", ".bat", ".vbs", ".ps1", ".cmd", ".scr", ".pif"}

def calculate_sha256(filepath, chunk_size=65536):
    """Compute SHA-256 checksum of a file efficiently in chunks."""
    sha256 = hashlib.sha256()
    try:
        with open(filepath, 'rb') as f:
            while chunk := f.read(chunk_size):
                sha256.update(chunk)
        return sha256.hexdigest().lower()
    except Exception as e:
        return None

def scan_directory(target_dir):
    """Scan target directory for suspicious files and hash matches."""
    print(f"[*] Starting Security Scan on: {target_dir}")
    print(f"[*] Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\\n" + "-"*60)
    
    files_scanned = 0
    threats_found = 0

    for root, _, files in os.walk(target_dir):
        for filename in files:
            files_scanned += 1
            filepath = os.path.join(root, filename)
            
            # Check 1: Double extension detection (e.g. document.pdf.exe)
            parts = filename.split('.')
            if len(parts) > 2 and f".{parts[-1].lower()}" in SUSPICIOUS_EXTENSIONS:
                print(f"[!] SUSPICIOUS DOUBLE EXTENSION: {filepath}")
                threats_found += 1

            # Check 2: Hash signature match
            file_hash = calculate_sha256(filepath)
            if file_hash in KNOWN_BAD_HASHES:
                print(f"[DANGER] KNOWN MALICIOUS HASH MATCH: {filepath}")
                print(f"         SHA-256: {file_hash}")
                threats_found += 1

    print("-" * 60)
    print(f"[+] Scan Complete. Scanned: {files_scanned} files | Threats/Suspicious: {threats_found}")

if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    scan_directory(target)
\`\`\`

To run this scanner locally:
\`\`\`bash
python vectorshell_scanner.py /path/to/scan
\`\`\``;
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

      const reply = (data && data.success && data.reply) ? data.reply : processOfflineQuery(promptText);
      addLog('output', reply);
    } catch {
      setLogs((prev) => prev.filter((l) => l.id !== thinkingId));
      const fallbackReply = processOfflineQuery(promptText);
      addLog('output', fallbackReply);
    }
  };

  const executeCommand = (rawCmd: string) => {
    let trimmed = rawCmd.trim();
    if (!trimmed) return;

    addLog('input', `VectorShell> ${trimmed}`);

    // If user enclosed query in square brackets e.g. "ask [how to setup python script...]" or "[query]"
    const askMatch = trimmed.match(/^(ask|explain)\s*\[?(.*?)\]?$/i);
    if (askMatch) {
      const query = askMatch[2].trim();
      if (!query || query.toLowerCase() === 'query') {
        addLog('output', '[VectorShell AI Engine] Ask me anything about system automation, offline python scripts, or code logic!');
      } else {
        callGeminiApi(query);
      }
      return;
    }

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
    <div className="flex-1 flex flex-col min-h-[500px]">
      {/* Terminal Output Console */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-sm flex flex-col flex-1">
        {/* Terminal Header Bar */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-2 text-xs text-slate-400 font-semibold flex items-center space-x-1.5">
              <img
                src={logoImg}
                alt="Logo"
                className="w-4 h-4 rounded object-cover border border-cyan-500/30"
                referrerPolicy="no-referrer"
              />
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

            // Check if log contains markdown code blocks (```lang ... ```)
            const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
            const hasCodeBlock = codeBlockRegex.test(log.text);

            if (hasCodeBlock) {
              const elements: React.ReactNode[] = [];
              let lastIndex = 0;
              let match;
              const regex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;

              while ((match = regex.exec(log.text)) !== null) {
                // Text before code block
                if (match.index > lastIndex) {
                  const textChunk = log.text.substring(lastIndex, match.index);
                  elements.push(
                    <span key={`text-${lastIndex}`} className={textColor}>
                      {renderTextWithLinks(textChunk)}
                    </span>
                  );
                }

                const lang = match[1] || 'code';
                const codeContent = match[2];

                elements.push(
                  <CodeSnippetBlock key={`code-${match.index}`} lang={lang} code={codeContent} />
                );

                lastIndex = regex.lastIndex;
              }

              // Trailing text
              if (lastIndex < log.text.length) {
                const trailingText = log.text.substring(lastIndex);
                elements.push(
                  <span key={`text-${lastIndex}`} className={textColor}>
                    {renderTextWithLinks(trailingText)}
                  </span>
                );
              }

              return (
                <div key={log.id} className="whitespace-pre-wrap break-words space-y-2 my-1">
                  {elements}
                </div>
              );
            }

            return (
              <div key={log.id} className="whitespace-pre-wrap break-words">
                <span className={textColor}>
                  {renderTextWithLinks(log.text)}
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
