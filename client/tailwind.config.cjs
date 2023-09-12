/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
	mode: "jit",
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				primary: "#ffffff",
				dimWhite: "rgb(255, 255, 255)",
				dimBlue: "rgb(9, 151, 124)",
				blue: "#9fbada",
				yellow: "#fbf2d4",
				red: "#f66464",
				orange: "#f5cea9",
				gray: {
					default: "#acb5bd",
					lighter: "#f8f9fa",
					light: "#dde2e5",
					dark: "#495057",
				},
			},
			fontFamily: {
				sans: ["Helvetica Neue", "sans-serif"],
			},
		},
		screens: {
			xs: "480px",
			ss: "620px",
			sm: "768px",
			md: "1060px",
			lg: "1200px",
			xl: "1700px",
		},
	},
	plugins: [],
};
