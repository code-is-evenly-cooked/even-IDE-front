import { NextRequest } from "next/server";
import { createErrorResponse } from "@/lib/response";
import { handleAPIResponse } from "@/lib/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const response = await fetch(`${API_BASE_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		return await handleAPIResponse<AuthResponse>(response, "로그인 실패");
	} catch (err) {
		console.error("[POST /auth/login]", err);
		return createErrorResponse("Unexpected error occurred", 500);
	}
}
