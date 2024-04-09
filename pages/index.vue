<script setup lang="ts">
let today = new Date();
let age = today.getFullYear() - 2008;

if (new Date(today.getFullYear() + "-07-30") > today) {
	age--;
}

useHead({
	title: 'Juls07',
})
</script>

<script lang="ts">
export default {
	data: () => {
		return {
			tagLine: "",
			typeStatus: false,
			displayTextArray: ["Fullstack dev", "Designer", "Blogger", "Freelancer"],
			displayTextArrayIndex: 0,
			charIndex: 0,
		};
	},
	methods: {
		typeText() {
			if (this.charIndex < this.displayTextArray[this.displayTextArrayIndex].length) {
				if (!this.typeStatus) this.typeStatus = true;
				this.tagLine += this.displayTextArray[this.displayTextArrayIndex].charAt(
					this.charIndex
				);
				this.charIndex += 1;
				setTimeout(this.typeText, 100);
			} else {
				this.typeStatus = false;
				setTimeout(this.eraseText, Math.min(Math.floor(Math.random() * 2001), 1750));
			}
		},
		eraseText() {
			if (this.charIndex > 0) {
				if (!this.typeStatus) this.typeStatus = true;
				this.tagLine = this.displayTextArray[this.displayTextArrayIndex].substring(
					0,
					this.charIndex - 1
				);
				this.charIndex -= 1;
				setTimeout(this.eraseText, 50);
			} else {
				this.typeStatus = false;
				this.displayTextArrayIndex += 1;
				if (this.displayTextArrayIndex >= this.displayTextArray.length)
					this.displayTextArrayIndex = 0;
				setTimeout(this.typeText, 1100);
			}
		},
	},
	created() {
		setTimeout(this.typeText, 2200);
	},
}
</script>

<template>
	<div class="min-h-screen">
		<Nav class="absolute z-10 text-white" />
		<header class="w-full h-[50vh] sm:h-[40vh] md:h-[60vh]">
			<div
				class="p-6 bg-[#1212121A] justify-center grid sm:grid-cols-12 gap-5 items-center sm:justify-start w-full h-full blur-background">
				<div
					class="sm:h-32 sm:!col-start-2 sm:col-span-8 md:col-span-6 lg:col-span-5 w-32 sm:w-fit max-h-full md:h-40 items-center grid grid-rows-1 grid-cols-1 sm:grid-cols-2 drop-shadow-md">
					<img alt="juls07 profile picture" src="~/assets/images/juls07.png"
						class="h-32 md:h-40 max-h-full rounded-full mb-3 sm:mb-0 sm:mr-2" />
					<div class="grid grid-rows-5 grid-cols-1 h-fit">
						<h1 class="text-4xl md:text-5xl row-span-3 font-jetbrains text-white">Juls07</h1>
						<p class="text-sea-green row-span-2 md:text-lg h-fit">
							<span
								class="after:border after:h-[1.0em] after:border-current after:inline-block after:ml-0.5 after:animate-blink">
								{{ tagLine }}
							</span>
						</p>
					</div>
				</div>
			</div>
		</header>
		<main id="main" class="grid grid-cols-12 gap-5 justify-center">
			<section
				class="py-6 mb-4 !col-start-2 md:!col-start-3 lg:!col-start-4 lg:col-span-6 md:col-span-8 col-span-10">
				<h2 class="md:text-4xl text-3xl mb-1">About me</h2>
				<hr class="border-2 my-1.5 border-fuschia rounded-md w-7/12 min-w-[200px] max-w-xs lg:max-w-sm mb-1" />
				<p class="max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mb-4">
					Hi there, I'm juls07, I am {{ age }} years old and I <span tabindex="0" class="love">love</span> web
					development. I first dabbled in web development
					when I was ten, and here we are today! I mainly use
					<a href="https://nuxt.com">NuxtJs</a> to
					build my websites since I absolutely
					adore Vuejs. For me, I love being able to imagine anything and it to come to life. Finally, go
					checkout my <a href="https://github.com/juls0730">Github</a> and also my <a
						href="https://twitter.com/julie4055_">Twitter</a>.
				</p>
				<h3 class="text-2xl md:text-3xl mb-1.5 ml-0.5">Skills</h3>
				<section class="flex flex-wrap w-full gap-2 justify-start ml-1">
					<IconTag name="TypeScript" iconName="skill-icons:typescript" />
					<IconTag name="Nuxt.js" iconName="skill-icons:nuxtjs-dark" />
					<IconTag name="Vue.js" iconName="skill-icons:vuejs-dark" />
					<IconTag name="Ruby on rails" iconName="skill-icons:rails" />
					<IconTag name="php" iconName="skill-icons:php-dark" />
					<IconTag name="React" iconName="skill-icons:react-dark" />
					<IconTag name="Bash" iconName="skill-icons:bash-dark" />
					<IconTag name="Tailwindcss" iconName="skill-icons:tailwindcss-dark" />
					<IconTag name="Rust" iconName="skill-icons:rust" />
					<IconTag name="Node.js" iconName="skill-icons:nodejs-dark" />
					<IconTag name="Svelte" iconName="skill-icons:svelte" />
					<IconTag name="Figma" iconName="skill-icons:figma-dark" />
					<IconTag name="Electron" iconName="skill-icons:electron" />
					<IconTag name="Cypress" iconName="skill-icons:cypress-dark" />
					<IconTag name="Prisma" iconName="skill-icons:prisma" />
					<IconTag name="Docker" icon-name="skill-icons:docker" />
				</section>
			</section>
			<div class="!col-start-2 md:!col-start-3 lg:!col-start-4 lg:col-span-6 md:col-span-8 col-span-10">
				<h2 class="md:text-4xl text-3xl mb-1">Projects</h2>
			</div>
			<section
				class="pb-6 grid mb-4 col-start-2 xs:!col-start-3 col-span-10 xs:col-span-8 grid-cols-12 gap-y-6 sm:gap-x-6 max-w-full">
				<ProjectCard name="Juls07.dev V2" headerIcon="tabler:brand-nuxt"
					githubLink="https://github.com/juls0730/juls07.dev-v2"
					:icons="[{ 'icon': 'logos:nuxt-icon', 'name': 'nuxtjs v3' }]">
					This is the site you're currently on, a simple but decent looking portfolio and blog site.
				</ProjectCard>
				<ProjectCard name="PHP Forum" headerIcon="mdi:language-php"
					githubLink="https://github.com/juls0730/php-forum"
					:icons="[{ 'icon': 'logos:laravel', 'name': 'php' }]">
					This is my attempt at a forum written in php, its not great but it works.
				</ProjectCard>
				<ProjectCard name="Cyansplash.net" headerIcon="tabler:brand-nuxt"
					githubLink="https://github.com/juls0730/cyansplash.net"
					:icons="[{ 'icon': 'logos:nuxt-icon', 'name': 'nuxtjs v2' }]">
					This is the old cyansplash.net site, not amazing but taught me a lot about web
					development.
				</ProjectCard>
				<ProjectCard name="Discord.js bot" headerIcon="mdi:robot-excited-outline"
					githubLink="https://github.com/juls0730/Echo"
					:icons="[{ 'icon': 'logos:javascript', 'name': 'Javascript' }]">
					This is one of the first projects that wasn't just a dinky website, this project brought me to where
					I am today.
				</ProjectCard>
				<ProjectCard name="juls07.dev V1" headerIcon="tabler:brand-nuxt"
					githubLink="https://github.com/juls0730/juls07.dev"
					:icons="[{ 'icon': 'logos:nuxt-icon', 'name': 'nuxtjs v2' }, { 'icon': 'logos:tailwindcss-icon', 'name': 'tailwindcss' }]">
					This is my original portfolio website, it isn't much and it definitely isn't the best thing I've
					ever written, but it's something.
				</ProjectCard>
				<ProjectCard name="vuefullstack" headerIcon="tabler:brand-vue"
					githubLink="https://github.com/juls0730/vuefullstack"
					:icons="[{ 'icon': 'logos:vue', 'name': 'vue v3' }, { 'icon': 'logos:nodejs-icon', 'name': 'nodejs' }]">
					This is a small forum project I made to mock my ruby on rails forum I am
					working on but in vuejs.
				</ProjectCard>
				<ProjectCard name="100DaysOfCode" headerIcon="mdi:nodejs"
					githubLink="https://github.com/juls0730/vuefullstack"
					:icons="[{ 'icon': 'logos:nodejs-icon', 'name': 'nodejs' }]">
					This is my #100DaysOfCode challenge, my challenge was to create my own UI framework thing, check out
					a
					<nuxt-link to="/blog/100daysofcode-challenge">large overview of my 100DaysOfCode
						challenge</nuxt-link> on my
					blog.
				</ProjectCard>
			</section>
		</main>
	</div>
</template>

<style>
.blur-background {
	position: relative;
	overflow: hidden;
}

#main a {
	@apply text-fuschia hover:underline visited:bg-rose-700;
}

.blur-background::before {
	content: '';
	margin: -35px;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	filter: blur(16px) saturate(125%);
}

header,
.blur-background::before {
	background-image: url(~/assets/images/header.jpg);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
