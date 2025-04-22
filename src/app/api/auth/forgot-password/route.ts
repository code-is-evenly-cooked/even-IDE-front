import { handleAPIResponse } from "@/lib/api";
import { createErrorResponse } from "@/lib/response";
import { SignupResponse } from "@/types/auth";
import { NextRequest } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		return await handleAPIResponse<SignupResponse>(
			response,
			"비밀번호 초기화 링크 요청 실패"
		);
	} catch (err) {
		console.error("[POST /auth/forgot-password]", err);
		return createErrorResponse("Unexpected error occurred", 500);
	}
}
