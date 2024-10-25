<script lang="ts" setup>
let props = defineProps<{
    isLoading: boolean,
}>()

let showLoading = ref(false);
let progress = ref(10);

watch(() => props.isLoading, () => {
    if (props.isLoading) {
        start();
    } else {
        finish();
    }
})

let interval = null;

function start() {
    progress.value = 10;
    showLoading.value = true;

    interval = setInterval(() => {
        if (progress.value < 80) {
            progress.value += Math.random() * 2;
        }
    }, 400);
}

function finish() {
    progress.value = 100;
    setTimeout(() => {
        showLoading.value = false;
        progress.value = 10;
    }, 100);
    clearInterval(interval);
}
</script>

<template>
    <div class="fixed top-0 left-0 right-0 h-0.5 bg-sea-green z-50 transition-all ease-in-out"
        :class="{ 'opacity-0': !showLoading }" :style="{ width: `${progress}%` }"></div>
</template>

<style></style>