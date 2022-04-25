<script setup>
import { ref } from 'vue'
import BodyContainer from '@/core/container/BodyContainer.vue';
import ItemAction from './ItemAction.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import marketService from '@/core/services/market.service';
import moralisService from '@/core/services/moralis.service';
import AssetHistory from '@/core/components/asset/AssetHistory.vue';
import AssetInfo from '@/core/components/asset/AssetInfo.vue';
import AssetSummary from '@/core/components/asset/AssetSummary.vue';
import { themeConfig } from '@/core/config';
import AssetOffers from '@/core/components/asset/AssetOffers.vue';
import AssetLedger from '@/core/components/asset/AssetLedger.vue';

const store = useStore();
const route = useRoute();
const id = route.params.id;
const asset = ref({});

marketService.getAsset(id).then(res => {
    asset.value = res.data;
});
</script>

<template>
    <body-container>
        <div class="grid grid-cols-7 text-white gap-8 mt-4 lg:mt-9">
            <div class="col-span-7 lg:col-span-3">
                <asset-summary v-if="store.state.app.windowWidth < themeConfig.lg" :asset="asset" />
                <asset-info :asset="asset" />
            </div>
            <div class="col-span-7 lg:col-span-4 relative">
                <asset-summary v-if="store.state.app.windowWidth >= themeConfig.lg" :asset="asset" />
                <div class="mt-3.25">
                    <item-action :asset="asset" />
                </div>
            </div>
        </div>
        <div class="mb-10">
            <div>
                <asset-history />
            </div>
            <div class="mt-4">
                <asset-offers />
            </div>
            <div class="mt-4">
                <asset-ledger />
            </div>
        </div>
    </body-container>
</template>
