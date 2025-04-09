import Image from "next/image";

interface IconProps {
	className?: string;
}

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
