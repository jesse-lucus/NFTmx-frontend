<script setup>
import { onMounted, ref } from 'vue'
import BodyContainer from '@/core/container/BodyContainer.vue';
import Accordion from '@/core/components/accordion/BasicAccordion.vue';
import NftmxFooter from '@/core/container/NftmxFooter.vue';
import ItemAction from './ItemAction.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import marketService from '@/core/services/market.service';
import moralisService from '@/core/services/moralis.service';
import AssetHistory from '@/views/asset/sell/AssetHistory.vue';
import authService from '@/core/services/auth.service';
import NavBarSearch from '@/core/components/search/NavBarSearch.vue';
import OrderInfo from '@/core/components/asset/OrderInfo.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
const orderId = route.params.orderId;
const order = ref({});
const nft = ref({});
const nftCreator = ref({});

onMounted(() => {
    marketService.getOrder(orderId).then(res => {
        if (!res.data.id) {
            router.push('/browse');
            return;
        }
        order.value = res.data;
        moralisService.getNft(res.data.tokenAddress, res.data.tokenId).then(res => {
            nft.value = res.data;
        })
        moralisService.nftTransfers(res.data.tokenAddress, res.data.tokenId).then(res => {
            const creatorAddress = res.data.result[res.data.result.length - 1].to_address;
            authService.connectWallet(creatorAddress).then(res => {
                nftCreator.value = res;
            })
        })
    });
})

</script>

<template>
    <body-container>
        <div class="grid grid-cols-7 text-white gap-8 mt-11">
            <div class="col-span-7 lg:col-span-3 lg:mr-6.25">
                <order-info
                    :nft="nft"
                    :percent="order.protectionRate / 100"
                    :period="order.protectionTime / 86400"
                    :nftCreator="nftCreator"
                />
            </div>
            <div class="col-span-7 mt-6 mb-4 lg:col-span-4 relative lg:-ml-4">
                <item-action :order="order" :nft="nft" :nftCreator="nftCreator" />
            </div>
        </div>
        <div class="mb-10">
            <asset-history />
        </div>
    </body-container>
</template>
