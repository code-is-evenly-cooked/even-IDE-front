import { forwardRef, memo, useMemo } from "react";
import type { BaseButtonProps } from "@/types/button";
import {
	BASE_BUTTON_STYLES,
	BUTTON_SIZE_STYLES,
	TEXT_COLOR,
	BG_COLOR,
	BORDER_COLOR,
} from "./styles";

const BaseButton = memo(
	forwardRef<HTMLButtonElement, BaseButtonProps>(
		(
			{
				type = "button",
				size = "md",
				style = "primary",
				color = "violet300",
				textColor = "white",
				leftIcon,
				rightIcon,
				isLoading,
				disabled,
				className,
				children,
				...props
			},
			ref
		) => {
			const stateStyles = useMemo(() => {
				if (style === "primary") {
					return `text-white ${BG_COLOR[color] || ""}`;
				}

				if (style === "outline") {
					return `${TEXT_COLOR[textColor] || ""} bg-white ${
						BORDER_COLOR[color] || ""
					}`;
				}

				if (style === "icon") {
					return `${TEXT_COLOR[textColor] || ""} ${BG_COLOR[color] || ""}`;
				}

				return "";
			}, [style, color, textColor]);

			const mergedClassName = useMemo(() => {
				const sizeStyles = BUTTON_SIZE_STYLES[size] || BUTTON_SIZE_STYLES.md;
				const loadingStyle = isLoading ? "cursor-wait" : "";
				return `${BASE_BUTTON_STYLES} ${sizeStyles} ${stateStyles} ${loadingStyle} ${
					className || ""
				}`;
			}, [size, stateStyles, isLoading, className]);

			return (
				<button
					ref={ref}
					type={type}
					disabled={disabled || isLoading}
					className={mergedClassName}
					{...props}
				>
					{style === "icon" ? (
						<>
							{leftIcon && (
								<span className="absolute left-4 top-1/2 -translate-y-1/2">
									{leftIcon}
								</span>
							)}
							<span className="w-full text-center">
								{isLoading ? (
									<span className="inline-flex items-center gap-2">
										<LoadingSpinner />
										로딩중...
									</span>
								) : (
									children
								)}
							</span>
							{rightIcon && (
								<span className="absolute right-4 top-1/2 -translate-y-1/2">
									{rightIcon}
								</span>
							)}
						</>
					) : (
						<>
							{leftIcon && <span className="inline-flex mr-1">{leftIcon}</span>}
							{isLoading ? (
								<span className="inline-flex items-center gap-2">
									<LoadingSpinner />
									로딩중...
								</span>
							) : (
								children
							)}
							{rightIcon && (
								<span className="inline-flex ml-1">{rightIcon}</span>
							)}
						</>
					)}
				</button>
			);
		}
	)
);

const LoadingSpinner = () => (
	<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
		<circle
			className="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"
			fill="none"
		/>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
		/>
	</svg>
);

BaseButton.displayName = "BaseButton";

export default BaseButton;
