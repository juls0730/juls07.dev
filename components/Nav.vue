<script setup lang="ts">
let colorMode = useColorMode();

const changeTheme = () => {
	if (colorMode.preference === "dark") {
		// from dark => light
		colorMode.preference = "light"
		document.documentElement.classList.remove("dark");
	} else if (colorMode.preference === "light") {
		// from light => system
		colorMode.preference = "system";
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	} else {
		// from system => dark
		colorMode.preference = "dark";
		document.documentElement.classList.add("dark");
	}

	return;
}

</script>

<template>
	<nav class="h-16 z-10 w-full">
		<div class="px-6 max-w-7xl grid gap-2 grid-cols-12 ms-auto me-auto h-full justify-evenly">
			<div class="ml-0 col-span-6 sm:col-span-4 flex items-center">
				<ul class="flex gap-x-8">
					<li
						class="absolute w-fit -translate-x-full top-0 px-2 py-4 bg-soft-lavender dark:bg-midnight text-deep-indigo dark:text-white opacity-0 focus-within:translate-x-0 focus-within:opacity-100">
						<a href="#main">Skip to content</a>
					</li>
					<li>
						<NuxtLink to="/">
							Home
						</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/blog">
							Blog
						</NuxtLink>
					</li>
				</ul>
			</div>
			<div class="mr-0 col-span-4 items-center hidden sm:flex"> </div>
			<div class="mr-0 col-span-6 sm:col-span-4 flex items-center justify-end">
				<ul class="flex gap-x-4">
					<li>
						<a href="https://www.github.com/juls0730">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
									stroke-width="2"
									d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21" />
							</svg>
						</a>
					</li>
					<li>
						<a href="https://x.com/julie4055_">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
									stroke-width="2" d="m4 4l11.733 16H20L8.267 4zm0 16l6.768-6.768m2.46-2.46L20 4" />
							</svg>
						</a>
					</li>
					<li>
						<button @click="changeTheme">
							<div v-if="$colorMode.preference === 'dark'">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path fill="none" stroke="currentColor" stroke-linecap="round"
										stroke-linejoin="round" stroke-width="2"
										d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z" />
								</svg>
							</div>
							<div v-else-if="$colorMode.preference === 'light'">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path fill="none" stroke="currentColor" stroke-linecap="round"
										stroke-linejoin="round" stroke-width="2"
										d="M14.828 14.828a4 4 0 1 0-5.656-5.656a4 4 0 0 0 5.656 5.656m-8.485 2.829l-1.414 1.414M6.343 6.343L4.929 4.929m12.728 1.414l1.414-1.414m-1.414 12.728l1.414 1.414M4 12H2m10-8V2m8 10h2m-10 8v2" />
								</svg>
							</div>
							<div v-else>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
									<path fill="currentColor"
										d="M208 36H48a28 28 0 0 0-28 28v112a28 28 0 0 0 28 28h160a28 28 0 0 0 28-28V64a28 28 0 0 0-28-28Zm4 140a4 4 0 0 1-4 4H48a4 4 0 0 1-4-4V64a4 4 0 0 1 4-4h160a4 4 0 0 1 4 4Zm-40 52a12 12 0 0 1-12 12H96a12 12 0 0 1 0-24h64a12 12 0 0 1 12 12Z" />
								</svg>
							</div>
						</button>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
