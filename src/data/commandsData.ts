import { CommandDoc } from '../types';

export const COMMAND_DOCS: CommandDoc[] = [
  {
    command: 'sysinfo',
    description: 'Displays comprehensive offline hardware, OS, CPU, RAM, and USB drive diagnostics.',
    category: 'System',
    example: 'sysinfo',
  },
  {
    command: 'disk',
    description: 'Analyzes attached storage drives, USB partition sizes, free space, and mount points.',
    category: 'System',
    example: 'disk',
  },
  {
    command: 'clean',
    description: 'Scans and removes temporary files, cache, and trash to reclaim USB and system storage.',
    category: 'System',
    example: 'clean',
  },
  {
    command: 'organize [path]',
    description: 'Auto-organizes USB files into categorized folders (Docs, Media, Code, Archives).',
    category: 'USB & Files',
    example: 'organize E:\\',
  },
  {
    command: 'duplicates [path]',
    description: 'Finds duplicate files using SHA-256 hash comparison across USB directories.',
    category: 'USB & Files',
    example: 'duplicates .',
  },
  {
    command: 'hash [file]',
    description: 'Computes MD5, SHA-1, and SHA-256 cryptographic checksums for verification.',
    category: 'USB & Files',
    example: 'hash document.pdf',
  },
  {
    command: 'encrypt [file] [key]',
    description: 'Encrypts a file with an offline stream cipher with password protection (.agv format).',
    category: 'Security & Vault',
    example: 'encrypt passwords.txt mySecret123',
  },
  {
    command: 'decrypt [file] [key]',
    description: 'Decrypts a previously locked .agv file using your secret key.',
    category: 'Security & Vault',
    example: 'decrypt passwords.txt.agv mySecret123',
  },
  {
    command: 'shred [file]',
    description: 'Multi-pass secure wipe of a sensitive file to prevent forensic recovery.',
    category: 'Security & Vault',
    example: 'shred sensitive_data.csv',
  },
  {
    command: 'genpass [length]',
    description: 'Generates cryptographically secure offline random passwords.',
    category: 'Security & Vault',
    example: 'genpass 20',
  },
  {
    command: 'ask [query]',
    description: 'Conversational offline AI assistant for tech guidance, code explanation, & math.',
    category: 'Offline AI',
    example: 'ask how to set up static ip in python',
  },
  {
    command: 'explain [code/concept]',
    description: 'Provides offline explanations for code snippets, algorithms, and system concepts.',
    category: 'Offline AI',
    example: 'explain binary search',
  },
  {
    command: 'calc [expression]',
    description: 'Evaluates mathematical equations, trigonometric functions, and scientific calculations.',
    category: 'Utilities',
    example: 'calc math.sqrt(256) * 12.5',
  },
  {
    command: 'note add [title] [body]',
    description: 'Saves a persistent note or code snippet directly to the USB drive vault.',
    category: 'Utilities',
    example: 'note add "WiFi Config" "IP: 192.168.1.1"',
  },
  {
    command: 'note list',
    description: 'Lists all notes stored inside the USB drive vault.',
    category: 'Utilities',
    example: 'note list',
  },
  {
    command: 'setup',
    description: 'Generates RUN_USB.bat, run_usb.sh, and autorun files for 1-click execution on any PC.',
    category: 'System',
    example: 'setup',
  },
  {
    command: 'gui',
    description: 'Launches the Tkinter Graphical User Interface desktop mode if supported.',
    category: 'Utilities',
    example: 'gui',
  },
];
