# VectorShell v3.0

> **Next-Generation Portable Terminal Simulator & Standalone USB Power Suite**  
> **Created by:** [Victor Kimutai](https://victor-kimutai.onrender.com)  
> **Live Demo:** [https://vectorshell.onrender.com/](https://vectorshell.onrender.com/)

---

## Overview

**VectorShell** is an ultra-fast, modern web terminal interface and zero-dependency portable toolsuite designed for field operations, USB drives, and secure local automation. It combines a retro-inspired command-line workspace with dual-mode AI capabilities (live Gemini models + instant offline fallback) alongside cryptographically secure file encryption, SHA-256 wiping, duplicate detectors, and portable Python script generation.

---

## Key Features

### 1. Interactive Web Terminal Simulator
- Modern retro terminal UI built with React, Vite, and Tailwind CSS.
- **Clickable URL links** for web addresses and external resources directly in output logs.
- Dual-mode AI assistant:
  - **Online Mode:** Connected to Gemini API (`gemini-3.6-flash`, `gemini-3.1-flash-lite`, `gemini-flash-latest`).
  - **Offline Fallback:** Instant local pattern matching and AI queries with zero external dependencies.

### 2. Portable Python Execution Engine (`vectorshell.py`)
- **Zero External Dependencies:** Built using strictly Python standard library modules (`os`, `sys`, `shutil`, `subprocess`, `json`, `hashlib`, `secrets`, `math`).
- Downloadable directly from the terminal or main application UI with 1-click installer creation (`.bat` for Windows and `.sh` for Linux/macOS).
- Runs natively on Windows, macOS, and Linux without needing `pip install`.

### 3. Security & Cryptography Vault
- **File Encryption & Decryption:** Multi-byte XOR cipher coupled with SHA-256 key derivation (`.agv` files).
- **Cryptographic File Shredder:** 3-pass overwrite mechanism (zeroes, 0xFF, and cryptographically secure random bytes) before deletion.
- **Cryptographic Password Generator:** Uses Python's `secrets` module for high-entropy password generation.
- **Encrypted Vault Notes:** Store confidential notes locally in `.usb_vault/notes.json`.

### 4. Storage & System Maintenance
- **USB Partition & Disk Inspector:** Real-time capacity auditing and breakdown.
- **SHA-256 Duplicate File Finder:** Detects identical files across directories by hash signatures.
- **OS Temp File Cleaner:** Scans and purges residual temporary operating system files.
- **Automatic File Organizer:** Sorts unsorted USB root files into `/Documents`, `/Media`, `/Code`, `/Archives`, and `/Executables`.

---

## Command Reference

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

## Deploying on Render

### Option A: Automatic Blueprint Deployment (Recommended)
1. Push your repository to GitHub.
2. Log into [Render Dashboard](https://dashboard.render.com).
3. Click **New +** -> **Blueprint**.
4. Connect your GitHub repository. Render will automatically detect `render.yaml`.
5. Under Environment Variables, add your `GEMINI_API_KEY` (optional, for live AI chat).
6. Click **Apply**.

### Option B: Manual Web Service Setup
1. On [Render Dashboard](https://dashboard.render.com), click **New +** -> **Web Service**.
2. Connect your GitHub repository containing **VectorShell**.
3. Configure the following settings:
   - **Name:** `vectorshell` (or your preferred name)
   - **Environment:** `Node`
   - **Build Command:** `npm install --include=dev && npm run build` (or `npm install && npm run build`)
   - **Start Command:** `npm run start`
4. Under **Environment Variables**:
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: *(Your Google Gemini API Key - optional for live AI chat)*
5. Click **Create Web Service**. Render will build and deploy VectorShell automatically!

---

## Automated CI/CD & Auto-Deployment Pipeline

VectorShell includes a GitHub Actions CI/CD workflow located at `.github/workflows/ci-cd.yml`.

### How It Works:
1. **Continuous Integration (`lint-and-build`)**:
   - Triggers automatically on every `push` or `pull_request` to `main` / `master` branches.
   - Installs Node v22 dependencies, runs TypeScript compilation checks (`npm run lint`), and builds the production bundle (`npm run build`).
2. **Continuous Deployment (`deploy`)**:
   - Executes **only after CI passes** on the `main` or `master` branch.
   - Triggers automatic deployment to Render via Deploy Hook.

### Enabling Auto-Deployment:
1. In your Render Dashboard, navigate to your **VectorShell** web service settings.
2. Scroll to **Deploy Hook** and copy the Deploy Hook URL.
3. In your GitHub repository, navigate to **Settings** -> **Secrets and variables** -> **Actions**.
4. Create a new repository secret named `RENDER_DEPLOY_HOOK_URL` and paste the URL.
5. Every time code is pushed and CI passes, GitHub Actions will trigger an instant deployment!

---

## Creator & Maintainer

Created with care by **Victor Kimutai**.  
To learn more about the author or explore other projects, visit:  
[https://victor-kimutai.onrender.com](https://victor-kimutai.onrender.com)

---

## License

Distributed under the MIT License. Free for personal, commercial, and portable offline use.

