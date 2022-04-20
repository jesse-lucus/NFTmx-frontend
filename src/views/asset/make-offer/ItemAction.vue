<script setup>
import { computed, ref, watchEffect } from "vue";
import BodyContainer from "@/core/container/BodyContainer.vue";
import Ribbon from "@/core/components/basic/Ribbon.vue";
import DetailButton from "@/core/components/basic/DetailTab.vue";
import Icon from "@/core/components/basic/Icon.vue";
import Timer from "@/core/components/timer/Timer.vue";
import NftmxButton from "@/core/components/basic/NftmxButton.vue";
import NftmxSelectNetwork from "@/core/components/basic/NftmxSelectNetwork.vue";
import moralisService from "@/core/services/moralis.service";
import { useStore } from "vuex";
import { TokenType } from "@/core/config";
import marketService from "@/core/services/market.service";
import { roundTo } from "@/core/utils";
import OfferModal from "./OfferModal.vue";
import { formatAMPM } from "@/core/utils";

const props = defineProps({
  asset: Object,
});

const defaultAsset = {
  creator: {},
  owner: {},
  votes: [],
};
const token = computed(() =>
  props.asset.tokenAddress ? props.asset : defaultAsset
);
const offerModalActive = ref(false);
const store = useStore();
const balance = ref();
const vote = ref(false);
const bnbPrice = ref(0);
const displayDate = computed(() => {
  if (props.asset.last_sale) {
    const date = new Date(props.asset.last_sale.created_date);
    return (
      date.toLocaleString("default", { month: "long" }) +
      " " +
      date.getDay() +
      ", " +
      date.getFullYear() +
      " at " +
      formatAMPM(date) +
      " UTC"
    );
  }
  return "";
});

watchEffect(() => {
  if (props.asset.tokenAddress) {
    vote.value = props.asset.votes.find((item) =>
      item === store.getters["auth/userId"] ? true : false
    );
  }
});

marketService.getUSDFromToken(TokenType.BNB).then((res) => {
  bnbPrice.value = res.data.USD;
});

const handleOfferModal = (value) => {
  offerModalActive.value = value;
  moralisService.getBalance(store.getters["auth/walletAddress"]).then((res) => {
    balance.value = store.getters["market/etherFromWei"](res.data.balance);
  });
};
const handleVote = () => {
  vote.value = !vote.value;
  if (vote.value) {
    marketService
      .vote(props.asset.tokenAddress, props.asset.tokenId, store.state.user.id)
      .then((res) => {});
  } else {
    marketService
      .cancelVote(
        props.asset.tokenAddress,
        props.asset.tokenId,
        store.state.user.id
      )
      .then((res) => {});
  }
};

const handleModal = (value) => {
  offerModalActive.value = value;
};
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 bg-tertiary-800 border border-black font-ibm-bold p-4 sm:p-7 gap-4"
  >
    <div class>
      <div class="leading-3 text-lg">Last Value</div>
      <div class="flex flex-wrap items-end gap-2 pt-4.25">
        <div class="font-ibm text-5xl text-primary-900">
          ${{
            asset.last_sale
              ? (
                  (asset.last_sale.total_price /
                    Math.pow(10, asset.last_sale.payment_token.decimals)) *
                  asset.last_sale.payment_token.usd_price
                ).toFixed(3)
              : 0
          }}
        </div>
        <div class="flex text-lg text-tertiary-400 gap-1">
          <div class="font-sans font-black">Ξ</div>
          <div class="font-ibm">
            {{
              asset.last_sale
                ? (
                    (asset.last_sale.total_price /
                      Math.pow(10, asset.last_sale.payment_token.decimals)) *
                    asset.last_sale.payment_token.eth_price
                  ).toFixed(4)
                : 0
            }}
          </div>
        </div>
        <div class="font-ibm-bold text-sm text-tertiary-400">
          {{ displayDate }}
        </div>
      </div>
    </div>
    <div class="items-centers -mt-px mb-px">
      <nftmx-select-network
        class="font-ibm-bold w-full text-sm mb-2"
        color="black"
        big
      ></nftmx-select-network>
      <button
        class="transition bg-black hover:bg-tertiary-900 font-press w-full text-primary-900 text-sm lg:text-lg mt-0.75 h-15 leading-6"
        @click="handleOfferModal(true)"
      >
        MAKE AN OFFER
      </button>
    </div>
  </div>
  <div
    class="bg-tertiary-800 border border-black font-ibm-bold p-4 sm:p-7 gap-4 my-4 text-center"
  >
    <div class="flex justify-center">
      <div class="text-lg">Total syndication fundraising</div>
      <font-awesome-icon
        :icon="['fas', 'question-circle']"
        class="-mt-1.5 text-sm"
      />
    </div>
    <div class="flex flex-wrap items-end justify-center text-3xl gap-2 pt-2">
      <div class="font-ibm-bold text-primary-900">
        ${{
          asset.last_sale
            ? (
                (asset.last_sale.total_price /
                  Math.pow(10, asset.last_sale.payment_token.decimals)) *
                asset.last_sale.payment_token.usd_price
              ).toFixed(3)
            : 0
        }}
      </div>
      <div class="flex font-ibm text-tertiary-400 gap-1">
        (
        <div class="font-sans font-semibold">Ξ</div>
        <div>
          {{
            asset.last_sale
              ? (
                  (asset.last_sale.total_price /
                    Math.pow(10, asset.last_sale.payment_token.decimals)) *
                  asset.last_sale.payment_token.eth_price
                ).toFixed(4)
              : 0
          }})
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button
        class="transition bg-black hover:bg-tertiary-900 text-secondary-900 font-press w-full text-sm lg:text-lg pt-4.25 pb-5.5 h-17.75 leading-6"
      >
        CREATE SYNDICATION
      </button>
    </div>
  </div>
  <offer-modal
    :asset="asset"
    v-model="offerModalActive"
    @handle-modal="handleModal"
  />
</template>

<style scoped>
.text-5\/2xl {
  font-size: 1.75rem /* 20px */;
  line-height: 2.15rem /* 28px */;
}
</style>
