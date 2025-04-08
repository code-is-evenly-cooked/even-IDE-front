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

				gray900: "#1E1E1E",
				gray800: "#2A2A2A",
				gray700: "#262626",
				gray500: "#3F3F46",
				gray200: "#A9ABB8",
			},
			dropShadow: {
				violetGlow: "0 0 6px rgba(116, 76, 235, 0.6)",
			},
		},
	},
	plugins: [],
};
