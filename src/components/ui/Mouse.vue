<template>
  <div
    ref="cursor"
    class="custom-cursor fixed cursor-none z-50 rounded-full w-4 h-4 border-2 border-gray-800 dark:border-gray-100"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      transform: cursorTransform,
    }"
    :class="{ 'bg-orange-500 border-none': isMouseOut }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

defineOptions({
  name: "Mouse",
});

const x = ref(0);
const y = ref(0);

const cursorTransform = ref("");
const cursor = ref<HTMLElement | null>(null);
const isMouseOut = ref<boolean>(false);

const centerX = ref(0);
const centerY = ref(0);

const updateMousePosition = (e: MouseEvent) => {
  x.value = e.pageX;
  y.value = e.pageY;
};

const handleMouseEnter = () => {
  cursorTransform.value = "scale(1.2)";
  isMouseOut.value = false;
};

const handleMouseLeave = () => {
  cursorTransform.value = "";
  x.value = centerX.value;
  y.value = centerY.value;
  isMouseOut.value = true;
};

const handleMouseDown = () => {
  cursorTransform.value = "scale(0.5)";
};

const handleMouseUp = () => {
  cursorTransform.value = "scale(1.2)";
};

onMounted(() => {
  centerX.value = window.innerWidth / 2;
  centerY.value = 15;

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
  box-shadow: 0px 0px 10px rgb(255, 255, 255);
}
</style>
