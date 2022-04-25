<script setup>
import HeadButton from './components/HeadButton.vue';

</script>

<template>
    <div
        class="relative z-10 bg-no-repeat bg-cover bg-right font-press sm:leading-relaxed xl:leading-relaxed text-white px-5.5 sm:px-10 md:px-16 lg:px-22 h-landing"
    >
        <div
            class="h-full w-full absolute left-0 -z-10"
            :style="{ background: `url('/images/landing/hero-image-big-1920.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: 'black' }"
        />
        <div class="max-w-screen-3xl mx-auto h-full flex items-center">
            <div class="relative w-full md:w-landing-md xl:w-landing-lg pb-18">
                <p
                    class="text-home-sm md:text-home-md xl:text-home-lg"
                >BUY NFTS WITH 100% DOWNSIDE PROTECTION</p>
                <div class="flex flex-wrap mt-6 lg:mt-12 gap-5.25 xl:gap-11">
                    <head-button to="home" color="secondary" label="EXPLORE" />
                    <head-button color="primary" label="LIST" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.h-landing {
    height: calc(100vh - 70px);
}
</style>
