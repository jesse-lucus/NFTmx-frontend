<script setup>
import { useStore } from "vuex";
import { themeConfig } from "@/core/config";
import Accordion from "@/core/components/accordion/BasicAccordion.vue";
import { ref } from "vue";
import NftmxButton from "@/core/components/basic/NftmxButton.vue";

const store = useStore();
const items = [
  {
    name: "All time",
  },
];
</script>

<template>
  <accordion>
    <template v-slot:caption>
      <div class="flex items-center">
        <div class="text-lg font-ibm-bold pt-4 pb-3.5">Offers</div>
        <font-awesome-icon
          :icon="['fas', 'external-link-alt']"
          class="text-primary-900 text-sm cursor-pointer ml-8 mt-1"
        />
      </div>
    </template>
    <div
      class="min-h-[50px] text-white text-center border-b border-black text-2xl py-10"
    >
      No offers yet
    </div>
    <div class="px-4 py-3">
      <nftmx-button
        outline
        color="primary"
        label="MAKE AN OFFER"
        small
        class="font-ibm-bold w-37 text-13 text-primary-900 h-8"
      />
    </div>
  </accordion>
</template>
