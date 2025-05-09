"use client";

import React from "react";
import TextInput from "../../common/Input/TextInput";
import BaseButton from "../../common/Button/BaseButton";
import SocialLoginButton from "../../common/Button/SocialLoginButton";
import PasswordInput from "../../common/Input/PasswordInput";
import Link from "next/link";
import { EvenIcon } from "../../common/Icons";
import useLoginForm from "./useLoginForm";

const LoginForm = () => {
	const {
		formState,
		errors,
		isLoading,
		handleFormChange,
		handleLogin,
		handleSignup,
		handleGoogleLogin,
		handleKakaoLogin,
	} = useLoginForm();

	return (
		<div className="w-full max-w-[30rem] border border-white mt-16">
			<div className="flex justify-center items-center pt-8 pb-4 gap-4">
				<EvenIcon />
				<h1 className="text-4xl">even ide</h1>
			</div>

			<div className="flex flex-col gap-5 px-6 sm:px-12 py-6">
				{/* 로그인 */}
				<div className="flex flex-col gap-1.5">
					<form onSubmit={handleLogin} className="flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<TextInput
								placeholder="이메일을 입력하세요"
								size="xl"
								value={formState.email}
								onChange={handleFormChange("email")}
								styleState={errors.email ? "invalid" : "default"}
								error={errors.email}
							/>
							<PasswordInput
								placeholder="비밀번호를 입력하세요"
								size="xl"
								value={formState.password}
								onChange={handleFormChange("password")}
								styleState={errors.password ? "invalid" : "default"}
								error={errors.password}
							/>
						</div>

						<BaseButton type="submit" size="xl" isLoading={isLoading}>
							로그인
						</BaseButton>
					</form>

					{/* 회원가입 */}
					<BaseButton
						type="button"
						size="xl"
						textColor="violet300"
						style="outline"
						onClick={handleSignup}
					>
						회원가입
					</BaseButton>
				</div>

				{/* 비밀번호 재설정 */}
				<div className="flex justify-center text-sm text-gray200 font-light">
					<Link
						href="/forgot-password"
						className="underline hover:opacity-80 transition"
					>
						비밀번호 재설정
					</Link>
				</div>

				{/* 또는 구분선 */}
				<div className="flex items-center w-full text-gray200">
					<div className="flex-1 h-px bg-gray200" />
					<span className="px-4 text-gray200 text-sm leading-none">또는</span>
					<div className="flex-1 h-px bg-gray200" />
				</div>

				{/* 소셜 로그인 */}
				<div className="flex flex-col gap-2">
					<SocialLoginButton provider="google" onClick={handleGoogleLogin} />
					<SocialLoginButton provider="kakao" onClick={handleKakaoLogin} />
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
