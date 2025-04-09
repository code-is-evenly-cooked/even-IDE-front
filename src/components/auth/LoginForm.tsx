"use client";

import React from "react";
import TextInput from "../common/Input/TextInput";
import BaseButton from "../common/Button/BaseButton";
import SocialLoginButton from "../common/Button/SocialLoginButton";
import { EyeIcon } from "../common/Icons";

const LoginForm = () => {
	return (
		<div className="flex flex-col w-full max-w-[40rem] gap-4">
			<TextInput placeholder="test" size="xl" />
			<TextInput placeholder="test2" size="xl" styleState="invalid" />
			<BaseButton type="button" size="xl" textColor="violet300" style="outline">
				회원가입
			</BaseButton>
			<BaseButton type="button" size="xl" leftIcon={<EyeIcon />}>
				회원가입
			</BaseButton>
			<SocialLoginButton provider="google" />
			<SocialLoginButton provider="kakao" />
		</div>
	);
};

export default LoginForm;
