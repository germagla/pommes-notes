"use client";

import Script from "next/script";
import { useState } from "react";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/drive.file";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

const GoogleDriveAuth = () => {
  const [tokenClient, setTokenClient] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const initializeGapi = () => {
    // Initialize the gapi client after the script is loaded
    gapi.load("client", async () => {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
      });
    });
  };

  const initializeTokenClient = () => {
    // Initialize the GIS token client after the GIS script is loaded
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response) => {
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

  const handleFileUpload = async () => {
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    try {
      const fileMetadata = {
        name: "example.txt",
        mimeType: "text/plain",
      };

      const media = {
        mimeType: "text/plain",
        body: "Hello, World!",
      };

      const response = await gapi.client.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id",
      });

      console.log("File created with ID:", response.result.id);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      {/* Google API Client Script */}
      <Script
        src="https://apis.google.com/js/api.js"
        strategy="afterInteractive"
        onLoad={initializeGapi}
      />

      {/* Google Identity Services Script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeTokenClient}
      />

      <h1>Google Drive Auth</h1>
      <br />

      <button onClick={handleSignIn}>Sign in with Google</button>
      <br />

      <button onClick={handleFileUpload} disabled={!accessToken}>
        Upload File to Google Drive
      </button>
    </div>
  );
};

export default GoogleDriveAuth;
