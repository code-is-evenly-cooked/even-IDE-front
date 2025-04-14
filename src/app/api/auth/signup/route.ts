import { NextRequest } from "next/server";
import { createErrorResponse } from "@/lib/response";
import { handleApiResponse } from "@/lib/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
	console.log("API_BASE_URL", API_BASE_URL);
	try {
		const body = await req.json();
		const response = await fetch(`${API_BASE_URL}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		return await handleApiResponse(response, "회원가입 실패");
	} catch (err) {
		console.error("[POST /auth/signup]", err);
		return createErrorResponse("Unexpected error occurred", 500);
	}
}
