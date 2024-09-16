import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, FolderClosed /*FolderOpen*/ } from "lucide-react";
import { FolderSidebarProps } from "@/lib/types";
import { FC } from "react";

// FolderSidebar Component
export const Sidebar: FC<FolderSidebarProps> = ({
  folders,
  selectedFolder,
  setSelectedFolder,
}) => (
  <div className="w-48 bg-gray-200 border-r border-gray-300 flex flex-col h-full">
    <div className="p-4">
      <Button
        variant="ghost"
        className="w-full justify-start text-left font-normal"
      >
        <ChevronDown className="mr-2 h-4 w-4" />
        iCloud
      </Button>
    </div>
    <ScrollArea className="flex-1">
      {folders.map((folder, index) => (
        <Button
          key={folder.id}
          variant="ghost"
          className={`w-full justify-start text-left font-normal ${selectedFolder === index ? "bg-blue-100" : ""}`}
          onClick={() => setSelectedFolder(index)}
        >
          <FolderClosed className="mr-2 h-4 w-4" />
          {folder.name}
        </Button>
      ))}
    </ScrollArea>
  </div>
);
