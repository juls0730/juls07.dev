<script>
export default {
    props: ["name", "icons", "headerIcon", "repo", "externalLink"],
}
</script>

<template>
    <div
        class="dark:bg-dark-slate bg-touched-lavender relative border p-6 h-[60vw] max-h-[425px] min-h-[375px] border-soft-lilac dark:border-midnight-slate/30 shadow-md rounded-lg">
        <div class="flex mb-4 items-center" v-if="headerIcon">
            <Icon size="64" class="text-sea-green" :name="headerIcon" />
            <div class="ml-auto flex">
                <a v-if="repo" :href="`/github/${repo}`" :aria-label="`${name}'s Gtihub`"
                    class="dark:!text-zinc-300/80 !text-deep-indigo/75 dark:hover:!text-zinc-200 hover:!text-deep-indigo/95 dark:focus:!text-zinc-200 focus:!text-deep-indigo/95 rounded transition-colors duration-300 focus:outline-3 focus:outline focus:outline-fuschia">
                    <Icon size="38" name="tabler:brand-github" />
                </a>
                <a v-if="externalLink" :href="externalLink"
                    class="dark:!text-zinc-300/80 !text-deep-indigo/75 dark:hover:!text-zinc-200 hover:!text-deep-indigo/95 dark:focus:!text-zinc-200 focus:!text-deep-indigo/95 rounded transition-colors duration-300 focus:outline-3 focus:outline focus:outline-fuschia">
                    <Icon size="38" name="tabler:external-link" />
                </a>
            </div>
        </div>
        <h3 class="text-xl mb-1 capitalize font-jetbrains">{{ name }}</h3>
        <div id="body" class="mb-4">
            <slot />
        </div>
        <div class="flex flex-wrap gap-2 absolute bottom-6" v-if="icons">
            <IconTag v-for="icon in icons" size="16" :name="icon.name" :iconName="icon.icon"></IconTag>
        </div>
    </div>
</template>