import { parseJSON } from "@/lib/fetch";
import { createErrorResponse, createJsonResponse } from "@/lib/response";

/**
 * fetch 결과를 기반으로 일관된 API 응답 객체를 생성
 */
export async function handleApiResponse<T>(
	response: Response,
	defaultErrorMsg = "API 요청 실패"
) {
	const parsed = await parseJSON<{ message?: string }>(response);

	if (!response.ok) {
		return createErrorResponse(
			typeof parsed === "string" ? parsed : parsed.message || defaultErrorMsg,
			response.status
		);
	}

	return createJsonResponse(parsed as T);
}
