<template>
  <carousel
    :items-to-show="itemsToShow"
    :wrap-around="true"
    :modelValue="modelValue"
    :transition="2900"
  >
    <slide v-for="(item, index) in syndications" :key="index">
      <div class="carousel__item" :style="{ marginLeft: marginLeft + 'em' }">
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
                    background: 'url(' + '/images/components/drag-drop-logo.png' + ')',
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
    </slide>
  </carousel>
</template>

<script setup>
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import Ribbon from "@/core/components/basic/Ribbon.vue";
import NftmxButton from "@/core/components/basic/NftmxButton.vue";
import NftmxProgressBar from "@/core/components/basic/NftmxProgressBar.vue";
import "vue3-carousel/dist/carousel.css";
import { themeConfig, syndications } from "@/core/config";
import NftmxTrimString from "@/core/components/basic/NftmxTrimString.vue";
import NftmxPriceCommon from "@/core/components/price/NftmxPriceCommon.vue";
import Timer from "@/core/components/timer/Timer.vue";
import NftmxHelp from "@/core/components/basic/NftmxHelp.vue";

const props = defineProps({
  carouselPlay: Boolean,
});

const windowSize = ref({
  width: 0,
  height: 0,
});
const itemsToShow = ref(3);
const marginLeft = ref(-42);
const modelValue = ref(0);

let intervalCarouselPlay;

function handleResize() {
  windowSize.value.width = window.innerWidth;
  windowSize.value.height = window.innerHeight;
  if (windowSize.value.width >= 1920) {
    itemsToShow.value = 2.7;
  } else if (windowSize.value.width < 640) {
    itemsToShow.value = 1.01;
    marginLeft.value = 0;
  } else {
    const base = windowSize.value.width >= 1190 ? 2 : 1;
    const adjust =
      windowSize.value.width >= 1536
        ? 1410
        : windowSize.value.width >= 1190
        ? 1192
        : 600;
    const adjustLeft =
      windowSize.value.width >= 1536
        ? -42
        : windowSize.value.width >= 1190
        ? -38
        : -37;
    const adjustDivide = windowSize.value.width >= 1190 ? 660 : 566;
    itemsToShow.value = (windowSize.value.width - adjust) / adjustDivide + base;
    if (itemsToShow.value > 2) {
      marginLeft.value = adjustLeft;
    } else {
      marginLeft.value = 0;
    }
  }
}
handleResize();
window.addEventListener("resize", handleResize);
watchEffect(() => {
  if (props.carouselPlay) {
    intervalCarouselPlay = setInterval(() => {
      modelValue.value--;
    }, 3000);
  } else {
    clearInterval(intervalCarouselPlay);
  }
});
</script>
