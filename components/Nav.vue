<script setup lang="ts">
let colorMode = useColorMode();

const changeTheme = () => {
    if (colorMode.preference === "dark") {
        // from dark => light
        colorMode.preference = "light"
    } else if (colorMode.preference === "light") {
        // from light => system
        colorMode.preference = "system";
    } else {
        // from system => dark
        colorMode.preference = "dark";
    }

    return;
}

</script>

<template>
    <nav class="h-16 z-10 w-full">
        <div class="px-6 max-w-7xl grid gap-2 grid-cols-12 ms-auto me-auto h-full justify-evenly">
            <div class="ml-0 col-span-6 sm:col-span-4 flex items-center">
                <ul class="flex gap-x-8">
                    <li
                        class="absolute w-fit -translate-x-full top-0 px-2 py-4 bg-soft-lavender dark:bg-midnight text-deep-indigo dark:text-white opacity-0 focus-within:translate-x-0 focus-within:opacity-100">
                        <a href="#main">Skip to content</a>
                    </li>
                    <li>
                        <NuxtLink to="/">
                            Home
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/blog">
                            Blog
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="mr-0 col-span-4 items-center hidden sm:flex"> </div>
            <div class="mr-0 col-span-6 sm:col-span-4 flex items-center justify-end">
                <ul class="flex gap-x-4">
                    <li>
                        <a href="https://www.github.com/juls0730">
                            <button>
                                <Icon name="tabler:brand-github" size="22" />
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="https://x.com/julie4055_">
                            <button>
                                <Icon name="tabler:brand-x" size="22" />
                            </button>
                        </a>
                    </li>
                    <li>
                        <button @click="changeTheme">
                            <Icon v-if="$colorMode.preference === 'dark'" name="tabler:moon" size="22" />
                            <Icon v-else-if="$colorMode.preference === 'light'" name="tabler:sun-high" size="22" />
                            <Icon v-else name="ph:monitor-bold" size="22" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>


<style scoped>
button {
    padding: 0.25rem
}
</style>