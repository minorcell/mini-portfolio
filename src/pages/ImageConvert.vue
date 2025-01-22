<template>
  <div class="work">
    <!-- Info -->
    <WorkInfo
      work-name="图片转换"
      work-description="上传图片，选择目标格式，点击转换按钮，然后点击下载按钮下载转换后的图片。"
    />

    <!-- images preview -->
    <div
      class="relative mb-4 w-96 h-96 border-yellow-500 p-2 border-4 border-dashed rounded flex justify-center items-center"
    >
      <img
        v-if="previewUrl"
        src="/src/assets/imageConvert/clear.svg"
        alt="clear button"
        class="w-8 h-8 absolute top-0 right-0 cursor-pointer"
        @click="clearImage"
      />
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

    <!-- Image Info: size 、 format 、 resolution -->
    <div
      class="duration-700 w-1/2 h-12 flex justify-evenly items-center mb-4 text-gray-700 dark:text-gray-100"
    >
      <div>
        原体积：{{
          originalSize
            ? originalSize > 1024
              ? (originalSize / 1024).toFixed(2)
              : originalSize
            : "--"
        }}
        {{ originalSize ? (originalSize > 1024 ? "MB" : "KB") : "KB" }}
      </div>
      <div>
        转换后体积：{{
          convertedSize
            ? convertedSize > 1024
              ? (convertedSize / 1024).toFixed(2)
              : convertedSize
            : "--"
        }}
        {{ convertedSize ? (convertedSize > 1024 ? "MB" : "KB") : "KB" }}
      </div>
      <div>
        体积转换比例：
        <span
          :class="{
            'text-red-500': convertedSize > originalSize,
            'text-green-500': convertedSize < originalSize,
          }"
          >{{ convertedSize ? (convertedSize / originalSize).toFixed(2) : "—" }}
        </span>
      </div>
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
          <option value="image/svg+xml">SVG</option>
          <option value="image/gif">GIF</option>
        </select>
      </div>
      <div class="flex items-center justify-center gap-4">
        <Button
          type="primary"
          @click="convertImage"
          :disabled="!previewUrl"
          :loading="isTransforming"
          >{{ statusText }}</Button
        >
        <Button type="success" @click="downloadImage" :disabled="!convertedUrl"
          >下载</Button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

import WorkInfo from "../components/WorkInfo.vue";
import { Button } from "../components/ui";

const previewUrl = ref<string | null>(null);
const convertedUrl = ref<string | null>(null);
const selectedFormat = ref<string>("image/png");
const isTransforming = ref<boolean>(false);
const originalSize = ref<number>(0);
const convertedSize = ref<number>(0);
const canvas = document.createElement("canvas");

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewUrl.value = reader.result as string;
      originalSize.value = parseFloat((file.size / 1024).toFixed(2));
    };
    reader.readAsDataURL(file);
  }
};

const convertImage = () => {
  if (!previewUrl.value) return;
  isTransforming.value = true;
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
        convertedSize.value = parseFloat((blob.size / 1024).toFixed(2)); // 转换为KB并保留两位小数
      }
    }, selectedFormat.value);
  };
  image.src = previewUrl.value;
  isTransforming.value = false;
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

const clearImage = () => {
  previewUrl.value = null;
  convertedUrl.value = null;
  originalSize.value = 0;
  convertedSize.value = 0;
};

// computed status by url and isTransforming
const statusText = computed(() => {
  if (isTransforming.value) {
    return "正在转换";
  } else if (convertedUrl.value) {
    return "转换完成";
  } else {
    return "开始转换";
  }
});
</script>
