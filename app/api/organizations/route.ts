import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	// Minimal organizations handler — replace with real logic
	return NextResponse.json({ success: true, organizations: [] });
}
