<script setup>
import { onMounted, ref, watchEffect } from "vue";
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
const left = ref(0);
const anim = ref(null);
onMounted(() => {
  console.log(inner.value.scrollWidth);
});
watchEffect(() => {
  console.log(anim.value, "===", props.carouselPlay);
  if (!anim.value & props.carouselPlay) {
    console.log("start anim");
    anim.value = setInterval(() => {
      console.log("===", left.value);
      left.value = left.value - 1;
      if (left.value < -inner.value.scrollWidth / 2) {
        left.value = 0;
      }
    }, 10);
  } else if (anim.value && !props.carouselPlay) {
    console.log("stop anim");
    clearInterval(anim.value);
    anim.value = null;
  }
});
</script>

<template>
  <div class="w-full overflow-hidden">
    <div
      :class="['relative w-full flex inner']"
      :style="{ left: left + 'px' }"
      ref="inner"
    >
      <div
        class="flex"
        v-for="(item, index) in [...cards, ...cards]"
        :key="index"
      >
        <div
          class="transition duration-300 m-4 cursor-default hover:shadow-[0_0px_12px_0px_rgb(0_0_0_/_0.1),_0_0px_0px_0px_rgb(0_0_0_/_0.1);] hover:shadow-primary-900 w-max"
        >
          <div
            class="w-70.75 sm:w-141.5 h-72 sm:h-48.75 2xl:w-165 bg-tertiary-900 relative"
          >
            <div class="text-tertiary-400 text-10 text-right">
              <font-awesome-icon
                :icon="['fas', 'external-link-alt']"
                class="mr-2 mt-2"
              />
            </div>
            <div
              class="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-black px-6 py-2.5"
            >
              <div class="flex items-center gap-4 pb-4 sm:pb-0">
                <div
                  class="w-18.5 h-18.5"
                  :style="{
                    background:
                      'url(' + '/images/components/drag-drop-logo.png' + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'black',
                  }"
                />
                <div class="font-ibm-medium text-left">
                  <div class="text-tertiary-400 text-xs">DVC #2536</div>
                  <div class="font-ibm-bold text-white">OVR Land</div>
                  <div class="text-xs">
                    <span class="text-tertiary-400"> Created by </span>
                    <span class="text-primary-900"> 77A9D2 </span>
                  </div>
                </div>
              </div>
              <div class="pt-4 sm:pt-0 sm:px-4 grid grid-cols-2">
                <div class="font-ibm-medium text-left text-xs">
                  <div class="font-ibm-bold text-white">Total TVL</div>
                  <div class="text-primary-900">$141565445656</div>
                </div>
                <div class="font-ibm-medium text-left text-xs">
                  <div class="font-ibm-bold text-white">Backers</div>
                  <div class="text-primary-900">4201</div>
                </div>
                <div class="font-ibm-medium text-left text-xs">
                  <div class="font-ibm-bold text-white">Total assets</div>
                  <div class="text-primary-900">1589986</div>
                </div>
                <div class="font-ibm-medium text-left text-xs">
                  <div class="font-ibm-bold text-white">Average ROI</div>
                  <div class="text-primary-900">186.62%</div>
                </div>
              </div>
            </div>
            <button
              class="transition bg-black hover:bg-tertiary-300 text-secondary-900 font-press w-full flex items-center justify-center h-15 bottom-0 absolute text-sm"
            >
              BECOME A BACKER
            </button>
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
