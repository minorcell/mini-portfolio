<template>
  <button
    class="shadow_button px-4 py-2 rounded transition-colors duration-200 flex items-center"
    :class="[
      buttonClass,
      sizeClass,
      { 'opacity-50 cursor-not-allowed': disabled || loading },
      { 'hover:brightness-95': !disabled && !loading },
      customClass,
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="mr-2">
      <!-- loading icon -->
      <svg
        class="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

// type and size for the button
export type ButtonType = "primary" | "info" | "success" | "warning" | "error";
export type ButtonSize = "small" | "default" | "large";

// colors reference
const colors = {
  primary: "bg-blue-500",
  info: "bg-gray-500",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
};

// sizes reference
const sizes = {
  small: "px-3 py-1 text-sm",
  default: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

// props
const props = defineProps({
  type: {
    type: String as PropType<ButtonType>,
    default: "info",
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: "",
  },
});

// emit
const emit = defineEmits(["click"]);

// computed button class
const buttonClass = computed(() => colors[props.type]);

// computed size class
const sizeClass = computed(() => sizes[props.size]);

// handle click
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

<style scoped>
.shadow_button {
  box-shadow: inset -3px 3px 6px #aaaaaa, inset 3px -3px 6px #ffffff;
}
</style>
