import { deleteCookie, getCookie, setCookie } from "cookies-next";

const ACCESS_TOKEN = "access_token";
const USER_ID = "user_id";

export const saveAuthCookie = (token: string, userId: number) => {
  setCookie(ACCESS_TOKEN, token, {
    path: "/",
    maxAge: 60 * 60 * 24, // 1일
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
  deleteCookie(USER_ID);
};

export const getAuthCookie = (): { token: string | null; userId: number | null; } => {
  const token = getCookie(ACCESS_TOKEN);
  const uid = getCookie(USER_ID);

  return {
    token: typeof token === "string" ? token : null,
    userId: typeof uid === "string" ? Number(uid) : null,
  };
};
