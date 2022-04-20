
<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import BodyContainer from '@/core/container/BodyContainer.vue';
import NftmxDivider from '@/core/components/basic/NftmxDivider.vue';
import NftmxFooter from '@/core/container/NftmxFooter.vue';
import NftmxSelect from '@/core/components/basic/NftmxSelect.vue';
import TrendingAssets from './TrendingAssets.vue';
import TrendingSearch from './TrendingSearch.vue';
import SyndicationCarousel from "@/core/components/carousel/SyndicationCarousel.vue";
import Analyzer from './Analyzer.vue';
import BackerCarousel from "@/core/components/carousel/BackerCarousel.vue";

const store = useStore();

</script>

<template>
    <div
        class="bg-[url('/images/landing/hero-image-1920.png')] bg-no-repeat bg-cover bg-right font-press sm:leading-relaxed xl:leading-relaxed text-white px-5.5 sm:px-10 md:px-16 lg:px-22 h-summary-xs lg:h-96 xl:h-asset-img"
    >
        <div class="max-w-screen-3xl mx-auto">
            <div
                class="relative top-16.75 lg:top-36 xl:top-45.5 w-home-sm lg:w-home-md xl:w-home-lg"
            >
                <p
                    class="text-home-sm lg:text-home-md xl:text-home-lg"
                >Buy NFTs with 100% Downside Protection</p>
            </div>
        </div>
    </div>
    <body-container :padding="false" footerExtended>
        <div class="pt-6 sm:pt-4.25">
            <syndication-carousel></syndication-carousel>
        </div>
        <div class="bg-tertiary-800 border border-black py-6">
            <backer-carousel />
        </div>
        <analyzer />
        <trending-search />
        <trending-assets />
    </body-container>
</template>
