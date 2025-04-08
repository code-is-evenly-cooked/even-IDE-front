"use client";

import React from "react";
import TextInput from "../common/Input/TextInput";

const LoginForm = () => {
	return (
		<div className="flex flex-col w-full max-w-[40rem] gap-4">
			<TextInput placeholder="test" size="xl" />
			<TextInput placeholder="test2" size="xl" styleState="invalid" />
		</div>
	);
};

export default LoginForm;
