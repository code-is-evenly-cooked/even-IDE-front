import { handleAPIResponse } from "@/lib/api";
import { createErrorResponse } from "@/lib/response";
import { AuthResponse } from "@/types/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST() {
	const refreshToken = (await cookies()).get("refresh_token")?.value;

	if (!refreshToken) {
		return NextResponse.json({ message: "No refresh token" }, { status: 401 });
	}

	try {
		const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${refreshToken}`,
			},
		});
		return await handleAPIResponse<AuthResponse>(response, "갱신 실패");
	} catch (err) {
		console.error("[POST /auth/refresh]", err);
		return createErrorResponse("Unexpected error occurred", 500);
	}
}
