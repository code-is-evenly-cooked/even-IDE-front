import { getAuthCookie } from "@/lib/cookie";
import { getLocalNickname, setLocalNickname } from "@/lib/chatStorage";

export const resolveNickname = (nicknameFromServer: string): string => {
	const { accessToken } = getAuthCookie();
	const localNickname = getLocalNickname();

	if (accessToken) return nicknameFromServer;

	// localStorage가 없을 경우 새로 저장
	if (!localNickname) {
		setLocalNickname(nicknameFromServer);
		return nicknameFromServer;
	}
	return localNickname;
};
