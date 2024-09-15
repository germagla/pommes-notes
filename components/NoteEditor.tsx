// MainContent Component
import {Button} from "@/components/ui/button";
import {PenLine, Plus, Search, Settings} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {FC} from "react";
import {NoteEditorProps} from "@/lib/types";

export const NoteEditor: FC<NoteEditorProps> = ({
                                                     notes,
                                                     selectedNote,
                                                     setNotes,
                                                     searchTerm,
                                                     setSearchTerm,
                                                 }) => (
    <div className="flex-1 flex flex-col h-full">
        {/* Toolbar */}
        <div className="bg-gray-200 border-b border-gray-300 p-2 flex justify-between items-center">
            <div className="flex items-center space-x-2 flex-1">
                <Button variant="ghost" size="icon">
                    <PenLine className="h-4 w-4"/>
                </Button>
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"/>
                    <Input
                        className="pl-8"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4"/>
                </Button>
                <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4"/>
                </Button>
            </div>
        </div>

        {/* Note Content */}
        <div className="flex-1 p-4 bg-white overflow-auto">
            <Input
                className="text-2xl font-bold mb-4 border-none"
                value={notes[selectedNote].title}
                onChange={(e) => {
                    const updatedNotes = [...notes];
                    updatedNotes[selectedNote] = {
                        ...updatedNotes[selectedNote],
                        title: e.target.value,
                        lastEdit: new Date(),
                    };
                    setNotes(updatedNotes);
                }}
            />
            <Textarea
                className="w-full h-[calc(100%-4rem)] resize-none border-none"
                value={notes[selectedNote].content}
                onChange={(e) => {
                    const updatedNotes = [...notes];
                    updatedNotes[selectedNote] = {
                        ...updatedNotes[selectedNote],
                        content: e.target.value,
                        lastEdit: new Date(),
                    };
                    setNotes(updatedNotes);
                }}
            />
        </div>
    </div>
);