import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	// Minimal GET handler for chat by id
	return NextResponse.json({ success: true });
}

export async function POST(req: NextRequest) {
	try {
		const data = await req.json().catch(() => ({}));
		return NextResponse.json({ success: true, data });
	} catch (err) {
		return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
	}
}
