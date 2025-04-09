"use client";

import React from "react";
import TextInput from "../common/Input/TextInput";
import BaseButton from "../common/Button/BaseButton";
import SocialLoginButton from "../common/Button/SocialLoginButton";
import PasswordInput from "../common/Input/PasswordInput";
import Link from "next/link";
import { EvenIcon } from "../common/Icons";

const LoginForm = () => {
	return (
		<div className="w-full max-w-[30rem] border border-white mt-16">
			<div className="flex justify-center items-center pt-8 pb-4 gap-4">
				<EvenIcon />
				<h1 className="text-4xl">even ide</h1>
			</div>

			<div className="flex flex-col gap-5 px-16 py-6">
				<div className="flex flex-col gap-2">
					<TextInput placeholder="이메일을 입력하세요" size="xl" />
					<PasswordInput placeholder="비밀먼호를 입력하세요" size="xl" />
				</div>
				<div className="flex flex-col gap-2">
					<BaseButton type="button" size="xl">
						로그인
					</BaseButton>
					<BaseButton
						type="button"
						size="xl"
						textColor="violet300"
						style="outline"
					>
						회원가입
					</BaseButton>
				</div>
				<div className="flex flex-col items-center font-thin text-md text-white">
					<Link
						href="/reset-password"
						className="underline hover:opacity-80 transition"
					>
						비밀번호 재설정
					</Link>
				</div>
				<div className="flex items-center w-full text-gray200">
					<div className="flex-1 h-px bg-gray200" />
					<span className="px-4 text-white text-md whitespace-nowrap">
						또는
					</span>
					<div className="flex-1 h-px bg-gray200" />
				</div>
				<div className="flex flex-col gap-2">
					<SocialLoginButton provider="google" />
					<SocialLoginButton provider="kakao" />
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
