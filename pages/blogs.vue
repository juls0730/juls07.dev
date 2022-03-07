<template>
  <div>
    <Nav />
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth">
            <div
              v-for="article in articles"
              :key="article.title"
              class="mb-5 p-3"
            >
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
            </div>
          </div>
        </div>
      </div>
    </section>
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
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", type: "text/css", href: "/main.css" },
    ],
  },
};
</script>

<style>
.article-link {
  @apply text-brand-secondary;
  @apply hover:underline;
}
