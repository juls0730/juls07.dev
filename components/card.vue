<template>
  <div class="rounded-xl shadow-xl">
    <!----<img class="w-full rounded-xl h-auto object-cover" src="https://source.unsplash.com/odxB5oIG_iA/400x250">--->
    <div class="p-6">
      <h2 class="text-2xl mt-2 font-semibold">{{ name }}</h2>
      <p class="mt-2 text-gray-600">{{ description }}</p>
      <div v-if="link1 && link2" class="mt-2 float-right pb-3">
          <a :href="link1">
            <button class="button rounded-l">
              {{ button1 }}
            </button>
          </a>
          <a :href="link2">
            <button class="button rounded-r">
              {{ button2 }}
            </button>
          </a>
        </div>
        <div v-if="link1 && !link2" class="mt-2 float-right pb-3">
          <a :href="link1">
            <button class="button rounded">
              {{ button1 }}
            </button>
          </a>
        </div>
        <div v-if="!link1 && link2" class="mt-2 float-right pb-3">
          <a :href="link2">
            <button class="button rounded">
              {{ button2 }}
            </button>
          </a>
        </div>
        <div v-if="!link1 && !link2" class="mt-2 float-right pb-3">
          <p v-if="!link1 && !link2" class="font-semibold pr-1">Coming Soon!</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  props: ['name', 'description', 'button1', 'button2', 'link1', 'link2'],
  /* eslint-enable */
}
</script>

<style>
.button {
  @apply bg-brand-main;
  @apply text-white;
  @apply font-semibold;
  @apply hover:text-white;
  @apply py-2;
  @apply px-4;
  @apply border;
  @apply border-brand-main;
}
h1 {
  color: rgba(0, 0, 0, var(--tw-text-opacity));
}
</style>
