<template>
  <div>
    <Nav />
    <div class="p-4">
      <div class="pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <Card
          name="First blog post!"
          description="My first blog post!"
          link1="/blog/my-first-blog-post"
          button1="Read Now!"
        />
        <Card
          name="Day 14 of 100 Days of Game Dev"
          description="what I did on day 14 of 100 Days of Game dev!"
          link1="/blog/day-14-100DaysOfGameDev"
          button1="Read Now!"
        />
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
  @apply dark:bg-gray-800;
  @apply dark:text-white;
}

h1 {
  @apply text-4xl;
  @apply font-semibold;
  @apply pb-3;
}
</style>
