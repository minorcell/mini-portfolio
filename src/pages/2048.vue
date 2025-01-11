<template>
    <div class="w-full h-full flex flex-col justify-between items-center p-4">
        <!-- Info -->
        <div class="w-full flex flex-col items-start justify-center text-gray-700 dark:text-gray-100">
            <h1 class="text-4xl font-bold mb-2">2048小游戏</h1>
            <p class="text-sm">操作指南：
                使用键盘上的方向键（上、下、左、右）来移动方块，使相同的数字方块合并成更大的数字方块。目标是得到2048这个数字方块。
            </p>
        </div class="w-full h-2/3 flex justify-center items-center mt-4">
        <!-- Board -->
        <div
            class="w-full h-auto flex items-center justify-center"
        >
        <!-- render board's row by v-for -->
            <div
                v-for="(row, rowIndex) in board"
                :key="rowIndex"
                class="h-auto grid grid-row-4 gap-1"
            >
            <!-- render board's col by v-for -->
                <div
                    v-for="(col, colIndex) in row"
                    :key="colIndex"
                    class="w-20 h-20 flex items-center justify-center bg-gray-700 dark:bg-gray-100 rounded-lg m-1 font-bold text-2xl text-gray-100 dark:text-gray-700"
                >
                    {{ col }}
                </div>
            </div>
        </div>

        <!-- Controls -->
         <div
            class="w-full h-auto flex items-center justify-center gap-4"
         >
            <span
                class="text-2xl font-bold text-gray-700 dark:text-gray-100"
            >分数：{{ score }}</span>
            <button 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >开始游戏</button>
            <button 
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >重新开始</button>
         </div>
         <!-- game status: render different by game status:
            1. when cell === 2048, show win message
            2. when fill all cells but no more moves, show lose message
         -->
         <div
            class="w-full h-auto flex items-center justify-center"
         >
            <span
                v-if="gameStatus === 'win'"
                class="text-2xl font-bold text-green-500"
            >恭喜你，你赢了！</span>
            <span
                v-else-if="gameStatus === 'lose'"
                class="text-2xl font-bold text-red-500"
            >很遗憾，你输了！</span>
         </div>
         
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 4*4 board
const board = ref([
    [1, 2, 3, 4 ],
    [5, 6, 7, 8] ,
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]);
const score = ref(0);
const gameStatus = ref<'noStarted' |'playing' | 'win' | 'lose'>('playing');
/* 
TODO:
1. Randomly generate two 2s or 4s on the board
2. Move the tiles in the specified direction
3. Merge the tiles if they are the same
4. Check if the game is over (no more moves or 2048 is reached)
5. Display the score
6. Display the game over message
7. Display the win message
8. Reset the game

*/
</script>