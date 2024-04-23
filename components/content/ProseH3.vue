<template>
    <div class="group flex mt-2">
        <h3 :id="id" class="text-xl">
            <slot />
        </h3>
        <button @click="copy(location.origin + location.pathname + '#' + id)"
            class="dark:text-white ml-2 group-hover:opacity-100 opacity-0 transition-all">
            <div class="h-5" v-if="copied">
                <Icon size="20" name="tabler:check" />
            </div>
            <div class="h-5" v-else>
                <Icon size="20" name="tabler:link" />
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
import { useBrowserLocation, useClipboard } from '@vueuse/core';
const { copy, copied } = useClipboard();
withDefaults(
    defineProps<{
        id?: string;
    }>(),
    { id: '' }
);

const location = useBrowserLocation()
</script>

<style scoped>
.icon {
    display: block;
}
</style>