<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import BodyContainer from "@/core/container/BodyContainer.vue";
import NftmxDivider from "@/core/components/basic/NftmxDivider.vue";
import NftmxFooter from "@/core/container/NftmxFooter.vue";
import NftmxSelect from "@/core/components/basic/NftmxSelect.vue";
import TrendingAssets from "./TrendingAssets.vue";
import TrendingSearch from "./TrendingSearch.vue";
import SyndicationCarousel from "@/core/components/carousel/SyndicationCarousel.vue";
import Analyzer from "./Analyzer.vue";
import BackerCarousel from "@/core/components/carousel/BackerCarousel.vue";
import TrendingCollections from "./TrendingCollections.vue";
import Ledger from "./Ledger.vue";

const store = useStore();
const filterBy = ref("collection");
const filterActive = ref(false);
const contract = ref("");

const clickFilter = () => {
  filterActive.value = !filterActive.value;
};
const clickFilterBy = (value) => {
  filterBy.value = value;
};
const filterContract = (address) => {
  contract.value = address;
};
</script>

<template>
  <div
    class="bg-[url('/images/landing/hero-image-1920.png')] bg-no-repeat bg-cover bg-right font-press sm:leading-relaxed xl:leading-relaxed text-white px-5.5 sm:px-10 md:px-16 lg:px-22 h-summary-xs lg:h-96 xl:h-asset-img"
  >
    <div class="max-w-screen-3xl mx-auto">
      <div
        class="relative top-16.75 lg:top-36 xl:top-45.5 w-home-sm lg:w-home-md xl:w-home-lg"
      >
        <p class="text-home-sm lg:text-home-md xl:text-home-lg">
          Buy NFTs with 100% Downside Protection
        </p>
      </div>
    </div>
  </div>
  <body-container :padding="false" footerExtended>
    <div class="py-6 sm:py-4.25">
      <syndication-carousel></syndication-carousel>
    </div>
    <div class="bg-tertiary-800 border border-black pt-3.5">
      <backer-carousel />
      <div
        class="w-full flex gap-6 justify-center text-tertiary-600 text-sm pt-1 pb-6"
      >
        <font-awesome-icon
          :icon="['fas', 'play']"
          class="text-primary-900 cursor-pointer transition hover:text-primary-900"
        />
        <font-awesome-icon
          :icon="['fas', 'pause']"
          class="cursor-pointer transition hover:text-primary-900"
        />
      </div>
    </div>
    <analyzer />
    <trending-search
      :filterBy="filterBy"
      :filterActive="filterActive"
      @click-filter="clickFilter"
      @click-filter-by="clickFilterBy"
      @filter-contract="filterContract"
    />
    <div class="sm:flex justify-center px-10 py-6.5 lg:px-22">
      <ledger />
      <trending-collections v-if="filterBy === 'collection'" />
      <trending-assets v-if="filterBy === 'lands'" :contract="contract" />
    </div>
  </body-container>
</template>
