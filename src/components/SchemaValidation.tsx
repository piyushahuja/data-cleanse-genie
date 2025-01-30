import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface SchemaValidationProps {
  status: "pending" | "valid" | "invalid";
  issues?: string[];
}

export const SchemaValidation = ({ status, issues = [] }: SchemaValidationProps) => {
  return (
    <div className="rounded-lg border p-6 space-y-4">
      <div className="flex items-center space-x-3">
        {status === "pending" ? (
          <AlertCircle className="w-6 h-6 text-neutral-400" />
        ) : status === "valid" ? (
          <CheckCircle2 className="w-6 h-6 text-success" />
        ) : (
          <XCircle className="w-6 h-6 text-error" />
        )}
        <h3 className="text-lg font-medium">
          Schema Validation {status === "pending" ? "Pending" : status === "valid" ? "Successful" : "Failed"}
        </h3>
      </div>

      {status === "invalid" && issues.length > 0 && (
        <div className="bg-error-light rounded p-4 space-y-2">
          <p className="font-medium text-error">Issues Found:</p>
          <ul className="list-disc list-inside space-y-1">
            {issues.map((issue, index) => (
              <li key={index} className="text-sm text-neutral-700">
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};