import { useState, useEffect } from "react";
import { Sparkles, Clock, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PromptHistoryEntry } from "@/types/dataWizard";

interface DataWizardLabProps {
  onPromptChange: (prompt: string) => void;
  isAnalyzing: boolean;
}

const EXAMPLE_PROMPTS = [
  "Check for inconsistent date formats and standardize them to YYYY-MM-DD",
  "Identify and remove duplicate entries based on email addresses",
  "Validate phone numbers and flag invalid formats",
];

export const DataWizardLab = ({ onPromptChange, isAnalyzing }: DataWizardLabProps) => {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<PromptHistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("promptHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("promptHistory", JSON.stringify(history));
  }, [history]);

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
    onPromptChange(newPrompt);
  };

  const useExamplePrompt = (example: string) => {
    handlePromptChange(example);
  };

  const useHistoryPrompt = (entry: PromptHistoryEntry) => {
    handlePromptChange(entry.prompt);
  };

  return (
    <div className="rounded-lg border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-medium">Data Wizard Lab</h3>
        </div>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="text-neutral-500"
          >
            <Clock className="w-4 h-4 mr-2" />
            History
            {isHistoryOpen ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </Button>
        )}
      </div>

      {isHistoryOpen && history.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-neutral-700">Previous Prompts</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => useHistoryPrompt(entry)}
                className="w-full text-left p-2 text-sm rounded hover:bg-neutral-50 transition-colors"
              >
                <p className="text-neutral-700 truncate">{entry.prompt}</p>
                <p className="text-xs text-neutral-500">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-sm text-neutral-600 mb-4">
          Describe your data cleaning requirements or patterns to detect.
        </p>
        <div className="space-y-2">
          <p className="text-xs text-neutral-500">Example prompts:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => useExamplePrompt(example)}
                className="text-xs"
              >
                <Zap className="w-3 h-3 mr-1" />
                {example.slice(0, 30)}...
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Textarea
          value={prompt}
          onChange={(e) => handlePromptChange(e.target.value)}
          placeholder="Enter your data cleaning instructions..."
          className="min-h-[100px] resize-none"
          disabled={isAnalyzing}
        />
      </div>
    </div>
  );
}; 