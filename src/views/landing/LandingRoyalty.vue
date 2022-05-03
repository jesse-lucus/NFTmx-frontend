<script setup>
import LandingSection from './containers/LandingSection.vue';
</script>

<template>
    <landing-section>
        <div class="grid md:grid-cols-2 items-center">
            <div class="sm:px-8">
                <div class="font-press text-white text-xl lg:text-2xl 2xl:text-3xl">Multi Level Royalty</div>
                <div
                    class="font-ibm text-sm lg:text-base 2xl:text-lg text-tertiary-400 mt-8.75 leading-7.5"
                >Creator or even any buyer down the road can set up it's own royalty.</div>
                
            </div>
            <div class="flex justify-end">
                <img v-lazy="'/images/landing/multilevel-royalty.png'" />
            </div>
        </div>
    </landing-section>
</template>
