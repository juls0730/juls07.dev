<template>
    <div class="group flex mt-2">
        <h2 :id="id" class="text-2xl font-semibold">
            <slot />
        </h2>
        <button @click="copy('https://juls07.dev' + route.path + '#' + id)"
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
withDefaults(
    defineProps<{
        id?: string;
    }>(),
    { id: '' }
);

let copied = ref(false);
const copy = (text: string) => {
    if (import.meta.client) {
        navigator.clipboard.writeText(text)
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    }
};

const route = useRoute();
</script>

<style scoped>
.icon {
    display: block;
}
</style>
