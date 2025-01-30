import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  onFileAccepted: (file: File) => void;
  type: "master" | "data";
}

export const FileUpload = ({ onFileAccepted, type }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uploadedFile = acceptedFiles[0];
      if (uploadedFile) {
        setFile(uploadedFile);
        onFileAccepted(uploadedFile);
        toast.success(`${uploadedFile.name} uploaded successfully`);
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/json": [".json"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${
          isDragActive
            ? "border-primary bg-primary-light"
            : "border-neutral-300 hover:border-primary"
        }
        ${file ? "bg-success-light border-success" : ""}`}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        {file ? (
          <>
            <CheckCircle2 className="w-12 h-12 mx-auto text-success" />
            <p className="text-success font-medium">{file.name}</p>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 mx-auto text-neutral-400" />
            <div>
              <p className="text-lg font-medium text-neutral-700">
                {type === "master" ? "Upload Master Data Structure" : "Upload Data File"}
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                Drag and drop your {type === "master" ? "master schema" : "data"} file here, or click to browse
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};