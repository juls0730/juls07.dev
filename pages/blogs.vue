<template>
  <div>
    <Nav />
    <div class="grid-container">
      <div v-for="article in articles" v-if="!article.draft" :key="article.title" class="mb-5 px-1.5">
        <div class="text-white rounded-lg dark:bg-gray-800 grid-item">
          <img v-if="article.img" :src="article.img" class="w-full blog-post-img" />
          <div class="p-3">
            <h3>
              <nuxt-link class="article-link" :to="'/blog/' + article.slug">
                {{ article.title }}
              </nuxt-link>
            </h3>
            <p class="text-gray-600 dark:text-gray-500">
              {{ article.pubdate }} | {{ article.writer }}
            </p>
            <p class="text-gray-400 dark:text-gray-400">
              {{ article.description }}
            </p>
            <nuxt-content
              :document="article"
              class="text-gray-900 excerpt-text text-overflow dark:text-gray-200"
            />
          </div>
        </div>
        <!---
              <p class="title is-4">
                <nuxt-link class="article-link" :to="'/blog/' + article.slug">
                  {{ article.title }}
                </nuxt-link>
              </p>
              <div>
                <li class="list-inside">
                  {{ article.description }}
                </li>
              </div>
              --->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const articles = await $content("articles")
      .sortBy("createdAt", "desc")
      .fetch();
    return { articles };
  },
  head: {
    title: "Juls07",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google", content: "notranslate" },
      {
        hid: "description",
        name: "description",
        content: "Juls07 is a game developer, web developer and pixel artist.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og.png" },
      { property: "og:title", content: "Juls07" },
      { property: "og:description", content: "Juls07's website" },
      { property: "og:url", content: "https://juls07.dev" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
};
</script>

<style>
.article-link {
  @apply text-brand-secondary;
  @apply hover:underline;
}
</style>