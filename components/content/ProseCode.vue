<template>
    <div id="code-container" class="pt-3 overflow-hidden rounded-md my-2 dark:bg-[#1d1b1d] bg-[#f1edf5] shadow-sm">
        <div class="flex justify-between mx-2 mb-1">
            <span v-if="language"
                class="px-2 py-1 text-xs leading-none tracking-tight text-gray-400 font-jetbrains capitalize">
                {{ language }}
            </span>
            <span v-if="filename" class="px-2 py-1 text-xs leading-none tracking-tight text-gray-400 font-jetbrains">
                {{ filename }}
            </span>
        </div>
        <div ref="codeElm">
            <slot />
        </div>
        <div class="bottom-container">
            <div class="copy-container">
                <button class="p-1 hover:bg-zinc-300/70 dark:hover:bg-zinc-700/40" @click="copyCode()"
                    @keypress.space="copyCode()">
                    <div class="h-6" v-if="copied">
                        <Icon size="24" name="tabler:check" />
                    </div>
                    <div class="h-6" v-else>
                        <Icon size="24" name="tabler:copy" />
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        code?: string;
        language?: string | null;
        filename?: string | null;
        highlights?: Array<number>;
    }>(),
    { code: '', language: null, filename: null, highlights: [] }
);

const codeElm = ref();
let copied = ref(false);

const copyCode = () => {
    if (!codeElm.value) {
        return;
    }

    let str = "";
    let lines = codeElm.value.getElementsByClassName("line");
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        str += line.textContent
        if (!str.endsWith("\n") && i != lines.length - 1) {
            str += "\n"
        }
    }

    if (import.meta.client) {
        navigator.clipboard.writeText(str);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    }
};
</script>

<style scoped>
.icon {
    display: block;
}

#code-container:is(:hover, :focus-within) .bottom-container {
    opacity: 1;
    pointer-events: all;
}

.bottom-container {
    display: flex;
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 250ms;
    opacity: 0;
    pointer-events: none;
    position: relative;
    justify-content: flex-end;
}

.copy-container {
    height: fit-content;
    display: flex;
    position: absolute;
    bottom: 15px;
    right: 15px;
}

:slotted(pre) {
    margin-top: 0;
    margin-bottom: 0;
    display: flex;
    flex: 1 1 0%;
    overflow-x: auto;
    padding-bottom: 1rem;
    line-height: 1.625;
    counter-reset: lines;
}

:slotted(pre code) {
    display: flex;
    width: 100%;
    min-width: max-content;
    flex-direction: column;
}

:slotted(pre code .line) {
    min-width: 100%;
    min-height: 1em;
    padding-left: 1rem;
    padding-right: 1rem;
}

:slotted(pre code .line::before) {
    counter-increment: lines;
    content: counter(lines);
    width: 1em;
    margin-right: 1.5rem;
    display: inline-block;
    text-align: right;
    color: rgba(115, 138, 148, 0.4);
}

:slotted(pre code .highlighted) {
    background-color: #e4e1ee;
}

.dark :slotted(pre code .highlighted) {
    background-color: #2e2b2e;
}
</style>