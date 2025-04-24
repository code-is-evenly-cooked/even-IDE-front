"use client";
import { useLoginModalStore } from "@/stores/useLoginModalStore";
import { useRouter } from "next/navigation";
import React from "react";
import LoginPopup from "../auth/LoginPopup/LoginPopup";

const LoginModals = () => {
	const { isOpen, close } = useLoginModalStore();
	const router = useRouter();

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 transition-opacity duration-200"
			onClick={close}
		>
			<LoginPopup
				onClose={close}
				onLogin={() => {
					close();
					router.push("/login");
				}}
			/>
		</div>
	);
};

export default LoginModals;
