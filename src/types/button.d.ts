import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonStyle = "primary" | "outline" | "icon";

export interface BaseButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
	size?: ButtonSize;
	style?: ButtonStyle;
	color?: string;
	textColor?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}
