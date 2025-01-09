<template>
    <div class="w-screen h-screen flex flex-col justify-between">
        <header class="w-full h-[5%] flex justify-between items-center bg-slate-200 shadow-md px-2">
            <!-- Logo -->
            <div class="flex items-center gap-4 h-full">
                <img src="/src/assets/images/logo.png" alt="logo" class="h-4/5">
                <h1 class="text-2xl font-bold text-gray-700">Mini-Portfolio | 小小案例集</h1>
            </div>
            <!-- en / cn -->
            <!-- github info -->
            <a href="https://github.com/minorcell/mini-portfolio" class="h-1/2">
                <img src="/src/assets/images/github.svg" alt="github" class="h-full"></a>
        </header>
        <main class="w-full h-[85%] flex justify-evenly items-center">
            <!-- side bar -->
            <div class="w-1/6 h-full bg-slate-200 box p-4">
                <h1 class="text-2xl text-blue-500 mb-4 font-bold">作品目录</h1>
                <ul>
                    <li v-for="work in works" :key="work.path" class="cursor-pointer text-blue-500"
                        @click="navigateTo(work.path)">
                        <div class="duration-300 w-full p-2 box bg-gray-300 hover:bg-gray-400">
                            <h2 class="text-xl font-bold text-gray-700">{{ work.name }}</h2>
                            <div :class="work.status === '已上线' ? 'bg-green-500' : 'bg-red-500'"
                                class="text-white box py-1 px-3 w-fit text-sm">
                                {{ work.status }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- show area : work -->
            <div class="w-4/6 h-full bg-slate-200 box flex flex-col justify-center items-center">
                <router-view />
            </div>
        </main>
        <footer class="w-full h-[5%] flex flex-col justify-center items-center box bg-slate-200">
            <p class="text-center text-gray-600 text-sm">© {{ year }} <a target="_blank" class="text-blue-500"
                    href="https://github.com/minorcell">mCell</a>.
                All rights reserved.</p>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { works } from './data/portfoio';
import { useRouter } from 'vue-router';

// get current year
const year = new Date().getFullYear();

// use Vue Router
const router = useRouter();

// navigate to target page
const navigateTo = (path: string) => {
    router.push(path);
}

// to a default path while onMounted 
onMounted(() => {
    if (works.length > 0) {
        router.push(works[0].path)
    }
})
</script>

<style scoped></style>
