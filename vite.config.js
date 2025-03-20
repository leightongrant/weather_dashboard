import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		sourcemap: true,
		folder: 'dist',
	},
	base: '/weather_dashboard',
})
