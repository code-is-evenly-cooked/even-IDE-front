import Image from "next/image";

interface IconProps {
	className?: string;
}
export const EyeIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/eye.svg"
			alt="비밀번호 보기"
			width={24}
			height={24}
			className={className}
			priority
		/>
	);
};

export const EyeCloseIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/eyeClose.svg"
			alt="비밀번호 숨기기"
			width={24}
			height={24}
			className={className}
			priority
		/>
	);
};

export const GoogleIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/google.svg"
			alt="구글 로그인"
			width={24}
			height={24}
			className={className}
			priority
		/>
	);
};

export const KakaoIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/kakao.svg"
			alt="카카오 로그인"
			width={24}
			height={24}
			className={className}
			priority
		/>
	);
};

export const EvenIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/even.svg"
			alt="이븐"
			width={40}
			height={40}
			className={className}
			priority
		/>
	);
};
