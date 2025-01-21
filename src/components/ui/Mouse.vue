<template>
  <div
    ref="cursor"
    class="custom-cursor fixed cursor-none z-50 rounded-full w-4 h-4 bg-gray-800 dark:bg-gray-100 border-2 border-gray-800 dark:border-gray-800 bg-opacity-50"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      transform: cursorTransform,
    }"
    :class="{ breathe: isMoveOut }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const x = ref(0);
const y = ref(0);
const isMoveOut = ref<boolean>(false);

const cursorTransform = ref("");
const cursor = ref<HTMLElement | null>(null);

const centerX = ref(0);
const centerY = ref(0);

const updateMousePosition = (e: MouseEvent) => {
  x.value = e.pageX;
  y.value = e.pageY;
};

const handleMouseEnter = () => {
  cursorTransform.value = "scale(1.2)";
  isMoveOut.value = false;
};

const handleMouseLeave = () => {
  cursorTransform.value = "";
  x.value = centerX.value;
  y.value = centerY.value;
  isMoveOut.value = true;
};

const handleMouseDown = () => {
  cursorTransform.value = "scale(0.5)";
};

const handleMouseUp = () => {
  cursorTransform.value = "scale(1.2)";
};

onMounted(() => {
  centerX.value = window.innerWidth / 2;
  centerY.value = window.innerHeight / 2;

  document.body.style.cursor = "none";
  document.addEventListener("mousemove", updateMousePosition);
  document.addEventListener("mouseenter", handleMouseEnter);
  document.addEventListener("mouseleave", handleMouseLeave);
  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mouseup", handleMouseUp);
});

onUnmounted(() => {
  document.body.style.cursor = "auto";
  document.removeEventListener("mousemove", updateMousePosition);
  document.removeEventListener("mouseenter", handleMouseEnter);
  document.removeEventListener("mouseleave", handleMouseLeave);
  document.removeEventListener("mousedown", handleMouseDown);
  document.removeEventListener("mouseup", handleMouseUp);
});
</script>

<style scoped>
.custom-cursor {
  pointer-events: none;
  transform-origin: center;
  transition: transform 0.2s ease-in-out;
}
@keyframes breath {
  0% {
    transform: scale(7) rotate(0deg);
    border-radius: 20%;
  }
  50% {
    transform: scale(3) rotate(180deg);
    border-radius: 50%;
  }
  100% {
    transform: scale(7) rotate(360deg);
    border-radius: 20%;
  }
}

.breathe {
  animation: breath 2s ease-in-out infinite;
}
</style>
