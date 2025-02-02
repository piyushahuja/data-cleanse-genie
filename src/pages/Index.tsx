import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { SchemaValidation } from "@/components/SchemaValidation";
import { ErrorSummary, ErrorType } from "@/components/ErrorSummary";
import { CleaningOptions } from "@/components/CleaningOptions";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";
import { validateSchema, type SchemaIssue } from "@/services/schemaValidation";
import { validateFiles, type ValidationError, type CleaningOption } from "@/services/errorValidation";
import { uploadFile, type UploadResponse } from "@/services/fileUpload";
import { toast } from "sonner";

interface FileState {
  file: File;
  file_id: string;
}

const Index = () => {
  const [masterFile, setMasterFile] = useState<FileState | null>(null);
  const [dataFile, setDataFile] = useState<FileState | null>(null);
  const [schemaStatus, setSchemaStatus] = useState<"pending" | "valid" | "invalid">("pending");
  const [schemaIssues, setSchemaIssues] = useState<SchemaIssue[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [cleaningOptions, setCleaningOptions] = useState<CleaningOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDetectingErrors, setIsDetectingErrors] = useState(false);

  const handleMasterFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const response = await uploadFile(file, 'master');
      setMasterFile({
        file,
        file_id: response.file_id
      });
      toast.success("Master file uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload master file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDataFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const response = await uploadFile(file, 'data');
      setDataFile({
        file,
        file_id: response.file_id
      });
      toast.success("Data file uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload data file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSchemaValidation = async () => {
    if (!masterFile || !dataFile) return;
    
    setSchemaStatus("pending");
    try {
      const issues = await validateSchema(masterFile.file, dataFile.file);
      setSchemaIssues(issues);
      setSchemaStatus(issues.length === 0 ? "valid" : "invalid");
      toast.success("Schema validation completed");
    } catch (error) {
      toast.error("Failed to validate schema");
      setSchemaStatus("invalid");
    }
  };

  const handleErrorDetection = async () => {
    if (!masterFile || !dataFile) return;
    
    setIsDetectingErrors(true);
    try {
      const { errors: validationErrors, cleanupOptions: options } = 
        await validateFiles(masterFile.file_id, dataFile.file_id);
      setErrors(validationErrors);
      setCleaningOptions(options);
      toast.success("Error detection completed");
    } catch (error) {
      toast.error("Failed to detect errors");
    } finally {
      setIsDetectingErrors(false);
    }
  };

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const handleDownload = () => {
    console.log("Downloading cleaned data...");
  };

  const filesUploaded = masterFile !== null && dataFile !== null;

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavigationBar />
      <div className="container py-8 space-y-8">
        <div>
          <p className="mt-2 text-neutral-600">Master Data Cleaning Demo</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <FileUpload 
            type="master" 
            onFileAccepted={handleMasterFileUpload}
            isUploading={isUploading} 
          />
          <FileUpload 
            type="data" 
            onFileAccepted={handleDataFileUpload}
            isUploading={isUploading}
          />
        </div>

        {(masterFile || dataFile) && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex gap-4">
              <Button
                onClick={handleSchemaValidation}
                disabled={!filesUploaded || isUploading}
                className="bg-primary hover:bg-primary-dark text-white"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Validate Schema
              </Button>
              <Button
                onClick={handleErrorDetection}
                disabled={!filesUploaded || isUploading || isDetectingErrors}
                className="bg-primary hover:bg-primary-dark text-white"
              >
                {isDetectingErrors ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <AlertTriangle className="w-4 h-4 mr-2" />
                )}
                {isDetectingErrors ? "Analyzing Files..." : "Detect Errors"}
              </Button>
            </div>

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