"use client";

import React from "react";
import { EvenBigIcon } from "../common/Icons";
import BaseButton from "../common/Button/BaseButton";
import { useRouter } from "next/navigation";

const Landing = () => {
	const router = useRouter();

	const handleStart = () => {
		router.push("/editor");
	};

	const handleLogin = () => {
		router.push("/login");
	};

	return (
		<main className="flex flex-col items-center justify-center min-h-screen text-white px-4">
			<header className="w-full flex justify-end px-6 pt-6">
				<BaseButton
					type="button"
					size="xl"
					style="outline"
					textColor="violet300"
					onClick={handleLogin}
				>
					로그인
				</BaseButton>
			</header>

			<section className="flex flex-col items-center text-center flex-1 justify-center gap-6">
				<div className="flex flex-col md:flex-row items-end gap-2">
					<h1 className="text-3xl sm:text-4xl font-semibold">
						학습부터 협업, 리뷰까지
					</h1>
					<div className="flex flex-col items-center -mb-2">
						<EvenBigIcon />
						<span className="text-violet300 text-8xl font-bold">even</span>
					</div>
					<span className="text-3xl sm:text-4xl font-semibold">하게</span>
				</div>

				<p className="text-sm sm:text-xl font-thin leading-loose text-center">
					<span>
						웹에서 바로 코드 작성부터 링크 공유, 협업, 실시간 채팅, 알고리즘
						학습까지.
						<br />
						코드 리뷰와 AI 기반 학습 기능까지, 놓치지 말고 경험해보세요.
					</span>
				</p>

				<BaseButton type="button" size="xl" onClick={handleStart}>
					even ide로 코딩 시작하기
				</BaseButton>
			</section>

			{/* 푸터 */}
			<footer className="my-6 text-sm text-center text-violet300">
				<p>CodeIsEvenlyCooked © 2025</p>
				<p className="mt-1">
					<span className="text-violet300">even한 개발자</span>:{" "}
					<span className="text-white">
						김나현, 김성민, 이지은, 이현하, 정경희, 진상휘
					</span>
				</p>
			</footer>
		</main>
	);
};

export default Landing;
