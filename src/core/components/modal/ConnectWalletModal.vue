<script setup>
import { computed, watchEffect } from "vue";
import { mdiClose } from "@mdi/js";
import Overlay from "./Overlay.vue";
import Icon from "@/core/components/basic/Icon.vue";
import { $vfm } from "vue-final-modal";
import WalletDropdown from "@/core/components/dropdown/WalletDropdown.vue";
import { useToast } from "vue-toastification";
import { mainChain } from "@/core/config";
import { useStore } from "vuex";

const props = defineProps({});

const store = useStore();
const toast = useToast();
const walletAddress = computed(() => store.getters["auth/walletAddress"]);

const connect = async () => {
  if (typeof window.ethereum !== "undefined") {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        ethereum.request({ method: "eth_chainId" }).then((chain) => {
          if (chain !== mainChain) {
            toast.error("Please switch to BSC Testnet");
            store.dispatch("auth/login", null);
          } else {
          }
        });
      })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          toast.error("Please connect to MetaMask");
        } else {
          toast.error(err.message);
        }
      });
  }
};
const cancel = () => {
  $vfm.hide("connectWalletModal");
};
watchEffect(() => {
  if (walletAddress.value) {
    cancel();
  }
});
</script>

<template>
  <vue-final-modal
    classes="w-full flex items-center justify-center"
    name="connectWalletModal"
    esc-to-close
    fit-parent
  >
    <div
      class="h-fit bg-tertiary-900 text-white overflow-auto p-5 w-full max-w-modal"
    >
      <div class="flex justify-between font-ibm-bold text-lg">
        <div>Connect Wallet</div>
        <div class="text-right text-xl">
          <font-awesome-icon
            :icon="['fas', 'times']"
            class="cursor-pointer hover:text-tertiary-400 transition"
            @click="cancel"
          />
        </div>
      </div>
      <div class="relative h-15 mt-5.5">
        <wallet-dropdown
          title="BSC"
          class="border border-white"
        ></wallet-dropdown>
      </div>
      <div
        @click="connect"
        class="flex items-center justify-between border border-primary-900 pl-6 pr-2 pb-1.25 pt-0.5 font-ibm-bold text-lg mt-2.5 hover:bg-primary-900 transition cursor-pointer"
      >
        <div>Metamask</div>
        <img src="/images/wallet_logo/metamask.png" class="w-17" />
      </div>
      <div
        class="flex items-center justify-between border border-black pl-6 pr-2 pb-1.25 pt-0.5 font-ibm-bold text-lg mt-2.25"
      >
        <div>Wallet Connect</div>
        <img src="/images/wallet_logo/connect-wallet.png" class="w-17" />
      </div>
      <div class="text-center font-ibm-medium text-xs mt-4.25">
        <div>New to Binance Smart Chain?</div>
        <div class="transition text-primary-900 hover:text-primary-800 mt-0.5">
          <a href="https://ethereum.org/en/wallets/" target="_blank"
            >Learn more about wallets</a
          >
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<style scoped>
.max-w-modal {
  width: 550px;
}
</style>
