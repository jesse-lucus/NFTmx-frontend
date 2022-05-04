<script setup>
import DetailButton from "@/core/components/basic/DetailTab.vue";
import Ribbon from "@/core/components/basic/Ribbon.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Accordion from "@/core/components/accordion/BasicAccordion.vue";
import { assetDetailTabs, defaultUser } from "@/core/config";
import NftmxWalletAddressPop from "@/core/components/blockchain-address/NftmxWalletAddressPop.vue";
import { toUpercaseFirstLetterOfString } from "@/core/utils";
import { baseURL, themeConfig } from "@/core/config";
import InsideModal from "@/core/components/modal/InsideModal.vue";
import ListGroupItem from "@/core/components/basic/ListGroupItem.vue";
import ListGroupSubItem from "@/core/components/basic/ListGroupSubItem.vue";

const props = defineProps({
  asset: Object,
});

const store = useStore();
const open = ref(false);
const tab = ref("Please select");
const image = computed(() =>
  props.asset.imageUrl && props.asset.imageUrl.indexOf("ipfs://") === 0
    ? props.asset.imageUrl.replace("ipfs://", "https://ipfs.io:/ipfs/")
    : props.asset
    ? props.asset.imageUrl
    : ""
);

const handleClick = () => {
  open.value = !open.value;
};
const selectTab = (value) => {
  tab.value = value || "Please select";
  open.value = false;
};
const cancelNFT = () => {};
</script>

<template>
  <div
    class="relative overflow-hidden w-full h-asset-img-lg border border-black text-13 font-ibm-medium"
    :style="{
      background: 'url(' + image + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'black',
    }"
  >
    <inside-modal
      :title="toUpercaseFirstLetterOfString(tab)"
      v-if="tab === assetDetailTabs[0]"
      @select-tab="selectTab"
    >
      <div>
        Created by
        <nftmx-wallet-address-pop
          class="text-primary-900"
          :address="asset.creator ? asset.creator.address : null"
        />
      </div>
      <div class="text-tertiary-500 mt-4 h-fill overflow-auto">
        {{ asset.description }}
      </div>
    </inside-modal>
    <inside-modal
      :title="toUpercaseFirstLetterOfString(tab)"
      v-if="tab === assetDetailTabs[1]"
      @select-tab="selectTab"
    >
      <div class="flex gap-6 items-start">
        <img
          :src="asset.creator ? asset.creator.profile_img_url : null"
          class="w-21 h-21 object-cover"
        />
        <div class="text-tertiary-500 leading-5">
          {{
            asset.creator
              ? asset.creator.bio
              : "3D CryptoPunks only 100 different Punks will be available. Supply for each Punks: 1/1"
          }}
        </div>
      </div>
      <div class="mt-6.5 flex gap-6 items-center">
        <div class="flex gap-4">
          <font-awesome-icon
            :icon="['fas', 'user']"
            class="text-primary-900 text-sm"
          />
          <span>Activity</span>
        </div>
        <div class="flex gap-4">
          <font-awesome-icon
            :icon="['fab', 'twitter']"
            class="text-primary-900 text-sm"
          />
          <span>Twitter</span>
        </div>
      </div>
    </inside-modal>
    <inside-modal
      :title="toUpercaseFirstLetterOfString(tab)"
      v-if="tab === assetDetailTabs[2]"
      @select-tab="selectTab"
    >
      <div class="flex justify-between">
        <span class="font-ibm-medium">Contract Address</span>
        <nftmx-wallet-address-pop
          class="text-primary-900"
          :address="asset.tokenAddress"
        />
      </div>
      <div class="flex justify-between mt-4">
        <span class="font-ibm-medium">Token ID</span>
        <span>{{ asset.tokenId }}</span>
      </div>
      <div class="flex justify-between mt-4">
        <span class="font-ibm-medium">Blockchain</span>
        <span>Ethereum</span>
      </div>
    </inside-modal>
    <inside-modal
      :title="toUpercaseFirstLetterOfString(tab)"
      v-if="tab === assetDetailTabs[3]"
      @select-tab="selectTab"
    >
      <div class="h-full flex flex-col justify-around text-center">
        <div class="text-lg 3xl:text-2xl font-ibm-bold 3xl:leading-9">
          Your Investment Automatically Includes 100% Downside Protection for
          365 days
        </div>
        <div class="text-tertiary-500 text-sm 3xl:leading-6">
          If you are a buyer, think of nftmx as a new strategic staking program
          with upside from selling the NFT, while also providing the option to
          cancel your investment and get a 100% refund with your original
          tokens.
        </div>
      </div>
    </inside-modal>
  </div>
  <div class="mt-4 mb-8 items-center">
    <div :class="['relative flex w-full text-sm font-ibm items-baseline']">
      <div
        v-if="store.state.app.windowWidth >= 1920"
        class="flex-1 flex pr-5 gap-7"
      >
        <list-group-item
          v-for="(name, i) in assetDetailTabs"
          :key="i"
          @click="selectTab(name === tab ? 'Please select' : name)"
          :active="name === tab"
          class="min-w-max hover:text-secondary-900"
          >{{ name }}</list-group-item
        >
      </div>
      <accordion
        v-if="store.state.app.windowWidth < themeConfig.xl3"
        :border="false"
        :sidebar="true"
        v-model="open"
        @handle-click="handleClick"
        :handleEmit="true"
        class="top-0 width"
      >
        <template v-slot:caption>
          <list-group-item class="text-sm pt-1.5">{{ tab }}</list-group-item>
        </template>
        <list-group-sub-item
          v-for="(name, i) in assetDetailTabs"
          :key="i"
          @click="selectTab(name === tab ? 'Please select' : name)"
          :active="name === tab"
          >{{ name }}</list-group-sub-item
        >
      </accordion>
      <div class="flex-1"></div>
      <div class="flex object-right">
        <div
          class="border border-black transition w-8 h-8 px-2.25 pt-1.25 hover:bg-primary-900 bg-tertiary-800 cursor-pointer"
        >
          <font-awesome-icon :icon="['fas', 'undo']" />
        </div>
        <div
          class="border-y border-r border-black transition w-8 h-8 px-2.25 pt-1.25 hover:bg-primary-900 bg-tertiary-800 cursor-pointer"
        >
          <font-awesome-icon :icon="['fas', 'external-link-alt']" />
        </div>
        <div
          class="border-y border-black transition w-8 h-8 px-2.25 pt-1.25 hover:bg-primary-900 bg-tertiary-800 cursor-pointer"
        >
          <font-awesome-icon :icon="['fas', 'share-alt']" />
        </div>
        <div
          class="border border-black transition w-8 h-8 px-2.25 pt-1.25 hover:bg-primary-900 bg-tertiary-800 cursor-pointer"
        >
          <font-awesome-icon :icon="['fas', 'bars']" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.width {
  width: calc(100% - theme("spacing[40]"));
}
.h-fill {
  height: -webkit-fill-available;
}
</style>
