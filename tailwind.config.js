/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				violet300: "#B29BF8",
				violet600: "#744CEB",
				green500: "#00A881",
				orange500: "#F57D14",
				red500: "#F5535E",
				blue500: "#5094FA",
				tonedown: "#3E3655",
				kakao: "#FEE500",

				gray900: "#1E1E1E",
				gray800: "#2A2A2A",
				gray700: "#262626",
				gray500: "#3F3F46",
				gray200: "#A9ABB8",
			},
			boxShadow: {
				violetGlow: "0 0 6px #744CEB, 0 0 12px #744CEB",
			},
			width: {
				"main-area": "calc(100% - 280px)",
			},
		},
	},
	plugins: [],
};
