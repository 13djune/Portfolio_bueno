<template>
    <div class="fixed top-4 right-4">
        <UButton aria-label="button to switch theme dark to light" @click="toggleDark" variant="link" color="white"
            :icon="color.preference === 'dark' ? 'i-pixelarticons-sun' : 'i-pixelarticons-moon-star'" />
    </div>
</template>

<script setup>
const color = useColorMode();

function toggleDark() {
    color.preference = color.value === "dark" ? "light" : "dark";
}
</script>