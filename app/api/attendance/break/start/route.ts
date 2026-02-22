import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	// Minimal handler — adjust logic to record break start
	try {
		const data = await req.json().catch(() => ({}));
		return NextResponse.json({ success: true, data });
	} catch (err) {
		return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
	}
}

