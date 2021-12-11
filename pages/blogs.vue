<template>
  <div>
    <Nav />
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth">
            <div v-for="article in articles" :key="article.title" class="mb-5 p-3">
              <p class="title is-4">
                <nuxt-link class="article-link" :to="'/blog/'+article.slug">
                  {{ article.title }}
                </nuxt-link>
              </p>
              <div>
                <li class="list-inside">
                  {{ article.description }}
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const articles = await $content('articles').sortBy('createdAt', 'desc').fetch()
    return { articles }
  }
}
</script>

<style>
.article-link {
  @apply text-brand-secondary;
  @apply hover:underline;
}
