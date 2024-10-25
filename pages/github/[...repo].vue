<script setup>
let route = useRoute()
let repoLink = "https://github.com/juls0730/";

if (route.params.repo) {
    repoLink += route.params.repo
}

navigateTo(repoLink, { external: true })
</script>

<template>
    <div class="min-h-screen">
        You are being redirected to <a :href="repoLink">GitHub</a> shortly...
    </div>
</template>