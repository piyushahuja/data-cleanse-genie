import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { SchemaValidation } from "@/components/SchemaValidation";
import { ErrorSummary } from "@/components/ErrorSummary";
import { CleaningOptions } from "@/components/CleaningOptions";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";

const Index = () => {
  const [masterFile, setMasterFile] = useState<File | null>(null);
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [schemaStatus, setSchemaStatus] = useState<"pending" | "valid" | "invalid">("pending");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Mock data for demonstration
  const schemaIssues = [
    "Column 'customer_id' missing in data file",
    "Expected date format YYYY-MM-DD for 'purchase_date'",
    "Invalid data type in 'quantity' column (expected number)",
  ];

  const errors = [
    {
      type: "Duplicate Records",
      count: 15,
      description: "Records sharing the same key identifiers",
    },
    {
      type: "Missing Values",
      count: 8,
      description: "Required fields with no data",
    },
    {
      type: "Inconsistent Dates",
      count: 5,
      description: "Dates not following the standard format",
    },
    {
      type: "Invalid Product Codes",
      count: 3,
      description: "Codes not found in master data",
    },
  ];

  const cleaningOptions = [
    {
      id: "duplicates",
      label: "Remove Duplicates",
      description: "Automatically remove duplicate records based on key identifiers",
      count: 15,
    },
    {
      id: "missing",
      label: "Fix Missing Data",
      description: "Fill missing values with appropriate defaults or remove records",
      count: 8,
    },
    {
      id: "dates",
      label: "Standardize Dates",
      description: "Convert all dates to YYYY-MM-DD format",
      count: 5,
    },
    {
      id: "products",
      label: "Validate Product Codes",
      description: "Check and correct product codes against master data",
      count: 3,
    },
  ];

  const handleMasterFileUpload = (file: File) => {
    setMasterFile(file);
    // Simulate schema validation
    setTimeout(() => {
      setSchemaStatus("invalid");
    }, 1500);
  };

  const handleDataFileUpload = (file: File) => {
    setDataFile(file);
  };

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const handleDownload = () => {
    // In a real app, this would process the files and apply the selected cleaning options
    console.log("Downloading cleaned data...");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavigationBar />
      <div className="container py-8 space-y-8">
        <div>
          <p className="mt-2 text-neutral-600">Master Data Cleaning Demo</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <FileUpload type="master" onFileAccepted={handleMasterFileUpload} />
          <FileUpload type="data" onFileAccepted={handleDataFileUpload} />
        </div>

        {masterFile && dataFile && (
          <div className="space-y-8 animate-fade-in">
            <SchemaValidation status={schemaStatus} issues={schemaIssues} />
            <ErrorSummary errors={errors} />
            <CleaningOptions
              options={cleaningOptions}
              selectedOptions={selectedOptions}
              onOptionToggle={toggleOption}
            />

            <div className="flex justify-end">
              <Button
                onClick={handleDownload}
                className="bg-primary hover:bg-primary-dark text-white"
                disabled={selectedOptions.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Cleaned Data
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;