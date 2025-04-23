import React from "react";
import BaseButton from "@/components/common/Button/BaseButton";
import { CloseIcon, EvenIcon } from "@/components/common/Icons";
import IconButton from "@/components/common/Button/IconButton";

interface LoginPopupProps {
	onClose: () => void;
	onLogin: () => void;
}

const LoginPopup = ({ onClose, onLogin }: LoginPopupProps) => {
	return (
		<div className="w-full max-w-[33rem] border-none bg-gray700 p-4 rounded-xl">
			<div className="flex justify-end">
				<IconButton
					icon={<CloseIcon />}
					label="닫기"
					size="sm"
					transparent
					onClick={onClose}
				/>
			</div>
			<div className="flex flex-col gap-8 p-6">
				<div className="flex justify-center items-center gap-4">
					<EvenIcon />
					<h1 className="text-3xl">even ide</h1>
				</div>
				<h2 className="text-sm text-white text-center">
					로그인하여 나만의 개발 환경을 시작하세요.
				</h2>
				<BaseButton type="submit" size="xl" onClick={onLogin}>
					로그인 하러가기
				</BaseButton>
			</div>
		</div>
	);
};

export default LoginPopup;
