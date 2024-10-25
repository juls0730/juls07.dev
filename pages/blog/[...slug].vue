<script setup>
let year = new Date().getFullYear();
</script>

<template>
    <div class="min-h-screen">
        <Nav />
        <div class="grid grid-cols-12 gap-x-5 justify-center pt-6 mb-4 relative">
            <Blog />
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
