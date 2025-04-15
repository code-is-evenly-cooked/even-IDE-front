import { parseJSON } from "./fetch";
import { createErrorResponse, createJsonResponse } from "./response";

export async function handleAPIResponse<T>(
	response: Response,
	defaultErrorMsg = "API 요청 실패"
) {
	const parsed = await parseJSON<T | { message?: string }>(response);

	if (!response.ok) {
		const message =
			typeof parsed === "string"
				? parsed
				: typeof parsed === "object" && parsed !== null && "message" in parsed
				? parsed.message ?? defaultErrorMsg
				: defaultErrorMsg;

		return createErrorResponse(message, response.status);
	}

	return createJsonResponse(parsed as T, response.status);
}
