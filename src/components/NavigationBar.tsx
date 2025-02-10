import { Menu, Upload, Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const NavigationBar = () => {
  const { toast } = useToast();

  const handleUpload = () => {
    // Trigger file input click
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    } else {
      toast({
        title: "Upload",
        description: "Please scroll down to use the file upload section",
      });
    }
  };

  const handleDownload = () => {
    // Check if there's data to download
    const downloadButton = document.querySelector('button:has(.download-icon)') as HTMLButtonElement;
    if (downloadButton) {
      downloadButton.click();
    } else {
      toast({
        title: "Download",
        description: "Please upload and process files before downloading",
      });
    }
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Settings panel will be available in the next update",
    });
  };

  const handleMenu = () => {
    toast({
      title: "Menu",
      description: "Additional menu options will be available soon",
    });
  };

  return (
    <nav className="bg-white border-b border-neutral-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={handleMenu}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-neutral-800">DataKleen AI</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" title="Upload Files" onClick={handleUpload}>
          <Upload className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" title="Download Results" onClick={handleDownload}>
          <Download className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" title="Settings" onClick={handleSettings}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default NavigationBar;