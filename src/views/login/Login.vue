<script setup>
import { computed, ref } from 'vue';
import BodyContainer from '@/core/container/BodyContainer.vue';
import NftmxFooter from '@/core/container/NftmxFooter.vue';
import ConnectWallet from './ConnectWallet.vue';
import ConnectPhantomWallet from './ConnectPhantomWallet.vue';
import NftmxWalletCard from '@/core/components/cards/NftmxWalletCard.vue';
import { walletList } from '@/core/config';
import { phantomWalletList } from "@/core/config";
const selectedWallet = ref(walletList[0]);
const selectedPhantomWallet = ref(phantomWalletList[0]);

</script>

<template>
    <body-container>
        <div class="sm:mt-8">
            <connect-wallet :wallet="selectedWallet" />
        </div>
        <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-5 3xl:grid-cols-6 justify-items-center gap-4 mt-7.5">
            <nftmx-wallet-card
                v-for="wallet in walletList"
                :key="wallet.id"
                :wallet="wallet"
                @click="selectedWallet = wallet"
                :active="selectedWallet.id === wallet.id"
            />
        </div>
        <div class="sm:mt-8">
            <connect-phantom-wallet :wallet="selectedPhantomWallet" />
        </div>
    </body-container>
    <nftmx-footer />
</template>