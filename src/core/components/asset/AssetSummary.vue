<script setup>
import { useStore } from 'vuex'
import { themeConfig } from '@/core/config';
import NftmxWalletAddressPop from '@/core/components/blockchain-address/NftmxWalletAddressPop.vue';
import marketService from '@/core/services/market.service';
import { ref, watchEffect } from 'vue';
import moralisService from '@/core/services/moralis.service';
import NftmxDivider from '../basic/NftmxDivider.vue';

const props = defineProps({
    asset: Object,
})

const store = useStore();
const votes = ref([]);
watchEffect(() => {
    if (props.asset && props.asset.token_address) {
        marketService.getTokenInfo(props.asset.token_address, props.asset.token_id).then(res => {
            votes.value = res.data.votes || [];
        });
    }
})

const handleVote = () => {
    const userIndex = votes.value.findIndex(id => id === store.state.user.id);
    if (userIndex > -1) {
        marketService.cancelVote(props.asset.token_address, props.asset.token_id, store.state.user.id).then(res => {
            votes.value.splice(userIndex, 1);
        })
    } else {
        marketService.vote(props.asset.token_address, props.asset.token_id, store.state.user.id).then(res => {
            votes.value.push(store.state.user.id);
        })
    }
}
</script>

<template>
    <div class="flex flex-col gap-5.75 py-5.75">
        <div class="flex gap-6 justify-between items-center">
            <div class="text-2xl md:text-3xl font-ibm-bold">{{ asset.name }}</div>
            <div
                class="text:xs md:text-base text-tertiary-400 flex items-center gap-5 font-ibm-medium"
            >
                <span class="leading-4 text-lg">{{ votes.length }}</span>
                <font-awesome-icon
                    :icon="['fas', 'thumbs-up']"
                    :class="[votes.findIndex(id => id === store.state.user.id) > -1 ? 'text-primary-900' : 'text-white', 'transition hover:text-primary-900 cursor-pointer text-lg md:text-2xl']"
                    @click="handleVote()"
                />
            </div>
        </div>
        <div class="flex gap-6 justify-between items-start">
            <div class="flex flex-col sm:flex-row text-xs font-ibm-medium gap-2">
                <div class="flex gap-1">
                    <div class="w-max">Created by</div>
                    <div class="text-primary-900">
                        <nftmx-wallet-address-pop
                            class="text-primary-900"
                            :address="asset.creator ? asset.creator.address : ''"
                        ></nftmx-wallet-address-pop>
                    </div>
                </div>
                <nftmx-divider vertical class="border-white my-0.75 hidden sm:block" />
                <div class="flex gap-1">
                    <div class="w-max">Owned by</div>
                    <div class="text-primary-900">
                        <nftmx-wallet-address-pop
                            class="text-primary-900"
                            :address="asset.owner ? asset.owner.address : ''"
                        ></nftmx-wallet-address-pop>
                    </div>
                </div>
            </div>
            <div
                class="text-xs md:text-sm text-primary-900 font-ibm-bold tracking-wide text-right"
            >MAKE AN OFFER</div>
        </div>
    </div>
</template>
