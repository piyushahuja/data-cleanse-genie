import { Menu, Upload, Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavigationBar = () => {
  return (
    <nav className="bg-white border-b border-neutral-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-neutral-800">Tailor Flow AI</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" title="Upload Files">
          <Upload className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" title="Download Results">
          <Download className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" title="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default NavigationBar;