<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo';
import MiniBlogCard from './MiniBlogCard.vue';

let copied = ref(false);
const copy = (text: string) => {
    if (import.meta.client) {
        navigator.clipboard.writeText(text)
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    }
};

const activeTocId: Ref<string | null> = ref(null)
const nuxtContent = ref(null)

const updateActiveHeading = () => {
    const headings = document.querySelectorAll('#main h2[id], #main h3[id]')
    const windowHeight = window.innerHeight
    const windowMidpoint = windowHeight / 2

    headings.forEach((heading) => {
        const headingRect = heading.getBoundingClientRect()
        const headingBottom = headingRect.bottom

        if (headingBottom <= windowMidpoint) {
            activeTocId.value = heading.id
        }
    })
}

onMounted(() => {
    window.addEventListener('scroll', updateActiveHeading)
})

onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveHeading)
})

let year = new Date().getFullYear();
let route = useRoute();

const { data: doc } = await useAsyncData(`${route.path}-data`, () => queryContent(route.path).findOne())
if (!doc.value) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('/blog')
    .where({ _extension: 'md' })
    .only(['title', 'description', '_path'])
    .sort({ date: 1 })
    .where({ _draft: false })
    .findSurround(withoutTrailingSlash(route.path))
)

useSeoMeta({
    title: doc.value?.title,
    description: doc.value?.description,
    ogTitle: doc.value?.title,
    ogDescription: doc.value?.description,
    ogImage: doc.value?.image.src,
    ogUrl: 'https://juls07.dev',
    twitterTitle: doc.value?.title,
    twitterDescription: doc.value?.description,
    twitterImage: doc.value?.image.src,
    twitterCard: 'summary_large_image',
})

useHead({
    htmlAttrs: {
        lang: 'en'
    },
    meta: [
        {
            name: "copyright",
            content: `© ${year} juls07`
        },
        {
            name: "robots",
            content: "index, follow"
        },
        {
            name: "keywords",
            content: doc.value?.tags.join(", ")
        },
        {
            name: "author",
            content: "juls07",
        }
    ],
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon.png'
        }
    ]
})
</script>

<template>
    <div class="!col-start-2 md:!col-start-3 lg:!col-start-4 lg:col-span-6 md:col-span-8 col-span-10 order-1">
        <NuxtImg v-if="doc && doc.image" :src="doc.image.src" class="mb-2 rounded-md drop-shadow w-full" quality="80" />
        <h1 class="text-3xl dark:text-gray-100 md:text-4xl font-semibold mb-2">{{ doc?.title }}</h1>
        <p class="mb-1 dark:text-zinc-400 text-zinc-600">
            {{ doc?.description }}
        </p>
        <p class="mb-2 text-zinc-500">
            {{ new Date(doc?.date).toDateString().split(' ').slice(1).join(' ') }} |
            {{ doc?.readTime }} minute read
        </p>
        <div class="flex flex-wrap w-full gap-2 justify-start mb-3">
            <IconTag v-for="tag in doc?.tags" :name="tag" :iconName='tag' isTag="true" />
        </div>
        <hr class="mb-4 border-[#ECE6E7] dark:border-[#232326] border-t" />
    </div>
    <div class="!col-start-2 md:!col-start-3 lg:!col-start-4 lg:col-span-6 md:col-span-8 col-span-10 order-3">
        <main id="main" class="leading-relaxed">
            <ContentRenderer ref="nuxtContent" class="dark:text-gray-200 text-gray-800" :value="doc" />
        </main>
    </div>
    <nav
        class="lg:ml-2 mb-3 lg:mb-0 col-start-2 md:col-start-3 lg:block lg:col-start-10 lg:col-span-2 md:col-span-8 col-span-10 lg:sticky lg:top-8 h-fit order-2 lg:order-4">
        <TableOfContents :doc="doc" :activeTocId="activeTocId" />
    </nav>
    <div class="!col-start-2 md:!col-start-3 lg:!col-start-4 lg:col-span-6 md:col-span-8 col-span-10 order-5">
        <div class="flex justify-between mt-10">
            <NuxtLink class="flex items-center text-fuschia hover:underline visited:bg-rose-700" to="/blog">
                ← Back to Blog
            </NuxtLink>
            <button class="flex items-center px-2 py-1" @click="copy('https://juls07.dev' + route.path)">
                <Icon v-if="copied" name="tabler:check" class="mr-1.5" size="20" />
                <Icon v-else name="tabler:link" class="mr-1.5" size="20" />
                Copy Link
            </button>
        </div>
        <hr class="my-6 border-[#ECE6E7] dark:border-[#232326] border-t" />
        <div v-if="surround && surround.length > 0" class="sm:grid gap-8 sm:grid-cols-2">
            <MiniBlogCard v-if="surround[0]" :to="surround[0]._path" :title="surround[0].title"
                :description="surround[0].description" />
            <MiniBlogCard class="col-start-2" v-if="surround[1]" :to="surround[1]._path" :title="surround[1].title"
                :right-align="true" :description="surround[1].description" />
        </div>
    </div>
</template>