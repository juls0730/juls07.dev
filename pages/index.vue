<template>
  <div>
    <Nav />
    <div class="flex items-center justify-center">
      <h1 class="header">Juls07</h1>
    </div>
    <div>
      <h2 class="subheader">About Me</h2>
      <p class="pt-1 pb-3 pl-4 pr-1 md:pl-8">
        Hello, I'm juls07, I am 14 years old and I love web
        development. I have been programming since I was 10 years
        old, my main web technologies are Vuejs, Svelte, Ruby on Rails, and ReactJs. It's so amazing to me that you can
        write code to tell a computer to do anything! I also have a
        <a class="socials-link"
          href="github.com/juls0730">Github</a> and a
        <a class="socials-link"
          href="twitter.com/julie4055_">Twitter</a> so
        feel free to follow me if you want, and if you want to get in touch contact me at <a class="socials-link"
          href='mailto:juls07@juls07.dev'>juls07@juls07.dev</a>
      </p>
    </div>
    <div>
      <h2 class="pt-5 subheader">Projects</h2>
      <div class="pl-3 pr-1 md:pl-8">
        <div class="grid grid-cols-1 gap-2 pb-3 md:gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          <Card name="PHP Forum"
            description="This is my attempt at a forum written in php, its not great but it works."
            link1="https://github.com/juls0730/php-forum"
            button1="Github" />
          <Card name="Old Cyansplash.net site"
            description="This is the old cyansplash.net site, not amazing but taught me a lot about web development."
            link1="https://github.com/juls0730/cyansplash.net"
            button1="Github" />
          <Card name="Discord bot 'Echo'"
            description="This is an old discord bot that taught me about the discord API how to make a bot and led me to learning alot about JavaScript, without Echo I most likely would not be a web developer."
            link1="https://github.com/juls0730/Echo"
            button1="Github" />
          <Card name="juls07.dev"
            description="This stie is the site you are currently on, this site is just a place to show off my projects and my skills."
            link1="https://github.com/juls0730/juls07.dev"
            button1="Github" />
          <Card name="vuefullstack"
            description="this is a small forum project I made to mock my ruby on rails forum I am working on but in vuejs."
            link1="https://github.com/juls0730/vuefullstack"
            button1="Github" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
        content: "Juls07 fullstack developer.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og.png" },
      { property: "og:title", content: "Juls07" },
      { property: "og:description", content: "Juls07's website" },
      { property: "og:url", content: "https://juls07.dev" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },
};
</script>

<style lang="scss">
.header {
  @apply text-5xl;
  @apply md:text-7xl;
  @apply from-brand-main;
  @apply to-brand-secondary;
  @apply bg-gradient-to-r;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  @apply h-screen;
  @apply text-center;
  @apply font-semibold;
  vertical-align: middle;
  line-height: 100vh;
}

.subheader {
  @apply text-3xl;
  @apply md:text-5xl;
  @apply pt-2;
  @apply pl-3;
  @apply md:pl-6;
  @apply md:pt-3;
  @apply md:pb-3;
  @apply pb-2;
  @apply text-brand-secondary;
  @apply font-semibold;
}

.socials-link {
  @apply text-brand-secondary;
  @apply hover:underline;
}
</style>

