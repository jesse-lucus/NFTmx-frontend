<script setup>
import NftmxHelp from "@/core/components/basic/NftmxHelp.vue";
import NftmxPrice from "@/core/components/price/NftmxPrice.vue";
import AnalyzerCardContainer from "./container/AnalyzerCardContainer.vue";
import NftmxTooltip from "@/core/components/basic/NftmxTooltip.vue";
import { onMounted, ref } from "vue";
import marketService from "@/core/services/market.service";
import { TokenType } from "@/core/config";

const downsideFunds = ref(0);
const totalSalesFunds = ref(0);

onMounted(() => {
  marketService.getUSDFromToken(TokenType.ETH).then((eth) => {
    const ethPrice = eth.data.USD;
    marketService.getDownsideProtectionFunds().then((res) => {
      downsideFunds.value = (res.data / Math.pow(10, 18)) * ethPrice;
    });
    marketService.getTotalSalesFunds().then((res) => {
      totalSalesFunds.value = (res.data / Math.pow(10, 18)) * ethPrice;
    });
  });
});
</script>

<template>
  <div
    class="grid lg:grid-cols-2 3xl:flex justify-center 3xl:justify-between pt-10.5 pb-2.75 px-22"
  >
    <analyzer-card-container>
      <div class="h-9 flex justify-center">
        Decentralized Venture Capital
        <nftmx-tooltip
          class="-top-2"
          text="Total capital locked in DVC smart contracts, ready to deploy to NFTs listed on NFT.mx network"
        >
          <nftmx-help class="text-10" />
        </nftmx-tooltip>
      </div>
      <div
        class="font-ibm-semi-bold text-lg sm:text-xl text-center pt-2 flex justify-center"
      >
        <nftmx-price :price="1548985.53" color="secondary"></nftmx-price>
      </div>
      <div class="text-11 font-ibm text-tertiary-400 pt-2.5 pb-3">
        <span>Avg ROI 125.52%&nbsp;</span>
        <span class="font-ibm-bold text-secondary-500">Become A Baker</span>
        |
        <span class="font-ibm-bold text-secondary-700">see more DVCs</span>
      </div>
    </analyzer-card-container>
    <analyzer-card-container>
      <div class="h-10 flex justify-center items-center">
        Downside Protection Pending
      </div>
      <div
        class="font-ibm-semi-bold text-lg sm:text-xl text-center pt-2 flex justify-center"
      >
        <nftmx-price :price="downsideFunds"></nftmx-price>
      </div>
    </analyzer-card-container>
    <analyzer-card-container>
      <div class="h-10 flex justify-center items-center">
        Total sales to Date
      </div>
      <div
        class="font-ibm-semi-bold text-lg sm:text-xl text-center pt-2 flex justify-center"
      >
        <nftmx-price :price="totalSalesFunds"></nftmx-price>
      </div>
    </analyzer-card-container>
    <analyzer-card-container>
      <div class="h-10 flex justify-center items-center">
        APY Rewards to Date
        <nftmx-tooltip
          class="-top-2"
          text="Total amount of APY reward to be paid to sellers during downside protection period"
        >
          <nftmx-help class="text-10" />
        </nftmx-tooltip>
      </div>
      <div
        class="font-ibm-semi-bold text-lg sm:text-xl text-center pt-2 flex justify-center"
      >
        <nftmx-price :price="25689963.3289"></nftmx-price>
      </div>
    </analyzer-card-container>
  </div>
</template>
