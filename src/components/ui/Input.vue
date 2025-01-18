<template>
  <div
    class="duration-700 w-full flex items-center justify-between rounded-lg bg-gray-100 dark:bg-gray-800"
    :class="[props.outline ? 'border' : 'border-none']"
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
    <!-- length -->
    <div
      class="text-gray-500 dark:text-gray-200 flex-1 flex items-center justify-center w-fit border-l border-gray-300 dark:border-gray-600"
    >
      {{ props.modelValue.length }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

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
</script>

<style scoped></style>
