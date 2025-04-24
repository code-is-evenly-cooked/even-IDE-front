"use client";

import Link from "next/link";
import React from "react";
import RunButton from "@/components/editor/RunButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { removeAuthCookie } from "@/lib/cookie";
import HeaderActions from "@/components/editor/HeaderActions";
import LanguageDropdown from "@/components/editor/LanguageDropdown";
import { useChatStore } from "@/stores/useChatStore";
import { clearMessages } from "@/lib/indexedDB";
import { useAIChatStore } from "@/stores/useAIChatStore";
import type { Terminal as XtermType } from "xterm";

type HeaderProps = {
  terminalRef: React.RefObject<XtermType>;
};

const Header = ({ terminalRef }: HeaderProps) => {
  const { isLoggedIn, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    removeAuthCookie();
    clearAuth();
    useChatStore.getState().resetChatUser();
    await clearMessages();
    useAIChatStore.getState().clearMessages();

	window.location.reload();
  };

  return (
    <header className="h-[3rem] flex justify-between items-center p-4">
      <div className="flex items-center gap-4">
        <button className="text-xl hover:text-gray-300" aria-label="메뉴 열기">
          ☰
        </button>

        {/* 언어 선택 드롭 박스 */}
        <LanguageDropdown />

        {/* 실행 버튼 */}
        <RunButton terminalRef={terminalRef} />
        <HeaderActions />
      </div>
      <div className="flex">
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <span className="gray-200">반갑습니다.</span>
            <button onClick={handleLogout} className="text-link text-sm">
              로그아웃
            </button>
          </div>
        ) : (
          <Link href="/login">
            <span className="text-link">로그인</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
