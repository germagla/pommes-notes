"use client";

import Script from "next/script";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { NoteList } from "@/components/NoteList";
import { NoteEditor } from "@/components/NoteEditor";
import { Folder, Note, NoteGroups } from "@/lib/types";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
// const API_KEY = process.env.GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/drive.file";
// const DISCOVERY_DOCS = [
//   "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
// ];

export default function NotesApp() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenClient, setTokenClient] = useState<string | null>(null);
  const initializeTokenClient = () => {
    console.log("client id", CLIENT_ID, "\n", "scopes", SCOPES);
    // Initialize the GIS token client after the GIS script is loaded
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response) => {
        console.log("response", response);
        if (response.error) {
          console.error("Token error:", response);
        } else {
          setAccessToken(response.access_token);
        }
      },
    });
    setTokenClient(tokenClient);
  };
  const handleSignIn = () => {
    if (tokenClient) {
      tokenClient.requestAccessToken();
    }
  };

  const [selectedFolder, setSelectedFolder] = useState(0);
  const [selectedNote, setSelectedNote] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [folders, setFolders] = useState<Folder[]>([
    { id: 1, name: "Notes", provider: "Local" },
    { id: 2, name: "Work", provider: "iCloud" },
    { id: 3, name: "Personal", provider: "iCloud" },
    { id: 4, name: "Projects", provider: "Google Drive" },
    { id: 5, name: "Ideas", provider: "Google Drive" },
    { id: 6, name: "Documents", provider: "OneDrive" },
    { id: 7, name: "Shared", provider: "OneDrive" },
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
  function groupNotes(notes: Note[]): NoteGroups {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    return notes.reduce(
      function (groups: NoteGroups, note: Note) {
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
      { today: [], yesterday: [], lastWeek: [], earlier: [] },
    );
  }

  const groupedNotes = groupNotes(notes);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Google Identity Services Script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeTokenClient}
      />
      <button onClick={handleSignIn}>Sign in with Google</button>
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

// TODO: Ask v0 to make the app fetch data from an external source (a mock file for now) in effects
// TODO: Implement actual fetching from Google Drive
// TODO: Populate the NoteList with the current folder's notes
// TODO: Replace the NoteEditor with a real Markdown editor
// TODO: Figure out how to reconcile current folder/note structure with google drive api return data structure
