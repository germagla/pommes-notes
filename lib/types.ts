import React, { ReactNode } from "react";

// Define the structure of a single note
export interface Note {
  id: number;
  title: string;
  content: string;
  lastEdit: Date;
}

// Define the structure of a folder
export interface Folder {
  id: number;
  name: string;
  provider: string;
}

// Define the structure of grouped notes
export interface NoteGroups {
  today: Note[];
  yesterday: Note[];
  lastWeek: Note[];
  earlier: Note[];
}

// Props for the FolderSidebar component
export interface FolderSidebarProps {
  folders: Folder[];
  selectedFolder: number;
  setSelectedFolder: (index: number) => void;
}

// Props for the NoteList component
export interface NoteListProps {
  groupedNotes: NoteGroups;
  selectedNote: number;
  setSelectedNote: (index: number) => void;
}

// Props for the MainContent component
export interface NoteEditorProps {
  notes: Note[];
  selectedNote: number;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

// Props for the SearchBar component
export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

// Structure for the app's state
export interface AppState {
  selectedFolder: number;
  selectedNote: number;
  searchTerm: string;
  folders: Folder[];
  notes: Note[];
}

// Type for the groupNotes function
export type GroupNotesFunction = (notes: Note[]) => NoteGroups;

// Props for the main Component
export interface ComponentProps {
  // Add any props if needed for the main component
}

// Type for the markdown editor change event
export interface MdEditorChangeEvent {
  text: string;
  html: string;
}

// Props for the Button component (simplified version of shadcn/ui Button)
export interface ButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

// Props for the Input component (simplified version of shadcn/ui Input)
export interface InputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Props for the ScrollArea component (simplified version of shadcn/ui ScrollArea)
export interface ScrollAreaProps {
  className?: string;
  children: ReactNode;
}

// Props for the MdEditor component
export interface MdEditorProps {
  style?: React.CSSProperties;
  renderHTML: (text: string) => string;
  onChange: (data: { text: string; html: string }) => void;
  value: string;
}
