// src/app/api/dropbox/route.ts
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		message: "Success!",
		files: [
			{ id: 1, name: "test1.jpg" },
			{ id: 2, name: "test2.jpg" },
		],
	});
}
