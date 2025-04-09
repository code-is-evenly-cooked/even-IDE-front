// components/styles.ts

export const BASE_BUTTON_STYLES = `
  inline-flex items-center justify-center
  rounded-lg font-bold text-lg
  transition-all duration-200 gap-2
  relative disabled:opacity-50 disabled:cursor-not-allowed
`;

export const BUTTON_SIZE_STYLES: Record<string, string> = {
	sm: "h-[1.5rem] px-[8px] py-[5px]",
	md: "h-[2rem] px-[12px] py-[5px]",
	lg: "h-[2.5rem] px-[16px] py-[9px]",
	xl: "h-[3.25rem] px-[24px] py-[14px]",
};

export const TEXT_COLOR: Record<string, string> = {
	white: "text-white",
	gray700: "text-gray700",
	violet300: "text-violet300",
	kakao: "text-kakao",
	primary: "text-primary",
};

export const BG_COLOR: Record<string, string> = {
	primary: "bg-primary hover:bg-primary/80 active:bg-primary/60",
	violet300: "bg-violet300 hover:bg-violet300/80 active:bg-violet300/60",
	kakao: "bg-kakao hover:bg-kakao/80 active:bg-kakao/60",
	gray700: "bg-gray700 hover:bg-gray700/80 active:bg-gray700/60",
};

export const BORDER_COLOR: Record<string, string> = {
	primary: "border border-primary hover:text-primary/80 active:text-primary/60",
	violet300:
		"border border-violet300 hover:text-violet300/80 active:text-violet300/60",
	gray700: "border border-gray700 hover:text-gray700/80 active:text-gray700/60",
	kakao: "",
};
