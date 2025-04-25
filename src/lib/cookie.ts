import { deleteCookie, getCookie, setCookie } from "cookies-next";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";
const USER_ID = "user_id";

export const saveAuthCookie = (
	accessToken: string,
	refreshToken: string,
	userId: number
) => {
	setCookie(ACCESS_TOKEN, accessToken, {
		path: "/",
		maxAge: 60 * 60 * 24, // 1일
		sameSite: "lax",
	});

	setCookie(REFRESH_TOKEN, refreshToken.toString(), {
		path: "/",
		maxAge: 60 * 60 * 24 * 7, // 7일
		sameSite: "lax",
	});

	setCookie(USER_ID, userId.toString(), {
		path: "/",
		maxAge: 60 * 60 * 24, // 1일
		sameSite: "lax",
	});
};

export const removeAuthCookie = () => {
	deleteCookie(ACCESS_TOKEN);
	deleteCookie(REFRESH_TOKEN);
	deleteCookie(USER_ID);
};

export const getAuthCookie = (): {
	accessToken: string | null;
	refreshToken: string | null;
	userId: number | null;
} => {
	const accessToken = getCookie(ACCESS_TOKEN);
	const refreshToken = getCookie(REFRESH_TOKEN);
	const userId = getCookie(USER_ID);

	return {
		accessToken: typeof accessToken === "string" ? accessToken : null,
		refreshToken: typeof refreshToken === "string" ? refreshToken : null,
		userId: typeof userId === "string" ? Number(userId) : null,
	};
};
