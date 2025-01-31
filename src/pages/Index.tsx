import { useState, useEffect } from "react";
import { FileUpload } from "@/components/FileUpload";
import { SchemaValidation } from "@/components/SchemaValidation";
import { ErrorSummary } from "@/components/ErrorSummary";
import { CleaningOptions } from "@/components/CleaningOptions";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";
import { validateSchema, type SchemaIssue } from "@/services/schemaValidation";
import { validateFiles, type ValidationError, type CleaningOption } from "@/services/errorValidation";
import { toast } from "sonner";

const Index = () => {
  const [masterFile, setMasterFile] = useState<File | null>(null);
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [schemaStatus, setSchemaStatus] = useState<"pending" | "valid" | "invalid">("pending");
  const [schemaIssues, setSchemaIssues] = useState<SchemaIssue[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [cleaningOptions, setCleaningOptions] = useState<CleaningOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    const validate = async () => {
      if (!masterFile || !dataFile) return;
      
      setSchemaStatus("pending");
      try {
        // Validate schema
        const issues = await validateSchema(masterFile, dataFile);
        setSchemaIssues(issues);
        setSchemaStatus(issues.length === 0 ? "valid" : "invalid");

        // Validate files and get errors and cleaning options
        const { errors: validationErrors, cleaningOptions: options } = 
          await validateFiles(masterFile, dataFile);
        setErrors(validationErrors);
        setCleaningOptions(options);
      } catch (error) {
        toast.error("Failed to validate files");
        setSchemaStatus("invalid");
      }
    };

    validate();
  }, [masterFile, dataFile]);

  const handleMasterFileUpload = (file: File) => {
    setMasterFile(file);
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
            <SchemaValidation 
              status={schemaStatus} 
              issues={schemaIssues} 
            />
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