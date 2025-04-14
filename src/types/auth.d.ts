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
