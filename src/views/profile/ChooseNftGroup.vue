<script setup>
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { themeConfig } from "@/core/config";
import ListGroupItem from "@/core/components/basic/ListGroupItem.vue";
import ListGroupSubItem from "@/core/components/basic/ListGroupSubItem.vue";
import ListGroupAccordion from "@/core/components/accordion/ListGroupAccordion.vue";
import NftmxDivider from "@/core/components/basic/NftmxDivider.vue";
import NftmxBadge from "@/core/components/basic/NftmxBadge.vue";

const props = defineProps({
  selectedGroup: {
    type: Object,
    default: { name: "Collected", count: 0 },
  },
  counts: Object,
  selectedTab: String,
  onsaleTab: String,
});

const emit = defineEmits(["select-group", "select-tab", "select-onsale-tab"]);

const store = useStore();
const selectedTab = computed(() => props.selectedTab);
const onsaleTab = computed(() => props.onsaleTab);
const itemCounts = computed(() => props.counts);

const computedGroup = computed({
  get: () => props.selectedGroup,
});
const computedCount = computed(() => {
  switch (props.selectedGroup.key) {
    case "COLLECTED":
      return itemCounts.value.collected;
    case "ON_SALE":
      return itemCounts.value.onSale;
    case "DOWNSIDE":
      return itemCounts.value.downside;
    case "FAVORITE":
      return itemCounts.value.favorite;
    case "HIDDEN":
      return itemCounts.value.hidden;
    case "BUNDLED":
      return itemCounts.value.bundled;
    default:
      break;
  }
});

const selectGroup = (value) => {
  emit("select-group", value);
};

const selectTab = (value) => {
  emit("select-tab", value);
};
</script>

<template>
  <div
    v-if="store.state.app.windowWidth > themeConfig.xl"
    class="overflow-auto mt-7.25 text-13 tracking-wider"
  >
    <div class="flex gap-8 py-2 w-max ml-4">
      <list-group-item
        :active="computedGroup.key === 'COLLECTED'"
        @click="selectGroup('COLLECTED')"
      >
        Collected
        <nftmx-badge
          :active="computedGroup.key === 'COLLECTED'"
          :value="itemCounts.collected"
          class="-ml-1 -mt-2.25"
        />
      </list-group-item>
      <list-group-item
        :active="computedGroup.key === 'BUNDLED'"
        @click="selectGroup('BUNDLED')"
      >
        Bundled
        <nftmx-badge
          :active="computedGroup.key === 'BUNDLED'"
          :value="itemCounts.bundled"
          class="-ml-1 -mt-2.25"
        />
      </list-group-item>
      <list-group-item
        :active="computedGroup.key === 'ON_SALE'"
        @click="selectGroup('ON_SALE')"
      >
        On Sale
        <nftmx-badge
          :active="computedGroup.key === 'ON_SALE'"
          :value="itemCounts.onSale"
          class="-ml-1 -mt-2.25"
        />
      </list-group-item>
      <list-group-item
        :active="computedGroup.key === 'DOWNSIDE'"
        @click="selectGroup('DOWNSIDE')"
      >
        Under Downside Protection
        <nftmx-badge
          :active="computedGroup.key === 'DOWNSIDE'"
          :value="itemCounts.downside"
          class="-ml-1 -mt-2.25"
        />
      </list-group-item>
      <list-group-item
        :active="computedGroup.key === 'FAVORITE'"
        @click="selectGroup('FAVORITE')"
      >
        My Favorite
        <nftmx-badge
          :active="computedGroup.key === 'FAVORITE'"
          :value="itemCounts.favorite"
          class="-ml-1 -mt-2.25"
        />
      </list-group-item>
      <list-group-item
        :active="computedGroup.key === 'HIDDEN'"
        @click="selectGroup('HIDDEN')"
      >
        Hidden
        <nftmx-badge
          :active="computedGroup.key === 'HIDDEN'"
          :value="itemCounts.hidden"
          class="-ml-1 -mt-2.25"
        />
      </list-group-item>
    </div>
    <div
      class="flex gap-10.5 ml-4 py-4 w-max"
      v-if="computedGroup.key === 'DOWNSIDE'"
    >
      <list-group-item
        :active="selectedTab === 'ALL'"
        @click="selectTab('ALL')"
      >
        All
        <span class="font-ibm-light">{{ itemCounts.downside }}</span>
      </list-group-item>
      <list-group-item
        :active="selectedTab === 'BOUGHT'"
        @click="selectTab('BOUGHT')"
      >
        Bought
        <span class="font-ibm-light">{{ itemCounts.downsideBought }}</span>
      </list-group-item>
      <list-group-item
        :active="selectedTab === 'SOLD'"
        @click="selectTab('SOLD')"
      >
        Sold
        <span class="font-ibm-light">{{ itemCounts.downsideSold }}</span>
      </list-group-item>
    </div>
    <div
      class="flex gap-10.5 ml-4 py-4 w-max"
      v-if="computedGroup.key === 'ON_SALE'"
    >
      <list-group-item :active="onsaleTab === 'ALL'" @click="selectTab('ALL')">
        All
        <span class="font-ibm-light">{{ itemCounts.onSale }}</span>
      </list-group-item>
      <list-group-item
        :active="onsaleTab === 'INDIVIDUAL'"
        @click="selectTab('INDIVIDUAL')"
      >
        Individual
        <span class="font-ibm-light">{{ itemCounts.onSaleIndividual }}</span>
      </list-group-item>
      <list-group-item
        :active="onsaleTab === 'BUNDLED'"
        @click="selectTab('BUNDLED')"
      >
        Bundled
        <span class="font-ibm-light">{{ itemCounts.onSaleBundled }}</span>
      </list-group-item>
    </div>
  </div>
  <list-group-accordion
    :title="computedGroup.name + ' ' + computedCount"
    active
    v-if="store.state.app.windowWidth <= themeConfig.xl"
    class="mt-6.25 mb-4.25"
  >
    <list-group-sub-item
      :active="computedGroup.key === 'COLLECTED'"
      @click="selectGroup('COLLECTED')"
    >
      Collected
      <span class="font-ibm-light">{{ itemCounts.collected }}</span>
    </list-group-sub-item>
    <list-group-sub-item
      :active="computedGroup.key === 'ON_SALE'"
      @click="selectGroup('ON_SALE')"
    >
      Bundled
      <span class="font-ibm-light">{{ itemCounts.bundled }}</span>
    </list-group-sub-item>
    <list-group-sub-item
      :active="computedGroup.key === 'ON_SALE'"
      @click="selectGroup('ON_SALE')"
    >
      On Sale
      <span class="font-ibm-light">{{ itemCounts.onSale }}</span>
    </list-group-sub-item>
    <list-group-sub-item
      :active="computedGroup.key === 'DOWNSIDE'"
      @click="selectGroup('DOWNSIDE')"
    >
      Under Downside Protection
      <span class="font-ibm-light">{{ itemCounts.downside }}</span>
    </list-group-sub-item>
    <list-group-sub-item
      :active="computedGroup.key === 'FAVORITE'"
      @click="selectGroup('FAVORITE')"
    >
      My Favorite
      <span class="font-ibm-light">{{ itemCounts.favorite }}</span>
    </list-group-sub-item>
    <list-group-sub-item
      :active="computedGroup.key === 'HIDDEN'"
      @click="selectGroup('HIDDEN')"
    >
      Hidden
      <span class="font-ibm-light">{{ itemCounts.hidden }}</span>
    </list-group-sub-item>
  </list-group-accordion>
  <nftmx-divider v-if="store.state.app.windowWidth <= themeConfig.xl" />
</template>
