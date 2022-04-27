<script setup>
import BundleImage from "@/core/components/basic/BundleImage.vue";
const props = defineProps({
  collection: Object,
});
console.log(props.collection);
</script>

<template>
  <router-link
    :to="{
      name: 'collection',
      params: { contractAddress: collection.address },
    }"
    class="w-full relative font-ibm-medium"
  >
    <div
      class="transition hover:shadow-[0_0px_12px_0px_rgb(0_0_0_/_0.1),_0_0px_0px_0px_rgb(0_0_0_/_0.1);] hover:shadow-primary-900"
    >
      <div class="relative z-10">
        <div class="bg-black relative w-full pt-[80%] p-6">
          <bundle-image
            class="absolute top-0 left-0"
            :images="
              collection.symbol === 'PUNK' || collection.symbol === 'BAYC'
                ? [
                    collection.imageUrl,
                    collection.imageUrl,
                    collection.imageUrl,
                    collection.imageUrl,
                    collection.imageUrl,
                    collection.imageUrl,
                    collection.imageUrl,
                  ]
                : collection.imageUrl
            "
          />
        </div>
        <div
          class="absolute top-0 -right-1 w-fill h-11 bg-primary-900 bg-opacity-60 px-4 flex items-center"
        >
          <div class="text-sm text-white">
            10%-100% / 7-365 Downside Protection
          </div>
          <div
            class="w-2 h-2 absolute right-0.5 -bottom-1 bg-primary-900 rotate-45 -z-10"
          ></div>
        </div>
        <div
          class="absolute top-0 -right-1 w-fill bg-tertiary-900 px-4 h-11 -z-10"
        ></div>
      </div>
      <div class="bg-tertiary-700 px-5 pt-4 pb-6">
        <div class="text-tertiary-400 text-xs">Created by</div>
        <div class="text-white text-lg my-1.5">
          {{ collection.name }}
        </div>
        <div class="grid grid-cols-2 gap-y-3 mt-5.75">
          <div>
            <div class="text-white text-11">Items</div>
            <div class="text-primary-900 text-11 my-1">
              {{ (Math.random() * 1000).toFixed(1) }}k
            </div>
          </div>
          <div>
            <div class="text-white text-11">Floor Price</div>
            <div class="text-primary-900 text-11 my-1">
              ${{ (Math.random() * 1000).toFixed(1) }}K
            </div>
          </div>
          <div>
            <div class="text-white text-11">Owners</div>
            <div class="text-primary-900 text-11 my-1">
              {{ (Math.random() * 100).toFixed(1) }}k
            </div>
          </div>
          <div>
            <div class="text-white text-11">Volume Traded</div>
            <div class="text-primary-900 text-11 my-1">
              ${{ (Math.random() * 1000).toFixed(1) }}k
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.w-fill {
  width: calc(100% + 4px);
}
</style>
