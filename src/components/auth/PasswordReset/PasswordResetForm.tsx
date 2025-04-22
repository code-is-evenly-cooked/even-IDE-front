"use client";

import React, { ChangeEvent, useState } from "react";
import BaseButton from "@/components/common/Button/BaseButton";
import { EvenIcon } from "@/components/common/Icons";
import Link from "next/link";
import PasswordInput from "@/components/common/Input/PasswordInput";

const PasswordResetForm = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
	};

	return (
		<div className="w-full max-w-[30rem] border border-white mt-16">
			<div className="flex justify-center items-center pt-8 pb-4 gap-4">
				<EvenIcon />
				<h1 className="text-4xl">even ide</h1>
			</div>

			<div className="flex flex-col gap-5 px-6 sm:px-12 py-6">
				<form className="flex flex-col gap-5">
					<h2 className="text-xl text-white text-center">비밀번호 재설정</h2>
					<h3 className="text-md text-white text-center leading-loose">
						새로운 비밀번호를 설정하세요.
					</h3>

					<PasswordInput
						placeholder="비밀번호를 입력하세요."
						value={password}
						onChange={handlePasswordChange}
						size="xl"
					/>
					<PasswordInput
						placeholder="비밀번호 확인"
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
						size="xl"
					/>
					<BaseButton type="submit" size="xl">
						확인
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

export default PasswordResetForm;
