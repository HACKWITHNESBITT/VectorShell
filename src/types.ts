export interface ScriptConfig {
  includeGui: boolean;
  includeVault: boolean;
  includeUsbOrganizer: boolean;
  includeAssistant: boolean;
  includeSystemTools: boolean;
  includeNotes: boolean;
  includeNetworkTools: boolean;
  scriptName: string;
  defaultPasscode: string;
}

export interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'success' | 'banner';
  text: string;
  timestamp: string;
}

export type ActiveTab = 'simulator' | 'generator' | 'code' | 'guide' | 'docs';

export interface CommandDoc {
  command: string;
  description: string;
  category: 'System' | 'Security & Vault' | 'USB & Files' | 'Offline AI' | 'Utilities';
  example: string;
}
