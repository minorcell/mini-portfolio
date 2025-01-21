<template>
  <div
    class="duration-700 w-12 h-6 p-1 bg-green-500 rounded-full shadow-xl flex items-center cursor-pointer"
    @click="toggleSwitch"
    :class="{ 'bg-red-500': !props.modelValue }"
    @mouseenter="mouseEnter = true"
    @mouseleave="mouseEnter = false"
  >
    <!-- ball with transition -->
    <span
      class="w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center"
      :class="{
        'translate-x-6': props.modelValue, // If switched on, move the ball to the right
        'translate-x-0': !props.modelValue, // If switched off, keep the ball at the left
      }"
    >
      <img
        src="../../assets/images/loading.svg"
        alt="loading"
        class="w-3.5 h-3.5"
        :class="{
          'animate-spin': mouseEnter,
        }"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const mouseEnter = ref<boolean>(false);

const emit = defineEmits(["update:modelValue"]);

const toggleSwitch = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>
