<script setup>
import { computed, ref, watchEffect } from "vue";
import BodyContainer from "@/core/container/BodyContainer.vue";
import NftmxFooter from "@/core/container/NftmxFooter.vue";
import { useStore } from "vuex";
import NftmxDivider from "@/core/components/basic/NftmxDivider.vue";
import CardsContainer from "@/core/container/CardsContainer.vue";
import NavBarSearch from "@/core/components/search/NavBarSearch.vue";
import NftmxSearchInput from "@/core/components/basic/NftmxSearchInput.vue";
import { marketAddress } from "@/core/config";
import ProfileSummary from "./ProfileSummary.vue";
import ChooseCollection from "./ChooseCollection.vue";
import ChooseNftGroup from "./ChooseNftGroup.vue";
import moralisService from "@/core/services/moralis.service";
import erc721ABI from "@/core/config/erc721";
import marketService from "@/core/services/market.service";
import OrderCard from "@/core/components/cards/OrderCard.vue";
import NftmxTrimString from "@/core/components/basic/NftmxTrimString.vue";

const store = useStore();
const walletAddress = computed(() => store.getters["auth/walletAddress"]);
const orders = ref([]);
const unhiddenOrders = computed(() =>
  orders.value.filter(
    (order) => order.hiders.findIndex((id) => id === store.state.user.id) === -1
  )
);
const collected = computed(() =>
  unhiddenOrders.value.filter((order) => order.orderStatus === -1)
);
const activeOrders = computed(() =>
  unhiddenOrders.value.filter(
    (order) =>
      order.sellerAddress === walletAddress.value && order.orderStatus === "0"
  )
);
const downsideOrdersBought = computed(() =>
  unhiddenOrders.value.filter(
    (order) =>
      order.buyerAddress === walletAddress.value && order.orderStatus === "2"
  )
);
const downsideOrdersSold = computed(() =>
  unhiddenOrders.value.filter(
    (order) =>
      order.sellerAddress === walletAddress.value && order.orderStatus === "2"
  )
);
const downsideOrders = computed(() =>
  unhiddenOrders.value.filter(
    (order) =>
      (order.buyerAddress === walletAddress.value &&
        order.orderStatus === "2") ||
      (order.sellerAddress === walletAddress.value && order.orderStatus === "2")
  )
);
const favoriteOrders = computed(() => {
  const filteredOrders = unhiddenOrders.value.filter(
    (order) => order.votes.findIndex((id) => id === store.state.user.id) > -1
  );
  return filteredOrders.filter((order, index) => {
    const firstIndex = filteredOrders.findIndex(
      (item) =>
        item.tokenAddress === order.tokenAddress &&
        item.tokenId === order.tokenId
    );
    const lastIndex = filteredOrders.findLastIndex(
      (item) =>
        item.tokenAddress === order.tokenAddress &&
        item.tokenId === order.tokenId
    );
    if (firstIndex === lastIndex) {
      return true;
    }
    const bigIndex =
      parseInt(filteredOrders[lastIndex].orderStatus) >
      parseInt(filteredOrders[firstIndex].orderStatus)
        ? lastIndex
        : firstIndex;
    return bigIndex === index;
  });
});
const hiddenOrders = computed(() => {
  const filteredOrders = orders.value.filter(
    (order) => order.hiders.findIndex((id) => id === store.state.user.id) > -1
  );
  return filteredOrders.filter((order, index) => {
    const firstIndex = filteredOrders.findIndex(
      (item) =>
        item.tokenAddress === order.tokenAddress &&
        item.tokenId === order.tokenId
    );
    const lastIndex = filteredOrders.findLastIndex(
      (item) =>
        item.tokenAddress === order.tokenAddress &&
        item.tokenId === order.tokenId
    );
    if (firstIndex === lastIndex) {
      return true;
    }
    const bigIndex =
      parseInt(filteredOrders[lastIndex].orderStatus) >
      parseInt(filteredOrders[firstIndex].orderStatus)
        ? lastIndex
        : firstIndex;
    return bigIndex === index;
  });
});
const loadingOrders = ref(true);
const loadingNFTs = ref(true);
const selectedGroup = ref({ key: "COLLECTED", name: "Collected", count: 0 });
const selectedTab = ref("ALL");
const onsaleTab = ref("ALL");
const counts = computed(() => {
  return {
    collected: collected.value.length,
    onSale: activeOrders.value.length,
    onSaleIndividual: activeOrders.value.length,
    onSaleBundled: 0,
    downside: downsideOrders.value.length,
    downsideBought: downsideOrdersBought.value.length,
    downsideSold: downsideOrdersSold.value.length,
    favorite: favoriteOrders.value.length,
    hidden: hiddenOrders.value.length,
    bundled: 0,
  };
});
const newBundle = ref([]);

watchEffect(() => {
  if (walletAddress.value) {
    orders.value = [];
    loadingNFTs.value = true;
    loadingOrders.value = true;
    marketService.getNFTsFromWallet(walletAddress.value).then(async (res) => {
      const collectedNFTs = await JSON.parse(JSON.stringify(res.data));
      const nfts = await Promise.all(
        collectedNFTs.map(async (nft, index) => {
          const tokenContract = new store.state.web3.eth.Contract(
            erc721ABI,
            store.state.web3.utils.toChecksumAddress(nft.tokenAddress)
          );

          const approvedAddress = await tokenContract.methods
            .getApproved(nft.tokenId)
            .call({
              from: walletAddress.value,
            })
            .then((res) => res);

          nft.approved = approvedAddress === marketAddress ? true : false;
          const order = {
            id: "temp-order-" + index,
            orderStatus: -1,
            tokenAddress: nft.tokenAddress,
            tokenId: nft.tokenId,
            votes: nft.votes,
            hiders: nft.hiders,
            nft: nft,
          };
          return order;
        })
      );
      orders.value = orders.value.concat(nfts);
      loadingNFTs.value = false;
    });
    marketService.getMyOrders(store.state.user.id).then(async (res) => {
      const nfts = await Promise.all(
        res.data.map(async (order) => {
          const nft = await moralisService
            .getNft(order.tokenAddress, order.tokenId)
            .then((res) => res.data);
          order.nft = nft;
          order.votes = order.votes || [];
          order.hiders = order.hiders || [];

          return order;
        })
      );
      orders.value = orders.value.concat(nfts);
      loadingOrders.value = false;
    });
  }
});

const selectGroup = (value) => {
  switch (value) {
    case "COLLECTED":
      selectedGroup.value = { key: "COLLECTED", name: "Collected" };
      break;
    case "ON_SALE":
      selectedGroup.value = { key: "ON_SALE", name: "On Sale" };
      break;
    case "DOWNSIDE":
      selectedGroup.value = { key: "DOWNSIDE", name: "Downside Protection" };
      break;
    case "FAVORITE":
      selectedGroup.value = { key: "FAVORITE", name: "My Favorite" };
      break;
    case "HIDDEN":
      selectedGroup.value = { key: "HIDDEN", name: "Hidden" };
      break;
    case "BUNDLED":
      selectedGroup.value = { key: "BUNDLED", name: "Bundled" };
      break;
    case "OFFERS":
      selectedGroup.value = { key: "OFFERS", name: "Offers" };
      break;
    default:
      break;
  }
};

const selectTab = (value) => {
  switch (value) {
    case "ALL":
      selectedTab.value = "ALL";
      break;
    case "BOUGHT":
      selectedTab.value = "BOUGHT";
      break;
    case "SOLD":
      selectedTab.value = "SOLD";
      break;
    default:
      break;
  }
};

const selectOnSaleTap = (value) => {
  switch (value) {
    case "ALL":
      onsaleTab.value = "ALL";
      break;
    case "INDIVIDUAL":
      onsaleTab.value = "INDIVIDUAL";
      break;
    case "BUNDLED":
      onsaleTab.value = "BUNDLED";
      break;
    default:
      break;
  }
};

const approve = async (order) => {
  const tokenContract = new store.state.web3.eth.Contract(
    erc721ABI,
    store.state.web3.utils.toChecksumAddress(order.tokenAddress)
  );

  tokenContract.methods
    .approve(marketAddress, order.tokenId)
    .send({
      from: store.state.user.walletAddress,
    })
    .then((res) => {
      const index = orders.value.findIndex((item) => item.id === order.id);
      orders.value[index].nft.approved = true;
    })
    .catch((err) => {
      console.log("Err ", err);
    });
};
const handleVote = (order) => {
  const index = orders.value.findIndex((item) => item.id === order.id);
  const userIndex = orders.value[index].votes.findIndex(
    (id) => id === store.state.user.id
  );
  if (userIndex > -1) {
    marketService
      .cancelVote(order.tokenAddress, order.tokenId, store.state.user.id)
      .then((res) => {
        orders.value[index].votes.splice(userIndex, 1);
      });
  } else {
    marketService
      .vote(order.tokenAddress, order.tokenId, store.state.user.id)
      .then((res) => {
        orders.value[index].votes.push(store.state.user.id);
      });
  }
};
const hideNFT = (order, hide) => {
  const tokens = orders.value.filter(
    (item) =>
      item.tokenAddress === order.tokenAddress && item.tokenId === order.tokenId
  );
  if (hide) {
    marketService
      .hideToken(order.tokenAddress, order.tokenId, store.state.user.id)
      .then((res) => {
        tokens.map((token) => {
          const index = orders.value.findIndex((item) => item.id === token.id);
          orders.value[index].hiders.push(store.state.user.id);
        });
      });
  } else {
    marketService
      .unhideToken(order.tokenAddress, order.tokenId, store.state.user.id)
      .then((res) => {
        tokens.map((token) => {
          const index = orders.value.findIndex((item) => item.id === token.id);
          const userIndex = token.hiders.findIndex(
            (id) => id === store.state.user.id
          );
          orders.value[index].hiders.splice(userIndex, 1);
        });
      });
  }
};
const cancelOrder = async (order) => {
  store.state.marketContract.methods
    .cancelOrder(order.orderId)
    .send({ from: walletAddress.value })
    .then((res) => {
      const index = orders.value.findIndex((item) => item.id === order.id);
      orders.value[index].orderStatus = -1;
    });
};
const cancelBundle = (id) => {
  const index = newBundle.value.findIndex((item) => item.id === id);
  const canceledItem = newBundle.value.splice(index, 1);
  orders.value.push(canceledItem[0]);
};
const startDrag = (evt, item) => {
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.effectAllowed = "move";
  evt.dataTransfer.setData("itemID", item.id);
};
const onDrop = (evt, list) => {
  const itemID = evt.dataTransfer.getData("itemID");
  const index = orders.value.findIndex((order) => order.id === itemID);
  const addedItem = orders.value.splice(index, 1);
  newBundle.value.push(addedItem[0]);
};
</script>

<template>
  <nav-bar-search></nav-bar-search>
  <profile-summary />
  <body-container>
    <choose-collection />
    <nftmx-divider />
    <div class="flex mb-22">
      <div class="flex-grow">
        <div class="3xl:flex justify-between text-white font-ibm-bold text-sm">
          <choose-nft-group
            :counts="counts"
            :selectedGroup="selectedGroup"
            @select-group="selectGroup"
            @select-tab="selectTab"
            :selectedTab="selectedTab"
            @select-onsale-tab="selectOnSaleTap"
            :onsaleTab="onsaleTab"
          />
          <nftmx-search-input
            class="bg-tertiary-800 mt-5 sm:mt-3.75 2xl:mt-7.25 xl:ml-4"
          />
        </div>
        <div v-if="selectedGroup.key === 'COLLECTED'" class="mt-12 2xl:mt-8">
          <div
            class="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5"
            v-if="selectedGroup.key === 'COLLECTED'"
          >
            <order-card
              v-for="(order, index) in collected"
              :key="index"
              :order="order"
              class="bg-tertiary-800"
              @handle-vote="handleVote"
              @hide-nft="hideNFT"
              @approve="approve"
              :itemDrag="order.nft && order.nft.approved"
              :draggable="order.nft && order.nft.approved"
              @dragstart="startDrag($event, order)"
            ></order-card>
          </div>
          <div
            v-if="loadingNFTs"
            class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
          >
            Loading...
          </div>
          <div
            v-if="!loadingNFTs && collected.length === 0"
            class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
          >
            No Lands found
          </div>
        </div>
        <div v-if="selectedGroup.key === 'ON_SALE'" class="mt-12 2xl:mt-11">
          <div v-if="onsaleTab === 'ALL'">
            <cards-container class="place-items-center">
              <order-card
                v-for="(order, index) in activeOrders"
                :key="index"
                :order="order"
                class="bg-tertiary-800"
                @handle-vote="handleVote"
                @hide-nft="hideNFT"
                @cancel-order="cancelOrder"
              ></order-card>
            </cards-container>
            <div
              v-if="!loadingOrders && activeOrders.length === 0"
              class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
            >
              No orders found
            </div>
          </div>
          <div v-if="onsaleTab === 'INDIVIDUAL'" class="mt-12 2xl:mt-11">
            <cards-container class="place-items-center">
              <order-card
                v-for="(order, index) in activeOrders"
                :key="index"
                :order="order"
                class="bg-tertiary-800"
                @handle-vote="handleVote"
                @hide-nft="hideNFT"
              ></order-card>
            </cards-container>
            <div
              v-if="!loadingOrders && activeOrders.length === 0"
              class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
            >
              No orders found
            </div>
          </div>
          <div v-if="onsaleTab === 'BUNDLED'" class="mt-12 2xl:mt-11">
            <cards-container class="place-items-center">
              <!-- <order-card
                        v-for="(order, index) in downsideOrdersSold"
                        :key="index"
                        :order="order"
                        class="bg-tertiary-800"
                        @handle-vote="handleVote"
                        @hide-nft="hideNFT"
                            ></order-card>-->
            </cards-container>
            <div
              v-if="!loadingOrders"
              class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
            >
              No orders found
            </div>
          </div>
          <div
            v-if="loadingOrders"
            class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
          >
            Loading...
          </div>
        </div>
        <div v-if="selectedGroup.key === 'DOWNSIDE'" class="mt-12 2xl:mt-11">
          <div v-if="selectedTab === 'ALL'">
            <cards-container class="place-items-center">
              <order-card
                v-for="(order, index) in downsideOrders"
                :key="index"
                :order="order"
                class="bg-tertiary-800"
                @handle-vote="handleVote"
                @hide-nft="hideNFT"
              ></order-card>
            </cards-container>
            <div
              v-if="!loadingOrders && downsideOrders.length === 0"
              class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
            >
              No orders found
            </div>
          </div>
          <div v-if="selectedTab === 'BOUGHT'" class="mt-12 2xl:mt-11">
            <cards-container class="place-items-center">
              <order-card
                v-for="(order, index) in downsideOrdersBought"
                :key="index"
                :order="order"
                class="bg-tertiary-800"
                @handle-vote="handleVote"
                @hide-nft="hideNFT"
              ></order-card>
            </cards-container>
            <div
              v-if="!loadingOrders && downsideOrdersBought.length === 0"
              class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
            >
              No orders found
            </div>
          </div>
          <div v-if="selectedTab === 'SOLD'" class="mt-12 2xl:mt-11">
            <cards-container class="place-items-center">
              <order-card
                v-for="(order, index) in downsideOrdersSold"
                :key="index"
                :order="order"
                class="bg-tertiary-800"
                @handle-vote="handleVote"
                @hide-nft="hideNFT"
              ></order-card>
            </cards-container>
            <div
              v-if="!loadingOrders && downsideOrdersSold.length === 0"
              class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
            >
              No orders found
            </div>
          </div>
          <div
            v-if="loadingOrders"
            class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
          >
            Loading...
          </div>
        </div>
        <div v-if="selectedGroup.key === 'FAVORITE'" class="mt-12 2xl:mt-11">
          <cards-container class="place-items-center">
            <order-card
              v-for="(order, index) in favoriteOrders"
              :key="index"
              :order="order"
              class="bg-tertiary-800"
              @approve="approve"
              @handle-vote="handleVote"
              @hide-nft="hideNFT"
              @cancel-order="cancelOrder"
            ></order-card>
          </cards-container>
          <div
            v-if="loadingOrders"
            class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
          >
            Loading...
          </div>
          <div
            v-if="!loadingOrders && favoriteOrders.length === 0"
            class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
          >
            No orders found
          </div>
        </div>
        <div v-if="selectedGroup.key === 'HIDDEN'" class="mt-12 2xl:mt-11">
          <cards-container class="place-items-center">
            <order-card
              v-for="(order, index) in hiddenOrders"
              :key="index"
              :order="order"
              class="bg-tertiary-800"
              @handle-vote="handleVote"
              @hide-nft="hideNFT"
              @cancel-order="cancelOrder"
            ></order-card>
          </cards-container>
          <div
            v-if="loadingOrders"
            class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
          >
            Loading...
          </div>
          <div
            v-if="!loadingOrders && hiddenOrders.length === 0"
            class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
          >
            No orders found
          </div>
        </div>
        <div v-if="selectedGroup.key === 'BUNDLED'" class="mt-12 2xl:mt-11">
          <div
            class="h-96 font-ibm-bold text-tertiary-500 text-lg flex items-center justify-center"
          >
            No orders found
          </div>
        </div>
      </div>
      <nftmx-divider
        v-if="selectedGroup.key === 'COLLECTED'"
        vertical
        class="ml-2.25 mr-2.75 mt-7"
      />
      <div
        v-if="selectedGroup.key === 'COLLECTED'"
        class="flex flex-col w-68.5 mt-7 font-ibm"
      >
        <div
          class="flex flex-col flex-grow border-dashed border-primary-900 border-2 border-b-0"
          @drop="onDrop($event, 1)"
          @dragover.prevent
          @dragenter.prevent
        >
          <div v-if="newBundle.length === 0" class="flex flex-col flex-grow">
            <div class="text-white p-5.25 text-sm">
              Drag and drop to create bundle
            </div>
            <div
              class="flex-grow flex items-center text-red-800 px-8 text-center text-base leading-5"
            >
              Your tranche pack is empty
            </div>
          </div>
          <div
            v-if="newBundle.length > 0"
            class="flex flex-col flex-grow px-6 py-7.25 gap-7.5"
          >
            <div
              v-for="(item, index) in newBundle"
              :key="index"
              class="flex text-white font-ibm-bold items-center gap-3.5"
            >
              <img v-lazy="'/images/nfts/img1.png'" class="w-8.75 h-8.75" />
              <nftmx-trim-string class="flex-grow text-sm" :line="1">{{
                item.nft.name
              }}</nftmx-trim-string>
              <font-awesome-icon
                :icon="['fas', 'times']"
                class="text-sm cursor-pointer hover:text-red-900 transition"
                @click="cancelBundle(item.id)"
              />
            </div>
          </div>
          <div
            class="text-white p-5 text-11 font-ibm-bold border-t border-gray-800"
          >
            Total lands:
            <span class="text-primary-900">{{ newBundle.length }}</span>
          </div>
        </div>
        <button
          :class="[
            newBundle.length > 0
              ? 'transition bg-primary-900 hover:bg-primary-800 text-white'
              : 'bg-gray-800 text-tertiary-400',
            'font-ibm-bold text-lg h-15',
          ]"
        >
          PACK AS A BUNDLE
        </button>
      </div>
    </div>
  </body-container>
</template>

<style scoped>
.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}

.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
</style>
