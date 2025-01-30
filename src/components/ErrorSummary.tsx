import { AlertTriangle } from "lucide-react";

interface Error {
  type: string;
  count: number;
  description: string;
}

interface ErrorSummaryProps {
  errors: Error[];
}

export const ErrorSummary = ({ errors }: ErrorSummaryProps) => {
  return (
    <div className="rounded-lg border p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-6 h-6 text-error" />
        <h3 className="text-lg font-medium">Error Detection Summary</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {errors.map((error, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border bg-neutral-50 hover:bg-neutral-100 transition-colors"
          >
            <div className="flex justify-between items-start">
              <span className="font-medium text-neutral-700">{error.type}</span>
              <span className="px-2 py-1 rounded bg-error-light text-error text-sm font-medium">
                {error.count}
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-500">{error.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};