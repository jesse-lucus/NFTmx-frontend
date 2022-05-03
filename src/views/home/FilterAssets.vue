<script setup>
import Accordion from "@/core/components/accordion/BasicAccordion.vue";
import NftmxSaleCard from "@/core/components/cards/NftmxSaleCard.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref, watchEffect } from "vue";
import marketService from "@/core/services/market.service";
import OpenseaAssetCard from "@/core/components/cards/OpenseaAssetCard.vue";
import { themeConfig } from "@/core/config";
import NftmxDivider from "@/core/components/basic/NftmxDivider.vue";
import { defaultPagination } from "@/core/config";

const props = defineProps({
  title: String,
  contract: { type: String, default: "" },
  ledgerPanelVisible: Boolean,
  last: Boolean,
  filterOption: Object,
});

const store = useStore();
const windowWidth = computed(() => store.state.app.windowWidth);
const open = ref(true);
const orders = ref([]);
const filterContract = ref("");
const loading = ref(true);
const allAssets = ref({ assets: [], next: "", prev: "" });
const assets = ref([]);
const limit = ref(2);
const more = computed(
  () =>
    allAssets.value.assets.length > 0 &&
    assets.value.length < allAssets.value.assets.length
);

const retrieveAssets = (init) => {
  marketService
    .getEthNfts({
      contract: filterContract.value,
      cursor: allAssets.value.next,
      limit: defaultPagination.limit,
    })
    .then((res) => {
      loading.value = false;
      allAssets.value = {
        assets: [...allAssets.value.assets, ...res.data.nfts],
        next: res.data.next,
        prev: res.data.prev,
      };
      if (init) {
        loadMoreAssets(init);
      }
    });
};

onMounted(() => {
  retrieveAssets(true);
});

const loadMoreAssets = (init) => {
  const missed = limit.value - (assets.value.length % limit.value);
  const sliceLimit = init ? limit.value : limit.value * 3 + missed;
  const nextStartPoint = assets.value.length;
  assets.value = assets.value.concat(
    allAssets.value.assets.slice(nextStartPoint, nextStartPoint + sliceLimit)
  );
  if (!init && allAssets.value.next) {
    retrieveAssets();
  }
};
const setLimitValue = (value) => {
  limit.value = value;
};
watchEffect(() => {
  if (windowWidth.value >= themeConfig.xl3) {
    if (limit.value !== 5) {
      setLimitValue(5);
    }
  } else if (windowWidth.value >= themeConfig.xl2) {
    if (limit.value !== 4) {
      setLimitValue(4);
    }
  } else if (windowWidth.value >= themeConfig.xl) {
    if (limit.value !== 3) {
      setLimitValue(3);
    }
  } else if (windowWidth.value >= themeConfig.lg) {
    if (limit.value !== 2) {
      setLimitValue(2);
    }
  } else {
    if (limit.value !== 1) {
      setLimitValue(1);
    }
  }
});
watchEffect(() => {
  if (props.contract !== filterContract.value) {
    console.log(props.contract);
    filterContract.value = props.contract;
    allAssets.value = { assets: [], next: "", prev: "" };
    assets.value = [];
    retrieveAssets(true);
  }
});
watchEffect(() => {
  if (props.filterOption) {
    console.log("==========", props.filterOption.status);
  }
});
</script>

<template>
  <div class="-mx-4">
    <accordion :border="false" :bIcon="true" :updatePeried="1000">
      <template v-slot:caption>
        <div class="flex items-center w-full">
          <div class="flex-1 text-lg font-press pt-2.75 pb-3 mr-4">
            {{ title }}
          </div>
        </div>
      </template>
      <div class="px-4 pt-2 pb-4">
        <div
          :class="[
            ledgerPanelVisible
              ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6',
            'grid gap-4.5',
          ]"
        >
          <opensea-asset-card
            v-for="(asset, index) in assets"
            :key="index"
            :asset="asset"
          />
        </div>
        <div
          v-if="loading"
          class="h-96 flex justify-center items-center font-ibm-bold text-tertiary-500 text-lg"
        >
          Loading...
        </div>
        <div
          v-if="!loading && allAssets.assets.length === 0"
          class="h-96 flex justify-center items-center font-ibm-bold text-tertiary-500 text-lg"
        >
          No Lands found
        </div>
      </div>
      <div
        v-if="more"
        class="text-sm text-right px-6 text-primary-900 font-ibm"
        @click="loadMoreAssets()"
      >
        <span class="cursor-pointer">See More</span>
      </div>
    </accordion>
  </div>
  <nftmx-divider v-if="!last" class="mt-8.5 mb-6" />
</template>
