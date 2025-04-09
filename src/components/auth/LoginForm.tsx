"use client";

import React from "react";
import TextInput from "../common/Input/TextInput";
import BaseButton from "../common/Button/BaseButton";
import SocialLoginButton from "../common/Button/SocialLoginButton";
import PasswordInput from "../common/Input/PasswordInput";

const LoginForm = () => {
	return (
		<div className="flex flex-col w-full max-w-[40rem] gap-4">
			<TextInput placeholder="이메일을 입력하세요" size="xl" />
			<PasswordInput placeholder="비밀먼호를 입력하세요" size="xl" />
			<BaseButton type="button" size="xl">
				로그인
			</BaseButton>
			<BaseButton type="button" size="xl" textColor="violet300" style="outline">
				회원가입
			</BaseButton>

			<SocialLoginButton provider="google" />
			<SocialLoginButton provider="kakao" />
		</div>
	);
};

export default LoginForm;
