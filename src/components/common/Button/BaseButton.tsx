import { BaseButtonProps } from "@/types/button";
import { forwardRef, memo } from "react";

const BaseButton = memo(
	forwardRef<HTMLButtonElement, BaseButtonProps>(
		(
			{
				size = "md",
				style = "primary",
				color = "violet300",
				textColor = "white",
				leftIcon,
				rightIcon,
				disabled,
				className,
				children,
				...props
			},
			ref
		) => {
			const baseStyles = `
        inline-flex items-center justify-center
        rounded-lg font-bold text-lg
        transition-all duration-200 gap-2
        relative
      `;

			const sizeStyles = {
				sm: "h-[1.5rem] px-[8px] py-[5px]",
				md: "h-[2rem] px-[12px] py-[5px]",
				lg: "h-[2.5rem] px-[16px] py-[9px]",
				xl: "h-[3.25rem] px-[24px] py-[14px]",
			}[size];

			const stateStyles =
				style === "primary"
					? `text-white bg-violet300`
					: style === "outline"
					? `text-violet300 bg-white border border-violet300`
					: style === "icon"
					? `text-${textColor} bg-${color} hover:bg-${color}/80 active:bg-${color}/60`
					: "";

			const mergedClassName = `${baseStyles} ${sizeStyles} ${stateStyles} ${
				className || ""
			}`;

			return (
				<button
					ref={ref}
					className={mergedClassName}
					disabled={disabled}
					{...props}
				>
					{style === "icon" ? (
						<>
							{leftIcon && (
								<span className="absolute left-4 top-1/2 -translate-y-1/2">
									{leftIcon}
								</span>
							)}
							<span className="w-full text-center">{children}</span>
							{rightIcon && (
								<span className="absolute right-4 top-1/2 -translate-y-1/2">
									{rightIcon}
								</span>
							)}
						</>
					) : (
						<>
							{leftIcon && <span className="inline-flex mr-1">{leftIcon}</span>}
							{children}
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

BaseButton.displayName = "BaseButton";

export default BaseButton;
