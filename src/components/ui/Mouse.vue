<template>
  <!-- 自定义鼠标指针 -->
  <div
    ref="cursor"
    class="custom-cursor fixed cursor-none z-50 rounded-full w-4 h-4 bg-gray-800 dark:bg-gray-100 border-2 border-gray-800 dark:border-gray-800 bg-opacity-50"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      transform: cursorTransform,
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const x = ref(0);
const y = ref(0);

const cursorTransform = ref("");

const cursor = ref<HTMLElement | null>(null);

const updateMousePosition = (e: MouseEvent) => {
  x.value = e.pageX;
  y.value = e.pageY;
};

// 鼠标悬停时切换样式
const handleMouseEnter = () => {
  cursorTransform.value = "scale(1.2)";
};

// 鼠标离开时恢复默认样式
const handleMouseLeave = () => {
  cursorTransform.value = "";
};

// 鼠标按下时切换样式
const handleMouseDown = () => {
  cursorTransform.value = "scale(0.5)";
};

const handleMouseUp = () => {
  cursorTransform.value = "scale(1.2)";
};

onMounted(() => {
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
</style>
