<template>
  <div
    class="duration-700 w-full flex items-center justify-between rounded-lg bg-gray-100 dark:bg-gray-800"
    :class="[props.outline ? 'border border-gray-500' : 'border-none']"
  >
    <!-- Input Field -->
    <input
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      @input="handleInput"
      class="w-11/12 p-2 text-gray-800 dark:text-gray-100 bg-transparent rounded-md focus:outline-none"
    />
    <!-- length and clear -->
    <div
      v-if="!props.disabled && props.modelValue"
      class="w-1/12 flex-1 flex items-center justify-center cursor-pointer border-l border-gray-300 dark:border-gray-600"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Clear Icon -->
      <svg
        v-if="isHovered"
        @click="clearInput"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-500 hover:text-gray-700 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      <!-- Character Count -->
      <span v-else class="text-sm text-gray-500">
        {{ props.modelValue.length }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";

const isHovered = ref<boolean>(false);

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    validator: (value: string) => {
      return ["text", "password", "email", "number"].includes(value);
    },
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const clearInput = () => {
  emit("update:modelValue", "");
  isHovered.value = false;
};
</script>
