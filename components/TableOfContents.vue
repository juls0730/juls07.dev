<script setup lang="ts">
import type { Ref } from 'vue';

const props = withDefaults(defineProps<{ doc: any, activeTocId: string | null }>(), {})
const router = useRouter()

const sliderHeight = useState('sliderHeight', () => 0)
const sliderTop = useState('sliderTop', () => 0)
const tocLinksH2: Ref<Array<HTMLElement>> = ref([])
const tocLinksH3: Ref<Array<HTMLElement>> = ref([])

const tocLinks = computed(() => props.doc?.body?.toc?.links ?? [])

const onClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
        router.push({ hash: `#${id}` })
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
}

const tocHeader = ref();
const tocIsClosed = ref(false);

watch(
    () => props.activeTocId,
    (newActiveTocId) => {
        if (import.meta.client) {
            const h2Link = tocLinksH2.value.find((el: HTMLElement) => el.id === `toc-${newActiveTocId}`)
            const h3Link = tocLinksH3.value.find((el: HTMLElement) => el.id === `toc-${newActiveTocId}`)

            // TODO: dont hard code these offsets
            if (h2Link) {
                sliderHeight.value = h2Link.offsetHeight
                sliderTop.value = h2Link.offsetTop - 24
            } else if (h3Link) {
                sliderHeight.value = h3Link.offsetHeight
                sliderTop.value = h3Link.offsetTop - 24
            }
        }
    },
    { immediate: true }
)
</script>

<template>
    <div class="border-[#ECE6E7] dark:border-[#232326] pb-3 border-b border-dashed lg:border-b-0 overflow-hidden"
        v-if="tocLinks.length > 0">
        <span ref="tocHeader" @click="tocIsClosed = !tocIsClosed"
            class="cursor-pointer lg:cursor-auto flex justify-between">
            <h4 class="font-bold lg:mb-0">Table of Contents</h4>
            <Icon name="tabler:chevron-down" class="lg:!hidden transition-transform duration-200"
                :class="tocIsClosed ? 'rotate-180' : ''" />
        </span>
        <nav class="flex space-y-3 overflow-ellipsis">
            <div class="relative w-0.5 rounded hidden lg:block">
                <div class="absolute left-0 w-full transition-all duration-200 rounded bg-fuschia"
                    :style="{ height: `${sliderHeight}px`, top: `${sliderTop}px` }"></div>
            </div>
            <ul class="lg:pl-4 lg:block" :class="tocIsClosed ? 'hidden' : ''">
                <li role="link" v-for="{ id, text, children } in tocLinks" :id="`toc-${id}`" :key="id" ref="tocLinksH2"
                    class="cursor-pointer lg:text-sm ml-0 mb-2 last:mb-0"
                    :class="{ 'font-semibold': id === activeTocId }" @click="onClick(id)">
                    {{ text }}
                    <ul v-if="children" class="ml-3 my-2">
                        <li role="link" v-for=" { id: childId, text: childText } in children" :id="`toc-${childId}`"
                            :key="childId" ref="tocLinksH3" class="cursor-pointer lg:text-xs ml-0 mb-2 last:mb-0"
                            :class="{ 'font-semibold': childId === activeTocId }" @click.stop="onClick(childId)">
                            {{ childText }}
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>