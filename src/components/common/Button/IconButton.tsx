import { forwardRef, memo, useMemo } from "react";
import type { IconButtonProps } from "@/types/button";
import { BASE_BUTTON_STYLES, BG_COLOR, ICON_BUTTON_SIZE_MAP } from "./styles";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const IconButton = memo(
	forwardRef<HTMLButtonElement, IconButtonProps>(
		(
			{
				icon,
				label,
				size = "md",
				color = "gray500",
				isLoading,
				disabled,
				className,
				transparent = false,
				isActive = false,
				...props
			},
			ref
		) => {
			const sizeClass = ICON_BUTTON_SIZE_MAP[size] || ICON_BUTTON_SIZE_MAP.md;
			const colorClass = useMemo(() => {
				if (transparent) {
					return `bg-transparent hover:bg-gray700`;
				}
				const baseBg = BG_COLOR[color] || "";

				const activeTint = isActive
					? "border border-violet600 shadow-violetIconGlow"
					: "";

				return `${baseBg} ${activeTint}`;
			}, [color, transparent, isActive]);

			const loadingStyle = isLoading ? "cursor-wait" : "";

			const finalClassName = useMemo(() => {
				return `${BASE_BUTTON_STYLES} ${sizeClass} ${colorClass} ${loadingStyle} ${
					className || ""
				}`;
			}, [sizeClass, colorClass, loadingStyle, className]);

			return (
				<button
					ref={ref}
					type="button"
					aria-label={label}
					aria-pressed={isActive}
					disabled={disabled || isLoading}
					className={finalClassName}
					title={label}
					{...props}
				>
					{isLoading ? <LoadingSpinner className="h-5 w-5" /> : icon}
				</button>
			);
		}
	)
);

IconButton.displayName = "IconButton";

export default IconButton;
