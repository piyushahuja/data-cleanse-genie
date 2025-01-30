import { AlertTriangle, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type ErrorType = "Duplicate Records" | "Missing Values" | "Inconsistent Dates" | "Invalid Product Codes";

interface Error {
  type: ErrorType;
  count: number;
  description: string;
}

interface ErrorSummaryProps {
  errors: Error[];
}

// Define the mock data structure
const mockAffectedRows = {
  "Duplicate Records": [
    { id: 1, customer: "John Doe", email: "john@example.com", date: "2024-01-01" },
    { id: 2, customer: "John Doe", email: "john@example.com", date: "2024-02-15" },
  ],
  "Missing Values": [
    { id: 3, customer: "Jane Smith", email: "", date: "2024-01-05" },
    { id: 4, customer: "Bob Wilson", email: "bob@example.com", date: "" },
  ],
  "Inconsistent Dates": [
    { id: 5, customer: "Alice Brown", email: "alice@example.com", date: "01/15/24" },
    { id: 6, customer: "Charlie Davis", email: "charlie@example.com", date: "2024.02.01" },
  ],
  "Invalid Product Codes": [
    { id: 7, customer: "Eve Johnson", product_code: "XYZ123", status: "Invalid" },
    { id: 8, customer: "Frank Miller", product_code: "ABC456", status: "Not Found" },
  ],
} as const;

export const ErrorSummary = ({ errors }: ErrorSummaryProps) => {
  return (
    <div className="rounded-lg border p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-6 h-6 text-error" />
        <h3 className="text-lg font-medium">Error Detection Summary</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {errors.map((error, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="p-4 rounded-lg border bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-neutral-700">{error.type}</span>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 rounded bg-error-light text-error text-sm font-medium">
                      {error.count}
                    </span>
                    <Eye className="w-4 h-4 text-neutral-500" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-neutral-500">{error.description}</p>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Affected Rows - {error.type}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <div className="rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        {mockAffectedRows[error.type]?.[0] &&
                          Object.keys(mockAffectedRows[error.type][0]).map((header) => (
                            <th
                              key={header}
                              className="px-4 py-2 text-left text-sm font-medium text-neutral-700"
                            >
                              {header.charAt(0).toUpperCase() + header.slice(1)}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockAffectedRows[error.type]?.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="border-t hover:bg-neutral-50 transition-colors"
                        >
                          {Object.values(row).map((value, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="px-4 py-2 text-sm text-neutral-600"
                            >
                              {String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};