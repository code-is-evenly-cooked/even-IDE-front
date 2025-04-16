"use client";

import { getAuthCookie } from "@/lib/cookie";
import { useAuthStore } from "@/stores/useAuthStore";
import { DecodedToken } from "@/types/auth";
import { decodeJwt } from "@/utils/decodeJwt";
import { useEffect } from "react";

const useAuthInitializer = () => {
	const setAuth = useAuthStore((state) => state.setAuth);
	const clearAuth = useAuthStore((state) => state.clearAuth);

	useEffect(() => {
		const token = getAuthCookie();
		if (token) {
			const decoded = decodeJwt<DecodedToken>(token);
			if (decoded) {
				const provider = decoded.provider || null;
				setAuth(token, provider);
			} else {
				clearAuth();
			}
		}
	}, [setAuth, clearAuth]);
};

export default useAuthInitializer;
