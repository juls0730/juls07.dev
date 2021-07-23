<template>
  <div>
    <div class="flex items-center justify-center">
      <h1>Juls07</h1>
    </div>
    <div>
      <h2 class="subheader">About Me</h2>
      <p class="pt-1 pl-4 pb-3 md:pl-8 pr-1" >Hello, I'm juls07, I am 13 years old and I love game development. I have been programming since I was 10 years old, I am a skilled developer in html, vue, Java, JavaScript, ruby, and lua. It's so amazing to me that you can write code to tell a computer to do anything!</p>
    </div>
    <div>
      <h2 class="pt-5 subheader">Projects</h2>
      <div class="pl-3 md:pl-8 pr-1">
        <div class="pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            name="Sundae Escape"
            description="Sundae escape is a bullet hell platformer. You are trying to go back to work but when you awake you find your self in an icecream apocolypse. You must save the world."
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
  font-family: 'Roboto', sans-serif;
}

h1 {
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
  @apply text-brand-secondary;
  @apply font-semibold;
}
</style>
