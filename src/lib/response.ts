export function createJsonResponse<T>(data: T, status: number = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export function createErrorResponse(message: string, status: number = 400) {
	return createJsonResponse({ message }, status);
}
