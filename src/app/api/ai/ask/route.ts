import { handleAPIResponse } from "@/lib/api";
import { createErrorResponse } from "@/lib/response";
import { AIChatResponse } from "@/service/ai";
import { NextRequest } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const token = req.headers.get("authorization");

		const response = await fetch(`${API_BASE_URL}/ai/ask`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token || "",
			},
			body: JSON.stringify(body),
		});

		return await handleAPIResponse<AIChatResponse>(response, "답변 실패");
	} catch (err) {
		console.error("[POST /ai/ask]", err);
		return createErrorResponse("Unexpected error occurred", 500);
	}
}
