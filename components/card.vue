<template>
  <div class="bg-white border-2 border-white shadow-xl rounded-xl dark:border-gray-800 dark:bg-gray-800">
      <div class="flex flex-col h-full p-2">
          <h2 class="mt-2 text-2xl font-semibold">
              {{ name }}
          </h2>
          <p class="block mt-2 text-gray-600 dark:text-gray-300">
              {{ description }}
          </p>
          <div class="flex items-end justify-end w-full pl-2 mt-auto h-fit">
              <div v-if="link1 && link2"
                  class="pb-1 mt-2">
                  <a :href="link1">
                      <button class="rounded-l button">
                          {{ button1 }}
                      </button>
                  </a>
                  <a :href="link2">
                      <button class="rounded-r button">
                          {{ button2 }}
                      </button>
                  </a>
              </div>
              <div v-if="link1 && !link2"
                  class="pb-1 mt-2">
                  <a :href="link1">
                      <button class="rounded button">
                          {{ button1 }}
                      </button>
                  </a>
              </div>
              <div v-if="!link1 && link2"
                  class="pb-1 mt-2">
                  <a :href="link2">
                      <button class="rounded button">
                          {{ button2 }}
                      </button>
                  </a>
              </div>
              <div v-if="!link1 && !link2"
                  class="pb-1 mt-2">
                  <p v-if="!link1 && !link2"
                      class="pr-1 font-semibold">
                      Coming Soon!
                  </p>
              </div>
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
  @apply transition-all;
  @apply duration-300;
  @apply py-2;
  @apply px-4;
  @apply border;
  @apply border-brand-main;
}
</style>
