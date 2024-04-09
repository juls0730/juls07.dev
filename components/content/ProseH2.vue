<template>
	<div :id="id"
		class="group flex mt-2">
		<div class="text-2xl">
			<slot />
		</div>
		<button @click="copy(location.origin + location.pathname + '#' + id)"
			class="group-hover:opacity-100 ml-2 hover:bg-zinc-800 flex items-center h-fit p-[2px] transition-opacity duration-200 rounded opacity-0">
			<div class="h-4"
				v-if="copied">
				<Icon size="16"
					name="tabler:check" />
			</div>
			<div class="h-4"
				v-else>
				<Icon size="16"
					name="tabler:link" />
			</div>
		</button>
	</div>
</template>

<script setup lang="ts">
import {
	useClipboard, useBrowserLocation
} from '@vueuse/core';
const { copy, copied, text } = useClipboard();
const props = withDefaults(
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