<script lang="ts" setup>
const props = defineProps({
    article: { type: Object, required: true },
});
</script>

<template>
    <div
        class="flex flex-col dark:bg-dark-slate bg-touched-lavender max-h-[563.25px] h-[563.25px] overflow-hidden rounded-lg border border-soft-lilac dark:border-midnight-slate/30 shadow-md">
        <NuxtImg v-if="article.image" :src="article.image.src" width="464" densities="1x 2x" quality="80"
            class="w-full rounded-tl-lg rounded-tr-lg aspect-video" loading="lazy" />
        <div
            class="flex-shrink p-3 overflow-hidden pt-2 text-fade dark:before:bg-[linear-gradient(180deg,transparent_0,hsla(0,0%,5%,0)_36%,#0C0B0C_95%,#0C0B0C)] before:bg-[linear-gradient(180deg,transparent_0,hsla(0,0%,5%,0)_36%,#F5EDFE_95%,#F5EDFE)] mb-1 pb-1 relative">
            <h3>
                <NuxtLink tabindex="0" class="text-lg" :prefetch="true" :to="article._path">
                    {{ article.title }}
                </NuxtLink>
            </h3>
            <p class="dark:text-zinc-400 text-zinc-600">
                {{ article.description }}
            </p>
            <p class="text-zinc-500">
                {{ new Date(article.date).toDateString().split(' ').slice(1).join(' ') }} |
                {{ article.readTime }} minute read
            </p>
            <div
                class="flex flex-wrap w-full gap-2 justify-start my-1 dark:text-zinc-200 text-zinc-800 max-h-[13.75rem]">
                <IconTag v-for="tag in article.tags" :name="tag" :iconName='tag' isTag="true" />
            </div>
            <div class="max-h-full leading-relaxed">
                <ContentRenderer :value="article">
                    <ContentRendererMarkdown :value="article" :excerpt="true" />
                </ContentRenderer>
            </div>
        </div>
    </div>
</template>