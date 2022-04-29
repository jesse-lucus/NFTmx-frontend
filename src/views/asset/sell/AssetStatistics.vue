<script setup>
import { ref } from "vue";
import NftmxButton from "@/core/components/basic/NftmxButton.vue";
import AssetHistory from "@/core/components/asset/AssetHistory.vue";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["handle-modal"]);

const handleModal = () => {
  emit("handle-modal", !props.modelValue);
};
</script>

<template>
  <div class="bg-tertiary-800 border border-black px-6 pt-5.5 pb-6.25">
    <nftmx-button
      color="primary"
      label="LIST TO SALE"
      class="font-press w-full text-lg py-4"
      @click="handleModal"
    />
  </div>
  <div class="mt-5">
    <asset-history />
  </div>
</template>
