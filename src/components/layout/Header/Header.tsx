"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import RunButton from "@/components/editor/RunButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { getAuthCookie, removeAuthCookie } from "@/lib/cookie";
import HeaderActions from "@/components/editor/HeaderActions";
import LanguageDropdown from "@/components/editor/LanguageDropdown";
import { useChatStore } from "@/stores/useChatStore";
import { clearMessages } from "@/lib/indexedDB";
import { useAIChatStore } from "@/stores/useAIChatStore";
import type { Terminal as XtermType } from "xterm";
import { MenuIcon } from "@/components/common/Icons";
import { isTokenExpired } from "@/lib/token";
import IconButton from "@/components/common/Button/IconButton";
import { LogInIcon, LogOutIcon } from "lucide-react";

type HeaderProps = {
	terminalRef: React.RefObject<XtermType>;
};

const Header = ({ terminalRef }: HeaderProps) => {
	const { isLoggedIn, accessToken, clearAuth, setLoginState, initialized } =
		useAuthStore();

	useEffect(() => {
		if (accessToken && isTokenExpired(accessToken)) {
			console.log("accessToken 만료");
			handleLogout();
		}
	}, [accessToken, clearAuth]);

	useEffect(() => {
		const { accessToken } = getAuthCookie();
		if (accessToken) {
			setLoginState(true, accessToken);
		} else {
			setLoginState(false, null);
		}
	}, []);

	const handleLogout = async () => {
		removeAuthCookie();
		clearAuth();
		useChatStore.getState().resetChatUser();
		await clearMessages();
		useAIChatStore.getState().clearMessages();

		window.location.reload();
	};

	if (!initialized) {
		return (
			<header className="h-[3rem] flex justify-between items-center p-4"></header>
		);
	}

	return (
		<header className="h-[3rem] flex justify-between items-center p-4">
			<div className="flex items-center gap-4">
				<IconButton icon={<MenuIcon />} label="메뉴 열기" transparent />

				{/* 언어 선택 드롭 박스 */}
				<LanguageDropdown />

				{/* 실행 버튼 */}
				<RunButton terminalRef={terminalRef} />
				<HeaderActions />
			</div>
			<div className="flex">
				{isLoggedIn ? (
					<div className="flex items-center gap-2">
						<span className="hidden xl:inline text-white">반갑습니다.</span>
						<IconButton
							icon={<LogOutIcon />}
							label="로그아웃"
							transparent
							onClick={handleLogout}
						/>
					</div>
				) : (
					<Link href="/login">
						<LogInIcon />
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
