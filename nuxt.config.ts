import { defineNuxtConfig } from 'nuxt/config';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-09-25',
    ssr: true,

    app: {
        head: {
            title: 'Juls07',
            script: [
                {
                    vmid: 'themeScript',
                    hid: 'theme-script',
                    children: `if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {document.documentElement.classList.add('dark')} else {document.documentElement.classList.remove('dark')}`,
                    type: 'text/javascript',
                }
            ],
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

    content: {
        highlight: {
            theme: {
                dark: 'min-dark',
                default: 'min-light'
            },
            preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'yaml', 'bash', 'go', 'docker', 'nginx'],
        },
    },

    css: [
        '@/assets/css/main.css',
    ],

    devtools: {
        enabled: true
    },

    experimental: {
        payloadExtraction: false
    },

    image: {
        provider: 'ipx'
    },

    modules: ['nuxt-icon', '@nuxt/content', '@nuxt/image'],

    nitro: {
        plugins: ['plugins/read-time.ts'],
        preset: 'static',
        minify: true,
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

    webpack: {
        optimizeCSS: true,
    },
})