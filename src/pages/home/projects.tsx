// src/app/projects/page.tsx
import React from "react";

async function getDropboxFiles() {
	// Add cache: 'no-store' to prevent caching
	const response = await fetch("http://localhost:3000/api/dropbox", {
		cache: "no-store",
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error);
	}
	return response.json();
}

export default async function Projects() {
	try {
		const files = await getDropboxFiles();
		console.log("Files received:", files); // Debug log

		return (
			<div>
				<h1>Files loaded successfully!</h1>
				<pre>{JSON.stringify(files, null, 2)}</pre>
			</div>
		);
	} catch (error: any) {
		console.error("Error details:", error);
		return <div>Error loading files: {error.message}</div>;
	}
}
