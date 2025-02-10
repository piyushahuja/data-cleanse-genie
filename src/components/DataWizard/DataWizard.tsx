import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

interface DataWizardProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  isDisabled?: boolean;
}

const EXAMPLE_PROMPTS = [
  "Check for inconsistent date formats and standardize them to YYYY-MM-DD",
  "Identify and remove duplicate entries based on email addresses",
  "Validate phone numbers and flag invalid formats",
  "Find missing values in required fields and suggest defaults"
];

export function DataWizard({ prompt, onPromptChange, isOpen, onToggle }: DataWizardProps) {
  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={onToggle}
        className="text-primary hover:bg-primary-light"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        {isOpen ? "Close Wizard" : "Open Data Wizard"}
      </Button>

      {isOpen && (
        <div className="rounded-lg border bg-white p-6 space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium">Data Wizard</h3>
          </div>
          
          <Textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Describe your data cleaning requirements..."
            className="min-h-[100px]"
          />

          <div className="space-y-2">
            <p className="text-sm text-neutral-600">Example prompts:</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => onPromptChange(example)}
                  className="text-xs"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  {example.slice(0, 30)}...
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 