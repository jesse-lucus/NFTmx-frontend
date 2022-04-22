<script setup>
import { ref, watchEffect } from "vue";
import NftmxButton from "@/core/components/basic/NftmxButton.vue";
import Accordion from "@/core/components/accordion/BasicAccordion.vue";
import NftmxDivider from "@/core/components/basic/NftmxDivider.vue";
import CheckboxCell from "@/core/components/basic/CheckboxCell.vue";
import NftmxSearchInput from "@/core/components/basic/NftmxSearchInput.vue";
import SearchAccordion from "./container/SearchAccordion.vue";
import StatusButton from "./components/StatusButton.vue";
import DropDown from "./components/DropDown.vue";
import NftmxInput from "@/core/components/basic/NftmxInput.vue";
import FilterItem from "./components/FilterItem.vue";
import useDebouncedRef from "@/core/utils/useDebouncedRef.js";
import marketService from "@/core/services/market.service";

const props = defineProps({
  filterBy: String,
  filterActive: Boolean,
  collections: Array,
});
const emit = defineEmits([
  "click-filter",
  "click-filter-by",
  "filter-contract",
]);

const lands = ref(4869987);
const collectionName = useDebouncedRef("", 1000);
const filteredCollections = ref([]);

const clickFilter = () => {
  emit("click-filter");
};
const clickFilterBy = (value) => {
  emit("click-filter-by", value);
};
const filterCollection = (address) => {
  emit("filter-contract", address);
};

watchEffect(() => {
  filteredCollections.value = props.collections.filter(
    (collection) =>
      collection.name && collection.name.indexOf(collectionName.value) > -1
  );
});
</script>

<template>
  <div>
    <div class="grid grid-cols-2 text-center text-base font-press mt-5">
      <div
        @click="clickFilterBy('collection')"
        :class="[
          filterBy === 'collection'
            ? 'text-primary-900 border-primary-900'
            : 'text-white border-white',
          'transition hover:text-primary-900 border-b-3 hover:border-primary-900 py-5.75 cursor-pointer',
        ]"
      >
        {{ collections.length }} Collections
      </div>
      <div
        @click="clickFilterBy('lands')"
        :class="[
          filterBy === 'lands'
            ? 'text-primary-900 border-primary-900'
            : 'text-white border-white',
          'transition hover:text-primary-900 border-b-3 hover:border-primary-900 py-5.75 cursor-pointer',
        ]"
      >
        {{ lands.toLocaleString() }} NFTs
      </div>
    </div>
    <div
      class="bg-tertiary-800 border-t border-b border-black py-5 px-4 sm:px-10 lg:px-22"
    >
      <div
        class="flex flex-wrap flex-col xl:flex-row justify-between items-center"
      >
        <div class="flex flex-1 w-full min-w-max items-center">
          <nftmx-search-input
            v-model="filterActive"
            @handle-filter="clickFilter"
            navbar
            class="w-full h-full font-ibm-medium text-sm"
            placeholder="Search items, collections, and accounts"
          ></nftmx-search-input>
        </div>
      </div>
      <div v-if="filterActive">
        <div
          v-if="filterBy === 'lands'"
          class="grid sm:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-6 gap-4 my-4.75"
        >
          <div>
            <div class="border border-black px-5">
              <search-accordion title="Status">
                <template v-slot:content>
                  <div
                    class="grid grid-cols-2 pt-2 gap-2.5 justify-between text-xs pb-6 h-64"
                  >
                    <status-button title="Buy Now" />
                    <status-button title="On Auction" />
                    <status-button title="Has Offers" />
                    <status-button title="Has No Offers" />
                    <status-button title="Recently Sold" />
                    <status-button title="Recently Canceled" />
                    <status-button title="Ending Soon" />
                  </div>
                </template>
              </search-accordion>
            </div>
          </div>
          <div>
            <div class="border border-black px-5">
              <search-accordion title="Price">
                <template v-slot:content>
                  <div
                    class="pt-2 gap-2.5 justify-between text-xs pb-6 mr-1 relative h-64"
                  >
                    <drop-down title="(USD)">
                      <template v-slot:content></template>
                    </drop-down>
                    <div class="flex mt-11.25 items-center">
                      <nftmx-input number class="h-8.75" placeholder="Min" />
                      <span class="font-ibm-medium text-white mx-1">To</span>
                      <nftmx-input number class="h-8.75" placeholder="Max" />
                    </div>
                  </div>
                </template>
              </search-accordion>
            </div>
          </div>
          <div>
            <div class="border border-black px-5">
              <search-accordion title="Categories">
                <template v-slot:content>
                  <div class="h-64 py-4">
                    <div class="flex flex-col h-full gap-3.5 overflow-auto">
                      <filter-item title="Trending" />
                      <filter-item title="Top" />
                      <filter-item title="Art" />
                      <filter-item title="Collectibles" />
                      <filter-item title="Domain names" />
                      <filter-item title="Photography" />
                      <filter-item title="Sports" />
                    </div>
                  </div>
                </template>
              </search-accordion>
            </div>
          </div>
          <div>
            <div class="border border-black px-5">
              <search-accordion title="Collections name">
                <template v-slot:content>
                  <div
                    class="pt-2 gap-2.5 justify-between text-xs pb-6 mr-1 relative h-64"
                  >
                    <div class="relative">
                      <font-awesome-icon
                        :icon="['fas', 'search']"
                        class="text-white text-sm absolute top-2.5 left-4"
                      />
                      <nftmx-input
                        placeholder="Filter"
                        class="pt-2 pb-2.25 pl-11"
                        v-model="collectionName"
                      />
                    </div>
                    <div class="overflow-auto height my-4">
                      <div
                        v-for="(collection, index) in filteredCollections"
                        :key="index"
                        class="flex items-center gap-3.5 font-ibm text-white text-xs py-1.75 cursor-pointer transition hover:text-primary-900"
                        @click="filterCollection(collection.address)"
                      >
                        <div
                          class="w-6 h-6"
                          :style="{
                            background: 'url(' + collection.imageUrl + ')',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }"
                        />
                        <div>
                          {{ collection.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </search-accordion>
            </div>
          </div>
          <div>
            <div class="border border-black px-5">
              <search-accordion title="Chain">
                <template v-slot:content>
                  <div class="h-64 py-4">
                    <div class="flex flex-col h-full gap-3.5 overflow-auto">
                      <filter-item active title="Ethereum" />
                      <filter-item title="Polygon" />
                      <filter-item title="BSC" />
                      <filter-item title="Terra" />
                    </div>
                  </div>
                </template>
              </search-accordion>
            </div>
          </div>
          <div>
            <div class="border border-black px-5">
              <search-accordion title="Sort by">
                <template v-slot:content>
                  <div class="h-64 py-4">
                    <div class="flex flex-col h-full gap-3.5 overflow-auto">
                      <filter-item title="Most value" />
                      <filter-item title="Most activity" />
                      <filter-item title="Most liked" />
                      <filter-item title="Most new" />
                      <filter-item title="Biggest sales" />
                    </div>
                  </div>
                </template>
              </search-accordion>
            </div>
          </div>
        </div>
        <div v-if="filterBy === 'collection'"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-center {
  text-align: -webkit-center;
}
@media (min-width: 1280px) {
  .xl\:max-w-search {
    max-width: 17.25rem;
  }
}
.w-68 {
  width: 17rem /* 260px */;
}
.leading-7\.5 {
  line-height: 30px;
}
.leading-4\.5 {
  line-height: 18px;
}
.height {
  height: calc(100% - theme("spacing[8]"));
}
</style>
