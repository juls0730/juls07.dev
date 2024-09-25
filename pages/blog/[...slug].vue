<template>
    <div class="min-h-screen">
        <Nav />
        <div class="grid grid-cols-12 gap-x-5 justify-center pt-6 mb-4 relative">
            <Suspense>
                <Blog />
                <template #fallback>
                    <div
                        class="!col-start-2 md:!col-start-3 lg:!col-start-4 lg:col-span-6 md:col-span-8 col-span-10 order-1">
                        <div
                            class="mb-2 rounded-md drop-shadow w-full dark:bg-zinc-400 bg-zinc-600 animate-pulse aspect-video">
                        </div>
                        <div class="h-9 mb-2 rounded-lg dark:bg-zinc-400 bg-zinc-600 animate-pulse"
                            :style="{ width: `${Math.max(Math.ceil(Math.random() * 100), 55)}%` }"></div>
                        <div class="h-4 mb-2 rounded-lg dark:bg-zinc-400 bg-zinc-600 animate-pulse"
                            :style="{ width: `${Math.max(Math.ceil(Math.random() * 65), 15)}%` }"></div>
                        <div class="h-3 mb-2 rounded-lg bg-zinc-500 animate-pulse"
                            :style="{ width: `${Math.max(Math.ceil(Math.random() * 50), 10)}%` }"></div>
                        <div class="flex flex-wrap w-full gap-2 justify-start mb-3">
                            <div v-for="i in Math.ceil(Math.random() * 4)"
                                class="font-inter md:text-lg w-fit max-h-9 min-w-fit dark:bg-obsidian-night bg-[hsl(270,68%,95.47%)] border border-soft-lilac dark:border-midnight-slate/30 py-1 px-2 rounded shadow flex items-center">
                                <div class="mb-1 rounded bg-zinc-500 animate-pulse w-[20px] h-[20px] mr-2"></div>
                                <div class="h-3 mb-1 rounded-lg bg-zinc-500 animate-pulse"
                                    :style="{ width: `${(i * 10) + 67}px` }">
                                </div>
                            </div>
                        </div>
                        <hr class="mb-4 border-[#ECE6E7] dark:border-[#232326] border-t" />
                        <div
                            class="!col-start-2 md:!col-start-3 lg:!col-start-4 lg:col-span-6 md:col-span-8 col-span-10 order-3">
                            <main id="main" class="leading-relaxed">
                                <div class="max-h-full leading-relaxed">
                                    <div v-for="i in 100"
                                        class="h-3 my-1 rounded-lg dark:bg-zinc-400 bg-zinc-600 animate-pulse"
                                        :style="{ width: `${80 + Math.ceil(Math.random() * 20)}%` }" :class="{
                                            'mb-4':
                                                Math.random() > 0.8
                                        }"></div>
                                </div>
                            </main>
                        </div>
                    </div>
                </template>
            </Suspense>
        </div>
        <footer class="grid grid-cols-12 gap-5 justify-center">
            <div
                class="pt-6 mb-4 !col-start-2 md:!col-start-3 lg:!col-start-4 lg:col-span-6 md:col-span-8 col-span-10 text-center">
                © {{ year }} Juls07 - GPL v3.0 License
            </div>
        </footer>
    </div>
</template>

<style>
br {
    @apply my-3;
    display: block;
}

#main a {
    @apply text-fuschia hover:underline visited:bg-rose-700;
}
</style>
