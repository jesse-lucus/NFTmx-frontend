<script setup>
import { useStore } from "vuex";
import { themeConfig } from "@/core/config";
import NftmxSelect from "@/core/components/basic/NftmxSelect.vue";
import NftmxLineChart from "@/core/components/chart/NftmxLineChart.vue";
import Accordion from "@/core/components/accordion/BasicAccordion.vue";
import NftmxTable from "@/core/components/table/NftmxTable.vue";
import NftmxThead from "@/core/components/table/NftmxThead.vue";
import NftmxTh from "@/core/components/table/NftmxTh.vue";
import NftmxTbody from "@/core/components/table/NftmxTbody.vue";
import NftmxTd from "@/core/components/table/NftmxTd.vue";
import NftmxTr from "@/core/components/table/NftmxTr.vue";
import NftmxWalletAddress from "@/core/components/blockchain-address/NftmxWalletAddress.vue";
import NftmxWalletAddressPop from "@/core/components/blockchain-address/NftmxWalletAddressPop.vue";
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
        <div class="text-lg font-ibm-bold pt-4 pb-3.5">Ledger</div>
        <font-awesome-icon
          :icon="['fas', 'external-link-alt']"
          class="text-primary-900 text-sm cursor-pointer ml-8 mt-1"
        />
      </div>
    </template>
    <div class="text-left">
      <nftmx-table>
        <nftmx-thead>
          <nftmx-tr>
            <nftmx-th first>Event</nftmx-th>
            <nftmx-th>Last Value</nftmx-th>
            <nftmx-th>Downside Protection</nftmx-th>
            <nftmx-th>Days</nftmx-th>
            <nftmx-th>From</nftmx-th>
            <nftmx-th>To</nftmx-th>
            <nftmx-th>Date</nftmx-th>
            <nftmx-th>Txn Hash</nftmx-th>
          </nftmx-tr>
        </nftmx-thead>
        <nftmx-tbody>
          <nftmx-tr v-for="index in 1" :key="index">
            <nftmx-td first>Sale</nftmx-td>
            <nftmx-td>$0.4781</nftmx-td>
            <nftmx-td>100%</nftmx-td>
            <nftmx-td>365</nftmx-td>
            <nftmx-td>
              <nftmx-wallet-address-pop
                class="text-primary-900"
                address="0xB29265736dcc20867F6b3c0f5aa8E5A64942b816"
              ></nftmx-wallet-address-pop>
            </nftmx-td>
            <nftmx-td>
              <nftmx-wallet-address-pop
                class="text-primary-900"
                address="0xB29265736dcc20867F6b3c0f5aa8E5A64942b816"
              ></nftmx-wallet-address-pop>
            </nftmx-td>
            <nftmx-td>17 hours ago</nftmx-td>
            <nftmx-td>
              <nftmx-wallet-address-pop
                class="text-secondary-600"
                address="0xB29265736dcc20867F6b3c0f5aa8E5A64942b816"
              ></nftmx-wallet-address-pop>
            </nftmx-td>
          </nftmx-tr>
          <nftmx-tr v-for="index in 1" :key="index">
            <nftmx-td first>List</nftmx-td>
            <nftmx-td>$0.4781</nftmx-td>
            <nftmx-td>100%</nftmx-td>
            <nftmx-td>365</nftmx-td>
            <nftmx-td>
              <nftmx-wallet-address-pop
                class="text-primary-900"
                address="0xB29265736dcc20867F6b3c0f5aa8E5A64942b816"
              ></nftmx-wallet-address-pop>
            </nftmx-td>
            <nftmx-td>
              <nftmx-wallet-address-pop
                class="text-primary-900"
                address="0xB29265736dcc20867F6b3c0f5aa8E5A64942b816"
              ></nftmx-wallet-address-pop>
            </nftmx-td>
            <nftmx-td>17 hours ago</nftmx-td>
            <nftmx-td>
              <nftmx-wallet-address-pop
                class="text-secondary-600"
                address="0xB29265736dcc20867F6b3c0f5aa8E5A64942b816"
              ></nftmx-wallet-address-pop>
            </nftmx-td>
          </nftmx-tr>
          <nftmx-tr v-for="index in 1" :key="index">
            <nftmx-td first>Created</nftmx-td>
            <nftmx-td>$0.4781</nftmx-td>
            <nftmx-td>100%</nftmx-td>
            <nftmx-td>365</nftmx-td>
            <nftmx-td>
              <nftmx-wallet-address-pop
                class="text-primary-900"
                address="0xB29265736dcc20867F6b3c0f5aa8E5A64942b816"
              ></nftmx-wallet-address-pop>
            </nftmx-td>
            <nftmx-td>
              <nftmx-wallet-address-pop
                class="text-primary-900"
                address="0xB29265736dcc20867F6b3c0f5aa8E5A64942b816"
              ></nftmx-wallet-address-pop>
            </nftmx-td>
            <nftmx-td>17 hours ago</nftmx-td>
            <nftmx-td>
              <nftmx-wallet-address-pop
                class="text-secondary-600"
                address="0xB29265736dcc20867F6b3c0f5aa8E5A64942b816"
              ></nftmx-wallet-address-pop>
            </nftmx-td>
          </nftmx-tr>
        </nftmx-tbody>
      </nftmx-table>
    </div>
  </accordion>
</template>
