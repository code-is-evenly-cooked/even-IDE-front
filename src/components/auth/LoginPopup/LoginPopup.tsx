"use client";

import React from "react";
import BaseButton from "@/components/common/Button/BaseButton";
import { EvenIcon } from "@/components/common/Icons";

const LoginPopup = () => {
	return (
		<div className="w-full max-w-[33rem] border border-gray700 mt-26 bg-gray700 p-6 rounded-xl">
			<div className="flex justify-center items-center pt-8 pb-4 gap-4">
				<EvenIcon />
				<h1 className="text-3xl">even ide</h1>
			</div>
			<div className="flex flex-col gap-5 px-6 sm:px-12 py-10">
				<h2 className="text-xl text-white text-center">
					로그인하여 나만의 개발 환경을 시작하세요.
				</h2>
				<BaseButton type="submit" size="xl">
					로그인 하러가기
				</BaseButton>
			</div>
		</div>
	);
};

export default LoginPopup;