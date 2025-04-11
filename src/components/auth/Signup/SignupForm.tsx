"use client";

import BaseButton from "@/components/common/Button/BaseButton";
import { EvenIcon } from "@/components/common/Icons";
import PasswordInput from "@/components/common/Input/PasswordInput";
import TextInput from "@/components/common/Input/TextInput";
import Link from "next/link";
import React from "react";
import useSignupForm from "./useSignupForm";
import AgreementList from "@/components/common/Button/Agreement/AgreementList";

const SignupForm = () => {
	const {
		formState,
		agreements,
		errors,
		isLoading,
		handleFormChange,
		handleAgreementToggle,
		handleSignup,
	} = useSignupForm();

	return (
		<div className="w-full max-w-[30rem] border border-white mt-16">
			<div className="flex justify-center items-center pt-8 pb-4 gap-4">
				<EvenIcon />
				<h1 className="text-4xl">even ide</h1>
			</div>
			<div className="flex flex-col gap-5 px-6 sm:px-12 py-6">
				{/* 회원가입 */}
				<form className="flex flex-col gap-5" onSubmit={handleSignup}>
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
						<PasswordInput
							placeholder="비밀번호 확인"
							size="xl"
							value={formState.confirmPassword}
							onChange={handleFormChange("confirmPassword")}
							styleState={errors.confirmPassword ? "invalid" : "default"}
							error={errors.confirmPassword}
						/>
						<TextInput
							placeholder="닉네임을 입력하세요"
							size="xl"
							value={formState.nickname}
							onChange={handleFormChange("nickname")}
							styleState={errors.nickname ? "invalid" : "default"}
							error={errors.nickname}
						/>
					</div>
					<div className="flex flex-col"></div>
					<AgreementList
						agreements={agreements}
						onToggle={handleAgreementToggle}
					/>
					<BaseButton type="submit" size="xl" isLoading={isLoading}>
						회원가입
					</BaseButton>
				</form>
				<div className="flex justify-center text-sm text-gray200 font-light">
					<Link href="/login" className="underline hover:opacity-80 transition">
						로그인으로 돌아가기
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignupForm;
