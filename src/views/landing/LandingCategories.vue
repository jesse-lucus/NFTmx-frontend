<script setup>
import LandingSection from './containers/LandingSection.vue';
import NftmxPriceCommon from '@/core/components/price/NftmxPriceCommon.vue';
import CategoryCarousel from './components/CategoryCarousel.vue';
import SectionButton from './components/SectionButton.vue';

</script>

<template>
    <landing-section>
        <div class="font-press text-center pt-1 text-white">
            <div class="text-xl sm:text-2xl lg:text-3xl">All Categories</div>
        </div>
        <div class="mt-4">
            <category-carousel></category-carousel>
        </div>
        <div class="mt-10 text-center">
            <section-button to="home" label="GO TO CATEGORIES" />
        </div>
    </landing-section>
</template>
