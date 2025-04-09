export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonStyle = "primary" | "outline" | "icon";
export type ButtonColor = "primary" | "violet300" | "gray500" | "kakao";
export type ButtonTextColor =
	| "white"
	| "gray500"
	| "violet300"
	| "kakao"
	| "primary";

export interface BaseButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: ButtonSize;
	style?: ButtonStyle;
	color?: ButtonColor;
	textColor?: ButtonTextColor;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	isLoading?: boolean;
}

interface IconButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
	icon: React.ReactNode;
	label: string;
	size?: ButtonSize;
	color?: ButtonColor;
	textColor?: ButtonTextColor;
	isLoading?: boolean;
	className?: string;
	transparent?: boolean;
}
