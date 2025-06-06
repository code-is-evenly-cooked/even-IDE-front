// components/SocialLoginButton.tsx

import { ButtonSize, ButtonColor, ButtonTextColor } from "@/types/button";
import { GoogleIcon, KakaoIcon } from "../Icons";
import BaseButton from "./BaseButton";

type Provider = "google" | "kakao";

interface SocialLoginButtonProps {
	provider: Provider;
	size?: ButtonSize;
	fullWidth?: boolean;
	onClick?: () => void;
	className?: string;
}

const PROVIDER_CONFIG: Record<
	Provider,
	{
		label: string;
		icon: React.ReactNode;
		color: ButtonColor; // ✅ 타입 제한
		textColor: ButtonTextColor; // ✅ 타입 제한
	}
> = {
	google: {
		label: "구글 로그인",
		icon: <GoogleIcon />,
		color: "gray500",
		textColor: "white",
	},
	kakao: {
		label: "카카오 로그인",
		icon: <KakaoIcon />,
		color: "kakao",
		textColor: "gray500",
	},
};

const SocialLoginButton = ({
	provider,
	size = "xl",
	fullWidth = true,
	onClick,
	className,
}: SocialLoginButtonProps) => {
	const { label, icon, color, textColor } = PROVIDER_CONFIG[provider];

	return (
		<BaseButton
			style="icon"
			size={size}
			color={color}
			textColor={textColor}
			leftIcon={icon}
			onClick={onClick}
			className={`${fullWidth ? "w-full" : ""} ${className || ""}`}
			aria-label={label}
		>
			{label}
		</BaseButton>
	);
};

export default SocialLoginButton;
