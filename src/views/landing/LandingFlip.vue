<script setup>
import LandingSection from "./containers/LandingSection.vue";
</script>

<template>
  <landing-section>
    <div class="grid md:grid-cols-2 items-center 2xl:px-20">
      <div>
        <img v-lazy="'/images/landing/flip-others-nft.png'" />
      </div>
      <div class="2xl:px-8 mt-10 md:mt-0">
        <div class="font-press text-white text-xl lg:text-2xl 2xl:text-3xl">
          Flip Other People NFTs at Zero Risk
        </div>
        <div
          class="font-ibm text-sm lg:text-base 2xl:text-lg text-tertiary-400 mt-5.75 leading-7.5"
        >
          Buy NFT's under 100% downside protection and sell those NFTs forward
          even before you even complete your own purchasing.
        </div>
      </div>
    </div>
  </landing-section>
</template>
