<script setup>
import { computed, onMounted, ref } from "vue";
import Accordion from "@/core/components/accordion/BasicAccordion.vue";
import AccordionContainer from "./container/AccordionContainer.vue";
import openseaService from "@/core/services/opensea.service";
import SectionButton from "@/core/components/buttons/SectionButton.vue";
import FilterAssets from "./FilterAssets.vue";

defineProps({
  contract: String,
  ledgerPanelVisible: Boolean,
});

const allCollections = ref([
  "Most Activity",
  "Most View",
  "Most Liked",
  "Most New",
  "Biggest Sales",
]);
const collections = ref([]);
const retrieveOffset = ref(0);
const retrieveLimit = ref(100);
const displayOffset = ref(0);
const displayLimit = ref(3);
const more = computed(
  () => allCollections.value.length > collections.value.length
);

const retrieveCollections = () => {
  loadMoreCollection();
};

onMounted(() => {
  retrieveCollections();
});
const loadMoreCollection = () => {
  collections.value = collections.value.concat(
    allCollections.value.slice(
      displayOffset.value,
      displayOffset.value + displayLimit.value
    )
  );
  displayOffset.value += displayLimit.value;
};
</script>

<template>
  <div class="flex-1 sm:pl-5 pb-20" v-if="contract">
    <filter-assets
      :ledgerPanelVisible="ledgerPanelVisible"
      title="Explore"
      :contract="contract"
      :last="true"
    />
  </div>
  <div class="flex-1 sm:pl-5 pb-20" v-if="!contract">
    <filter-assets
      v-for="(collection, index) in collections"
      :key="index"
      :last="index === collections.length - 1"
      :title="collection"
      :ledgerPanelVisible="ledgerPanelVisible"
    />
    <div class="absolute bottom-0 left-0 flex justify-center w-full h-23">
      <div class="text-center">
        <section-button
          v-if="more"
          label="SEE MORE"
          @click="loadMoreCollection"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-center {
  text-align: -webkit-center;
}
</style>
