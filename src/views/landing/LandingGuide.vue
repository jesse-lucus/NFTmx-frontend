<script setup>
import LandingSection from "./containers/LandingSection.vue";
</script>

<template>
  <landing-section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 text-center py-7">
      <div class="items-center px-1">
        <img src="/images/landing/create-collections.png" class="h-26" />
        <div class="text-white font-ibm-bold text-2xl mt-7">
          Decentralized collection
        </div>
        <div class="text-tertiary-400 font-ibm text-base mt-3.25">
          All lands automaticity organized as a collection based on the same
          smart contract factory. <br />
          Only verified smart contract owner can edit collection information.
        </div>
      </div>
      <div class="items-center px-1">
        <img
          src="/images/landing/decentralized-authentications.png"
          class="h-26"
        />
        <div class="text-white font-ibm-bold text-2xl mt-7">
          Decentralized authentications
        </div>
        <div class="text-tertiary-400 font-ibm text-base mt-3.25">
          Real time decentralized check button to verify if your LAND is
          authentic or fake.<br />
          We'll let you know which collection this Land belong to.
        </div>
      </div>
    </div>
  </landing-section>
</template>
