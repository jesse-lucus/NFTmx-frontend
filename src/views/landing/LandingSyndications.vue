<script setup>
import LandingSection from './containers/LandingSection.vue';
</script>

<template>
    <landing-section black>
        <div class="grid md:grid-cols-2 items-center">
            <div>
                <img src="/images/landing/decentralized-syndications.png" />
            </div>
            <div class="sm:px-8">
                <div class="font-press text-white text-xl lg:text-2xl 2xl:text-3xl">Decentralized Syndication</div>
                <div class="font-ibm text-sm lg:text-base 2xl:text-lg text-tertiary-400 mt-8.75 leading-7.5">
                    DAO syndication is an efficient and scalable Metaverse land solution. Unlike tokenization which leads to security issues, can be a time consuming process, and introduces a potential deadlock of assets which can cause a loss in Metaverse profits.
                </div>
            </div>
        </div>
    </landing-section>
</template>
