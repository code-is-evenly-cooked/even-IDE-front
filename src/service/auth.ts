import { fetchWithJson } from "@/lib/fetch";
import {
	AuthCredentials,
	AuthResponse,
	SignupCredentials,
	SignupResponse,
} from "@/types/auth";

export const userSignup = async (
	credentials: SignupCredentials
): Promise<SignupResponse> => {
	return await fetchWithJson("/api/auth/signup", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(credentials),
	});
};

export const userLogin = async (
	credentials: AuthCredentials
): Promise<AuthResponse> =>
	fetchWithJson("/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(credentials),
	});

export const forgotPassword = async (email: string): Promise<MessageResponse> =>
	fetchWithJson("/api/auth/forgot-password", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email }),
	});
