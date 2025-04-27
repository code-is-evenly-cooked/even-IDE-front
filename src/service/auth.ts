import { fetchWithJson } from "@/lib/fetch";
import {
	AuthCredentials,
	AuthResponse,
	SignupCredentials,
	SignupResponse,
} from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const userSignup = async (
	credentials: SignupCredentials
): Promise<SignupResponse> =>
	fetchWithJson(`${API_BASE_URL}/auth/signup`, {
		method: "POST",
		body: JSON.stringify(credentials),
	});

export const userLogin = async (
	credentials: AuthCredentials
): Promise<AuthResponse> =>
	fetchWithJson(`${API_BASE_URL}/auth/login`, {
		method: "POST",
		body: JSON.stringify(credentials),
	});

export const forgotPassword = async (email: string): Promise<MessageResponse> =>
	fetchWithJson(`${API_BASE_URL}/auth/forgot-password`, {
		method: "POST",
		body: JSON.stringify({ email }),
	});

export const resetPassword = async (
	token: string,
	newPassword: string
): Promise<MessageResponse> =>
	fetchWithJson(`${API_BASE_URL}/auth/password-reset`, {
		method: "POST",
		body: JSON.stringify({ token, newPassword }),
	});
