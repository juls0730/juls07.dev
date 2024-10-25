<script setup lang="ts">
import BlogSkeletonCard from '~/components/blog/BlogSkeletonCard.vue';

useHead({
    title: 'Juls07',
})
</script>

<template>
    <div class="min-h-screen">
        <Nav />
        <main>
            <div id="main" class="gap-4 justify-evenly py-2 grid grid-cols-[repeat(auto-fit,_minmax(50px,_450px))]">
                <ContentQuery path="blog"
                    :only="['image', '_path', 'title', 'description', 'date', 'tags', 'excerpt', 'readTime']" :sort="{
                        date: 1
                    }" :where="{
                            _draft: false
                        }" v-slot="{ data }">
                    <div v-for="article in data" :key="article._path" class="mb-5 px-1.5">
                        <BlogCard :article="article" />
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
