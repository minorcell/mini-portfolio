<template>
    <div
        class="w-screen h-screen flex flex-col justify-between bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <!-- Header -->
        <header class="w-full h-[5%] flex justify-between items-center bg-gray-300 dark:bg-gray-800 shadow-md px-4">
            <!-- Logo -->
            <div class="flex items-center gap-4 h-full">
                <img src="/src/assets/images/logo.png" alt="logo" class="h-4/5 rounded" />
                <h1 class="text-2xl font-bold text-gray-700 dark:text-gray-200">
                    Mini-Portfolio | 小小案例集
                </h1>
            </div>
            <div class="flex items-center gap-4 h-full text-gray-700 dark:text-gray-200 font-bold text-sm">
                <ThemeToggle />
                <!-- GitHub Info -->
                <a href="https://github.com/minorcell/mini-portfolio" target="_blank">
                    <img src="/src/assets/images/github_light.svg" alt="github" class="h-6 w-6" v-if="!isDark" />
                    <img src="/src/assets/images/github_dark.svg" alt="github" class="h-6 w-6" v-else />
                </a>
            </div>
        </header>

        <!-- Main Content -->
        <main class="w-full h-[85%] flex justify-center items-center gap-12">
            <!-- Sidebar -->
            <aside class="w-1/6 h-full bg-gray-300 dark:bg-gray-800 p-4 box">
                <h1 class="text-2xl text-blue-500 mb-4 font-bold">作品目录</h1>
                <ul class="w-full flex flex-col gap-4">
                    <li v-for="(work, index) in works" :key="work.path"
                        class="duration-300 cursor-pointer text-blue-500"
                        :class="{ 'scale-105 translate-x-10': isActive(work.path) }"
                        @click="navigateTo(work.path, index)">
                        <div class="duration-300 w-full p-2 bg-gray-400 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 box"
                            :class="{ 'bg-gray-400 dark:bg-gray-600': isActive(work.path) }">
                            <h2 class="text-xl font-bold text-gray-700 dark:text-gray-200">{{ work.name }}</h2>
                            <div :class="work.status === '已上线' ? 'bg-green-500' : 'bg-red-500'"
                                class="text-white py-1 px-2 w-fit text-sm box">
                                {{ work.status }}
                            </div>
                        </div>
                    </li>
                </ul>
            </aside>

            <!-- Work Display -->
            <section class="w-4/6 h-full bg-gray-300 dark:bg-gray-800 flex flex-col justify-center items-center box">
                <router-view />
            </section>
        </main>

        <!-- Footer -->
        <footer class="w-full h-[5%] flex flex-col justify-center items-center bg-gray-300 dark:bg-gray-800 box">
            <p class="text-center text-gray-600 dark:text-gray-400 text-sm">
                © {{ year }} <a target="_blank" class="text-blue-500" href="https://github.com/minorcell">mCell</a>. All
                rights
                reserved.
            </p>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { works } from './data/portfolio';
import { useRouter, useRoute } from 'vue-router';
import { useThemeStore } from './stores/theme';

import ThemeToggle from './components/GlobalComponents/ThemeToggle.vue';

const activeWork = ref<number | null>(null);
const year = new Date().getFullYear();
const router = useRouter();
const route = useRoute();
const themeStore = useThemeStore();

// Navigate to a specific path
const navigateTo = (path: string, index: number) => {
    router.push(path);
    activeWork.value = index;
};

// Check if a work is active
const isActive = (path: string) => route.path === path;

// Set default path on mount
onMounted(() => {
    if (!route.path || route.path === '/') {
        const defaultWork = works[0];
        if (defaultWork) {
            router.replace(defaultWork.path);
            activeWork.value = 0;
        }
    }
});

// Dark mode toggle
const isDark = computed(() => themeStore.isDark);
</script>

<style scoped>
/* Scoped styles can be added here */
</style>