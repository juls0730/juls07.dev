<script lang="ts" setup>
const titleWidth = Math.max(Math.floor(Math.random() * 300), 175); 
</script>

<template>
    <div
        class="flex flex-col dark:bg-dark-slate bg-touched-lavender max-h-[563.25px] h-[563.25px] overflow-hidden rounded-lg border border-soft-lilac dark:border-midnight-slate/30 shadow-md">
        <div class="w-full rounded-tl-lg rounded-tr-lg aspect-video dark:bg-zinc-400 bg-zinc-600 animate-pulse">
        </div>
        <div
            class="flex-shrink p-3 overflow-hidden pt-2 text-fade dark:before:bg-[linear-gradient(180deg,transparent_0,hsla(0,0%,5%,0)_36%,#0C0B0C_95%,#0C0B0C)] before:bg-[linear-gradient(180deg,transparent_0,hsla(0,0%,5%,0)_36%,#F5EDFE_95%,#F5EDFE)] mb-1 pb-1 relative">
            <div class="h-5 mb-1 rounded-lg dark:bg-zinc-400 bg-zinc-600 animate-pulse"
                :style="{ width: `${titleWidth}px` }"></div>
            <div class="h-3 mb-1 rounded-lg dark:bg-zinc-400 bg-zinc-600 animate-pulse w-36"></div>
            <div class="h-3 mb-1 rounded-lg bg-zinc-500 animate-pulse w-44"></div>
            <div
                class="flex flex-wrap w-full gap-2 justify-start my-1 dark:text-zinc-200 text-zinc-800 max-h-[13.75rem]">
                <!-- <IconTag v-for="tag in article.tags" :name="tag" :iconName='tag' isTag="true" /> -->
                <div v-for="i in Math.ceil(Math.random() * 4)"
                    class="font-inter md:text-lg w-fit max-h-9 min-w-fit dark:bg-obsidian-night bg-[hsl(270,68%,95.47%)] border border-soft-lilac dark:border-midnight-slate/30 py-1 px-2 rounded shadow flex items-center">
                    <div class="mb-1 rounded bg-zinc-500 animate-pulse w-[20px] h-[20px] mr-2"></div>
                    <div class="h-3 mb-1 rounded-lg bg-zinc-500 animate-pulse" :style="{ width: `${(i * 10) + 67}px` }">
                    </div>
                </div>
            </div>
            <div class="max-h-full leading-relaxed">
                <div v-for="i in 100" class="h-3 my-1 rounded-lg dark:bg-zinc-400 bg-zinc-600 animate-pulse"
                    :style="{ width: `${80 + Math.ceil(Math.random() * 20)}%` }" :class="{
                        'mb-4':
                            Math.random() > 0.8
                    }"></div>
            </div>
        </div>
    </div>
</template>