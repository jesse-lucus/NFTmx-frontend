<script setup>
import Ribbon from "@/core/components/basic/Ribbon.vue";
import Icon from "@/core/components/basic/Icon.vue";
import SaleInfo from "@/core/components/cards/SaleInfo.vue";
import NftmxButton from "@/core/components/basic/NftmxButton.vue";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import Timer from "@/core/components/timer/Timer.vue";
import moralisService from "@/core/services/moralis.service";
import { TokenType, mainChain } from "@/core/config";
import { useStore } from "vuex";
import marketService from "@/core/services/market.service";
import { useToast } from "vue-toastification";
import ConnectWalletModal from "../modal/ConnectWalletModal.vue";
import NftmxTrimString from "../basic/NftmxTrimString.vue";

const props = defineProps({
  asset: Object,
});

const store = useStore();
const toast = useToast();
const userId = computed(() => store.getters["auth/userId"]);
const vote = ref(
  props.asset.votes.find((item) => (item === userId.value ? true : false))
);
const voteCount = ref(props.asset.votes.length);
const windowWidth = computed(() => store.state.app.windowWidth);
const card = ref(null);
const transferred = ref("not");
const price = ref(0);
const open = ref(false);
const walletPop = ref(false);
const image = computed(() =>
  props.asset.imageUrl.indexOf("ipfs://") === 0
    ? props.asset.imageUrl.replace("ipfs://", "https://ipfs.io:/ipfs/")
    : props.asset.imageUrl
);

const handleVote = () => {
  vote.value = !vote.value;
  if (vote.value) {
    marketService
      .vote(props.asset.tokenAddress, props.asset.tokenId, store.state.user.id)
      .then((res) => {
        voteCount.value++;
      });
  } else {
    marketService
      .cancelVote(
        props.asset.tokenAddress,
        props.asset.tokenId,
        store.state.user.id
      )
      .then((res) => {
        voteCount.value--;
      });
  }
};
</script>

<template>
  <div ref="card" class="w-full">
    <div
      class="transition hover:shadow-[0_0px_12px_0px_rgb(0_0_0_/_0.1),_0_0px_0px_0px_rgb(0_0_0_/_0.1);] hover:shadow-primary-900"
      @mouseover="open = true"
      @mouseleave="open = false"
    >
      <div
        class="relative w-full overflow-hidden pt-73per"
        :style="{
          background: `url( ${image} )`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'black',
        }"
      >
        <ribbon
          :percent="(Math.random() * 100).toFixed()"
          :period="(Math.random() * 365).toFixed()"
        />
      </div>
      <div class="relative px-4.5 pt-5.5 pb-6 bg-tertiary-700">
        <div class="flex text-white">
          <div class="flex-1 text-base font-ibm-bold leading-6 pr-2 h-16">
            <nftmx-trim-string :line="2">{{ asset.name }}</nftmx-trim-string>
          </div>
          <div class="text-xs flex mt-1.5">
            <span class="pr-1 text-tertiary-400">{{ voteCount }}</span>
            <font-awesome-icon
              :icon="['fas', 'thumbs-up']"
              :class="[
                vote ? 'text-primary-900' : 'text-white',
                'cursor-pointer hover:text-primary-900',
              ]"
              @click="handleVote()"
            />
          </div>
        </div>
        <sale-info :transferred="transferred" :value="price" />
        <div class="text-tertiary-400 text-11 text-center relative mt-6">
          Current auction ends in
        </div>
        <div class="pt-3 w-fit mx-auto max-w-full">
          <timer />
        </div>
        <div
          :class="[
            open ? 'h-15' : 'h-0',
            'absolute overflow-hidden bottom-0 left-0 w-full transition-all',
          ]"
        >
          <nftmx-button
            v-if="userId"
            :to="{
              name: 'make_offer',
              params: {
                id: asset.id,
              },
            }"
            label="MAKE AN OFFER"
            class="transition-all w-full font-press text-sm h-15 bg-black hover:bg-tertiary-900 text-primary-900"
          />
          <nftmx-button
            v-else
            label="CONNECT WALLET"
            class="transition-all w-full font-press text-sm h-15 bg-black hover:bg-tertiary-900 text-white"
            @click="walletPop = true"
          />
        </div>
      </div>
    </div>
    <div v-if="asset.bundled" class="px-2 shadow-xl">
      <div class="w-full h-1.25 bg-primary-200" />
      <div class="px-2">
        <div class="w-full h-1.25 bg-primary-100" />
      </div>
    </div>
    <connect-wallet-modal v-model="walletPop" />
  </div>
</template>
