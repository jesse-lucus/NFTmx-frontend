<script setup>
import NftmxInput from "@/core/components/basic/NftmxInput.vue";
import BasicDropdown from "@/core/components/dropdown/BasicDropdown.vue";
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import marketService from "@/core/services/market.service";
import { themeConfig } from "@/core/config";
import OpenseaAssetCard from "@/core/components/cards/OpenseaAssetCard.vue";

const props = defineProps({
  contractAddress: String,
});

const collection = {
  name: "The Sandbox",
  slug: "sandbox",
};
const store = useStore();
const windowWidth = computed(() => store.state.app.windowWidth);
const open = ref(true);
const orders = ref([]);
const loading = ref(true);
const allAssets = ref({ assets: [], next: "", previous: "" });
const assets = ref([]);
const offset = ref(0);
const limit = ref(2);
const more = computed(
  () =>
    allAssets.value.assets.length > 0 &&
    assets.value.length < allAssets.value.assets.length
);

const retrieveAssets = (init) => {
  marketService
    .getEthNfts({
      collection: props.contractAddress,
      chain: "ETHEREUM",
      cursor: allAssets.value.next,
    })
    .then((res) => {
      loading.value = false;
      allAssets.value = {
        assets: [...allAssets.value.assets, ...res.data.nfts],
        next: res.data.next,
        previous: res.data.previous,
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
  assets.value = assets.value.concat(
    allAssets.value.assets.slice(offset.value, offset.value + sliceLimit)
  );
  offset.value += sliceLimit;
  if (!init && allAssets.value.next) {
    retrieveAssets();
  }
};
const setLimitValue = (value) => {
  limit.value = value;
};
watchEffect(() => {
  if (windowWidth.value >= themeConfig.xl3) {
    if (limit.value !== 6) {
      setLimitValue(6);
    }
  } else if (windowWidth.value >= themeConfig.xl2) {
    if (limit.value !== 5) {
      setLimitValue(5);
    }
  } else if (windowWidth.value >= themeConfig.xl) {
    if (limit.value !== 4) {
      setLimitValue(4);
    }
  } else if (windowWidth.value >= themeConfig.lg) {
    if (limit.value !== 3) {
      setLimitValue(3);
    }
  } else if (windowWidth.value >= themeConfig.sm) {
    if (limit.value !== 2) {
      setLimitValue(2);
    }
  } else {
    if (limit.value !== 1) {
      setLimitValue(1);
    }
  }
});
</script>

<template>
  <div class="pb-10">
    <div class="py-4 flex gap-4.75 justify-end">
      <div class="flex relative">
        <font-awesome-icon
          :icon="['fas', 'search']"
          class="text-white text-base pointer-events-none absolute top-4 left-5"
        />
        <div class="bg-tertiary-800 w-68.25">
          <nftmx-input class="h-12.5 pl-12" />
        </div>
      </div>
      <div class="h-12.5 w-68.25 z-10">
        <basic-dropdown title="Single items" class="bg-tertiary-800">
          <template v-slot:content>
            <div
              class="font-ibm-medium text-white px-3.5 flex flex-col gap-1"
            ></div>
          </template>
        </basic-dropdown>
      </div>
      <div class="h-12.5 w-68.25 z-10">
        <basic-dropdown title="Price: low to high" class="bg-tertiary-800">
          <template v-slot:content>
            <div
              class="font-ibm-medium text-white px-3.5 flex flex-col gap-1"
            ></div>
          </template>
        </basic-dropdown>
      </div>
    </div>
    <div>
      <div class="pt-10.5 pb-4">
        <div
          class="grid gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6"
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
        class="text-sm text-right px-6 text-primary-900 font-ibm-medium"
        @click="loadMoreAssets()"
      >
        <span class="cursor-pointer">See More</span>
      </div>
    </div>
  </div>
</template>
