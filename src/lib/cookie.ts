import { deleteCookie, getCookie, setCookie } from "cookies-next";

const ACCESS_TOKEN = "access_token";

export const saveAuthCookie = (token: string) => {
	setCookie(ACCESS_TOKEN, token, {
		path: "/",
		maxAge: 60 * 60 * 24, // 1일
		sameSite: "lax",
	});
};

export const removeAuthCookie = () => {
	deleteCookie(ACCESS_TOKEN);
};

export const getAuthCookie = (): string | null => {
	const token = getCookie(ACCESS_TOKEN);
	return typeof token === "string" ? token : null;
};
