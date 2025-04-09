export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonStyle = "primary" | "outline" | "icon";

export type ButtonColor = keyof typeof BUTTON_BG_COLORS;
export type ButtonTextColor = keyof typeof BUTTON_TEXT_COLORS;

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
