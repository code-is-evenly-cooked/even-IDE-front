"use client";

import Link from "next/link";
import React from "react";
import RunButton from "@/components/editor/RunButton";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { removeAuthCookie } from "@/lib/cookie";

type HeaderProps = {
	onRun: (code: string) => void;
};

const Header = ({ onRun }: HeaderProps) => {
	const language = useLanguageStore((state) => state.language);
	const setLanguage = useLanguageStore((state) => state.setLenguage);
	const { isLoggedIn, clearAuth } = useAuthStore();

	const handleLogout = () => {
		removeAuthCookie();
		clearAuth();
	};

	return (
		<header className="w-main-area ml-[240px] h-[3rem] flex justify-between items-center p-4">
			<div className="flex items-center gap-4">
				<button className="text-xl hover:text-gray-300" aria-label="메뉴 열기">
					☰
				</button>

				<select
					value={language}
					onChange={(e) => setLanguage(e.target.value)}
					className="bg-gray-700 text-white text-sm rounded px-2 py-1"
				>
					<option>JavaScript</option>
					<option>TypeScript</option>
					<option>Python</option>
				</select>

				{/* 실행 버튼 */}
				<RunButton onRun={onRun} />
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