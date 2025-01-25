<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div
      class="bg-white dark:bg-gray-700 rounded-lg shadow-lg max-w-md w-full px-6 py-4"
      role="dialog"
      aria-modal="true"
    >
      <div class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        {{ title }}
      </div>

      <div class="text-gray-600 mb-6">
        <slot name="content"></slot>
      </div>

      <div
        class="flex justify-end space-x-4 text-gray-700 dark:text-gray-100 font-bold"
      >
        <button
          class="px-4 py-2 bg-gray-500 rounded hover:bg-gray-700"
          @click="handleCancel"
        >
          {{ cancelContent }}
        </button>
        <button
          class="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-700"
          @click="handleConfirm"
        >
          {{ confirmContent }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

defineOptions({
  name: "Dialog",
});

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "提示",
  },
  confirmContent: {
    type: String,
    default: "确认",
  },
  cancelContent: {
    type: String,
    default: "取消",
  },
});

const emit = defineEmits(["update:visible", "confirm"]);

const handleCancel = () => {
  emit("update:visible", false);
};

const handleConfirm = () => {
  emit("confirm");
};
</script>
