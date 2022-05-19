<script setup>
import { onMounted, ref } from "vue";
import BundleImage from "@/core/components/basic/BundleImage.vue";
import NftmxButton from "@/core/components/basic/NftmxButton.vue";
import NftmxProgressBar from "@/core/components/basic/NftmxProgressBar.vue";
import NftmxPriceCommon from "@/core/components/price/NftmxPriceCommon.vue";
import Timer from "@/core/components/timer/Timer.vue";
import NftmxHelp from "@/core/components/basic/NftmxHelp.vue";
import { themeConfig } from "@/core/config";
import { useStore } from "vuex";
const syndications = [
  {
    img: [
      "/images/nfts/img1.png",
      "/images/nfts/img2.png",
      "/images/nfts/img3.png",
      "/images/nfts/img4.png",
      "/images/nfts/img5.png",
      "/images/nfts/img6.png",
      "/images/nfts/img7.png",
      "/images/nfts/img8.png",
    ],
    type: "AUCTION",
    lockedValue: 1548325.56,
  },
  {
    img: [
      "/images/nfts/img1.png",
      "/images/nfts/img2.png",
      "/images/nfts/img3.png",
      "/images/nfts/img4.png",
      "/images/nfts/img5.png",
      "/images/nfts/img6.png",
      "/images/nfts/img7.png",
      "/images/nfts/img8.png",
    ],
    type: "FIX_SALE",
    fixPrice: 50000,
    lockedValue: 1548325.56,
  },
  {
    img: "/images/nfts/img3.png",
    type: "FIX_SALE",
    fixPrice: 50000,
    lockedValue: 1548325.56,
  },
  {
    img: "/images/nfts/img4.png",
    type: "AUCTION",
    lockedValue: 1548325.56,
  },
  {
    img: "/images/nfts/img5.png",
    type: "FIX_SALE",
    fixPrice: 50000,
    lockedValue: 1548325.56,
  },
  {
    img: "/images/nfts/img6.png",
    type: "AUCTION",
    lockedValue: 1548325.56,
  },
];

const props = defineProps({
  carouselPlay: Boolean,
});

const store = useStore();
const cards = ref(syndications);
const innerStyles = ref({});
const step = ref("");
const transitioning = ref(false);
const inner = ref(null);
onMounted(() => {
  console.log(inner.value.scrollWidth);
});
</script>

<template>
  <div class="w-full overflow-hidden">
    <div
      :class="[
        carouselPlay
          ? store.state.app.windowWidth < themeConfig.xl2
            ? 'piece'
            : 'piecebig'
          : '',
        'relative w-full flex inner',
      ]"
      ref="inner"
    >
      <div
        class="flex"
        v-for="(item, index) in [...cards, ...cards]"
        :key="index"
      >
        <div
          class="w-max transition grid grid-cols-2 m-4 cursor-default hover:shadow-[0_0px_12px_0px_rgb(0_0_0_/_0.1),_0_0px_0px_0px_rgb(0_0_0_/_0.1);] hover:shadow-primary-700"
        >
          <bundle-image
            :images="JSON.parse(JSON.stringify(item.img))"
            class="relative w-70.75 h-70.75 2xl:w-82.5 2xl:h-82.5 overflow-hidden col-span-2 sm:col-span-1"
          />
          <div
            class="flex flex-col justify-between relative w-70.75 h-70.75 2xl:w-82.5 2xl:h-82.5 bg-black text-white col-span-2 sm:col-span-1"
          >
            <div
              class="absolute top-0 -right-1 w-fill h-11 bg-primary-900 bg-opacity-90 font-ibm-medium text-white text-11 2xl:text-13 flex items-center justify-center"
            >
              <div>10%-100% / 7-365 Downside Protection</div>
              <div
                class="w-2 h-2 absolute right-0.5 -bottom-1 bg-primary-900 rotate-45 -z-10"
              ></div>
            </div>
            <div class="pt-14 pb-2.25 2xl:pb-4 px-8 text-left font-ibm-bold">
              <div class="text-11 2xl:text-xs 2xl:mt-2">
                <div class="font-ibm-semi-bold flex">
                  Syndication type
                  <nftmx-help class="text-8"></nftmx-help>
                </div>
                <div class="text-primary-900 font-ibm-medium leading-5 flex">
                  {{ item.type === "AUCTION" ? "Auction" : "Fix Sale&nbsp;" }}
                  <nftmx-price-common
                    v-if="item.type === 'FIX_SALE'"
                    :price="item.fixPrice"
                  />
                  <span
                    v-if="item.type === 'FIX_SALE'"
                    class="font-ibm text-tertiary-400 flex"
                  >
                    &nbsp;(
                    <span class="font-sans">Ξ&nbsp;</span>
                    {{ item.fixPrice }})
                  </span>
                </div>
                <div class="font-ibm-semi-bold flex pt-3">
                  Total locked value
                  <nftmx-help class="text-8"></nftmx-help>
                </div>
                <div class="text-primary-900 font-ibm-medium leading-5 flex">
                  <nftmx-price-common :price="item.lockedValue" />
                  <span class="font-ibm text-tertiary-400 flex">
                    &nbsp;(
                    <span class="font-sans">Ξ&nbsp;</span>
                    {{ "443.25" }})
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-0.75 mb-1.25 px-8">
              <nftmx-progress-bar />
            </div>

            <div class="snap-center pt-1.5 2xl:pt-2 pb-2">
              <div
                class="2xl:pt-2 pb-2 font-ibm-medium text-11 2xl:text-xs text-center"
              >
                Current auction ends in
              </div>
              <div class="flex justify-center px-4">
                <timer />
              </div>
            </div>
            <nftmx-button
              color="secondary"
              label="JOIN SYNDICATION"
              class="font-press w-full text-xs 2xl:text-sm py-4.25 2xl:py-5 absolute left-0 bottom-0"
            ></nftmx-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inner {
  transition: transform 5s;
  transition-timing-function: linear;
}
.card {
  width: 700px;
  margin-right: 10px;
  /* display: inline-flex; */
  /* optional */
  color: white;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
}
/* optional */
button {
  margin-right: 5px;
  margin-top: 10px;
}
.w-fill {
  width: calc(100% + 4px);
}
.piece {
  animation: carouselmove 60s infinite;
  animation-timing-function: linear;
}
@keyframes carouselmove {
  from {
    left: 0%;
  }
  to {
    left: -3588px;
  }
}
.piecebig {
  animation: bigcarouselmove 60s infinite;
  animation-timing-function: linear;
}
@keyframes bigcarouselmove {
  from {
    left: 0%;
  }
  to {
    left: -4153px;
  }
}
</style>
