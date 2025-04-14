import { NextRequest } from "next/server";
import { createErrorResponse, createJsonResponse } from "@/lib/response";
import { parseJSON } from "@/lib/fetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const response = await fetch(`${API_BASE_URL}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		const parsed = await parseJSON<{ message?: string }>(response);

		if (!response.ok) {
			return createErrorResponse(
				typeof parsed === "string" ? parsed : parsed.message || "Signup failed",
				response.status
			);
		}

		return createJsonResponse(parsed);
	} catch (err) {
		console.error("[POST /auth/signup]", err);
		return createErrorResponse("Unexpected error occurred", 500);
	}
}
