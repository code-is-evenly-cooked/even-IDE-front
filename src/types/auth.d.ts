interface SignupCredentials {
	email: string;
	password: string;
	nickname: string;
}

interface SignupResponse {
	userId: number;
	nickname: string;
	email: string;
}

interface AuthCredentials {
	email: string;
	password: string;
}

interface AuthResponse {
	accessToken: string;
	refreshToken: string;
}

export interface DecodedToken {
	sub: string; // 유저 ID
	role: string;
	iat: number; // 생성 시간
	exp: number; // 만료 시간
	provider?: "local" | "google" | "kakao";
}
