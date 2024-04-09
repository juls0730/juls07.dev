<template>
	<div class="container my-2 dark:bg-[#1d1b1d] bg-[hsl(270,26.89%,94.47%)]">
		<span v-if="filename" class="filename-text text-xs leading-none tracking-tight text-gray-400 font-jetbrains">
			{{ filename }}
		</span>
		<slot />
		<div class="bottom-container">
			<div class="copy-container">
				<button
					class="rounded hover:bg-zinc-300/70 dark:hover:bg-zinc-800/60 transition-colors duration-200 flex p-1"
					@click="copy(code)" @keypress.space="copy(code)">
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
import { useClipboard } from '@vueuse/core';
const { copy, copied } = useClipboard();
const props = withDefaults(
	defineProps<{
		code?: string;
		language?: string | null;
		filename?: string | null;
		highlights?: Array<any>;
	}>(),
	{ code: '', language: null, filename: null, highlights: undefined }
);
</script>

<style scoped>
.icon {
	display: block;
}

.container {
	position: relative;
	padding-top: 0.5em;
	overflow: hidden;
	border-radius: 0.5rem;
}

.container:is(:hover, :focus-within) .bottom-container {
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

.filename-text {
	position: absolute;
	top: 0.25rem;
	right: 0.25rem;
	padding: 0.25em 0.5em;
}

:slotted(pre) {
	margin-top: 0;
	margin-bottom: 0;
	display: flex;
	flex: 1 1 0%;
	overflow-x: auto;
	padding: 1rem;
	line-height: 1.625;
	counter-reset: lines;
}

:slotted(pre code) {
	width: 100%;
	display: flex;
	flex-direction: column;
}

:slotted(pre code .line) {
	min-height: 1em;
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

:slotted(pre code .highlight) {
	background-color: #363b46;
	display: block;
	margin-right: -1em;
	margin-left: -1em;
	padding-right: 1em;
	padding-left: 0.75em;
	border-left: 0.25em solid red;
}
</style>