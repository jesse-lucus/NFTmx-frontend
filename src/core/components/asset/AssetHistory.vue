<script setup>
import { useStore } from "vuex";
import { themeConfig } from "@/core/config";
import NftmxSelect from "@/core/components/basic/NftmxSelect.vue";
import NftmxLineChart from "@/core/components/chart/NftmxLineChart.vue";
import Accordion from "@/core/components/accordion/BasicAccordion.vue";
import { ref } from "vue";

const store = useStore();
const items = [
  {
    name: "All time",
  },
];
</script>

<template>
  <accordion>
    <template v-slot:caption>
      <div class="flex items-center">
        <div class="text-lg font-ibm-bold pt-4 pb-3.5 mr-24">History</div>
        <nftmx-select
          @click.stop
          v-if="store.state.app.windowWidth >= themeConfig.sm"
          class="font-ibm font-thin w-full max-w-lg mr-16 text-sm"
          :data="items"
          small
        ></nftmx-select>
      </div>
    </template>
    <div class="p-4 lg:p-6">
      <div>
        <nftmx-select
          @click.stop
          v-if="store.state.app.windowWidth < themeConfig.sm"
          class="font-ibm font-thin w-full text-sm text-white"
          :data="items"
          small
        ></nftmx-select>
      </div>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:gap-x-20 gap-y-2 mt-6 sm:mt-1"
      >
        <div>
          <div class="flex text-white text-xs">
            <div>Baseline price</div>
            <font-awesome-icon
              :icon="['fas', 'question-circle']"
              class="-mt-1 ml-1 text-10"
            />
          </div>
          <div class="text-primary-900 text-lg">$0.001</div>
        </div>
        <div>
          <div class="flex text-white text-xs">
            <div>Last sale</div>
          </div>
          <div class="text-primary-900 text-lg">$38.46</div>
        </div>
        <div>
          <div class="flex text-white text-xs">
            <div>All time high</div>
          </div>
          <div class="text-primary-900 text-lg">$478.73</div>
        </div>
        <div>
          <div class="flex text-white text-xs">
            <div>ROI</div>
            <font-awesome-icon
              :icon="['fas', 'question-circle']"
              class="-mt-1 ml-1 text-10"
            />
          </div>
          <div class="flex gap-1 items-center">
            <div class="text-primary-900 text-lg">+47.3%</div>
            <div class="text-tertiary-400 font-ibm-semi-bold text-xs">
              (47.8x)
            </div>
          </div>
        </div>
        <div>
          <div class="flex text-white text-xs">
            <div>Transferred</div>
            <font-awesome-icon
              :icon="['fas', 'question-circle']"
              class="-mt-1 ml-1 text-10"
            />
          </div>
          <div class="text-primary-900 text-lg">12</div>
        </div>
        <div>
          <div class="flex text-white text-xs">
            <div>Collection Floor</div>
          </div>
          <div class="text-primary-900 text-lg">$4500</div>
        </div>
      </div>
      <nftmx-line-chart></nftmx-line-chart>
    </div>
  </accordion>
</template>
