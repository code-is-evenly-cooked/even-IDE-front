import { handleAPIResponse } from "@/lib/api";
import { createErrorResponse } from "@/lib/response";
import { ChatJoinResponse } from "@/types/chat";
import { NextRequest } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const token = req.headers.get("authorization");

		const repsonse = await fetch(`${API_BASE_URL}/chat/join`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token || "",
			},
			body: JSON.stringify(body),
		});
		console.log(repsonse);
		return await handleAPIResponse<ChatJoinResponse>(repsonse, "입장 실패");
	} catch (err) {
		console.error("[POST /chat/join]", err);
		return createErrorResponse("Unexpected error occurred", 500);
	}
}
