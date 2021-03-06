<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import NavBarItem from "./NavBarItem.vue";
import TopBar from "@/core/components/basic/TopBar.vue";
import Icon from "@/core/components/basic/Icon.vue";
import NftmxTooltip from "@/core/components/basic/NftmxTooltip.vue";
import MenuBar from "@/views/sidebar/menu/MenuBar.vue";
import NotificationsBar from "@/views/sidebar/notification/NotificationsBar.vue";
import NftmxWalletAddress from "@/core/components/blockchain-address/NftmxWalletAddress.vue";
import NftmxButton from "@/core/components/basic/NftmxButton.vue";
import NftmxBadge from "@/core/components/basic/NftmxBadge.vue";
import marketService from "@/core/services/market.service";
import AccountModal from "@/core/components/modal/AccountModal.vue";
import { useRouter } from "vue-router";

const store = useStore();
const walletAddress = computed(() => store.getters["auth/walletAddress"]);
const orderLogs = ref([]);
const accountModal = ref(false);
const listButtonName = ref("List NFT");
const router = useRouter();

marketService.getOrderLogs(1, 20).then((res) => {
  orderLogs.value = res.data.items;
});

const onClickOutside = () => {
  store.commit("app/TOGGLE_MENU", false);
  store.commit("app/TOGGLE_NOTIFICATION_BAR", false);
};
const toggleSidebar = () => {
  store.commit("app/TOGGLE_MENU", !store.state.app.menuOpened);
  store.commit("app/TOGGLE_NOTIFICATION_BAR", false);
};
const toggleNotificationBar = () => {
  store.commit("app/TOGGLE_NOTIFICATION_BAR", !store.state.app.logBarOpened);
  store.commit("app/TOGGLE_MENU", false);
};
const connectWallet = () => {
  if (typeof window.ethereum !== "undefined") {
    ethereum.request({ method: "eth_requestAccounts" });
  }
};
</script>

<template>
  <div v-click-outside="onClickOutside">
    <top-bar class="px-2">
      <div class="flex-1 items-stretch flex h-70px font-ibm">
        <nav-bar-item to="/">
          <img src="/images/logo/nftmx-logo.png" alt="NFT mx" />
        </nav-bar-item>
      </div>
      <div
        class="top-14 left-0 w-auto items-stretch flex grow static border-b-0 overflow-visible shadow-none"
      >
        <div
          class="max-h-screen-menu overflow-visible flex items-center justify-end ml-auto"
        >
          <nav-bar-item v-if="walletAddress">
            <div @click="toggleNotificationBar">
              <font-awesome-icon
                :icon="['fas', 'bell']"
                class="text-lg text-white"
              />
              <nftmx-badge
                anim
                :value="orderLogs.length"
                class="-ml-2 -mt-1.5"
              />
            </div>
          </nav-bar-item>
          <nav-bar-item class="hidden lg:block">
            <div>
              <button
                outline
                :class="[
                  walletAddress
                    ? 'hover:bg-primary-900'
                    : 'hover:border-0 hover:bg-tertiary-700',
                  'h-8.75 w-37 font-ibm-medium transition text-white text-sm border-2 border-primary-900',
                ]"
                @mouseover="
                  walletAddress ? '' : (listButtonName = 'Connect Wallet')
                "
                @mouseout="listButtonName = 'List NFT'"
                @click="
                  walletAddress ? router.push('/profile') : connectWallet()
                "
              >
                {{ listButtonName }}
              </button>
            </div>
          </nav-bar-item>
          <nav-bar-item @click="toggleSidebar" class="hover:text-primary-900">
            <nftmx-wallet-address
              v-if="walletAddress"
              class="text-sm font-ibm-bold pt-1 hidden sm:block"
              :address="walletAddress"
            />
            <div class="ml-6 flex flex-col gap-1 items-center">
              <div class="w-2 h-2 bg-primary-900 rounded" />
              <div class="w-1.5 h-1.5 bg-primary-900 rounded" />
              <div class="w-1 h-1 bg-primary-900 rounded" />
            </div>
          </nav-bar-item>
        </div>
      </div>
    </top-bar>
    <menu-bar
      :class="[
        store.state.app.menuOpened ? '-translate-x-0' : 'translate-x-full',
        'transition',
      ]"
      @open-modal="accountModal = true"
    />
    <notifications-bar
      :class="[
        store.state.app.logBarOpened ? '-translate-x-0' : 'translate-x-full',
        'transition',
      ]"
      :orderLogs="orderLogs"
    />
  </div>
  <account-modal v-model="accountModal" />
</template>

<style scoped>
.h-70px {
  height: 70px;
}
</style>
