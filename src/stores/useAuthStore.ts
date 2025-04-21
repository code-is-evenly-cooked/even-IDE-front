import { AuthProvider } from "@/types/auth";
import { create } from "zustand";

interface AuthState {
	isLoggedIn: boolean;
	accessToken: string | null;
	provider: AuthProvider | null;
	setAuth: (token: string, provider: AuthState["provider"]) => void;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isLoggedIn: false,
	accessToken: null,
	provider: null,
	setAuth: (token, provider) =>
		set(() => ({
			isLoggedIn: true,
			accessToken: token,
			provider,
		})),
	clearAuth: () =>
		set(() => ({
			isLoggedIn: false,
			accessToken: null,
			provider: null,
		})),
}));
