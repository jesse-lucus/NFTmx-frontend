<script setup>import { ref } from 'vue';
import marketService from '@/core/services/market.service';
import { TokenType } from '@/core/config';
import { useStore } from 'vuex';
import { roundTo } from '@/core/utils';

const store = useStore();
const soldItems = ref([]);
const canceledItems = ref([]);
const listedItems = ref([]);
const selected = ref('SOLD');
const selectedItems = ref([]);
const bnbPrice = ref(0);

marketService.getUSDFromToken(TokenType.BNB).then(res => {
    bnbPrice.value = res.data.USD;
})
marketService.soldItems().then(res => {
    soldItems.value = res.data;
    selectedItems.value = res.data;
});
marketService.canceledItems().then(res => {
    canceledItems.value = res.data;
});
marketService.listedItems().then(res => {
    listedItems.value = res.data;
});

const selectLedger = (value) => {
    selected.value = value;
    switch (selected.value) {
        case 'SOLD':
            selectedItems.value = soldItems.value;
            break;
        case 'CANCELED':
            selectedItems.value = canceledItems.value;
            break;
        case 'LISTED':
            selectedItems.value = listedItems.value;
            break;

        default:
            break;
    }
}
</script>

<template>
    <div class="w-full sm:w-68 pt-2 cursor-default">
        <div class="flex font-press text-white">
            <span class="text-lg">Ledger</span>
            <font-awesome-icon
                :icon="['fas', 'external-link-alt']"
                class="text-primary-900 cursor-pointer ml-4 mt-1"
            />
        </div>
        <div class="border border-black my-5.5 bg-tertiary-800">
            <div
                class="grid grid-cols-4 border-b border-black font-ibm-semi-bold text-11 text-center"
            >
                <div
                    @click="selectLedger('SOLD')"
                    :class="[selected === 'SOLD' ? 'bg-tertiary-900' : '', 'text-primary-900 border-r border-black pt-4.75 pb-4.5 hover:bg-tertiary-900 cursor-pointer transition']"
                >SOLD</div>
                <div
                    @click="selectLedger('CANCELED')"
                    :class="[selected === 'CANCELED' ? 'bg-tertiary-900' : '', 'text-red-900 border-r border-black pt-4.75 pb-4.5 hover:bg-tertiary-900 cursor-pointer transition']"
                >CANCELED</div>
                <div
                    @click="selectLedger('LISTED')"
                    :class="[selected === 'LISTED' ? 'bg-tertiary-900' : '', 'text-white border-r border-black pt-4.75 pb-4.5 hover:bg-tertiary-900 cursor-pointer transition']"
                >LISTED</div>
                <div
                    @click="selectLedger('CREATED')"
                    :class="[selected === 'CREATED' ? 'bg-tertiary-900' : '', 'text-tertiary-500 pt-4.75 pb-4.5 hover:bg-tertiary-900 cursor-pointer transition']"
                >CREATED</div>
            </div>
            <div
                class="grid grid-cols-2 border-b border-black font-ibm-bold text-11 text-tertiary-500"
            >
                <div class="border-r border-black pt-3.5 pb-2.75 pl-3">Items</div>
                <div class="pt-3.5 pb-2.75 pl-3">Price (USD)</div>
            </div>
            <div class="grid grid-cols-2 border-black text-xs">
                <template v-for="(item, index) in selectedItems.items" :key="index">
                    <div
                        :class="[index === selectedItems.items.length - 1 ? 'pb-6.25' : 'pb-1', 'text-white border-r border-black pt-5 pl-3']"
                    >{{ item.tokenName }}</div>
                    <div
                        :class="[store.getters['market/etherFromWei'](item.tokenPrice) * bnbPrice > 300 ? 'text-red-900' : store.getters['market/etherFromWei'](item.tokenPrice) * bnbPrice < 1 ? 'text-white' : 'text-primary-900', index === selectedItems.items.length - 1 ? 'pb-6.25' : 'pb-1', 'pt-5 pl-3']"
                    >{{ roundTo(store.getters['market/etherFromWei'](item.tokenPrice) * bnbPrice) }}</div>
                </template>
            </div>
        </div>
    </div>
</template>