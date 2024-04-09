<template>
	<div class="min-h-screen">
		<Nav />
		<main>
			<div id="main" class="gap-4 justify-evenly py-2 grid grid-cols-[repeat(auto-fit,_minmax(50px,_450px))]">
				<ContentQuery path="blog" :only="['image', '_path', 'title', 'description', 'date', 'tags', 'excerpt']"
					:sort="{
					date: -1
				}" :where="{
					_draft: false
				}" v-slot="{ data }">
					<div v-for="article in data" :key="article._path" class="mb-5 px-1.5">
						<div
							class="dark:bg-dark-slate bg-touched-lavender max-h-[563.25px] h-[563.25px] overflow-hidden rounded-lg border border-soft-lilac dark:border-midnight-slate/30 shadow-md">
							<NuxtImg v-if="article.image.src" :src="article.image.src"
								class="w-full rounded-tl-lg rounded-tr-lg aspect-video" loading="lazy" />
							<div
								class="p-3 overflow-hidden pt-2 text-fade dark:before:bg-[linear-gradient(180deg,transparent_0,hsla(0,0%,5%,0)_36%,#0C0B0C_95%,#0C0B0C)] before:bg-[linear-gradient(180deg,transparent_0,hsla(0,0%,5%,0)_36%,#F5EDFE_95%,#F5EDFE)] mb-1 pb-1 relative">
								<h3>
									<nuxt-link tabindex="0" class="text-lg" :to="article._path">
										{{ article.title }}
									</nuxt-link>
								</h3>
								<p class="dark:text-zinc-400 text-zinc-600">
									{{ article.description }}
								</p>
								<p class="text-zinc-500">
									{{ new Date(article.date).toDateString().split(' ').slice(1).join(' ') }}
								</p>
								<p class="dark:text-zinc-200 text-zinc-800 max-h-[13.75rem]">
									<ContentDoc :head="false" :value="article" :path="article._path" v-slot="{ doc }">
										<div class="flex flex-wrap w-full gap-2 justify-start my-1">
											<IconTag v-for="tag in doc.tags" :name="tag" :iconName='tag' isTag="true" />
										</div>
										<div class="max-h-full leading-relaxed">
											<ContentRenderer :value="doc">
												<ContentRendererMarkdown :value="doc" :excerpt="true" />
											</ContentRenderer>
										</div>
									</ContentDoc>
								</p>
							</div>
						</div>
					</div>
				</ContentQuery>
			</div>
		</main>
	</div>
</template>

<style>
.text-fade::before {
	content: '';
	position: absolute;
	width: 100%;
	height: 33.333333%;
	left: 0px;
	bottom: 0px;
}

#main a {
	@apply text-fuschia hover:underline visited:bg-rose-700;
}
</style>

<script setup lang="ts">
useHead({
	title: 'Juls07',
})
</script>
