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

	const parsedBody = await parseJSON<T | { message?: string }>(res);

	if (!res.ok) {
		const errorMessage =
			typeof parsedBody === "string"
				? parsedBody
				: (parsedBody as { message?: string }).message ??
				  "알 수 없는 오류가 발생했습니다.";

		throw new Error(errorMessage);
	}

	return parsedBody as T;
}

export async function parseJSON<T = unknown>(
	res: Response
): Promise<T | string> {
	const cloned = res.clone();
	try {
		return await cloned.json();
	} catch {
		return await res.text();
	}
}
