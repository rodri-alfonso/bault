/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'dm-sans': ['DMSans', 'sans-serif'],
				'dm-sans-italic': ['DMSans-italic', 'sans-serif'],
			},
			fontWeight: {
				'extra-black': '999',
			},
			fontSize: {
				'7.5xl': ['5.5rem', '1'],
			},
		},
	},
	plugins: [],
}
