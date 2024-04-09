import { defineNuxtConfig } from 'nuxt/config';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			title: 'Juls07',

			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },

				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{ hid: 'description', name: 'description', content: 'Juls07 is a fullstack web developer' }
			],
			link: [
				{ rel: 'icon', href: '/favicon.png' }
			],
			htmlAttrs: {
				lang: 'en'
			}
		},
	},

	colorMode: {
		classSuffix: ''
	},

	content: {
		highlight: {
			theme: {
				dark: 'min-dark',
				default: 'min-light'
			},
			preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'svelte', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini'],
		},
	},

	css: [
		'@/assets/css/main.css',
	],


	devtools: {
		enabled: true
	},

	experimental: {
		payloadExtraction: true
	},

	image: {
		provider: 'ipx'
	},

	modules: ['nuxt-icon', '@nuxt/content', '@nuxtjs/color-mode', '@nuxt/image'],

	nitro: {
		preset: 'static',
		prerender: {
			crawlLinks: true,
			routes: ['/sitemap.xml', '/rss.xml']
		},
	},

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	router: {
		options: {
			strict: false
		}
	},

	sourcemap: false,
})
