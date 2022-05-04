<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
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
import { filterStatus, categories, chains, sortBy } from "@/core/config";
import { findAndRemove } from "@/core/utils";

const props = defineProps({
  filterBy: String,
  filterActive: Boolean,
  collections: Array,
  filterOption: Object,
});
const emit = defineEmits(["click-filter", "click-filter-by", "filter-assets"]);

const searchText = ref("");
const lands = ref(0);
const collectionName = useDebouncedRef("", 1000);
const filteredCollections = ref([]);
const minPrice = ref();
const maxPrice = ref();

const clickFilter = () => {
  emit("click-filter");
};
const clickFilterBy = (value) => {
  emit("click-filter-by", value);
};
const filterByStatus = (option) => {
  const tempOption = props.filterOption;
  let options = JSON.parse(JSON.stringify(tempOption));
  const index = options.status.indexOf(option);
  if (index > -1) {
    options.status.splice(index, 1);
  } else {
    options.status.push(option);
  }
  emit("filter-assets", options);
};
const filterByCategory = (option) => {
  const tempOption = props.filterOption;
  let options = JSON.parse(JSON.stringify(tempOption));
  if (options.category === option) {
    options.category = "";
  } else {
    options.category = option;
  }
  emit("filter-assets", options);
};
const filterByChain = (option) => {
  const tempOption = props.filterOption;
  let options = JSON.parse(JSON.stringify(tempOption));
  if (options.chain === option) {
    options.chain = "";
  } else {
    options.chain = option;
  }
  emit("filter-assets", options);
};
const filterBySort = (option) => {
  const tempOption = props.filterOption;
  let options = JSON.parse(JSON.stringify(tempOption));
  if (options.sortBy === option) {
    options.sortBy = "";
  } else {
    options.sortBy = option;
  }
  emit("filter-assets", options);
};
const filterByCollections = (option) => {
  const tempOption = props.filterOption;
  let options = JSON.parse(JSON.stringify(tempOption));
  const index = options.collections.indexOf(option);
  if (index > -1) {
    options.collections.splice(index, 1);
  } else {
    options.collections.push(option);
  }
  emit("filter-assets", options);
};
watchEffect(() => {
  filteredCollections.value = props.collections.filter(
    (collection) =>
      collection.name && collection.name.indexOf(collectionName.value) > -1
  );
});
onMounted(() => {
  marketService.getEthNftsCount().then((res) => {
    lands.value = res.data;
  });
});
watch(minPrice, (value) => {
  const tempOption = props.filterOption;
  let options = JSON.parse(JSON.stringify(tempOption));
  options.price.min = value;
  emit("filter-assets", options);
});
watch(maxPrice, (value) => {
  const tempOption = props.filterOption;
  let options = JSON.parse(JSON.stringify(tempOption));
  options.price.max = value;
  emit("filter-assets", options);
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
            v-model="searchText"
            @handle-filter="clickFilter"
            :filterActive="filterActive"
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
                    class="grid grid-cols-2 pt-2 gap-2.5 justify-between text-11 leading-4 pb-6 h-64"
                  >
                    <status-button
                      v-for="(value, key) in filterStatus"
                      :key="key"
                      :active="filterOption.status.includes(key)"
                      :title="value"
                      @click="filterByStatus(key)"
                    />
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
                      <nftmx-input
                        v-model="minPrice"
                        number
                        class="h-8.75"
                        placeholder="Min"
                      />
                      <span class="font-ibm-medium text-white mx-1">To</span>
                      <nftmx-input
                        v-model="maxPrice"
                        number
                        class="h-8.75"
                        placeholder="Max"
                      />
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
                      <filter-item
                        v-for="(value, key) in categories"
                        :key="key"
                        :active="filterOption.category === key"
                        :title="value"
                        @click="filterByCategory(key)"
                      />
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
                        :class="[
                          filterOption.collections.includes(collection.address)
                            ? 'text-primary-900'
                            : 'text-white',
                          'flex items-center gap-3.5 font-ibm text-11 py-1.75 cursor-pointer transition hover:text-primary-900',
                        ]"
                        @click="filterByCollections(collection.address)"
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
                      <filter-item
                        v-for="(value, key) in chains"
                        :key="key"
                        :active="filterOption.chain === key"
                        :title="value"
                        @click="filterByChain(key)"
                      />
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
                      <filter-item
                        v-for="(value, key) in sortBy"
                        :key="key"
                        :active="filterOption.sortBy === key"
                        :title="value"
                        @click="filterBySort(key)"
                      />
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
