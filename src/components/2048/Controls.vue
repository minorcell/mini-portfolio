<template>
    <div class="flex justify-between items-center mb-4">
        <button class="px-4 py-2 bg-blue-500 text-white rounded-md" @click="onStart">
            开始游戏
        </button>
        <p class="text-lg font-bold">分数: {{ score }}</p>
        <button class="px-4 py-2 bg-red-500 text-white rounded-md" @click="onEnd">
            结束游戏
        </button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
const score = ref<number>(0);

const props = defineProps({
    onStart: {
        type: Function,
        required: true,
    },
    onEnd: {
        type: Function,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
});

// OnStart: () => void;
const onStart = () => {
    props.onStart();
}

// OnEnd: () => void;
const onEnd = () => {
    props.onEnd();
}


// Score: number;
onMounted(() => {
    score.value = props.score;
})
</script>
