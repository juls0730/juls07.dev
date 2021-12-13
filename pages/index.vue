<template>
  <div>
    <Nav />
    <div class="flex items-center justify-center">
      <h1 class="header">
        Juls07
      </h1>
    </div>
    <div>
      <h2 class="subheader">
        About Me
      </h2>
      <p class="pt-1 pl-4 pb-3 md:pl-8 pr-1">
        Hello, I'm juls07, I am 13 years old and I love web development.
        I have been programming since I was 10 years old, I am a skilled developer in html, vue, Java, JavaScript, ruby, and C#.
        It's so amazing to me that you can write code to tell a computer to do anything! I also have a
        <a class="socails-link" href="github.com/juls0730">Github</a> and a
        <a class="socials-link" href="twitter.com/julie4055_">Twitter</a> so feel free to follow me if you want!
      </p>
    </div>
    <div>
      <h2 class="pt-5 subheader">
        Projects
      </h2>
      <div class="pl-3 md:pl-8 pr-1">
        <div class="pb-3 grid grid-cols-1 gap-2 md:gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            name="PHP Forum"
            description="This is my attempt at a forum written in php, its not great but it works."
            link1="https://github.com/juls0730/php-forum"
            button1="Github"
          />
          <Card
            name="Old Cyansplash.net site"
            description="This is the old cyansplash.net site, not amazing but taught me a lot about web development."
            link1="https://github.com/juls0730/cyansplash.net"
            button1="Github"
          />
          <Card
            name="Discord bot 'Echo'"
            description="This is an old discord bot that taught me about the discord API how to make a bot and led me to learning alot about JavaScript, without Echo I most likely would not be a web developer."
            link1="https://github.com/juls0730/Echo"
            button1="Github"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
body {
    font-family: "Roboto", sans-serif;
    @apply dark:bg-gray-800;
    @apply dark:text-white;
}
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
