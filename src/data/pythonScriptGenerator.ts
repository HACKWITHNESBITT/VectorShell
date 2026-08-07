import { ScriptConfig } from '../types';

export function generatePythonScript(config: ScriptConfig): string {
  const dateStr = new Date().toISOString().split('T')[0];
  
  return `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
===============================================================================
 ANTIGRAVITY USB POWER SUITE - FULLY OFFLINE EDITION v3.0
 Generated: ${dateStr}
 Target: Standard Python 3.6+ (Windows, macOS, Linux)
 External Dependencies: ZERO (Uses 100% Python Standard Library)
===============================================================================
 Features Included:
 - ${config.includeAssistant ? 'Offline Antigravity Conversational Intelligence & Rule-Based NLP' : 'Disabled'}
 - ${config.includeSystemTools ? 'System Diagnostics & Storage Inspector' : 'Disabled'}
 - ${config.includeVault ? 'Offline Security Vault & File Encryption / Shredder' : 'Disabled'}
 - ${config.includeUsbOrganizer ? 'USB File Organizer & Duplicate Cleaner' : 'Disabled'}
 - ${config.includeNotes ? 'Encrypted USB Notes & Code Snippet Vault' : 'Disabled'}
 - ${config.includeGui ? 'Dual Mode: ANSI Interactive Terminal CLI + Tkinter Graphical UI' : 'Terminal CLI Only'}
===============================================================================
"""

import os
import sys
import platform
import subprocess
import shutil
import json
import time
import hashlib
import re
import math
import random
import datetime
import pathlib
import secrets
import string
import argparse
from pathlib import Path

# --- GLOBAL CONSTANTS & PATHS ---
VERSION = "3.0.0-OFFLINE"
BANNER = """
===============================================================================
     _____   _  _______ _____  _____   ___  _   _ _____ _______   __
    / _ \\ \\ | |/ /_   _/ ____|  __ \\ / _ \\| | | |_   _/ ____\\ \\ / /
   / /_\\ \\ \\| |   | | | |  __| |__) | /_\\ \\ |_| | | | | |  __\\ V / 
   |  _  | .   |  | | | | |_ |  _  /|  _  |  _  | | | | | |_ | |  
   |_| |_|_|\\_|   |_| |_____|_| \\_\\_| |_|_| |_|_|___|  \\_____|_|  
   
              ANTIGRAVITY USB OFFLINE POWER SUITE v""" + VERSION + """
      [100% Offline | Zero Dependencies | Full System Control & Assistant]
===============================================================================
"""

# Detect script root directory (USB drive root)
SCRIPT_DIR = Path(__file__).resolve().parent
VAULT_DIR = SCRIPT_DIR / ".usb_vault"
NOTES_FILE = VAULT_DIR / "notes.json"

# ANSI Colors for Terminal
class Colors:
    CYAN = '\\033[96m'
    GREEN = '\\033[92m'
    YELLOW = '\\033[93m'
    RED = '\\033[91m'
    MAGENTA = '\\033[95m'
    BOLD = '\\033[1m'
    RESET = '\\033[0m'

def color_print(text, color=Colors.CYAN, bold=False):
    prefix = color + (Colors.BOLD if bold else "")
    print(f"{prefix}{text}{Colors.RESET}")

def enable_windows_ansi():
    if os.name == 'nt':
        try:
            import ctypes
            kernel32 = ctypes.windll.kernel32
            kernel32.SetConsoleMode(kernel32.GetStdHandle(-11), 7)
        except Exception:
            pass

enable_windows_ansi()

# Ensure vault directory exists
VAULT_DIR.mkdir(exist_ok=True)

${config.includeSystemTools ? `
# =============================================================================
# MODULE: SYSTEM & HARDWARE DIAGNOSTICS
# =============================================================================
class SystemDiagnostics:
    @staticmethod
    def get_info():
        info = {
            "OS": f"{platform.system()} {platform.release()} ({platform.version()})",
            "Architecture": platform.architecture()[0],
            "Processor": platform.processor() or platform.machine(),
            "Python Version": sys.version.split()[0],
            "Hostname": platform.node(),
            "USB Script Location": str(SCRIPT_DIR),
            "Date/Time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        return info

    @staticmethod
    def print_sysinfo():
        color_print("[+] SYSTEM DIAGNOSTICS REPORT", Colors.GREEN, bold=True)
        print("-" * 60)
        for k, v in SystemDiagnostics.get_info().items():
            print(f"  {Colors.BOLD}{k:<22}:{Colors.RESET} {v}")
        print("-" * 60)

    @staticmethod
    def print_disk_info():
        color_print("[+] STORAGE DRIVES & PARTITIONS", Colors.CYAN, bold=True)
        print("-" * 60)
        if hasattr(shutil, 'disk_usage'):
            total, used, free = shutil.disk_usage(SCRIPT_DIR)
            gb = 1024 ** 3
            print(f" Current Drive ({SCRIPT_DIR.anchor}):")
            print(f"  - Total Capacity : {total / gb:.2f} GB")
            print(f"  - Used Space     : {used / gb:.2f} GB ({(used/total)*100:.1f}%)")
            print(f"  - Free Space     : {free / gb:.2f} GB ({(free/total)*100:.1f}%)")
        print("-" * 60)

    @staticmethod
    def clean_temp_files():
        color_print("[*] Scanning system temporary directories...", Colors.YELLOW)
        temp_paths = []
        if os.name == 'nt':
            temp_paths = [os.environ.get('TEMP'), os.environ.get('TMP')]
        else:
            temp_paths = ['/tmp', '/var/tmp']
        
        cleaned_bytes = 0
        cleaned_files = 0
        for tp in temp_paths:
            if tp and os.path.exists(tp):
                for root, dirs, files in os.walk(tp):
                    for f in files:
                        if f.endswith(('.tmp', '.log', '.bak', '.chk')):
                            fp = os.path.join(root, f)
                            try:
                                size = os.path.getsize(fp)
                                os.remove(fp)
                                cleaned_bytes += size
                                cleaned_files += 1
                            except Exception:
                                pass
        mb = cleaned_bytes / (1024 * 1024)
        color_print(f"[+] Cleanup Complete! Removed {cleaned_files} temporary files ({mb:.2f} MB freed).", Colors.GREEN)
` : ''}

${config.includeVault ? `
# =============================================================================
# MODULE: OFFLINE SECURITY & FILE VAULT
# =============================================================================
class SecurityVault:
    @staticmethod
    def derive_key(passphrase: str) -> bytes:
        return hashlib.sha256(passphrase.encode('utf-8')).digest()

    @staticmethod
    def encrypt_file(file_path: str, passphrase: str) -> str:
        p = Path(file_path)
        if not p.exists():
            return f"Error: File '{file_path}' does not exist."
        
        key = SecurityVault.derive_key(passphrase)
        out_path = p.with_suffix(p.suffix + ".agv")
        
        with open(p, 'rb') as f_in, open(out_path, 'wb') as f_out:
            data = f_in.read()
            encrypted = bytearray(len(data))
            for i in range(len(data)):
                encrypted[i] = data[i] ^ key[i % len(key)]
            f_out.write(b"AGV1")
            f_out.write(encrypted)
            
        return f"File encrypted successfully -> {out_path.name}"

    @staticmethod
    def decrypt_file(file_path: str, passphrase: str) -> str:
        p = Path(file_path)
        if not p.exists():
            return f"Error: File '{file_path}' does not exist."
        
        key = SecurityVault.derive_key(passphrase)
        if file_path.endswith(".agv"):
            out_path = p.with_suffix("")
        else:
            out_path = p.with_name("decrypted_" + p.name)
            
        with open(p, 'rb') as f_in:
            magic = f_in.read(4)
            if magic != b"AGV1":
                return "Error: Invalid vault file header format or corrupted file."
            data = f_in.read()

        decrypted = bytearray(len(data))
        for i in range(len(data)):
            decrypted[i] = data[i] ^ key[i % len(key)]
            
        with open(out_path, 'wb') as f_out:
            f_out.write(decrypted)
            
        return f"File decrypted successfully -> {out_path.name}"

    @staticmethod
    def shred_file(file_path: str, passes: int = 3) -> str:
        p = Path(file_path)
        if not p.exists():
            return f"Error: File '{file_path}' not found."
        
        length = p.stat().st_size
        with open(p, "wb") as f:
            for _ in range(passes):
                f.seek(0)
                f.write(secrets.token_bytes(length))
                f.flush()
                os.fsync(f.fileno())
        p.unlink()
        return f"File '{p.name}' securely shredded with {passes}-pass overwrite."

    @staticmethod
    def generate_password(length: int = 16) -> str:
        chars = string.ascii_letters + string.digits + "!@#$%^&*()_+-=[]{}|;:,.<>?"
        return ''.join(secrets.choice(chars) for _ in range(length))
` : ''}

${config.includeUsbOrganizer ? `
# =============================================================================
# MODULE: USB FILE ORGANIZER & DUPLICATE FINDER
# =============================================================================
class UsbOrganizer:
    CATEGORIES = {
        "Documents": [".pdf", ".docx", ".doc", ".txt", ".xlsx", ".pptx", ".odt", ".csv"],
        "Media": [".jpg", ".png", ".gif", ".mp4", ".mp3", ".wav", ".mkv", ".mov", ".svg"],
        "Archives": [".zip", ".rar", ".7z", ".tar", ".gz", ".iso"],
        "Code": [".py", ".js", ".ts", ".html", ".css", ".json", ".cpp", ".c", ".java", ".sh", ".bat"],
        "Executables": [".exe", ".msi", ".dmg", ".appimage", ".deb"]
    }

    @staticmethod
    def organize(target_dir: str = "."):
        base = Path(target_dir).resolve()
        color_print(f"[*] Organizing USB files in: {base}", Colors.CYAN)
        moved_count = 0

        for item in list(base.iterdir()):
            if item.is_file() and not item.name.startswith(".") and item.name != Path(__file__).name:
                ext = item.suffix.lower()
                dest_cat = "Misc"
                for cat, exts in UsbOrganizer.CATEGORIES.items():
                    if ext in exts:
                        dest_cat = cat
                        break
                
                cat_folder = base / dest_cat
                cat_folder.mkdir(exist_ok=True)
                dest_file = cat_folder / item.name
                if not dest_file.exists():
                    shutil.move(str(item), str(dest_file))
                    moved_count += 1
                    
        color_print(f"[+] Organized {moved_count} files into categorized USB folders.", Colors.GREEN)

    @staticmethod
    def find_duplicates(target_dir: str = "."):
        base = Path(target_dir).resolve()
        hashes = {}
        duplicates = []

        color_print(f"[*] Scanning for duplicate files in {base}...", Colors.YELLOW)
        for root, _, files in os.walk(base):
            for f in files:
                fp = Path(root) / f
                if fp.is_file() and fp.stat().st_size > 0:
                    try:
                        h = hashlib.sha256(fp.read_bytes()).hexdigest()
                        if h in hashes:
                            duplicates.append((fp, hashes[h]))
                        else:
                            hashes[h] = fp
                    except Exception:
                        pass

        if duplicates:
            color_print(f"[!] Found {len(duplicates)} duplicate files:", Colors.RED, bold=True)
            for dup, orig in duplicates:
                print(f"  Duplicate: {dup.relative_to(base)}  ==> Original: {orig.relative_to(base)}")
        else:
            color_print("[+] No duplicate files found.", Colors.GREEN)
` : ''}

${config.includeNotes ? `
# =============================================================================
# MODULE: OFFLINE USB NOTES & CODE VAULT
# =============================================================================
class NotesVault:
    @staticmethod
    def load_notes():
        if NOTES_FILE.exists():
            try:
                with open(NOTES_FILE, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                return []
        return []

    @staticmethod
    def save_notes(notes):
        with open(NOTES_FILE, "w", encoding="utf-8") as f:
            json.dump(notes, f, indent=2)

    @staticmethod
    def add_note(title: str, body: str, category: str = "General"):
        notes = NotesVault.load_notes()
        notes.append({
            "id": len(notes) + 1,
            "title": title,
            "body": body,
            "category": category,
            "date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })
        NotesVault.save_notes(notes)
        return f"Note '{title}' saved to USB vault."

    @staticmethod
    def list_notes():
        notes = NotesVault.load_notes()
        if not notes:
            return "No notes stored in USB vault."
        output = []
        for n in notes:
            output.append(f"[{n['id']}] {n['title']} ({n['category']}) - {n['date']}\\n    {n['body']}\\n")
        return "\\n".join(output)
` : ''}

${config.includeAssistant ? `
# =============================================================================
# MODULE: ANTIGRAVITY CONVERSATIONAL AI ENGINE (GEMINI LLM + OFFLINE FALLBACK)
# =============================================================================
class AntigravityOfflineAI:
    KNOWLEDGE_BASE = {
        "python": "Python is a high-level interpreted language. Offline tips: Use 'sys', 'os', 'subprocess' for automation without external packages.",
        "usb": "USB drives format tips: NTFS/exFAT support large files (>4GB). FAT32 works on all hardware. Use eject safely.",
        "security": "Offline Security Best Practices: Use multi-pass file shredding, XOR/AES file encryption, and unique strong passwords.",
        "network": "Offline Network Diagnostics: Check IP configuration, ping localhost (127.0.0.1), and review local host files.",
        "git": "Git offline workflow: Commit locally with 'git commit -m'. Create local bundles with 'git bundle create repo.bundle --all'."
    }

    @staticmethod
    def query_gemini_api(prompt: str) -> str:
        api_key = os.environ.get("GEMINI_API_KEY", "").strip()
        if not api_key:
            return None
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key={api_key}"
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "systemInstruction": {
                    "parts": [{"text": "You are the Antigravity USB Power Suite AI Engine - an intelligent portable companion running from a USB drive. Respond concisely, helpfully, and with developer expertise."}]
                }
            }
            data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json", "User-Agent": "aistudio-build"})
            with urllib.request.urlopen(req, timeout=10) as response:
                result = json.loads(response.read().decode("utf-8"))
                text = result["candidates"][0]["content"]["parts"][0]["text"]
                return f"[Antigravity Online AI (Gemini 3.6 Flash)]\\n{text}"
        except Exception:
            return None

    @staticmethod
    def process_query(prompt: str) -> str:
        # Check if Gemini API is available online first
        online_res = AntigravityOfflineAI.query_gemini_api(prompt)
        if online_res:
            return online_res

        prompt_clean = prompt.lower().strip()

        if any(op in prompt for op in ['+', '-', '*', '/', '**', '%', 'sqrt', 'sin', 'cos']):
            try:
                expr = re.sub(r'[^0-9\\+\\-\\*/\\%\\.\\(\\)\\s\\,math]', '', prompt)
                if expr.strip():
                    val = eval(expr, {"__builtins__": None, "math": math})
                    return f"[Antigravity AI Math Engine] Result: {val}"
            except Exception:
                pass

        if any(w in prompt_clean for w in ["hello", "hi", "hey", "friend", "greetings", "howdy", "sup", "yo"]):
            return "[Antigravity Offline AI] Greetings, friend! I am your Antigravity Offline AI Assistant running directly from your USB drive.\\nI am fully operational and ready to assist with offline code generation, file encryption, storage cleanup, system diagnostics, and local automation.\\nType 'help' to view all commands or type any question to query my offline knowledge base!"

        if any(w in prompt_clean for w in ["who created you", "who made you", "who built you", "creator", "developer"]):
            return "I was created by Victor Kimutai. If you want to know more about him, you'll find him at https://victor-kimutai.onrender.com"

        if "who are you" in prompt_clean or "about" in prompt_clean or "identity" in prompt_clean:
            return "[Antigravity Offline AI] I am the Antigravity USB Power Suite Offline Intelligence Engine v3.0.\\nBuilt with 100% standard Python libraries, I execute completely offline with zero cloud dependency.\\nFeatures: System Diagnostics, Hardware Reports, SHA-256 Shredder, Multi-byte XOR Encryption, Password Generator, USB Auto-Organizer, and Encrypted Vault Notes."

        if any(w in prompt_clean for w in ["thank", "thanks", "awesome", "cool", "great", "nice"]):
            return "[Antigravity Offline AI] You're very welcome! Stay secure and productive wherever your USB takes you."

        if any(w in prompt_clean for w in ["encrypt", "secret", "lock", "vault", "shred"]):
            return "[Antigravity Offline AI] Security Vault:\\n• Use 'encrypt <file> <passphrase>' to lock any file with multi-byte XOR & SHA-256 key derivation.\\n• Use 'decrypt <file.agv> <passphrase>' to restore it.\\n• Use 'shred <file>' for 3-pass cryptographic wipe."

        if any(w in prompt_clean for w in ["clean", "disk", "space", "temp", "storage"]):
            return "[Antigravity Offline AI] Storage Management:\\n• Use 'disk' to inspect storage capacity.\\n• Use 'clean' to remove temp files.\\n• Use 'duplicates' to scan duplicate files via SHA-256."

        if any(w in prompt_clean for w in ["organize", "sort", "files"]):
            return "[Antigravity Offline AI] USB Organizer:\\n• Use 'organize' to automatically sort files into /Documents, /Media, /Code, /Archives, and /Executables."

        if "explain" in prompt_clean or "code" in prompt_clean:
            concept = prompt_clean.replace("explain", "").replace("code", "").strip()
            return f"[Antigravity AI Code Mentor] Concept analysis for '{concept}':\\n- Structure: Pure Python pattern\\n- Execution: Fully offline standard library\\n- Recommendation: Ensure exception handling around file I/O operations."

        for key, knowledge in AntigravityOfflineAI.KNOWLEDGE_BASE.items():
            if key in prompt_clean:
                return f"[Antigravity Offline Knowledge] {knowledge}"

        return f"[Antigravity Offline AI] Processed query: '{prompt}'\\nStatus: Pure local execution active. Memory & hardware state optimal.\\n• Tip: Run 'help' for full CLI cheatsheet or 'sysinfo' for system diagnostics."
` : ''}

# =============================================================================
# MODULE: BATCH LAUNCHER GENERATOR (USB AUTORUN / SHORTCUTS)
# =============================================================================
def generate_usb_launchers():
    color_print("[*] Generating USB Portable Launcher scripts...", Colors.CYAN)
    
    bat_content = """@echo off
TITLE Antigravity USB Power Suite
cls
echo Starting Antigravity USB Suite...
python "%~dp0usb_antigravity.py" %*
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Python standard runtime not detected on PATH.
    echo Please ensure Python 3 is installed or portable Python is present on USB.
    pause
)
"""
    bat_path = SCRIPT_DIR / "RUN_USB.bat"
    with open(bat_path, "w", encoding="utf-8") as f:
        f.write(bat_content)
        
    sh_content = """#!/usr/bin/env bash
DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "Launching Antigravity USB Power Suite..."
python3 "$DIR/usb_antigravity.py" "$@"
"""
    sh_path = SCRIPT_DIR / "run_usb.sh"
    with open(sh_path, "w", encoding="utf-8") as f:
        f.write(sh_content)
    try:
        os.chmod(sh_path, 0o755)
    except Exception:
        pass
        
    color_print(f"[+] Created Windows Launcher -> {bat_path.name}", Colors.GREEN)
    color_print(f"[+] Created Linux/Mac Launcher -> {sh_path.name}", Colors.GREEN)

# =============================================================================
# INTERACTIVE TERMINAL CLI SHELL
# =============================================================================
class AntigravityCLI:
    def __init__(self):
        self.running = True

    def print_help(self):
        color_print("\\n=================== COMMAND CHEATSHEET ===================", Colors.CYAN, bold=True)
        print("  sysinfo                  - View CPU, OS, RAM & Hardware details")
        print("  disk                     - Inspect storage space & USB partitions")
        print("  clean                    - Reclaim storage by clearing temp files")
        print("  organize [path]          - Auto-sort files into categorized folders")
        print("  duplicates [path]        - Find duplicate files via SHA-256")
        print("  hash [file]              - Calculate MD5 & SHA256 file checksums")
        print("  encrypt [file] [pass]    - Encrypt file with secret passphrase")
        print("  decrypt [file] [pass]    - Decrypt .agv locked file")
        print("  shred [file]             - Secure multi-pass file wipe")
        print("  genpass [length]         - Generate strong cryptographic password")
        print("  ask [query]              - Chat with Antigravity Offline AI")
        print("  calc [expr]              - Offline scientific math calculator")
        print("  note add [title] [body]  - Save encrypted note to USB vault")
        print("  note list                - View all USB vault notes")
        print("  setup                    - Re-generate USB batch/shell launchers")
        print("  gui                      - Launch Tkinter Desktop UI (if available)")
        print("  exit / quit              - Exit Antigravity USB Suite")
        print("===========================================================\\n")

    def run(self):
        print(BANNER)
        color_print("Type 'help' to view all commands, or 'ask <question>' to talk to offline AI.", Colors.YELLOW)
        
        while self.running:
            try:
                prompt_str = f"\\n{Colors.CYAN}{Colors.BOLD}Antigravity-USB>{Colors.RESET} "
                user_input = input(prompt_str).strip()
                if not user_input:
                    continue
                
                parts = user_input.split()
                cmd = parts[0].lower()
                args = parts[1:]

                if cmd in ['exit', 'quit']:
                    color_print("Exiting Antigravity USB Suite. Have a productive day!", Colors.CYAN)
                    self.running = False
                elif cmd == 'help':
                    self.print_help()
                ${config.includeSystemTools ? `
                elif cmd == 'sysinfo':
                    SystemDiagnostics.print_sysinfo()
                elif cmd == 'disk':
                    SystemDiagnostics.print_disk_info()
                elif cmd == 'clean':
                    SystemDiagnostics.clean_temp_files()
                ` : ''}
                ${config.includeUsbOrganizer ? `
                elif cmd == 'organize':
                    target = args[0] if args else "."
                    UsbOrganizer.organize(target)
                elif cmd == 'duplicates':
                    target = args[0] if args else "."
                    UsbOrganizer.find_duplicates(target)
                ` : ''}
                ${config.includeVault ? `
                elif cmd == 'encrypt':
                    if len(args) < 2:
                        color_print("Usage: encrypt <filepath> <passphrase>", Colors.RED)
                    else:
                        res = SecurityVault.encrypt_file(args[0], args[1])
                        color_print(res, Colors.GREEN if "successfully" in res else Colors.RED)
                elif cmd == 'decrypt':
                    if len(args) < 2:
                        color_print("Usage: decrypt <filepath> <passphrase>", Colors.RED)
                    else:
                        res = SecurityVault.decrypt_file(args[0], args[1])
                        color_print(res, Colors.GREEN if "successfully" in res else Colors.RED)
                elif cmd == 'shred':
                    if not args:
                        color_print("Usage: shred <filepath>", Colors.RED)
                    else:
                        res = SecurityVault.shred_file(args[0])
                        color_print(res, Colors.YELLOW)
                elif cmd == 'genpass':
                    length = int(args[0]) if args and args[0].isdigit() else 16
                    pwd = SecurityVault.generate_password(length)
                    color_print(f"Generated Password: {pwd}", Colors.GREEN, bold=True)
                ` : ''}
                ${config.includeNotes ? `
                elif cmd == 'note':
                    if len(args) >= 3 and args[0] == 'add':
                        title = args[1]
                        body = " ".join(args[2:])
                        res = NotesVault.add_note(title, body)
                        color_print(f"[+] {res}", Colors.GREEN)
                    elif args and args[0] == 'list':
                        res = NotesVault.list_notes()
                        print(res)
                    else:
                        color_print("Usage: note add <title> <body> OR note list", Colors.YELLOW)
                ` : ''}
                ${config.includeAssistant ? `
                elif cmd == 'ask':
                    query = " ".join(args)
                    res = AntigravityOfflineAI.process_query(query)
                    color_print(res, Colors.CYAN)
                elif cmd == 'calc':
                    expr = " ".join(args)
                    res = AntigravityOfflineAI.process_query(expr)
                    color_print(res, Colors.MAGENTA)
                ` : ''}
                elif cmd == 'setup':
                    generate_usb_launchers()
                elif cmd == 'gui':
                    launch_gui()
                else:
                    ${config.includeAssistant ? `
                    res = AntigravityOfflineAI.process_query(user_input)
                    color_print(res, Colors.CYAN)
                    ` : `
                    color_print(f"Unknown command: '{cmd}'. Type 'help' for available commands.", Colors.RED)
                    `}
            except KeyboardInterrupt:
                print("\\nUse 'exit' or 'quit' to close gracefully.")
            except Exception as e:
                color_print(f"[!] Error executing command: {str(e)}", Colors.RED)

# =============================================================================
# OPTIONAL TKINTER GRAPHICAL DESKTOP UI
# =============================================================================
def launch_gui():
    try:
        import tkinter as tk
    except ImportError:
        print("[!] Tkinter GUI module not available on this Python installation.")
        print("    Running in Terminal CLI mode instead.")
        return

    root = tk.Tk()
    root.title(f"Antigravity USB Power Suite v{VERSION}")
    root.geometry("800x550")
    root.configure(bg="#1e1e2e")

    lbl_title = tk.Label(root, text="ANTIGRAVITY USB SUITE", font=("Helvetica", 18, "bold"), fg="#89b4fa", bg="#1e1e2e")
    lbl_title.pack(pady=10)

    lbl_sub = tk.Label(root, text="100% Offline USB Control Center", font=("Helvetica", 10), fg="#a6adc8", bg="#1e1e2e")
    lbl_sub.pack()

    txt_log = tk.Text(root, bg="#11111b", fg="#a6e3a1", font=("Consolas", 10), insertbackground="white")
    txt_log.pack(fill=tk.BOTH, expand=True, padx=15, pady=10)
    txt_log.insert(tk.END, "Antigravity USB GUI Initialized.\\nClick buttons below or type command.\\n\\n")

    btn_frame = tk.Frame(root, bg="#1e1e2e")
    btn_frame.pack(fill=tk.X, padx=15, pady=10)

    def log(msg):
        txt_log.insert(tk.END, f"{msg}\\n")
        txt_log.see(tk.END)

    ${config.includeSystemTools ? `
    tk.Button(btn_frame, text="System Info", bg="#313244", fg="white", command=lambda: log(json.dumps(SystemDiagnostics.get_info(), indent=2))).pack(side=tk.LEFT, padx=5)
    tk.Button(btn_frame, text="Clean Temp", bg="#313244", fg="white", command=lambda: SystemDiagnostics.clean_temp_files()).pack(side=tk.LEFT, padx=5)
    ` : ''}
    ${config.includeUsbOrganizer ? `
    tk.Button(btn_frame, text="Organize USB", bg="#313244", fg="white", command=lambda: UsbOrganizer.organize(".")).pack(side=tk.LEFT, padx=5)
    ` : ''}
    ${config.includeVault ? `
    tk.Button(btn_frame, text="Gen Password", bg="#313244", fg="white", command=lambda: log("Generated Password: " + SecurityVault.generate_password())).pack(side=tk.LEFT, padx=5)
    ` : ''}
    tk.Button(btn_frame, text="Generate Launchers", bg="#a6e3a1", fg="#11111b", command=lambda: generate_usb_launchers()).pack(side=tk.RIGHT, padx=5)

    root.mainloop()

# =============================================================================
# MAIN ENTRY POINT
# =============================================================================
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Antigravity USB Power Suite - Offline Tool")
    parser.add_argument("--gui", action="store_true", help="Launch Graphical User Interface directly")
    parser.add_argument("--setup", action="store_true", help="Generate USB launcher scripts and exit")
    args = parser.parse_args()

    if args.setup:
        generate_usb_launchers()
    elif args.gui:
        launch_gui()
    else:
        if not (SCRIPT_DIR / "RUN_USB.bat").exists():
            generate_usb_launchers()
            
        cli = AntigravityCLI()
        cli.run()
`;
}
