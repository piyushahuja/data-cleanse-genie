import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface DataWizardPromptProps {
  onPromptSubmit: (prompt: string) => void;
  isLoading?: boolean;
}

export const DataWizardPrompt = ({ onPromptSubmit, isLoading }: DataWizardPromptProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onPromptSubmit(prompt.trim());
    }
  };

  return (
    <div className="rounded-lg border p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <Sparkles className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-medium">Data Wizard</h3>
      </div>
      <p className="text-sm text-neutral-600">
        Describe any specific data cleaning requirements or patterns you'd like to detect.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., Check for inconsistent date formats or validate email addresses"
          className="min-h-[100px] resize-none"
          disabled={isLoading}
        />
        <div className="flex justify-end">
          <Button 
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="bg-primary hover:bg-primary-dark text-white"
          >
            {isLoading ? "Processing..." : "Analyze Data"}
          </Button>
        </div>
      </form>
    </div>
  );
}; 