<template>
  <div class="work">
    <!-- Info -->
    <WorkInfo
      work-name="图片格式转换工具"
      work-description="上传图片，选择目标格式，点击转换按钮，然后点击下载按钮下载转换后的图片。"
    />

    <!-- imags perview -->
    <div
      class="mb-4 w-96 h-96 border-yellow-500 p-2 border-4 border-dashed rounded flex justify-center items-center"
    >
      <img
        v-if="previewUrl"
        :src="previewUrl"
        alt="uploaded image"
        class="w-full h-auto border rounded"
      />
      <img
        @click="uploadImage"
        src="/src/assets/imageConvert/plus.svg"
        alt="default"
        class="max-w-96 h-auto rounded cursor-pointer slow_spin"
        v-else
      />
    </div>

    <div class="w-1/2 px-4 py-2 flex items-center justify-between">
      <!-- Controls -->
      <div class="flex items-center justify-center">
        <label for="format" class="text-gray-700 dark:text-gray-100"
          >选择目标格式：</label
        >
        <select
          id="format"
          v-model="selectedFormat"
          class="px-2 py-1 border rounded bg-yellow-500"
        >
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPEG</option>
          <option value="image/webp">WEBP</option>
        </select>
      </div>
      <div class="flex items-center justify-center gap-4">
        <Button type="primary" @click="convertImage" :disabled="!previewUrl">{{
          convertedUrl ? "转换完成" : "转换"
        }}</Button>
        <Button type="success" @click="downloadImage" :disabled="!convertedUrl"
          >下载</Button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import WorkInfo from "../components/WorkInfo.vue";
import { Button } from "../components/ui";

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

    // transfer canvas to blob
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

const uploadImage = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();
  input.addEventListener("change", onFileChange);
};
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
    scale: 1;
  } 
  50% {
    transform: rotate(360deg);
    scale: 2;
  }
  100% {
    transform: rotate(0deg);
    scale: 1;
  }
}

.slow_spin {
  animation: spin 10s linear infinite;
}
</style>
