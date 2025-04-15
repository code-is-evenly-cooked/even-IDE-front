import { forwardRef, memo, useMemo } from "react";
import type { IconButtonProps } from "@/types/button";
import {
	BASE_BUTTON_STYLES,
	TEXT_COLOR,
	BG_COLOR,
	ICON_BUTTON_SIZE_MAP,
} from "./styles";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const IconButton = memo(
	forwardRef<HTMLButtonElement, IconButtonProps>(
		(
			{
				icon,
				label,
				size = "md",
				color = "gray500",
				textColor = "white",
				isLoading,
				disabled,
				className,
				transparent = false,
				...props
			},
			ref
		) => {
			const sizeClass = ICON_BUTTON_SIZE_MAP[size] || ICON_BUTTON_SIZE_MAP.md;
			const colorClass = transparent
				? `${TEXT_COLOR[textColor] || ""} bg-transparent`
				: `${TEXT_COLOR[textColor] || ""} ${BG_COLOR[color] || ""}`;

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
					disabled={disabled || isLoading}
					className={finalClassName}
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
