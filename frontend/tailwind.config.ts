import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			primary:"#f43f5e",
			secondary:"#afcc54",
		},
		fontFamily:{
			Poppins: ['Poppins', 'sans-serif'],
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
