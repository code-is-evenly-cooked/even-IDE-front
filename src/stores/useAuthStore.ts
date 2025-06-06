import { AuthProvider } from "@/types/auth";
import { create } from "zustand";

interface AuthState {
	isLoggedIn: boolean;
	accessToken: string | null;
	provider: AuthProvider | null;
	nickname: string | null;
	userId: number | null;
	initialized: boolean;

	setAuth: (
		token: string,
		provider: AuthProvider,
		options?: { nickname?: string; userId?: number }
	) => void;

	clearAuth: () => void;

	setLoginState: (isLoggedIn: boolean, accessToken: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isLoggedIn: false,
	accessToken: null,
	provider: null,
	nickname: null,
	userId: null,
	initialized: false,

	setAuth: (token, provider, options) =>
		set(() => ({
			isLoggedIn: true,
			accessToken: token,
			provider,
			nickname: options?.nickname ?? null,
			userId: options?.userId ?? null,
		})),

	clearAuth: () =>
		set(() => ({
			isLoggedIn: false,
			accessToken: null,
			provider: null,
			nickname: null,
			userId: null,
		})),

	setLoginState: (isLoggedIn, accessToken) =>
		set({ isLoggedIn, accessToken, initialized: true }),
}));
