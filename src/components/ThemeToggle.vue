<template>
  <button @click="toggleTheme" class="px-4 py-2 rounded text-white">
    <img
      src="/src/assets/images/sun.svg"
      alt="sun"
      v-if="!isDark"
      class="w-6 h-6"
    />
    <img src="/src/assets/images/moon.svg" alt="moon" v-else class="w-6 h-6" />
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useThemeStore } from "../stores/theme";
const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>
