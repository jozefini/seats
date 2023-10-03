// import basicSsl from '@vitejs/plugin-basic-ssl'
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import { svgBuilder } from 'vite-svg-plugin'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, './src/assets'),
			'@api': path.resolve(__dirname, './src/api'),
			'@app': path.resolve(__dirname, './src/app'),
			'@hoc': path.resolve(__dirname, './src/hoc'),
			'@contexts': path.resolve(__dirname, './src/contexts'),
			'@components': path.resolve(__dirname, './src/components'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@stores': path.resolve(__dirname, './src/stores'),
			'@ui': path.resolve(__dirname, './src/ui'),
			'@utils': path.resolve(__dirname, './src/utils'),
		},
	},
	plugins: [svgBuilder({ path: 'src/assets/icons/', prefix: 'icon' }), react()], // , basicSsl()
})
