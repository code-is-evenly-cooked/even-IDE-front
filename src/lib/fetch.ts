export async function fetchWithJson<T = unknown>(
	input: RequestInfo,
	init?: RequestInit
): Promise<T> {
	const res = await fetch(input, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...(init?.headers || {}),
		},
	});

	if (!res.ok) {
		const errorBody = await parseJSON<{ message?: string }>(res);
		const errorMessage =
			typeof errorBody === "string"
				? errorBody
				: errorBody.message ?? "알 수 없는 오류가 발생했습니다.";

		throw new Error(errorMessage);
	}

	return res.json();
}

export async function parseJSON<T = unknown>(
	res: Response
): Promise<T | string> {
	try {
		return await res.json();
	} catch {
		return await res.text();
	}
}
