const LOCAL_NICKNAME_KEY = "chat_nickname";

export const getLocalNickname = (): string | null => {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(LOCAL_NICKNAME_KEY);
};

export const setLocalNickname = (nickname: string) => {
	if (typeof window === "undefined") return;
	localStorage.setItem(LOCAL_NICKNAME_KEY, nickname);
};

export const removeLocalNickname = () => {
	if (typeof window === "undefined") return;
	localStorage.removeItem(LOCAL_NICKNAME_KEY);
};
