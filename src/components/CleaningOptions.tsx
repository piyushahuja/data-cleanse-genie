import { Check } from "lucide-react";

interface CleaningOption {
  id: string;
  label: string;
  description: string;
  count: number;
}

interface CleaningOptionsProps {
  options: CleaningOption[];
  selectedOptions: string[];
  onOptionToggle: (id: string) => void;
}

export const CleaningOptions = ({
  options,
  selectedOptions,
  onOptionToggle,
}: CleaningOptionsProps) => {
  return (
    <div className="rounded-lg border p-6 space-y-4">
      <h3 className="text-lg font-medium">Choose Cleaning Options</h3>

      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option.id}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedOptions.includes(option.id)
                ? "border-primary bg-primary-light"
                : "border-neutral-200 hover:border-primary"
            }`}
            onClick={() => onOptionToggle(option.id)}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 ${
                  selectedOptions.includes(option.id)
                    ? "bg-primary text-white"
                    : "border border-neutral-300"
                }`}
              >
                {selectedOptions.includes(option.id) && <Check className="w-3 h-3" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium text-neutral-700">{option.label}</span>
                  <span className="text-sm text-neutral-500">{option.count} items</span>
                </div>
                <p className="mt-1 text-sm text-neutral-500">{option.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};