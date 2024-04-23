<script lang="ts" setup>
const props = defineProps({
    to: String,
    title: String,
    description: String,
    rightAlign: Boolean,
});
</script>

<template>
    <NuxtLink :to="props.to"
        class="py-8 px-6 border-[#ECE6E7] dark:border-[#232326] border rounded-lg hover:dark:bg-obsidian-night hover:bg-[hsl(270,68%,95.71%)] hover:transition-colors select-none"
        :class="props.rightAlign ? 'text-right' : ''">
        <div
            class="p-1.5 inline-flex bg-[#ECE6E7] dark:bg-[#1A1A1D] rounded-full mb-4 border border-gray-300/80 dark:border-neutral-800/70">
            <Icon :name="props.rightAlign ? 'tabler:arrow-right' : 'tabler:arrow-left'" size="24" />
        </div>
        <p class="font-semibold">{{ props.title }}</p>
        <p class="text-sm">{{ props.description }}</p>
    </NuxtLink>
</template>
