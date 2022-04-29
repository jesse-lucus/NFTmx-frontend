<script setup>
import Accordion from "@/core/components/accordion/BasicAccordion.vue";
import NftmxTable from "@/core/components/table/NftmxTable.vue";
import NftmxThead from "@/core/components/table/NftmxThead.vue";
import NftmxTh from "@/core/components/table/NftmxTh.vue";
import NftmxTbody from "@/core/components/table/NftmxTbody.vue";
import NftmxTd from "@/core/components/table/NftmxTd.vue";
import NftmxTr from "@/core/components/table/NftmxTr.vue";
import NftmxWalletAddress from "@/core/components/blockchain-address/NftmxWalletAddress.vue";
import NftmxWalletAddressPop from "@/core/components/blockchain-address/NftmxWalletAddressPop.vue";
import NftmxButton from "@/core/components/basic/NftmxButton.vue";
</script>

<template>
  <accordion>
    <template v-slot:caption>
      <div class="flex items-center">
        <div class="text-lg font-ibm-bold pt-4 pb-3.5">Offers Received</div>
        <font-awesome-icon
          :icon="['fas', 'external-link-alt']"
          class="text-primary-700 hover:text-primary-900 transition text-sm cursor-pointer ml-8 mt-1"
        />
      </div>
    </template>
    <div class="text-left">
      <nftmx-table>
        <nftmx-thead>
          <nftmx-tr>
            <nftmx-th first>Date</nftmx-th>
            <nftmx-th>Buyer address</nftmx-th>
            <nftmx-th>Offer</nftmx-th>
            <nftmx-th>Downside Protection</nftmx-th>
            <nftmx-th>Days</nftmx-th>
            <nftmx-th>APY reward</nftmx-th>
            <nftmx-th></nftmx-th>
          </nftmx-tr>
        </nftmx-thead>
        <nftmx-tbody>
          <nftmx-tr v-for="index in 2" :key="index">
            <nftmx-td first>17 hours ago</nftmx-td>
            <nftmx-td>
              <nftmx-wallet-address-pop
                class="text-primary-900"
                address="0xB29265736dcc20867F6b3c0f5aa8E5A64942b816"
              ></nftmx-wallet-address-pop>
            </nftmx-td>
            <nftmx-td>$0.4781</nftmx-td>
            <nftmx-td>100%</nftmx-td>
            <nftmx-td>365</nftmx-td>
            <nftmx-td>$0.4781</nftmx-td>
            <nftmx-td class="w-56">
              <nftmx-button
                color="primary"
                outline
                label="ACCEPT"
                class="font-press text-10 h-7.25 w-45 mr-4"
                small
              />
              <font-awesome-icon
                :icon="['fas', 'trash-alt']"
                class="transition text-tertiary-400 hover:text-red-900 cursor-pointer"
              />
            </nftmx-td>
          </nftmx-tr>
        </nftmx-tbody>
      </nftmx-table>
    </div>
  </accordion>
</template>
