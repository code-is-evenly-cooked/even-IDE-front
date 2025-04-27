import { DecodedToken } from "@/types/auth";
import { decodeJwt } from "@/utils/decodeJwt";

/**
 *
 * accessToken 만료 여부 체크
 */
export const isTokenExpired = (token: string) => {
	const payload = decodeJwt<DecodedToken>(token);
	if (!payload?.exp) {
		return true;
	}
	const now = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
	return payload.exp < now;
};
