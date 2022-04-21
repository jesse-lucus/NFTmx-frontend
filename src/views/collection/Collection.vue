<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import BodyContainer from "@/core/container/BodyContainer.vue";
import NftmxDivider from "@/core/components/basic/NftmxDivider.vue";
import NftmxTrimString from "@/core/components/basic/NftmxTrimString.vue";
import { onMounted, ref } from "vue";
import Items from "./Items.vue";
import History from "./History.vue";
import AuthenticModal from "./AuthenticModal.vue";
import marketService from "@/core/services/market.service";

const store = useStore();
const route = useRoute();
const contractAddress = route.params.contractAddress;
const collection = ref({});
const tab = ref("ITEMS");
const authenticModal = ref(false);
onMounted(() => {
  marketService.getEthContract(contractAddress).then((res) => {
    collection.value = res.data;
  });
});
</script>

<template>
  <div
    class="w-full h-62.5 bg-black"
    :style="{
      background: 'url(' + collection.imageUrl + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'black',
    }"
  />
  <body-container>
    <div class="flex gap-8 mt-8.75">
      <div
        class="w-50 h-50"
        :style="{
          background: 'url(' + collection.imageUrl + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'black',
        }"
      />
      <div class="flex-1 py-3.5">
        <div class="flex items-end justify-between">
          <div class="font-ibm-bold text-white text-4xl">
            <nftmx-trim-string :line="1">{{
              collection.name
            }}</nftmx-trim-string>
          </div>
          <div class="flex text-white text-sm pb-0.75">
            <a
              :href="collection.website"
              target="_blank"
              class="border-y transition border-x border-black w-8 h-8 px-2 pt-1.25 hover:bg-primary-900 bg-tertiary-800"
            >
              <font-awesome-icon :icon="['fas', 'globe']" />
            </a>
            <a
              :href="collection.twitter"
              target="_blank"
              class="border-y border-r transition border-black w-7.75 h-8 px-2.25 pt-1.25 hover:bg-primary-900 bg-tertiary-800"
            >
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a
              :href="collection.instagram"
              target="_blank"
              class="border-y border-r border-black transition w-7.75 h-8 px-2 pt-1.25 hover:bg-primary-900 bg-tertiary-800"
            >
              <font-awesome-icon :icon="['fab', 'medium-m']" />
            </a>
            <a
              :href="collection.instagram"
              target="_blank"
              class="border-y border-r border-black transition w-7.75 h-8 px-2 pt-1.25 hover:bg-primary-900 bg-tertiary-800"
            >
              <font-awesome-icon :icon="['fab', 'telegram-plane']" />
            </a>
            <a
              :href="collection.instagram"
              target="_blank"
              class="border-y border-r border-black transition w-7.75 h-8 px-2 pt-1.25 hover:bg-primary-900 bg-tertiary-800"
            >
              <font-awesome-icon :icon="['fab', 'discord']" />
            </a>
            <a
              :href="collection.instagram"
              target="_blank"
              class="border-y border-black transition w-7.5 h-8 px-2 pt-1.25 hover:bg-primary-900 bg-tertiary-800"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <router-link
              :to="{
                name: 'collection_setting',
                params: { contractAddress: contractAddress },
              }"
              class="border border-black w-8 transition h-8 px-2 pt-1.25 hover:bg-primary-900 bg-tertiary-800"
            >
              <font-awesome-icon :icon="['fas', 'edit']" />
            </router-link>
          </div>
        </div>
        <div class="flex justify-between">
          <div class="flex gap-2 font-ibm text-xs mt-2.75">
            <div class="text-tertiary-400">Created by</div>
            <div class="text-primary-900">{{ collection.name }}</div>
          </div>
          <button
            @click="authenticModal = true"
            class="flex gap-4 py-2.5 pl-6.5 pr-7.75 mt-1.75 font-ibm-bold text-white transition bg-primary-900 hover:bg-primary-800 text-sm"
          >
            <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z"
              />
            </svg>
            <div>Check authentic</div>
          </button>
        </div>
        <div
          class="grid grid-cols-4 border-2 border-black divide-x-2 divide-black w-fit mt-4.25 xl:mt-1.5"
        >
          <div class="px-4.75 py-3 font-ibm-bold">
            <div class="text-sm text-white">Items</div>
            <div class="text-lg text-primary-900 -mt-px">103.44k</div>
          </div>
          <div class="px-4.75 py-3 font-ibm-bold">
            <div class="text-sm text-white">Owners</div>
            <div class="text-lg text-primary-900 -mt-px">18.5k</div>
          </div>
          <div class="px-4.75 py-3 font-ibm-bold">
            <div class="text-sm text-white">Floor Price</div>
            <div class="text-lg text-primary-900 -mt-px">$3.6k</div>
          </div>
          <div class="px-4.75 py-3 font-ibm-bold">
            <div class="text-sm text-white">Volume Traded</div>
            <div class="text-lg text-primary-900 -mt-px">$120.5k</div>
          </div>
        </div>
        <div class="text-white text-sm leading-6 my-5.5 xl:my-6.25">
          {{ collection.description }}
        </div>
      </div>
    </div>
    <nftmx-divider />
    <div class="relative">
      <div class="absolute top-9 flex gap-6 font-ibm-medium text-sm">
        <div
          @click="tab = 'ITEMS'"
          :class="[
            tab === 'ITEMS' ? 'text-primary-900' : 'text-white',
            'transition hover:text-primary-900 cursor-pointer',
          ]"
        >
          Items
        </div>
        <div
          @click="tab = 'HISTORY'"
          :class="[
            tab === 'HISTORY' ? 'text-primary-900' : 'text-white',
            'transition  hover:text-primary-900 cursor-pointer',
          ]"
        >
          Trading History
        </div>
      </div>
    </div>
    <items v-if="tab === 'ITEMS'" :contractAddress="contractAddress" />
    <history v-if="tab === 'HISTORY'" />
    <authentic-modal v-model="authenticModal" />
  </body-container>
</template>
