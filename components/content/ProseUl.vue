<template>
    <ul>
        <slot />
    </ul>
</template>

<style scoped>
:slotted(li) {
    position: relative;
    padding-left: 20px;
}

:slotted(li)::before {
    content: "•";
    position: absolute;
    left: 0;
}
</style>
