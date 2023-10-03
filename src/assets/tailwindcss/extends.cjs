module.exports = {
	screens: {
		pc: '992px',
		xl: '1280px',
		hd: '1920px',
	},
	borderRadius: {
		inherit: 'inherit',
	},
	backgroundImage: {
		'file-upload': 'linear-gradient(to left, #000 50%, #fff 50%)',
		'sticky-glow': 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0) 100%)',
	},
	backgroundSize: {
		'2x': '200%',
	},
	colors: {
		'light-gray': '#F5F5F5',
		error: '#EB5757',
	},
	boxShadow: {
		dropdown: '0 0.625rem 1.25rem rgba(16,24,40,0.2)',
		normal: '0.625rem 0.3125rem 2.8125rem rgba(0,0,0,0.1)',
		form: '0.625rem 0.3125rem 2.8125rem rgba(0, 0, 0, 0.1)',
		'help-step': '0.3125rem 0.125rem 1.375rem rgba(0, 0, 0, 0.1)',
		'help-step-pc': '0.625rem 0.3125rem 2.8125rem rgba(0,0,0,0.1)',
		tooltip: '0 0.625rem 1.5625rem rgba(0, 0, 0, 0.15)',
		'date-picker':
			'0 0 0.5px rgba(66, 71, 76, 0.32), 0 4px 8px rgba(66, 71, 76, 0.05), 0 4px 40px #eeeeee',
		'release-stats': '0 0.625rem 1.4375rem rgba(0,0,0,0.10)',
		avatar: '0.625rem 0.3125rem 2.8125rem rgba(0,0,0,0.2)',
	},
	fontFamily: {
		primary: ['Ploni ML v2 AAA', 'sans-serif'],
	},
	maxWidth: {
		mobile: '26.25rem', // 420px
	},
	borderWidth: {
		2: '0.125rem', // 2px
	},
	animation: {
		'slide-down': 'slideDown 0.3s ease-out',
		'slide-up': 'slideUp 0.3s ease-out',
	},
	keyframes: {
		slideDown: {
			from: {
				opacity: '0',
				height: '0',
				overflow: 'hidden',
			},
			to: {
				height: 'var(--radix-accordion-content-height)',
				overflow: 'hidden',
			},
		},
		slideUp: {
			from: {
				overflow: 'hidden',
				height: 'var(--radix-accordion-content-height)',
			},
			to: {
				overflow: 'hidden',
				height: '0',
				opacity: '0',
			},
		},
	},
}
