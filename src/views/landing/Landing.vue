<script setup>
import BodyContainer from '@/core/container/BodyContainer.vue';
import NftmxFooter from '@/core/container/NftmxFooter.vue';
import LandingHead from './LandingHead.vue';
import LandingDescription from './LandingDescription.vue';
import LandingGuide from './LandingGuide.vue';
import LandingTopVcs from './LandingTopVcs.vue';
import LandingPopularSyndications from './LandingPopularSyndications.vue';
import LandingCategories from './LandingCategories.vue';
import LandingSyndications from './LandingSyndications.vue';
import LandingFlip from './LandingFlip.vue';
import LandingVcs from './LandingVcs.vue';
import LandingRoyalty from './LandingRoyalty.vue';
</script>

<template>
    <landing-head />
    <body-container :padding="false" footerExtended>
        <landing-description />
        <landing-flip />
        <landing-vcs />
        <landing-guide />
        <landing-syndications />
        <landing-royalty />
    </body-container>
</template>
