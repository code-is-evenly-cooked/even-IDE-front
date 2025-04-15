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
