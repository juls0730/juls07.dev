<script setup lang="ts">
let colorMode = useColorMode();
let today = new Date();
let age = today.getFullYear() - 2008;

if (new Date(today.getFullYear() + "-07-30") > today) {
    age--;
}

let tagLine = ref("");
let typeStatus = ref(false);
let displayTextArray = ["Fullstack dev", "Designer", "Blogger", "Freelancer"];
let displayTextArrayIndex = ref(0);
let charIndex = ref(0);

const typeText = () => {
    if (charIndex.value < displayTextArray[displayTextArrayIndex.value].length) {
        if (!typeStatus.value) typeStatus.value = true;
        tagLine.value += displayTextArray[displayTextArrayIndex.value].charAt(
            charIndex.value
        );
        charIndex.value += 1;
        setTimeout(typeText, 100);
    } else {
        typeStatus.value = false;
        setTimeout(eraseText, Math.min(Math.floor(Math.random() * 2001), 1750));
    }
}

const eraseText = () => {
    if (charIndex.value > 0) {
        if (!typeStatus.value) typeStatus.value = true;
        tagLine.value = displayTextArray[displayTextArrayIndex.value].substring(
            0,
            charIndex.value - 1
        );
        charIndex.value -= 1;
        setTimeout(eraseText, 50);
    } else {
        typeStatus.value = false;
        displayTextArrayIndex.value += 1;
        if (displayTextArrayIndex.value >= displayTextArray.length)
            displayTextArrayIndex.value = 0;
        setTimeout(typeText, 1100);
    }
}

onMounted(() => {
    setTimeout(typeText, 2200);
})

useHead({
    title: 'Juls07',
})

type ProjectIcon = {
    icon: string,
    name: string,
}

type Project = {
    headerIcon: string | string[],
    name: string,
    githubLink?: string,
    externalLink?: string,
    body: string,
    icons: ProjectIcon[],
}

let projects: Project[] = [
    {
        headerIcon: "mdi:language-rust",
        name: "CappuccinOS",
        githubLink: "https://github.com/juls0730/CappuccinOS",
        body: "CappuccinOS is a Rust operating system built from scratch targeting x86_64. This project has oppened my eyes to low level development and let me learn a lot about Rust.",
        icons: [{ icon: 'skill-icons:rust', name: 'Rust' }]
    },
    {
        headerIcon: "tabler:brand-nuxt",
        name: "Juls07.dev",
        githubLink: "https://github.com/juls0730/juls07.dev",
        body: "This is the site you're currently on, a simple but decent enough portfolio and blog site.",
        icons: [{ icon: 'logos:nuxt-icon', name: 'nuxtjs v3' }]
    },
    {
        headerIcon: "mdi:language-php",
        name: "PHP Forum",
        githubLink: "https://github.com/juls0730/php-forum",
        body: "This was my first fullstack project and one of my first projects I ever released the source code of.",
        icons: [{ icon: 'logos:laravel', name: 'php' }, { icon: 'logos:mysql-icon', name: 'MySQL' }]
    },
    {
        headerIcon: "tabler:brand-vue",
        name: "vuefullstack",
        githubLink: "https://github.com/juls0730/vuefullstack",
        body: "I used this project to learn more about fullstack web development using vue.js. It's just a simple forum, similar to reddit, but much simpler.",
        icons: [{ icon: 'logos:vue', name: 'vue v3' }, { icon: 'logos:nodejs-icon-alt', name: 'node.js' }, { icon: 'logos:mongodb-icon', name: 'Mongodb' }]
    },
    {
        headerIcon: "tabler:brand-nuxt",
        name: "Discord Clone",
        githubLink: "https://github.com/juls0730/discord-clone",
        body: "Excited by Nuxt 3's recent stable release at the time, I jumped on the opportunity to build a fullstack application with it. This project was an amazing learning experience and I had a blast making it!",
        icons: [{ icon: 'logos:nuxt-icon', name: 'nuxtjs v3' }, { icon: 'logos:docker-icon', name: 'Docker' }, { icon: 'logos:postgresql', name: 'Postgres' }]
    },
    {
        headerIcon: "tabler:code-dots",
        name: "100DaysOfCode",
        githubLink: "https://github.com/juls0730/100DaysOfCode",
        body: "In the middle of september 2022, I started a 100 days of code challenge, and I wanted to make a UI framework similar to Vue or Svelte. I learned a ton and had a bunch of fun!",
        icons: [{ icon: 'logos:nodejs-icon-alt', name: 'node.js' }, { icon: 'logos:typescript-icon', name: 'Typescript' }]
    }
];
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
                    development. I first dabbled in web development when I was ten, and here we are today! I mainly use
                    <a href="https://nuxt.com">NuxtJs</a> to build my websites since I absolutely adore Vuejs. For me, I
                    love being able to imagine anything and it to come to life. Finally, go checkout my <a
                        href="https://github.com/juls0730">Github</a> and also my <a
                        href="https://twitter.com/julie4055_">Twitter</a>.
                </p>
                <h3 class="text-2xl md:text-3xl mb-1.5 ml-0.5">Skills</h3>
                <section class="flex flex-wrap w-full gap-2 justify-start ml-1">
                    <IconTag name="TypeScript" iconName="skill-icons:typescript" />
                    <IconTag name="Nuxt.js" :iconName="'skill-icons:nuxtjs-' + $colorMode.value" />
                    <IconTag name="Vue.js" :iconName="'skill-icons:vuejs-' + $colorMode.value" />
                    <IconTag name="Ruby on rails" iconName="skill-icons:rails" />
                    <IconTag name="php" :iconName="'skill-icons:php-' + $colorMode.value" />
                    <IconTag name="React" :iconName="'skill-icons:react-' + $colorMode.value" />
                    <IconTag name="Bash" :iconName="'skill-icons:bash-' + $colorMode.value" />
                    <IconTag name="Tailwindcss" :iconName="'skill-icons:tailwindcss-' + $colorMode.value" />
                    <IconTag name="Rust" iconName="skill-icons:rust" />
                    <IconTag name="Node.js" :iconName="'skill-icons:nodejs-' + $colorMode.value" />
                    <IconTag name="Svelte" iconName="skill-icons:svelte" />
                    <IconTag name="Figma" :iconName="'skill-icons:figma-' + $colorMode.value" />
                    <IconTag name="Electron" iconName="skill-icons:electron" />
                    <IconTag name="Cypress" :iconName="'skill-icons:cypress-' + $colorMode.value" />
                    <IconTag name="Prisma" iconName="skill-icons:prisma" />
                    <IconTag name="Docker" icon-name="skill-icons:docker" />
                </section>
            </section>
            <div class="!col-start-2 md:!col-start-3 lg:!col-start-4 lg:col-span-6 md:col-span-8 col-span-10">
                <h2 class="md:text-4xl text-3xl mb-1">Projects</h2>
            </div>
            <!-- <section
				class="pb-6 grid mb-4 col-start-2 xs:!col-start-3 col-span-10 xs:col-span-8 grid-cols-12 gap-y-6 sm:gap-x-6 max-w-full"> -->
            <section
                class="max-w-full col-start-2 xs:!col-start-3 col-span-10 xs:col-span-8 pb-6 mb-4 gap-4 justify-evenly grid grid-cols-1 smyes :grid-cols-[repeat(auto-fit,_minmax(50px,_340px))] lg:grid-cols-[repeat(auto-fit,_minmax(50px,_300px))]">
                <ProjectCard v-for="project in projects" :name="project.name" :headerIcon="project.headerIcon"
                    :icons="project.icons" :githubLink="project.githubLink" :externalLink="project.externalLink">
                    <slot>
                        <p v-html="project.body" />
                    </slot>
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
