<script setup>
import { computed, onMounted, ref } from "vue";
import Accordion from "@/core/components/accordion/BasicAccordion.vue";
import AccordionContainer from "./container/AccordionContainer.vue";
import { openseaTrendingCollections } from "@/core/config";
import openseaService from "@/core/services/opensea.service";
import SectionButton from "@/core/components/buttons/SectionButton.vue";
import CollectionCard from "@/core/components/cards/CollectionCard.vue";
import marketService from "@/core/services/market.service";

const allCollections = ref([]);
const collections = ref([]);
const retrieveOffset = ref(0);
const retrieveLimit = ref(100);
const displayOffset = ref(0);
const displayLimit = ref(12);
const more = computed(
  () => allCollections.value.length > collections.value.length
);
const loading = ref(true);

const retrieveCollections = () => {
  marketService.getEthContracts().then((res) => {
    loading.value = false;
    allCollections.value = res.data;
    loadMoreCollection();
  });
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
  <div class="flex-1 sm:pl-5 pb-3.25">
    <div class="mb-10.25">
      <div class="font-press text-lg text-white my-2.75">
        Explore Collections
      </div>
      <div
        class="grid gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 pt-2.25"
      >
        <collection-card
          v-for="(collection, index) in collections"
          :key="index"
          :collection="collection"
        />
      </div>
    </div>
    <div
      v-if="loading"
      class="h-96 flex justify-center items-center font-ibm-bold text-tertiary-500 text-lg"
    >
      Loading...
    </div>
    <div
      v-if="!loading && collections.length === 0"
      class="h-96 flex justify-center items-center font-ibm-bold text-tertiary-500 text-lg"
    >
      No Collections found
    </div>
    <div class="text-center">
      <section-button
        v-if="more"
        label="SEE MORE"
        @click="loadMoreCollection"
      />
    </div>
  </div>
</template>

<style scoped>
.text-center {
  text-align: -webkit-center;
}
</style>
