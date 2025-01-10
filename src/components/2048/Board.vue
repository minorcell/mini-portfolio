<template>
    <div class="grid gap-2" :class="`grid-cols-${boardSize}`">
        <div v-for="(row, rowIndex) in board" :key="`row-${rowIndex}`" class="flex flex-row gap-2">
            <div v-for="(cell, colIndex) in row" :key="`cell-${rowIndex}-${colIndex}`"
                class="w-16 h-16 flex justify-center items-center text-lg font-bold rounded-md"
                :class="cell > 0 ? 'bg-yellow-300 text-black' : 'bg-gray-300 text-gray-400'">
                {{ cell > 0 ? cell : '' }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
    board: {
        type: Array as PropType<number[][]>,
        required: true,
    },
});

const boardSize = props.board.length;
</script>
