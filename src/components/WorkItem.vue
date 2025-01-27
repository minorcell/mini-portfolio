<template>
  <div
    class="duration-700 w-full p-2 bg-gray-400 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 box"
    :class="{ 'bg-gray-400 dark:bg-gray-600': isActive(props.work.path) }"
    @click="$router.push(props.work.path)"
  >
    <h2
      class="duration-700 text-xl font-bold text-gray-700 dark:text-gray-200 mb-2"
    >
      {{ props.work.name }}
    </h2>
    <div
      :class="props.work.status === 'finished' ? 'bg-green-500' : 'bg-red-500'"
      class="text-white py-1 px-2 w-fit text-sm box"
    >
      {{ workStatus }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const props = defineProps({
  work: {
    type: Object,
    required: true,
  },
});

function isActive(path: string) {
  return route.path === path;
}

/* 
    finished : 已上线
    developing : 开发中
    abandoned : 已废弃
  */

const workStatus = computed(() => {
  if (props.work.status === "finished") {
    return "已上线";
  } else if (props.work.status === "developing") {
    return "开发中";
  } else {
    return "已废弃";
  }
});
</script>
