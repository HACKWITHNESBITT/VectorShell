# VectorShell v3.0

> **Next-Generation Portable Terminal Simulator & Standalone USB Power Suite**  
> **Created by:** [Victor Kimutai](https://victor-kimutai.onrender.com)  
> 🌐 **Development Live Preview:** [https://ais-dev-ubc4lwf4rlwwhi4fhdbu6i-606428422924.europe-west2.run.app](https://ais-dev-ubc4lwf4rlwwhi4fhdbu6i-606428422924.europe-west2.run.app)  
> 🌐 **Shared Live Application:** [https://ais-pre-ubc4lwf4rlwwhi4fhdbu6i-606428422924.europe-west2.run.app](https://ais-pre-ubc4lwf4rlwwhi4fhdbu6i-606428422924.europe-west2.run.app)

---

## 🚀 Overview

**VectorShell** is an ultra-fast, modern web terminal interface and zero-dependency portable toolsuite designed for field operations, USB drives, and secure local automation. It combines a retro-inspired command-line workspace with dual-mode AI capabilities (live Gemini models + instant offline fallback) alongside cryptographically secure file encryption, SHA-256 wiping, duplicate detectors, and portable Python script generation.

---

## ✨ Key Features

### 💻 1. Interactive Web Terminal Simulator
- Modern retro terminal UI built with React, Vite, and Tailwind CSS.
- **Clickable URL links** for web addresses and external resources directly in output logs.
- Dual-mode AI assistant:
  - **Online Mode:** Connected to Gemini API (`gemini-3.6-flash`, `gemini-3.1-flash-lite`, `gemini-flash-latest`).
  - **Offline Fallback:** Instant local pattern matching and AI queries with zero external dependencies.

### 🐍 2. Portable Python Execution Engine (`vectorshell.py`)
- **Zero External Dependencies:** Built using strictly Python standard library modules (`os`, `sys`, `shutil`, `subprocess`, `json`, `hashlib`, `secrets`, `math`).
- Downloadable directly from the terminal or main application UI with 1-click installer creation (`.bat` for Windows and `.sh` for Linux/macOS).
- Runs natively on Windows, macOS, and Linux without needing `pip install`.

### 🔐 3. Security & Cryptography Vault
- **File Encryption & Decryption:** Multi-byte XOR cipher coupled with SHA-256 key derivation (`.agv` files).
- **Cryptographic File Shredder:** 3-pass overwrite mechanism (zeroes, 0xFF, and cryptographically secure random bytes) before deletion.
- **Cryptographic Password Generator:** Uses Python's `secrets` module for high-entropy password generation.
- **Encrypted Vault Notes:** Store confidential notes locally in `.usb_vault/notes.json`.

### 🧹 4. Storage & System Maintenance
- **USB Partition & Disk Inspector:** Real-time capacity auditing and breakdown.
- **SHA-256 Duplicate File Finder:** Detects identical files across directories by hash signatures.
- **OS Temp File Cleaner:** Scans and purges residual temporary operating system files.
- **Automatic File Organizer:** Sorts unsorted USB root files into `/Documents`, `/Media`, `/Code`, `/Archives`, and `/Executables`.

---

## 🛠️ Command Reference

| Command | Description | Example |
| :--- | :--- | :--- |
| `help` | Display interactive CLI cheatsheet and commands menu | `help` |
| `ask <query>` | Query the VectorShell AI Engine (online/offline) | `ask how to encrypt a file` |
| `encrypt <file> <passphrase>` | Encrypt a file using SHA-256 key derivation and multi-byte XOR | `encrypt secrets.txt MyKey123` |
| `decrypt <file.agv> <passphrase>` | Decrypt a `.agv` encrypted vault file | `decrypt secrets.txt.agv MyKey123` |
| `shred <file>` | Securely wipe and obliterate a file with 3-pass overwrite | `shred sensitive.pdf` |
| `genpass [length]` | Generate a secure cryptographic password | `genpass 24` |
| `disk` | Inspect USB storage partitions and space usage | `disk` |
| `clean` | Scan and remove OS temporary files | `clean` |
| `duplicates` | Scan for identical duplicate files by SHA-256 hash | `duplicates` |
| `organize` | Automatically categorize files into structured folders | `organize` |
| `sysinfo` | Run hardware diagnostics and operating system audit | `sysinfo` |
| `note add <title> <body>` | Save an encrypted note to the local vault | `note add Pin 12345` |
| `note list` | Read saved notes from the local vault | `note list` |
| `setup` | Generate 1-click batch (`.bat`) and shell (`.sh`) launchers | `setup` |
| `download` | Download the portable `vectorshell.py` script | `download` |
| `cls` / `clear` | Clear the terminal screen buffer | `clear` |

---

## 👨‍💻 Creator & Maintainer

Created with care by **Victor Kimutai**.  
To learn more about the author or explore other projects, visit:  
🔗 **[https://victor-kimutai.onrender.com](https://victor-kimutai.onrender.com)**

---

## 📜 License

Distributed under the MIT License. Free for personal, commercial, and portable offline use.
