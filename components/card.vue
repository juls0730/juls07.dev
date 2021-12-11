<template>
  <div class="rounded-xl shadow-xl border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800">
    <div class="p-2 h-full">
      <h2 class="text-2xl mt-2 font-semibold">
        {{ name }}
      </h2>
      <p class="mt-2 block text-gray-600 dark:text-gray-300">
        {{ description }}
      </p>
      <div v-if="link1 && link2" class="mt-2 pb-1">
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
      <div v-if="link1 && !link2" class="mt-2 float-right pb-1">
        <a :href="link1">
          <button class="button rounded">
            {{ button1 }}
          </button>
        </a>
      </div>
      <div v-if="!link1 && link2" class="mt-2 float-right pb-1">
        <a :href="link2">
          <button class="button rounded">
            {{ button2 }}
          </button>
        </a>
      </div>
      <div v-if="!link1 && !link2" class="mt-2 float-right pb-1">
        <p v-if="!link1 && !link2" class="font-semibold pr-1">
          Coming Soon!
        </p>
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
</style>
