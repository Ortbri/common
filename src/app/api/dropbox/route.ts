// src/app/api/dropbox/route.ts
import { Dropbox } from "dropbox";
import { NextRequest, NextResponse } from "next/server";

// Initialize with fetch
const dbx = new Dropbox({
	accessToken: process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN,
	fetch: fetch, // Add this line
});

export async function GET(request: NextRequest) {
	console.log("API route hit");
	try {
		const response = await dbx.filesListFolder({
			path: "",
		});

		console.log("Dropbox response:", response.result.entries);

		const files = response.result.entries.map((file) => ({
			id: file.id,
			name: file.name,
			path: file.path_display,
		}));

		return NextResponse.json({
			success: true,
			files: files,
		});
	} catch (error: any) {
		console.error("Dropbox error:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
