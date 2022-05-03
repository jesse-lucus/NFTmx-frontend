<script setup>
import { computed, onMounted, ref } from "vue";
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
import BasicCarousel from "@/core/components/carousel/BasicCarousel.vue";

const store = useStore();
const filterBy = ref("collection");
const filterActive = ref(false);
const contract = ref("");
const ledgerPanelVisible = ref(true);
const carouselPlay = ref(false);
const collections = ref([]);

const clickFilter = () => {
  filterActive.value = !filterActive.value;
};
const clickFilterBy = (value) => {
  filterBy.value = value;
};
const filterContract = (address) => {
  contract.value = address;
};
const toggleLedgerPanel = () => {
  ledgerPanelVisible.value = !ledgerPanelVisible.value;
};
const setCollections = (value) => {
  collections.value = value;
};
</script>

<template>
  <div
    class="relative bg-[url('/images/landing/hero-image-bg-1920.png')] bg-no-repeat bg-cover bg-right font-press sm:leading-relaxed xl:leading-relaxed text-white px-5.5 sm:px-10 md:px-16 lg:px-22 h-summary-xs lg:h-96 xl:h-asset-img overflow-hidden"
  >
    <div
      class="w-full h-full absolute -right-80 overflow-hidden flex items-center"
    >
      <div class="h-1/2 w-full animation anim1 absolute"></div>
      <div class="h-1/2 w-full animation anim2 absolute"></div>
      <div class="h-1/2 w-full animation anim3 absolute"></div>
      <div class="h-1/2 w-full animation anim4 absolute"></div>
      <div class="h-1/2 w-full animation anim5 absolute"></div>
      <div class="h-1/2 w-full panel absolute"></div>
    </div>
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
      <syndication-carousel :carouselPlay="carouselPlay"></syndication-carousel>
    </div>
    <div class="bg-tertiary-800 border border-black pt-3.5">
      <backer-carousel :carouselPlay="carouselPlay" />
      <div
        class="w-full flex gap-6 justify-center text-tertiary-600 text-sm pt-1 pb-6"
      >
        <font-awesome-icon
          v-if="!carouselPlay"
          :icon="['fas', 'play']"
          class="text-primary-900 cursor-pointer transition hover:text-primary-900"
          @click="carouselPlay = true"
        />
        <font-awesome-icon
          v-if="carouselPlay"
          :icon="['fas', 'pause']"
          class="cursor-pointer transition hover:text-primary-900"
          @click="carouselPlay = false"
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
      :collections="collections"
    />
    <div
      class="relative sm:flex justify-center px-4 sm:px-10 pt-6.5 pb-15 lg:px-22"
    >
      <ledger
        :ledgerPanelVisible="ledgerPanelVisible"
        :filterBy="filterBy"
        @toggle-ledger-panel="toggleLedgerPanel"
      />
      <trending-collections
        :ledgerPanelVisible="ledgerPanelVisible"
        v-if="filterBy === 'collection'"
        @set-collections="setCollections"
      />
      <trending-assets
        :ledgerPanelVisible="ledgerPanelVisible"
        v-if="filterBy === 'lands'"
        :contract="contract"
      />
    </div>
  </body-container>
</template>

<style scoped>
.perspective {
  perspective: 100px;
}
.panel {
  transform: perspective(22px) rotateY(-3deg);
  background: linear-gradient(
    to right,
    rgb(0, 0, 0, 0.8),
    rgba(36, 36, 36, 0.1) 50%,
    rgba(255, 255, 255, 0)
  );
}
.animation {
  background: url("/images/landing/hero-nfts.png");
  background-repeat: repeat;
  background-size: 100% 100%;
}
.anim1 {
  transform: perspective(15px) rotateY(-3deg) translate3d(0px, -100px, -1px);
  animation: animatedBackground1 300s linear infinite;
}
@keyframes animatedBackground1 {
  from {
    background-position: 0 0;
  }
  /*use negative width if you want it to flow right to left else and positive for left to right*/
  to {
    background-position: -10000px 0;
  }
}
.anim2 {
  transform: perspective(17px) rotateY(-3deg) translate3d(0px, 80px, -2px);
  animation: animatedBackground2 300s linear infinite;
}
@keyframes animatedBackground2 {
  from {
    background-position: -300px 0px;
  }
  to {
    background-position: -10300px 0px;
  }
}
.anim3 {
  transform: perspective(19px) rotateY(-3deg) translate3d(0px, -80px, -3px);
  animation: animatedBackground3 300s linear infinite;
}
@keyframes animatedBackground3 {
  from {
    background-position: -700px 0px;
  }
  to {
    background-position: -10700px 0px;
  }
}
.anim4 {
  transform: perspective(21px) rotateY(-3deg) translate3d(0px, 40px, -4px);
  animation: animatedBackground4 300s linear infinite;
}
@keyframes animatedBackground4 {
  from {
    background-position: -1200px 0px;
  }
  to {
    background-position: -11200px 0px;
  }
}
.anim5 {
  transform: perspective(22px) rotateY(-3deg);
  animation: animatedBackground5 300s linear infinite;
}
@keyframes animatedBackground5 {
  from {
    background-position: -1500px 0px;
  }
  to {
    background-position: -11500px 0px;
  }
}
</style>
