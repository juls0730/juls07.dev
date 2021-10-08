<template>
  <nav>
    <div class="p-7">
      <div class="hidden md:block md:ml-1 md:pr-4 md:space-x-5">
        <router-link
          class="font-semibold text-gray-900 dark:text-gray-50 hover:underline"
          to="/"
        >
          Home
        </router-link>

        <router-link
          class="font-semibold text-gray-900 dark:text-gray-50 hover:underline"
          to="/blogs"
        >
          My Blog
        </router-link>
      </div>
      <header
        class="md:hidden px-2 bg-blue-gray-600 flex flex-wrap items-center"
      >
        <label
        for="menu-toggle"
        class="cursor-pointer py-0.5 lg:hidden block"
          ><svg
            class="fill-current cursor-pointer dark:text-white text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg
        ></label>
        <input id="menu-toggle" class="hidden cursor-pointer" type="checkbox" />

        <div id="menu" class="hidden">
          <ul class="text-base text-gray-900 dark:text-gray-50">
            <li class="inline-list">
              <router-link
                class="px-0 pl-4 block font-semibold hover:underline"
                to="/"
              >
                Home
              </router-link>
            </li>
            <li class="inline-list">
              <router-link
                class="px-0 block font-semibold hover:underline"
                to="/blogs"
              >
                My Blog
              </router-link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style>
#menu-toggle:checked + #menu {
  @apply block;
}

.inline-list {
  display: block;
  text-align: center;
  text-decoration: none;
  float: left;
  padding-right: 1rem;
}

</style>
