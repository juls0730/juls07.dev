<template>
  <div v-if="!article.draft">
    <Nav />
    <div class="block md:flex md:justify-center">
      <div class="blog-content">
        <article>
          <h1>{{ article.title }}</h1>
          <p class="pb-1 text-gray-600 dark:text-gray-500">
            {{ article.description }}
          </p>
          <p class="pb-5 text-gray-600 dark:text-gray-500">
            {{ article.pubdate }} | {{ article.writer }}
          </p>
          <div v-if="article.img">
            <img :src="article.img"
              :alt="article.alt" />
          </div>
          <ul v-if="article.tags"
            class="flex pl-0 mt-2 space-x-3">
            <li v-for="tag in article.tags"
              class="font-bold text-gray-400"
              :key="tag">
              {{ tag }}
            </li>
          </ul>
          <br />
          <nuxt-content :document="article" />
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/components/prism-bash.js";
export default {
  async asyncData({ $content, params }) {
    const article = await $content("articles", params.slug).fetch();
    return { article };
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "google", content: "notranslate" },
        {
          hid: "description",
          name: "description",
          content:
            "Juls07 is a game developer, web developer and pixel artist.",
        },
        // Open Graph
        { hid: "og:title", property: "og:title", content: this.article.title },
        { hid: "og:type", property: "og:type", content: "article" },
        {
          hid: "og:image",
          property: "og:image",
          content: `https://juls07.dev${this.article.img}`,
        },
        // Twitter Card
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.article.title,
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: `https://juls07.dev${this.article.img}`,
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "stylesheet", type: "text/css", href: "/main.css" },
      ],
    };
  },
  /* eslint-disable */
  mounted() {
    Prism.highlightAll();
  },
  /* eslint-enable */
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en", options);
    },
  },
};
</script>

<style lang="scss">
li {
  list-style-type: none;
}

ul {
  padding-left: 0;
}

a {
  @apply no-underline;
  @apply hover:underline;
  @apply text-brand-secondary;
}

br.article {
  @apply my-3;
  display: block;
}

/* list style stuff */
ol,
ul {
  margin: 0 !important;
  padding: revert !important;
  list-style: revert !important;
}

h1 {
  @apply text-4xl;
  @apply font-semibold;
  @apply pb-2;
}

h2 {
  @apply pt-4;
  @apply text-2xl;
  @apply font-semibold;
  @apply pb-2;
}

h3 {
  @apply text-xl;
  @apply font-semibold;
  @apply pb-2;
}

.blog-content {
  @apply lg:w-5/12 md:w-8/12 w-full h-auto p-3;
}

.nuxt-content-highlight {
  @apply block;
  @apply rounded-xl;
}


@media (prefers-color-scheme: dark) {
  .nuxt-content-highlight {
    background-color: rgb(39 39 42 / var(--tw-bg-opacity));
  }
}

.nuxt-content-highlight .filename {
  @apply absolute right-0 text-gray-600 font-light z-10 mr-2 mt-1 text-sm;
  @apply dark:text-white;
}

pre[class*="language-"].line-numbers {
  position: relative;
  padding-left: 3.8em;
  counter-reset: linenumber;
}

pre[class*="language-"].line-numbers>code {
  position: relative;
  white-space: inherit;
}

.line-numbers .line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: 0;
  font-size: 100%;
  left: -3.8em;
  width: 3em;
  /* works for line-numbers below 1000 lines */
  letter-spacing: -1px;
  border-right: 1px solid #999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.line-numbers-rows>span {
  display: block;
  counter-increment: linenumber;
}

.line-numbers-rows>span:before {
  content: counter(linenumber);
  color: #999;
  display: block;
  padding-right: 0.8em;
  text-align: right;
}

@media (prefers-color-scheme: dark) {
  code {
    color: #f7fafc;
    background: #222;
    border-width: 0;
    padding: 0.25em;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
  }

  code[class*="language-"],
  pre[class*="language-"] {
    color: #fff;
    text-shadow: 0 1px 1px #000;
    font-family: Menlo, Monaco, "Courier New", monospace;
    direction: ltr;
    text-align: left;
    word-spacing: normal;
    white-space: pre;
    word-wrap: normal;
    line-height: 1.4;
    background: none;
    border: 0;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*="language-"] code {
    float: left;
    padding: 0 15px 0 0;
  }

  pre[class*="language-"],
  :not(pre)>code[class*="language-"] {
    background: #222;
  }

  /* Code blocks */
  pre[class*="language-"] {
    padding: 15px;
    margin: 1em 0;
    overflow: auto;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
  }

  /* Inline code */
  :not(pre)>code[class*="language-"] {
    padding: 5px 10px;
    line-height: 1;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #797979;
  }

  .token.selector,
  .token.operator,
  .token.punctuation {
    color: #fff;
  }

  .token.operator {
    background: hsla(0, 0%, 0%, 0);
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.tag,
  .token.boolean {
    color: #ffd893;
  }

  .token.atrule,
  .token.attr-value,
  .token.hex,
  .token.string {
    color: #b0c975;
  }

  .token.property,
  .token.entity,
  .token.url,
  .token.attr-name,
  .token.keyword {
    color: #c27628;
  }

  .token.regex {
    color: #9b71c6;
  }

  .token.entity {
    cursor: help;
  }

  .token.function,
  .token.constant {
    color: #e5a638;
  }

  .token.variable {
    color: #fdfba8;
  }

  .token.number {
    color: #8799b0;
  }

  .token.important,
  .token.deliminator {
    color: #e45734;
  }

  /* Line highlight plugin */
  .line-highlight.line-highlight {
    background: rgba(255, 255, 255, 0.2);
  }

  .line-highlight.line-highlight:before,
  .line-highlight.line-highlight[data-end]:after {
    top: 0.3em;
    background-color: rgba(255, 255, 255, 0.3);
    color: #fff;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
  }
}

@media (prefers-color-scheme: light) {
  code {
    color: #90a4ae;
    background: #fafafa;
    border-width: 0;
    padding: 0.25em;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
  }

  code[class*="language-"],
  pre[class*="language-"] {
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    color: #90a4ae;
    background: #fafafa;
    font-family: Roboto Mono, monospace;
    line-height: 1.4;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
  }

  code[class*="language-"]::-moz-selection,
  pre[class*="language-"]::-moz-selection,
  code[class*="language-"] ::-moz-selection,
  pre[class*="language-"] ::-moz-selection {
    background: #cceae7;
    color: #263238;
  }

  code[class*="language-"]::selection,
  pre[class*="language-"]::selection,
  code[class*="language-"] ::selection,
  pre[class*="language-"] ::selection {
    background: #cceae7;
    color: #263238;
  }

  :not(pre)>code[class*="language-"] {
    white-space: normal;
    border-radius: 0.2em;
    padding: 0.1em;
  }

  pre[class*="language-"] code {
    float: left;
    padding: 0 15px 0 0;
  }

  pre[class*="language-"] {
    padding: 15px;
    margin: 1em 0;
    overflow: auto;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
  }

  .language-css>code,
  .language-sass>code,
  .language-scss>code {
    color: #f76d47;
  }

  [class*="language-"] .namespace {
    opacity: 0.7;
  }

  .token.atrule {
    color: #7c4dff;
  }

  .token.attr-name {
    color: #39adb5;
  }

  .token.attr-value {
    color: #f6a434;
  }

  .token.attribute {
    color: #f6a434;
  }

  .token.boolean {
    color: #7c4dff;
  }

  .token.builtin {
    color: #39adb5;
  }

  .token.cdata {
    color: #39adb5;
  }

  .token.char {
    color: #39adb5;
  }

  .token.class {
    color: #39adb5;
  }

  .token.class-name {
    color: #6182b8;
  }

  .token.comment {
    color: #aabfc9;
  }

  .token.constant {
    color: #7c4dff;
  }

  .token.deleted {
    color: #e53935;
  }

  .token.doctype {
    color: #aabfc9;
  }

  .token.entity {
    color: #e53935;
  }

  .token.function {
    color: #7c4dff;
  }

  .token.hexcode {
    color: #f76d47;
  }

  .token.id {
    color: #7c4dff;
    font-weight: bold;
  }

  .token.important {
    color: #7c4dff;
    font-weight: bold;
  }

  .token.inserted {
    color: #39adb5;
  }

  .token.keyword {
    color: #7c4dff;
  }

  .token.number {
    color: #f76d47;
  }

  .token.operator {
    color: #39adb5;
  }

  .token.prolog {
    color: #aabfc9;
  }

  .token.property {
    color: #39adb5;
  }

  .token.pseudo-class {
    color: #f6a434;
  }

  .token.pseudo-element {
    color: #f6a434;
  }

  .token.punctuation {
    color: #39adb5;
  }

  .token.regex {
    color: #6182b8;
  }

  .token.selector {
    color: #e53935;
  }

  .token.string {
    color: #f6a434;
  }

  .token.symbol {
    color: #7c4dff;
  }

  .token.tag {
    color: #e53935;
  }

  .token.unit {
    color: #f76d47;
  }

  .token.url {
    color: #e53935;
  }

  .token.variable {
    color: #e53935;
  }
}
</style>
