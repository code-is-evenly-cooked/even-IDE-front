import { handleAPIResponse } from "@/lib/api";
import { getAuthCookie } from "@/lib/cookie";
import { createErrorResponse } from "@/lib/response";
import { ChatMessage } from "@/stores/useChatStore";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const projectId = searchParams.get("projectId");
	const token = getAuthCookie();

	if (!projectId) {
		return NextResponse.json(
			{ error: "projectId is required" },
			{ status: 400 }
		);
	}

	try {
		const response = await fetch(
			`${API_BASE_URL}/chat/history?projectId=${projectId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: token || "",
				},
			}
		);

		return await handleAPIResponse<ChatMessage[]>(response, "처리 실패");
	} catch (err) {
		console.error("[GET /chat/history]", err);
		return createErrorResponse("Unexpected error occurred", 500);
	}
}
