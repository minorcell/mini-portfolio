<template>
  <div class="work">
    <!-- Info -->
    <WorkInfo
      work-name="2048小游戏"
      work-description="使用键盘上的方向键（上、下、左、右）来移动方块，使相同的数字方块合并成更大的数字方块。目标是得到2048这个数字方块。"
    />

    <div
      class="duration-700 w-[30rem] h-[30rem] grid grid-rows-5 grid-cols-5 gap-2 rounded-lg p-2 bg-green-500 border-2 border-gray-700 dark:border-gray-100"
    >
      <!-- Render board cells -->
      <div
        v-for="(cell, index) in board.flat()"
        :key="index"
        :style="{ backgroundColor: getColor(cell) }"
        class="shaow_box flex items-center justify-center bg-gray-700 dark:bg-gray-100 rounded-lg font-bold text-3xl text-gray-700"
      >
        {{ cell || "" }}
      </div>
    </div>

    <!-- Controls -->
    <div class="w-2/3 h-auto flex items-center justify-between gap-4 mt-4 pb-4">
      <span class="text-2xl font-bold text-gray-700 dark:text-gray-100"
        >当前最大分数：{{ maxScore || "00" }}
      </span>
      <div class="flex items-center justify-center gap-4 text-white font-bold">
        <Button
          type="primary"
          @click="startGame"
          :disabled="gameStatus !== 'playing' || isAIPlaying"
        >
          开始游戏
        </Button>
        <Button
          type="warning"
          @click="restartGame"
          :disabled="!isAIPlaying || gameStatus !== 'playing'"
        >
          重新开始
        </Button>
        <Button
          type="success"
          @click="autoPlayAI"
          :loading="isAIPlaying"
          :disabled="isAIPlaying || gameStatus !== 'playing'"
        >
          AI PLAY
        </Button>
      </div>
    </div>
    <!-- Game Status -->

    <Dialog
      :visible="showDialog"
      title="2048游戏提示"
      cancel-content="关闭"
      confirm-content="重新开始"
      @cancel="restartGame"
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
import { ref, reactive, onActivated, onDeactivated } from "vue";
import { useColor } from "../hooks/index";
import { sleep } from "../utils/tools";

import { Button, Dialog } from "../components/ui";
import WorkInfo from "../components/WorkInfo.vue";

const board = reactive(createEmptyGrid());
const maxScore = ref(0);
const gameStatus = ref<"playing" | "win" | "lose">("playing");
const showDialog = ref<boolean>(false);
const isAIPlaying = ref(false);
const aiRunning = ref(false);

const SIZE = 5;
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
  addRandomTile(board);
}

function restartGame() {
  stopAI();
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

  updateBoard(newBoard);
}

function updateBoard(newBoard: number[][]) {
  maxScore.value = Math.max(...newBoard.flat(), maxScore.value);

  addRandomTile(newBoard);
  Object.assign(board, newBoard);

  if (board.flat().includes(2048)) {
    gameStatus.value = "win";
    showDialog.value = true;
    stopAI();
  } else if (board.flat().every((cell) => cell !== 0)) {
    gameStatus.value = "lose";
    showDialog.value = true;
    stopAI();
  }
}

function evaluateBoard(grid: number[][]): number {
  let emptyTiles = 0;
  let maxTile = 0;
  let smoothness = 0;
  let monotonicity = 0;

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (grid[i][j] === 0) {
        emptyTiles++;
      } else {
        maxTile = Math.max(maxTile, grid[i][j]);
        if (i > 0 && grid[i - 1][j] !== 0) {
          smoothness -= Math.abs(grid[i][j] - grid[i - 1][j]);
        }
        if (j > 0 && grid[i][j - 1] !== 0) {
          smoothness -= Math.abs(grid[i][j] - grid[i][j - 1]);
        }
        if (i > 0 && grid[i - 1][j] > grid[i][j]) {
          monotonicity -= grid[i - 1][j] - grid[i][j];
        }
        if (j > 0 && grid[i][j - 1] > grid[i][j]) {
          monotonicity -= grid[i][j - 1] - grid[i][j];
        }
      }
    }
  }

  return emptyTiles * 10 + maxTile + smoothness + monotonicity;
}

function expectimax(
  grid: number[][],
  depth: number,
  isMaximizingPlayer: boolean
): number {
  if (depth === 0) {
    return evaluateBoard(grid);
  }

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    const moves = [slideUp, slideDown, slideLeft, slideRight];

    for (const move of moves) {
      const newBoard = JSON.parse(JSON.stringify(grid));
      const movedBoard = move(newBoard);
      if (JSON.stringify(movedBoard) !== JSON.stringify(grid)) {
        const evaluation = expectimax(movedBoard, depth - 1, false);
        maxEval = Math.max(maxEval, evaluation);
      }
    }

    return maxEval;
  } else {
    let sumEval = 0;
    let emptyTiles = 0;

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (grid[i][j] === 0) {
          emptyTiles++;
        }
      }
    }

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (grid[i][j] === 0) {
          const newBoard = JSON.parse(JSON.stringify(grid));
          newBoard[i][j] = 2;
          sumEval += 0.9 * expectimax(newBoard, depth - 1, true);

          newBoard[i][j] = 4;
          sumEval += 0.1 * expectimax(newBoard, depth - 1, true);
        }
      }
    }

    return emptyTiles === 0 ? 0 : sumEval / emptyTiles;
  }
}

async function autoPlayAI() {
  if (gameStatus.value !== "playing" || isAIPlaying.value) return;

  isAIPlaying.value = true;
  aiRunning.value = true;

  while (gameStatus.value === "playing" && aiRunning.value) {
    const moves = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    let bestMove = null;
    let bestScore = -Infinity;

    for (const move of moves) {
      const newBoard = JSON.parse(JSON.stringify(board));
      let movedBoard;

      switch (move) {
        case "ArrowUp":
          movedBoard = slideUp(newBoard);
          break;
        case "ArrowDown":
          movedBoard = slideDown(newBoard);
          break;
        case "ArrowLeft":
          movedBoard = slideLeft(newBoard);
          break;
        case "ArrowRight":
          movedBoard = slideRight(newBoard);
          break;
        default:
          continue;
      }

      if (JSON.stringify(movedBoard) !== JSON.stringify(newBoard)) {
        const score = expectimax(movedBoard, 3, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = movedBoard;
        }
      }
    }

    if (bestMove) {
      updateBoard(bestMove);
    }

    await sleep(100);
  }

  isAIPlaying.value = false;
  aiRunning.value = false;
}

function stopAI() {
  aiRunning.value = false;
  isAIPlaying.value = false;
}

function handleConfirm() {
  showDialog.value = false;
  sleep(500).then(() => {
    restartGame();
  });
}

onActivated(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onDeactivated(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style scoped>
.shaow_box {
  box-shadow: inset -8px -8px 13px #b5b5b5, inset 8px 8px 13px #ffffff;
}
</style>
