<template>
  <div
    class="duration-700 w-screen h-screen flex flex-col justify-between bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors select-none"
  >
    <Mouse />
    <!-- Header -->
    <header
      class="duration-700 w-full h-[5%] flex justify-between items-center bg-gray-300 dark:bg-gray-800 shadow-md px-4"
    >
      <!-- Logo -->
      <div class="flex items-center gap-4 h-full">
        <img
          src="/src/assets/images/logo.webp"
          alt="logo"
          class="h-4/5 rounded duration-700"
          @click="$router.push(works[0].path)"
          :style="logoStyle"
        />
        <h1
          class="duration-700 text-2xl font-bold text-gray-700 dark:text-gray-200"
        >
          Mini-Portfolio | 简单且好用
        </h1>
      </div>
      <div
        class="duration-700 flex items-center gap-4 h-full text-gray-700 dark:text-gray-200 font-bold text-sm"
      >
        <Switch v-model="isFullScreen" />

        <ThemeToggle />
        <!-- GitHub Info -->
        <a href="https://github.com/minorcell/mini-portfolio" target="_blank">
          <img
            src="/src/assets/images/github_light.svg"
            alt="github"
            class="h-6 w-6"
            v-if="!isDark"
          />
          <img
            src="/src/assets/images/github_dark.svg"
            alt="github"
            class="h-6 w-6"
            v-else
          />
        </a>
      </div>
    </header>

    <!-- Main Content -->
    <main class="w-full h-[85%] flex justify-center items-center gap-12">
      <!-- Sidebar -->
      <aside
        class="duration-700 w-1/6 h-full bg-gray-300 dark:bg-gray-800 p-4 box"
      >
        <h1 class="duration-700 text-2xl text-blue-500 mb-4 font-bold">
          导航栏
        </h1>
        <ul class="w-full flex flex-col gap-4">
          <li
            v-for="(work, index) in works"
            :key="work.path"
            class="duration-300 cursor-pointer text-blue-500"
            :class="{ 'scale-105 translate-x-10': isActive(work.path) }"
            @click="navigateTo(work.path, index)"
          >
            <WorkItem :work="work" />
          </li>
        </ul>
      </aside>

      <!-- Work Display -->
      <section
        class="duration-700 w-4/6 h-full bg-gray-300 dark:bg-gray-800 flex flex-col justify-center items-center box"
      >
        <router-view v-slot="{ Component }">
          <keep-alive exclude="qrcode">
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </router-view>
      </section>
    </main>

    <!-- Footer -->
    <footer
      class="duration-700 w-full h-[5%] flex flex-col justify-center items-center bg-gray-300 dark:bg-gray-800 box"
    >
      <p
        class="duration-700 text-center text-gray-600 dark:text-gray-400 text-sm"
      >
        © {{ year }}
        <a
          target="_blank"
          class="text-blue-500"
          href="https://github.com/minorcell"
          >mCell</a
        >. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { works } from "./data/portfolio";
import { useRouter, useRoute } from "vue-router";
import { useThemeStore } from "./stores/theme";
import { useTitle, useMouse } from "./hooks";
import WorkItem from "./components/WorkItem.vue";
import { Switch, Mouse } from "./components/ui";

import ThemeToggle from "./components/ThemeToggle.vue";

const activeWork = ref<number | null>(null);
const isFullScreen = ref<boolean>(false);
const year = new Date().getFullYear();
const router = useRouter();
const route = useRoute();
const themeStore = useThemeStore();
const mouseInfo = useMouse();

// Navigate to a specific path
const navigateTo = (path: string, index: number) => {
  router.push(path);
  activeWork.value = index;
  useTitle(works[index].name);
};

// Check if a work is active
const isActive = (path: string) => route.path === path;

// Set default path on mount
onMounted(() => {
  if (!route.path) {
    const defaultWork = works[0];
    if (defaultWork) {
      router.replace(defaultWork.path);
      activeWork.value = 0;
      useTitle(defaultWork.name);
    }
  }
});

// Dark mode toggle
const isDark = computed(() => themeStore.isDark);

const logoStyle = computed(() => {
  return {
    transform: `rotateX(${mouseInfo.x / 10}deg) rotateY(${
      mouseInfo.y / 10
    }deg) rotateZ(${(mouseInfo.x + mouseInfo.y) / 10}deg)`,
  };
});

// watch isFullScreen
watch(isFullScreen, () => {
  if (isFullScreen.value) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
</script>

<style scoped></style>
