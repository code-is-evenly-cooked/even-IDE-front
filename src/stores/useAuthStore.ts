import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  userId: number | null;
  setAccessToken: (token: string) => void;
  provider: "local" | "google" | "kakao" | null;
  setAuth: (token: string, provider: AuthState["provider"], userId: number) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  userId: null,
  setAccessToken: (token) => set({ accessToken: token }),
  provider: null,
  setAuth: (token, provider, userId) =>
    set(() => ({
      isLoggedIn: true,
      accessToken: token,
      provider,
	  userId,
    })),
  clearAuth: () =>
    set(() => ({
      isLoggedIn: false,
      accessToken: null,
	  userId: null,
      provider: null,
    })),
}));
