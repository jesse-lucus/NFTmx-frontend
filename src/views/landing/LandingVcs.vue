<script setup>
import LandingSection from "./containers/LandingSection.vue";
import SectionButton from "./components/SectionButton.vue";
</script>

<template>
  <landing-section black>
    <div class="grid grid-cols-1 md:grid-cols-2 items-center 2xl:px-20">
      <div class>
        <div class="font-press text-white text-xl lg:text-2xl 2xl:text-3xl">
          Decentralized Venture Capital
        </div>
        <div
          class="font-ibm text-sm lg:text-base 2xl:text-lg text-tertiary-400 mt-8.75 2xl:leading-7.5"
        >
          Decentralized Venture Capital (DVC) fund, allows investors to pull
          fund together at no loss strategy built through smart contracts. The
          DVC contract allows backers to contribute funds to the DVC, while the
          DVC uses it to invest in Metaverse land that is shielded with 100%
          Downside Protection.
          <br /><br />
          The DVC chooses its investment based on the Metaverse lands'
          popularity rate, Downside Protection offered, Metaverse platform
          offered, and maximum investment amount per Metaverse land (these
          criteria can be changed by voting in the DVC). Sellers control 100% of
          their own opportunities under this structure, it is not dependent on
          individual or community voting.
          <br /><br />
          Anyone can create its own DVC, with its own buy and sell criteria and
          charge carry and fees and bring added value to the LPs by knowledge or
          land appreciation.
        </div>
        <div class="mt-14">
          <section-button to="home" label="GO TO DVC AERA" />
        </div>
      </div>
      <div class="flex justify-end mt-6 md:mt-0">
        <img v-lazy="'/images/landing/decentralized-vcs.png'" />
      </div>
    </div>
  </landing-section>
</template>
