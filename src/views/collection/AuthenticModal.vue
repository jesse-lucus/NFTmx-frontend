<script setup>
import { ref, onMounted, computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import NftmxButton from "@/core/components/basic/NftmxButton.vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { $vfm } from "vue-final-modal";
import NftmxInput from "@/core/components/basic/NftmxInput.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const tokenAddress = route.params.tokenAddress;
const toast = useToast();
const authenticStatus = ref(null);

const checkAuthentic = async () => {
  authenticStatus.value = "UNAUTHORIZED";
};
const changeAddress = () => {
  authenticStatus.value = null;
};
const cancel = () => {
  $vfm.hide("authenticModal");
};
</script>

<template>
  <vue-final-modal
    classes="w-full flex justify-center items-center"
    name="authenticModal"
    esc-to-close
    fit-parent
  >
    <div class="h-full bg-tertiary-900 text-white overflow-auto xl:w-home-lg">
      <div class="text-right text-xl p-5">
        <font-awesome-icon
          :icon="['fas', 'times']"
          class="cursor-pointer hover:text-tertiary-400 transition"
          @click="cancel"
        />
      </div>
      <div class="text-center relative mt-1.75">
        <div class="font-ibm-bold text-xl sm:text-4xl">Check Authentic</div>
      </div>
      <div class="text-white mt-9 mb-17.5 px-4 lg:px-17.25">
        <div class="font-ibm-bold text-sm sm:text-lg py-2 sm:leading-6">
          Check if your NFT address and this collection are connected by the
          same smart contract
        </div>
        <div class="bg-tertiary-700 border border-black text-sm mt-2">
          <nftmx-input
            @change="changeAddress"
            class="h-13"
            placeholder="Add here your NFT address"
          />
        </div>
        <div v-if="!authenticStatus" class="mt-12.5 font-ibm-bold text-2xl">
          <nftmx-button
            @click="checkAuthentic"
            label="CHECK AUTHENTIC"
            color="primary"
            class="w-full h-16.5"
          />
        </div>
        <div
          v-if="authenticStatus === 'AUTHORIZED'"
          class="
            mt-12.5
            font-ibm-bold
            text-1.5xl
            bg-black
            text-secondary-900
            leading-6
          "
        >
          <div class="flex items-center px-27 gap-5 pt-1.75 pb-2.75">
            <font-awesome-icon
              :icon="['fas', 'check-circle']"
              class="text-4xl"
            />
            <div>
              There is a authentic match between the collection and the checked
              address
            </div>
          </div>
        </div>
        <div
          v-if="authenticStatus === 'UNAUTHORIZED'"
          class="
            mt-12.5
            font-ibm-bold
            text-1.5xl
            bg-black
            text-red-900
            leading-6
          "
        >
          <div class="flex items-center px-27 gap-5 pt-2 pb-2.5">
            <font-awesome-icon
              :icon="['fas', 'times-circle']"
              class="text-4xl"
            />
            <div>
              There is no authentic match between the collection and the checked
              address
            </div>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<style scoped>
.text-1\.5xl {
  font-size: 1.3125rem;
}
</style>
