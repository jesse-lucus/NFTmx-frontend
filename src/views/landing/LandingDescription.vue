<script setup>
import LandingSection from "./containers/LandingSection.vue";
</script>

<template>
  <landing-section black>
    <div
      class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-tertiary-900 text-center"
    >
      <div class="md:pr-20 2xl:pr-40 pb-10 md:pb-0">
        <div class="flex justify-center">
          <img src="/images/landing/for-buyers.png" />
        </div>
        <div class="text-xl lg:text-2xl font-ibm-bold mt-6 mb-4.5">
          For Buyer
        </div>
        <div
          class="font-press text-primary-900 text-lg sm:text-xl 3xl:text-2xl"
        >
          100% Downside Protection
        </div>
        <div class="text-tertiary-500 text-sm sm:text-base font-ibm mt-6.25">
          If you are a buyer, think of NFT.mx as a new strategic staking program
          with upside from selling the NFT, while also providing the option to
          cancel your investment and get a 100% refund with your original
          tokens.
        </div>
      </div>
      <div class="mt-6 sm:mt-0 md:pl-20 2xl:pl-40 pt-10 md:pt-0">
        <div class="flex justify-center">
          <img src="/images/landing/for-sellers.png" />
        </div>
        <div class="text-xl lg:text-2xl font-ibm-bold mt-6 mb-4.5">
          For Seller
        </div>
        <div
          class="font-press text-primary-900 text-lg sm:text-xl 3xl:text-2xl"
        >
          New Way to Stake NFT
        </div>
        <div class="text-tertiary-500 text-sm sm:text-base font-ibm mt-6.25">
          If you are a seller, NFT.mx allows you to increase your success rate
          by offering buyers downside protection all while gaining profits from
          the APY in leveraging other people's money.
        </div>
      </div>
    </div>
  </landing-section>
</template>
