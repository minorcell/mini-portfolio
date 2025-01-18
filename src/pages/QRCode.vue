<template>
  <div class="w-full h-full flex flex-col justify-start items-center p-4">
    <!-- Info -->
    <WorkInfo
      work-name="二维码生成"
      work-description="输入网址，点击生成二维码，然后点击下载按钮下载生成的二维码。"
    />

    <!-- Input and Generate Button -->
    <div
      class="w-full flex flex-col items-center justify-evenly p-10 gap-8 mt-5"
    >
      <!-- Input -->
      <div class="w-4/5">
        <Input v-model="url" type="text" placeholder="请输入网址" />
      </div>
      <!-- Generate -->
      <div class="w-4/5 h-auto flex justify-between items-center mt-5">
        <!-- QR Code -->
        <div
          class="w-3/5 h-full flex justify-center items-center rounded-lg overflow-hidden"
        >
          <img
            :src="qrCodeImage ? qrCodeImage : '/src/assets/QRCode/qrcode.svg'"
            alt="Generated QR Code"
            class="w-full h-auto"
          />
        </div>
        <!-- Controls -->
        <div
          class="w-2/5 h-full flex flex-col justify-end items-end gap-8"
        >
          <Button
            size="large"
            :disabled="!url"
            @click="generateQRCode"
            type="warning"
          >
            生成二维码
          </Button>
          <Button
            size="large"
            :disabled="!qrCodeImage"
            @click="downloadQRCode"
            type="success"
          >
            下载二维码
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import WorkInfo from "../components/WorkInfo.vue";
import { Button, Input } from "../components/ui";
import QRCode from "qrcode";

const url = ref("");
const qrCodeImage = ref("");

// generate QR Code
const generateQRCode = async () => {
  qrCodeImage.value = await QRCode.toDataURL(url.value);
};

// download QR Code
const downloadQRCode = () => {
  const link = document.createElement("a");
  link.href = qrCodeImage.value;
  link.download = "qrcode.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped></style>
