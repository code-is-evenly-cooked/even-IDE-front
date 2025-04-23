import { getAuthCookie } from "@/lib/cookie";
import { fetchWithJson } from "@/lib/fetch";

export const requestAIAnswer = async (
	prompt: string
): Promise<AIChatResponse> => {
	const accessToken = getAuthCookie().token;
	return fetchWithJson("api/ai/ask", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...(accessToken && { Authorization: `Bearer ${accessToken}` }),
		},
		body: JSON.stringify({ prompt }),
	});
};

export interface AIChatResponse {
	answer: string;
}
