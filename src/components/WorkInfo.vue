<template>
  <!-- Info -->
  <div
    class="w-full flex flex-col items-start justify-center text-gray-700 dark:text-gray-100"
  >
    <h1 class="text-4xl font-bold mb-2">{{ props.workName }}</h1>
    <p class="text-sm">
      操作指南：
      {{ props.workDescription }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  workName: {
    type: String,
    required: true,
  },
  workDescription: {
    type: String,
    required: true,
  },
});
</script>
