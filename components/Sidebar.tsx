import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  FolderClosed,
  ChevronRight,
  CirclePlus,
} from "lucide-react";
import { Folder, FolderSidebarProps } from "@/lib/types";
import { FC, useState } from "react";

// FolderSidebar Component
export const Sidebar: FC<FolderSidebarProps> = ({
  folders,
  selectedFolder,
  setSelectedFolder,
}) => {
  const [expandedProviders, setExpandedProviders] = useState<
    Record<string, boolean>
  >({});

  const toggleProvider = (provider: string) => {
    setExpandedProviders((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
  };

  const groupedFolders = folders.reduce(
    (acc, folder) => {
      if (!acc[folder.provider]) {
        acc[folder.provider] = [];
      }
      acc[folder.provider].push(folder);
      return acc;
    },
    {} as Record<string, Folder[]>,
  );

  return (
    <div className="w-48 bg-gray-200 border-r border-gray-300 flex flex-col h-full">
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-left font-normal"
        >
          <CirclePlus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>
      <ScrollArea className="flex-1">
        {Object.entries(groupedFolders).map(([provider, providerFolders]) => (
          <div key={provider} className="mb-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
              onClick={() => toggleProvider(provider)}
              aria-expanded={expandedProviders[provider]}
            >
              {expandedProviders[provider] ? (
                <ChevronDown className="mr-2 h-4 w-4" />
              ) : (
                <ChevronRight className="mr-2 h-4 w-4" />
              )}
              {provider}
            </Button>
            {expandedProviders[provider] &&
              providerFolders.map((folder) => (
                <Button
                  key={folder.id}
                  variant="ghost"
                  className={`w-full justify-start text-left font-normal pl-8 ${selectedFolder === folder.id ? "bg-blue-100" : ""}`}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <FolderClosed className="mr-2 h-4 w-4" />
                  {folder.name}
                </Button>
              ))}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

// <div className="p-4">
//   <Button
//     variant="ghost"
//     className="w-full justify-start text-left font-normal"
//   >
//     <ChevronDown className="mr-2 h-4 w-4" />
//     iCloud
//   </Button>
// </div>
