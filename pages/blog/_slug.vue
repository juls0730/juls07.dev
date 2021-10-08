<template>
  <div>
    <Nav />
    <div class="flex justify-center">
      <div class="w-5/12 h-auto p-3">
        <article>
          <h1>{{ article.title }}</h1>
          <p class="text-gray-400 pb-1">{{ article.description }}</p>
          <div v-if="article.img == !null">
            <img :src="article.img" :alt="article.alt" />
          </div>
          <p class="pb-5">{{ formatDate(article.createdAt) }} | {{ article.writer }}</p>
          <nuxt-content :document="article" />
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  @apply dark:bg-gray-800;
  @apply dark:text-white;
}

h1 {
  @apply text-4xl;
  @apply font-semibold;
  @apply pb-3;
}

h2 {
  @apply text-2xl;
  @apply font-semibold;
  @apply pb-3;
}

h3 {
  @apply text-xl;
  @apply font-semibold;
  @apply pb-3;
}
</style>
