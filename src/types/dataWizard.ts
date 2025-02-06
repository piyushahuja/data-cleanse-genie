export interface PromptHistoryEntry {
  id: string;
  prompt: string;
  timestamp: number;
  results?: {
    errorCount: number;
    cleanupOptions: number;
  };
}

export interface DataWizardState {
  currentPrompt: string;
  history: PromptHistoryEntry[];
  isAnalyzing: boolean;
} 