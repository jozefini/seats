const plugin = require('tailwindcss/plugin')

// Utilities.
const direction = require('./src/assets/tailwindcss/direction.cjs')
const display = require('./src/assets/tailwindcss/display.cjs')
const flexbox = require('./src/assets/tailwindcss/flexbox.cjs')
const sizes = require('./src/assets/tailwindcss/sizes.cjs')
const position = require('./src/assets/tailwindcss/position.cjs')
const typography = require('./src/assets/tailwindcss/typography.cjs')
const misc = require('./src/assets/tailwindcss/misc.cjs')

// Dynamic utilities.
const dynamic = {
	lh: (value) => ({
		lineHeight: value,
	}),
	sq: (value) => ({
		width: value,
		height: value,
	}),
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
	darkMode: 'class',
	theme: {
		extend: require('./src/assets/tailwindcss/extends.cjs'),
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		plugin(({ addUtilities, matchUtilities }) => {
			addUtilities({
				...direction,
				...display,
				...flexbox,
				...sizes,
				...position,
				...typography,
				...misc,
			})
			matchUtilities(dynamic)
		}),
	],
}
