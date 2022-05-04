<script setup>
import Accordion from "@/core/components/accordion/BasicAccordion.vue";
import NftmxSaleCard from "@/core/components/cards/NftmxSaleCard.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import marketService from "@/core/services/market.service";
import OpenseaAssetCard from "@/core/components/cards/OpenseaAssetCard.vue";
import { themeConfig } from "@/core/config";
import NftmxDivider from "@/core/components/basic/NftmxDivider.vue";
import { defaultPagination } from "@/core/config";

const props = defineProps({
  title: String,
  ledgerPanelVisible: Boolean,
  last: Boolean,
  filterOption: Object,
});

const store = useStore();
const windowWidth = computed(() => store.state.app.windowWidth);
const open = ref(true);
const orders = ref([]);
const loading = ref(true);
const allAssets = ref({ assets: [], next: "", prev: "" });
const assets = ref([]);
const limit = ref(2);
const assetFilterOption = computed(() => props.filterOption);
const filterData = ref({
  chain: "ETHEREUM",
});

const more = computed(
  () =>
    allAssets.value.assets.length > 0 &&
    assets.value.length < allAssets.value.assets.length
);

const retrieveAssets = (init) => {
  loading.value = true;
  marketService
    .getEthNfts({
      ...filterData.value,
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
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
    });
};
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
    if (limit.value !== 5 && props.ledgerPanelVisible) {
      setLimitValue(5);
    } else if (limit.value !== 6 && !props.ledgerPanelVisible) {
      setLimitValue(6);
    }
  } else if (windowWidth.value >= themeConfig.xl2) {
    if (limit.value !== 4 && props.ledgerPanelVisible) {
      setLimitValue(4);
    } else if (limit.value !== 5 && !props.ledgerPanelVisible) {
      setLimitValue(5);
    }
  } else if (windowWidth.value >= themeConfig.xl) {
    if (limit.value !== 3 && props.ledgerPanelVisible) {
      setLimitValue(3);
    } else if (limit.value !== 4 && !props.ledgerPanelVisible) {
      setLimitValue(4);
    }
  } else if (windowWidth.value >= themeConfig.lg) {
    if (limit.value !== 2 && props.ledgerPanelVisible) {
      setLimitValue(2);
    } else if (limit.value !== 3 && !props.ledgerPanelVisible) {
      setLimitValue(3);
    }
  } else if (
    windowWidth.value >= themeConfig.sm &&
    limit.value !== 2 &&
    !props.ledgerPanelVisible
  ) {
    setLimitValue(2);
  } else {
    if (limit.value !== 1) {
      setLimitValue(1);
    }
  }
});
const filterAssets = () => {
  console.log("============value=========", props.filterOption);
  if (props.filterOption) {
    let data = {};
    data["status"] = props.filterOption.status;
    data["collection"] = props.filterOption.collections;
    data["min"] = props.filterOption.price.min;
    data["max"] = props.filterOption.price.max;
    data["category"] = props.filterOption.category;
    data["chain"] = props.filterOption.chain;
    data["sortby"] = props.filterOption.sortBy;
    console.log("data", data);
    allAssets.value = { assets: [], next: "", prev: "" };
    assets.value = [];
    filterData.value = data;
  }
  retrieveAssets(true);
};
onMounted(() => {
  filterAssets();
});
watch(assetFilterOption, (value) => {
  filterAssets();
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
          <div v-for="(asset, index) in assets" :key="index">
            <nftmx-sale-card v-if="asset.orderId" :order="asset" />
            <opensea-asset-card v-if="!asset.orderId" :asset="asset" />
          </div>
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
