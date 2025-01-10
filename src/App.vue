<template>
    <div class="w-screen h-screen flex flex-col justify-between">
        <!-- Header -->
        <header class="w-full h-[5%] flex justify-between items-center bg-slate-200 shadow-md px-2">
            <!-- Logo -->
            <div class="flex items-center gap-4 h-full">
                <img src="/src/assets/images/logo.png" alt="logo" class="h-4/5 rounded" />
                <h1 class="text-2xl font-bold text-gray-700">Mini-Portfolio | 小小案例集</h1>
            </div>
            <!-- GitHub Info -->
            <a href="https://github.com/minorcell/mini-portfolio" class="h-1/2">
                <img src="/src/assets/images/github.svg" alt="github" class="h-full" />
            </a>
        </header>

        <!-- Main Content -->
        <main class="w-full h-[85%] flex justify-evenly items-center">
            <!-- Sidebar -->
            <aside class="w-1/6 h-full bg-slate-200 p-4 box">
                <h1 class="text-2xl text-blue-500 mb-4 font-bold">作品目录</h1>
                <ul class="w-full flex flex-col gap-4">
                    <li v-for="(work, index) in works" :key="work.path"
                        class="duration-300 cursor-pointer text-blue-500"
                        :class="{ 'scale-105 translate-x-10': isActive(work.path) }"
                        @click="navigateTo(work.path, index)">
                        <div class="duration-300 w-full p-2 bg-gray-300 hover:bg-gray-400 box"
                            :class="{ 'bg-gray-400': isActive(work.path) }">
                            <h2 class="text-xl font-bold text-gray-700">{{ work.name }}</h2>
                            <div :class="work.status === '已上线' ? 'bg-green-500' : 'bg-red-500'"
                                class="text-white py-1 px-2 w-fit text-sm box">
                                {{ work.status }}
                            </div>
                        </div>
                    </li>
                </ul>
            </aside>

            <!-- Work Display -->
            <section class="w-4/6 h-full bg-slate-200 flex flex-col justify-center items-center box">
                <router-view />
            </section>
        </main>

        <!-- Footer -->
        <footer class="w-full h-[5%] flex flex-col justify-center items-center bg-slate-200 box">
            <p class="text-center text-gray-600 text-sm">
                © {{ year }} <a target="_blank" class="text-blue-500" href="https://github.com/minorcell">mCell</a>. All
                rights
                reserved.
            </p>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { works } from './data/portfolio';
import { useRouter, useRoute } from 'vue-router';

const activeWork = ref<number | null>(null);
const year = new Date().getFullYear();
const router = useRouter();
const route = useRoute();

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
</script>

<style scoped>
/* Scoped styles can be added here */
</style>