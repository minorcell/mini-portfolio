<template>
  <div class="w-full h-full flex flex-col justify-between items-center p-4">
    <!-- Info -->
    <div
      class="w-full flex flex-col items-start justify-center text-gray-700 dark:text-gray-100"
    >
      <h1 class="text-4xl font-bold mb-2">2048小游戏</h1>
      <p class="text-sm">
        操作指南：
        使用键盘上的方向键（上、下、左、右）来移动方块，使相同的数字方块合并成更大的数字方块。目标是得到2048这个数字方块。
      </p>
    </div>

    <div
      class="w-96 h-96 grid grid-rows-4 grid-cols-4 gap-2 rounded-lg p-2 bg-green-500"
    >
      <!-- Render board cells -->
      <div
        v-for="(cell, index) in board.flat()"
        :key="index"
        :style="{ backgroundColor: getColor(cell) }"
        class="flex items-center justify-center bg-gray-700 dark:bg-gray-100 rounded-lg font-bold text-3xl text-gray-700"
      >
        {{ cell || "" }}
      </div>
    </div>

    <!-- Controls -->
    <div class="w-full h-auto flex items-center justify-center gap-4 mt-4">
      <span class="text-2xl font-bold text-gray-700 dark:text-gray-100"
        >分数：{{ maxScore || "0" }}
      </span>
      <button
        class="duration-300 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        @click="startGame"
      >
        开始游戏
      </button>
      <button
        class="duration-300 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        @click="restartGame"
      >
        重新开始
      </button>
    </div>
    <!-- Game Status -->

    <Dialog
      :visible="showDialog"
      title="2048游戏提示"
      cancel-content="关闭"
      confirm-content="重新开始"
      @confirm="handleConfirm"
      @update:visible="showDialog = $event"
    >
      <template #content>
        <p class="text-gray-700 dark:text-gray-100">
          {{
            gameStatus === "win"
              ? "恭喜你，成功获得2048！"
              : "游戏结束，请重新开始！"
          }}
        </p>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";
import Dialog from "../components/ui/Dialog.vue";
import { useColor } from "../hooks/useColor";
import { sleep } from "../utils/tools";

const board = reactive(createEmptyGrid());
const maxScore = ref(0);
const gameStatus = ref<"playing" | "win" | "lose">("playing");
const showDialog = ref<boolean>(false);

const SIZE = 4;
const { getColor } = useColor();

function createEmptyGrid() {
  return Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(0));
}

function addRandomTile(grid: number[][]) {
  const emptyTiles = [];
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (grid[i][j] === 0) emptyTiles.push([i, j]);
    }
  }
  if (emptyTiles.length > 0) {
    const [row, col] =
      emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    grid[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
}

function combineRow(row: number[]) {
  const newRow = row.filter((value) => value !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      newRow.splice(i + 1, 1);
    }
  }
  return [...newRow, ...Array(SIZE - newRow.length).fill(0)];
}

function slideLeft(grid: number[][]) {
  return grid.map((row) => combineRow(row));
}

function slideRight(grid: number[][]) {
  return grid.map((row) => combineRow(row.reverse()).reverse());
}

function rotateLeft(grid: number[][]) {
  const rotated = createEmptyGrid();
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      rotated[SIZE - 1 - j][i] = grid[i][j];
    }
  }
  return rotated;
}

function rotateRight(grid: number[][]) {
  const rotated = createEmptyGrid();
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      rotated[j][SIZE - 1 - i] = grid[i][j];
    }
  }
  return rotated;
}

function slideUp(grid: number[][]) {
  const rotated = rotateLeft(grid);
  return rotateRight(slideLeft(rotated));
}

function slideDown(grid: number[][]) {
  const rotated = rotateLeft(grid);
  return rotateRight(slideRight(rotated));
}

function startGame() {
  gameStatus.value = "playing";
  board.splice(0, board.length, ...createEmptyGrid());
  addRandomTile(board);
}

function restartGame() {
  startGame();
}

function handleKeyDown(e: KeyboardEvent) {
  if (gameStatus.value !== "playing") return;

  let newBoard = JSON.parse(JSON.stringify(board));

  switch (e.key) {
    case "ArrowUp":
      newBoard = slideUp(newBoard);
      break;
    case "ArrowDown":
      newBoard = slideDown(newBoard);
      break;
    case "ArrowLeft":
      newBoard = slideLeft(newBoard);
      break;
    case "ArrowRight":
      newBoard = slideRight(newBoard);
      break;
    default:
      return;
  }

  maxScore.value = Math.max(...newBoard.flat(), maxScore.value);

  addRandomTile(newBoard);
  Object.assign(board, newBoard);

  if (board.flat().includes(2048)) {
    gameStatus.value = "win";
    showDialog.value = true;
  } else if (board.flat().every((cell) => cell !== 0)) {
    gameStatus.value = "lose";
    showDialog.value = true;
  }
}

function handleConfirm() {
  showDialog.value = false;
  sleep(500).then(() => {
    restartGame();
  });
}

onMounted(() => {
  startGame();
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>
