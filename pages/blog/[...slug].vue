<script setup lang="ts">
let year = new Date().getFullYear();
</script>

<template>
	<div class="min-h-screen">
		<Nav />
		<div class="grid grid-cols-12 gap-5 justify-center">
			<div class="pt-6 mb-4 !col-start-2 md:!col-start-3 lg:!col-start-4 lg:col-span-6 md:col-span-8 col-span-10">
				<ContentDoc v-slot="{ doc }">
					<img :src="doc.image.src" class="mb-2 rounded-md drop-shadow" />
					<h1 class="text-3xl dark:text-gray-100 md:text-4xl font-semibold mb-2">{{ doc.title }}</h1>
					<p class="mb-1 dark:text-zinc-400 text-zinc-600">
						{{ doc.description }}
					</p>
					<p class="mb-2 text-zinc-500">
						{{ new Date(doc.date).toDateString().split(' ').slice(1).join(' ') }}
					</p>
					<div class="flex flex-wrap w-full gap-2 justify-start mb-3">
						<IconTag v-for="tag in doc.tags" :name="tag" :iconName='tag' isTag="true" />
					</div>
					<main id="main" class="leading-relaxed">
						<ContentRenderer class="dark:text-gray-200 text-gray-800" :value="doc" />
					</main>
				</ContentDoc>
			</div>
		</div>
		<footer class="grid grid-cols-12 gap-5 justify-center">
			<div class="py-2 mb-4 !col-start-3 md:!col-start-4 xl:!col-start-5 xl:col-span-4 md:col-span-6 col-span-8">
				<!-- <NewsletterSignup class="mb-2" /> -->
				© {{ year }} Juls07 - GPL v3.0 License
			</div>
		</footer>
	</div>
</template>

<style>
br {
	@apply my-3;
	display: block;
}

#main a {
	@apply text-fuschia hover:underline visited:bg-rose-700;
}
</style>
