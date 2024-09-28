import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    const fileMetadata = {
      name: "photo.jpg",
    };

    const media = {
      mimeType: "image/jpeg",
      body: fs.createReadStream("path/to/photo.jpg"), // Modify as needed
    };

    const response = drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    return NextResponse.json({ fileId: response.data.id });
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);
    return NextResponse.json(
      { error: "Error uploading to Google Drive" },
      { status: 500 },
    );
  }
}
