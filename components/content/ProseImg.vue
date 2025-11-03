<script setup lang="ts">
withDefaults(
    defineProps<{
        src: string;
        alt: string | undefined;
    }>(),
    {
        src: '',
        alt: '',
    }
);
</script>

<template>
        <img class="mx-auto" :src="src" :alt="alt" />
</template>
