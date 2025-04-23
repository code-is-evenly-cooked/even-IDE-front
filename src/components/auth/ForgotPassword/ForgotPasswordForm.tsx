"use client";

import React from "react";
import TextInput from "@/components/common/Input/TextInput";
import BaseButton from "@/components/common/Button/BaseButton";
import useForgotPasswordForm from "./useForgotPasswordForm";
import { EvenIcon } from "@/components/common/Icons";
import Link from "next/link";

const ForgotPasswordForm = () => {
	const { email, emailError, isLoading, handleEmailChange, handleSubmit } =
		useForgotPasswordForm();

	return (
		<div className="w-full max-w-[30rem] border border-white mt-16">
			<div className="flex justify-center items-center pt-8 pb-4 gap-4">
				<EvenIcon />
				<h1 className="text-4xl">even ide</h1>
			</div>

			<div className="flex flex-col gap-5 px-6 sm:px-12 py-6">
				<form onSubmit={handleSubmit} className="flex flex-col  gap-5">
					<h2 className="text-xl text-white text-center">비밀번호 재설정</h2>
					<h3 className="text-md text-white text-center leading-loose">
						가입한 이메일 주소를 입력해주세요
						<br />
						이메일 인증 완료 후 비밀번호를 재설정할 수 있습니다.
					</h3>

					<TextInput
						placeholder="이메일을 입력하세요"
						value={email}
						onChange={handleEmailChange}
						error={emailError}
						size="xl"
					/>
					<BaseButton type="submit" size="xl" isLoading={isLoading}>
						인증 메일 전송
					</BaseButton>
					<div className="flex justify-center text-sm text-gray200 font-light">
						<Link
							href="/login"
							className="underline hover:opacity-80 transition"
						>
							로그인으로 돌아가기
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ForgotPasswordForm;
