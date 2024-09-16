// NoteList Component
import { FC } from "react";
import { Note, NoteListProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { SortDesc } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addSpaces } from "@/lib/utils";

export const NoteList: FC<NoteListProps> = ({
  groupedNotes,
  selectedNote,
  setSelectedNote,
}) => (
  <div className="w-64 bg-gray-100 border-r border-gray-300 flex flex-col h-full">
    <div className="p-2 border-b border-gray-300 flex items-center justify-between">
      <Button variant="ghost" size="icon">
        <SortDesc className="h-4 w-4" />
      </Button>
    </div>
    <ScrollArea className="flex-1">
      {Object.entries(groupedNotes).map(
        ([group, groupNotes]) =>
          groupNotes.length > 0 && (
            <div key={group} className="mb-4">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {addSpaces(group)}
              </div>
              {groupNotes.map((note: Note, index: number) => {
                return (
                  <Button
                    key={note.id}
                    variant="ghost"
                    className={`w-full justify-start text-left font-normal px-4 py-2 ${
                      selectedNote === index ? "" : ""
                    }`}
                    onClick={() => setSelectedNote(index)}
                  >
                    <div className="w-full">
                      <div className="font-medium truncate">{note.title}</div>
                      <div className="text-sm text-gray-500 truncate">
                        {note.content}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          ),
      )}
    </ScrollArea>
  </div>
);
