import { useAuthStore } from "@/stores/useAuthStore";
import { getAuthCookie, removeAuthCookie, saveAuthCookie } from "./cookie";
import { AuthResponse } from "@/types/auth";

let isRefreshing = false;

export async function fetchWithJson<T = unknown>(
	input: RequestInfo | URL,
	init?: RequestInit,
	retry: boolean = true
): Promise<T> {
	const { accessToken } = getAuthCookie();

	const headers = new Headers(init?.headers || {});
	headers.set("Content-Type", "application/json");
	if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

	const res = await fetch(input, {
		...init,
		headers,
	});

	if (res.status === 403 && retry) {
		return await handleRefreshToken<T>(input, init);
	}

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

async function handleRefreshToken<T = unknown>(
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<T> {
	if (isRefreshing) return Promise.reject("already refreshing~ plz wait");
	isRefreshing = true;

	try {
		const res = await fetch("api/auth/refresh", {
			method: "POST",
		});
		if (!res.ok) {
			isRefreshing = false;
			alert("세션이 만료되었습니다. 다시 로그인해주세요.");
			removeAuthCookie();
			useAuthStore.getState().clearAuth();
			if (typeof window !== "undefined") {
				window.location.href = "/login";
			}

			throw new Error("세션 만료");
		}
		const parsed = await parseJSON<AuthResponse>(res);
		if (typeof parsed === "string") throw new Error("세션 응답 파싱 실패");

		const { accessToken, refreshToken, userId, nickname, provider } = parsed;

		saveAuthCookie(accessToken, refreshToken, userId);
		useAuthStore
			.getState()
			.setAuth(accessToken, provider, { nickname, userId });

		isRefreshing = false;
		return await fetchWithJson<T>(input, init, false);
	} catch (err) {
		isRefreshing = false;
		throw err;
	}
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
