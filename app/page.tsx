"use client";

import {Sidebar} from "@/components/Sidebar";
import {useState} from "react";
import {NoteList} from "@/components/NoteList";
import {NoteEditor} from "@/components/NoteEditor";
import {Note} from "@/lib/types";

export default function NotesApp() {
    const [selectedFolder, setSelectedFolder] = useState(0);
    const [selectedNote, setSelectedNote] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [folders, setFolders] = useState([
        {id: 1, name: "iCloud"},
        {id: 2, name: "Notes"},
        {id: 3, name: "Work"},
        {id: 4, name: "Personal"},
    ]);
    const [notes, setNotes] = useState([
        {
            id: 1,
            title: "Meeting Notes",
            content: "Discuss project timeline...",
            lastEdit: new Date(),
        },
        {
            id: 2,
            title: "Shopping List",
            content: "Milk, Eggs, Bread...",
            lastEdit: new Date(Date.now() - 86400000),
        },
        {
            id: 3,
            title: "Ideas",
            content: "New app concept: a digital garden...",
            lastEdit: new Date(Date.now() - 172800000),
        },
        {
            id: 4,
            title: "Book Notes",
            content: "Key takeaways from chapter 1...",
            lastEdit: new Date(Date.now() - 604800000),
        },
        {
            id: 5,
            title: "Travel Plans",
            content: "Itinerary for summer vacation...",
            lastEdit: new Date(Date.now() - 2592000000),
        },
    ]);

    const groupNotes = (notes: Note[]) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

        return notes.reduce(
            (groups, note) => {
                const noteDate = new Date(note.lastEdit);
                noteDate.setHours(0, 0, 0, 0);

                if (noteDate.getTime() === today.getTime()) {
                    groups.today.push(note);
                } else if (noteDate.getTime() === yesterday.getTime()) {
                    groups.yesterday.push(note);
                } else if (noteDate > lastWeek) {
                    groups.lastWeek.push(note);
                } else {
                    groups.earlier.push(note);
                }
                return groups;
            },
            {today: [], yesterday: [], lastWeek: [], earlier: []},
        );
    };

    const groupedNotes = groupNotes(notes);

    return (
        <div className="flex h-screen bg-gray-100 text-gray-800">
            <Sidebar
                folders={folders}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
            />
            <NoteList
                groupedNotes={groupedNotes}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
            />
            <NoteEditor
                notes={notes}
                selectedNote={selectedNote}
                setNotes={setNotes}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
        </div>
    );
}
