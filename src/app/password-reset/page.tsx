"use client";

import PasswordResetForm from "@/components/auth/PasswordReset/PasswordResetForm";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function PasswordResetPage() {
	const searchParam = useSearchParams();
	const token = searchParam.get("token");
	console.log(token);

	if (!token) return <div>잘못된 접근입니다.</div>;

	return (
		<div className="flex justify-center items-center">
			<PasswordResetForm token={token} />
		</div>
	);
}
