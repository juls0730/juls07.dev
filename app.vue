<script setup>
const nuxtApp = useNuxtApp();
const isRouteLoading = ref(false);
nuxtApp.hook("page:start", () => {
    isRouteLoading.value = true;
});
nuxtApp.hook("page:finish", () => {
    isRouteLoading.value = false;
});
</script>

<template>
    <ProgressBar :isLoading="isRouteLoading" />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>