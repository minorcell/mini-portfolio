<template>
  <div class="w-full h-full flex flex-col justify-between items-center p-4">
    <!-- Info -->
    <div
      class="w-full flex flex-col items-start justify-center text-gray-700 dark:text-gray-100"
    >
      <h1 class="text-4xl font-bold mb-2">图片格式转换工具</h1>
      <p class="text-sm">
        操作指南：
        上传图片，选择目标格式，点击转换按钮，然后点击下载按钮下载转换后的图片。
      </p>
    </div>

    <!-- imags perview -->
    <div class="mb-4">
      <!-- uploda image -->
      <input type="file" accept="image/*" @change="onFileChange" class="mb-4" />
      <!-- TODO:
        1. darg and drop
        2. multiple files
      -->
      <img
        v-if="previewUrl"
        :src="previewUrl"
        alt="预览"
        class="max-w-96 h-auto border rounded"
      />
    </div>

    <div class="w-1/2 px-4 py-2 flex items-center justify-between">
      <!-- Controls -->
      <div class="flex items-center justify-center">
        <label for="format" class="block mb-2">选择目标格式：</label>
        <select
          id="format"
          v-model="selectedFormat"
          class="mb-4 p-2 border rounded"
        >
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPEG</option>
          <option value="image/webp">WEBP</option>
        </select>
      </div>
      <div class="flex items-center justify-center gap-4">
        <button
          @click="convertImage"
          :disabled="!previewUrl"
          class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          转换
        </button>

        <button
          @click="downloadImage"
          class="ml-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          下载
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const previewUrl = ref<string | null>(null);
const convertedUrl = ref<string | null>(null);
const selectedFormat = ref<string>("image/png");
const canvas = document.createElement("canvas");

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewUrl.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const convertImage = () => {
  if (!previewUrl.value) return;

  const image = new Image();
  image.onload = () => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    // 转换为目标格式
    canvas.toBlob((blob) => {
      if (blob) {
        convertedUrl.value = URL.createObjectURL(blob);
      }
    }, selectedFormat.value);
  };
  image.src = previewUrl.value;
};

const downloadImage = () => {
  if (!convertedUrl.value) return;

  const a = document.createElement("a");
  a.href = convertedUrl.value;
  a.download = `converted.${selectedFormat.value.split("/")[1]}`;
  a.click();
};
</script>

<style scoped></style>
