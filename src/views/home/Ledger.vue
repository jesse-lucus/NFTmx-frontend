<script setup>
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import marketService from "@/core/services/market.service";
import { TokenType } from "@/core/config";
import { useStore } from "vuex";
import { roundTo } from "@/core/utils";
import { themeConfig } from "@/core/config";

defineProps({
  ledgerPanelVisible: Boolean,
  filterBy: String,
});

const emit = defineEmits(["toggle-ledger-panel"]);

const store = useStore();
const soldItems = ref([]);
const canceledItems = ref([]);
const listedItems = ref([]);
const selected = ref("SOLD");
const selectedItems = ref([]);
const bnbPrice = ref(0);
const ledgerAnim = ref(null);
const aHeight = ref(0);
const windowWidth = computed(() => store.state.app.windowWidth);

marketService.getUSDFromToken(TokenType.BNB).then((res) => {
  bnbPrice.value = res.data.USD;
});
marketService.soldItems().then((res) => {
  soldItems.value = res.data;
  selectedItems.value = res.data;
});
marketService.canceledItems().then((res) => {
  canceledItems.value = res.data;
});
marketService.listedItems().then((res) => {
  listedItems.value = res.data;
});

const selectLedger = (value) => {
  selected.value = value;
  switch (selected.value) {
    case "SOLD":
      selectedItems.value = soldItems.value;
      break;
    case "CANCELED":
      selectedItems.value = canceledItems.value;
      break;
    case "LISTED":
      selectedItems.value = listedItems.value;
      break;

    default:
      break;
  }
};
onMounted(() => {
  aHeight.value = ledgerAnim.value.scrollHeight + "px";
});
onUpdated(() => {
  if (ledgerAnim.value) {
    aHeight.value = ledgerAnim.value.scrollHeight + "px";
  }
});
watch(windowWidth, (val) => {
  aHeight.value = ledgerAnim.value.scrollHeight + "px";
});
</script>

<template>
  <div class="relative">
    <div
      ref="ledgerAnim"
      class="w-full sm:w-68 pt-2 cursor-default transition-all overflow-hidden h-full"
      :style="{
        maxWidth:
          windowWidth >= themeConfig.sm
            ? ledgerPanelVisible
              ? '272px'
              : '0'
            : '',
        maxHeight:
          windowWidth < themeConfig.sm
            ? ledgerPanelVisible
              ? aHeight
              : '0'
            : '',
      }"
    >
      <div class="flex justify-between items-center text-white">
        <div class="flex font-press">
          <span class="text-lg">Ledger</span>
          <font-awesome-icon
            :icon="['fas', 'external-link-alt']"
            class="text-primary-900 cursor-pointer ml-4 mt-1"
          />
        </div>
        <div
          @click="emit('toggle-ledger-panel')"
          class="font-ibm border-t-2 sm:border-t-0 sm:border-l-2 border-white transition hover:border-primary-900 text-white hover:text-primary-900 h-5 w-5 flex items-center justify-center pt-1 sm:pt-0 sm:pl-1 cursor-pointer"
        >
          <font-awesome-icon
            :icon="[
              'fas',
              windowWidth >= themeConfig.sm ? 'arrow-left' : 'arrow-up',
            ]"
          />
        </div>
      </div>
      <div class="my-5.5 w-full sm:w-68 h-full">
        <div
          class="grid grid-cols-4 border border-black bg-tertiary-800 font-ibm-semi-bold text-11 text-center"
        >
          <div
            @click="selectLedger('SOLD')"
            :class="[
              selected === 'SOLD' ? 'bg-tertiary-900' : '',
              'text-primary-900 border-r border-black pt-4.75 pb-4.5 hover:bg-tertiary-900 cursor-pointer transition',
            ]"
          >
            SOLD
          </div>
          <div
            @click="selectLedger('CANCELED')"
            :class="[
              selected === 'CANCELED' ? 'bg-tertiary-900' : '',
              'text-red-900 border-r border-black pt-4.75 pb-4.5 hover:bg-tertiary-900 cursor-pointer transition',
            ]"
          >
            CANCELED
          </div>
          <div
            @click="selectLedger('LISTED')"
            :class="[
              selected === 'LISTED' ? 'bg-tertiary-900' : '',
              'text-white border-r border-black pt-4.75 pb-4.5 hover:bg-tertiary-900 cursor-pointer transition',
            ]"
          >
            LISTED
          </div>
          <div
            @click="selectLedger('CREATED')"
            :class="[
              selected === 'CREATED' ? 'bg-tertiary-900' : '',
              'text-tertiary-500 pt-4.75 pb-4.5 hover:bg-tertiary-900 cursor-pointer transition',
            ]"
          >
            CREATED
          </div>
        </div>
        <div
          class="grid grid-cols-2 bg-tertiary-800 border-b border-x border-black font-ibm-bold text-11 text-tertiary-500"
        >
          <div class="border-r border-black pt-3.5 pb-2.75 pl-3">Items</div>
          <div class="pt-3.5 pb-2.75 pl-3">Price (USD)</div>
        </div>
        <div
          class="grid grid-cols-2 bg-tertiary-800 border-b border-x border-black text-xs overflow-hidden"
          :style="{
            height:
              filterBy === 'collection'
                ? 'calc(100% - 196px)'
                : 'calc(100% - 258px)',
          }"
        >
          <div class="border-r border-black">
            <div
              v-for="(item, index) in selectedItems.items"
              :key="index"
              :class="[
                index === selectedItems.items.length - 1 ? 'pb-6.25' : 'pb-1',
                'text-white pt-5 pl-3',
              ]"
            >
              {{ item.tokenName }}
            </div>
          </div>
          <div>
            <div
              v-for="(item, index) in selectedItems.items"
              :key="index"
              :class="[
                store.getters['market/etherFromWei'](item.tokenPrice) *
                  bnbPrice >
                300
                  ? 'text-red-900'
                  : store.getters['market/etherFromWei'](item.tokenPrice) *
                      bnbPrice <
                    1
                  ? 'text-white'
                  : 'text-primary-900',
                index === selectedItems.items.length - 1 ? 'pb-6.25' : 'pb-1',
                'pt-5 pl-3',
              ]"
            >
              {{
                roundTo(
                  store.getters["market/etherFromWei"](item.tokenPrice) *
                    bnbPrice
                )
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-5">
      <div
        @click="emit('toggle-ledger-panel')"
        :class="[
          ledgerPanelVisible ? 'hidden' : '',
          'absolute right-0 sm:right-auto sm:top-3.5 sm:-left-10 font-ibm border-t-2 sm:border-t-0 sm:border-l-2 border-white transition hover:border-primary-900 text-white hover:text-primary-900 h-5 w-5 flex items-center justify-center pt-1 sm:pt-0 sm:pl-1 cursor-pointer',
        ]"
      >
        <font-awesome-icon
          :icon="[
            'fas',
            windowWidth >= themeConfig.sm ? 'arrow-right' : 'arrow-down',
          ]"
        />
      </div>
    </div>
  </div>
</template>
