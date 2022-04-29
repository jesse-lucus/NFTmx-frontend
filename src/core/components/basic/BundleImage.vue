<script setup>
import BundleImage from "./BundleImage.vue";

const props = defineProps({
  images: [String, Array],
  grid: {
    type: String,
    default: "col",
  },
  test: String,
});
</script>

<template>
  <div class="w-full h-full">
    <div
      class="w-full h-full"
      v-if="typeof images === 'string'"
      :style="{
        background: 'url(' + images + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    />
    <div v-else class="w-full h-full">
      <div
        v-if="images.length > 1"
        :class="[
          'w-full h-full grid divide-tertiary-900',
          grid === 'col' ? 'grid-cols-2 divide-x-2' : 'grid-rows-2 divide-y-2',
        ]"
      >
        <bundle-image
          :grid="grid === 'col' ? 'row' : 'col'"
          :images="
            images.splice(
              0,
              1
            )
          "
        ></bundle-image>
        <bundle-image
          :grid="grid === 'col' ? 'row' : 'col'"
          :images="images"
        ></bundle-image>
      </div>
      <div
        v-else
        class="w-full h-full"
        :style="{
          background: 'url(' + images[0] + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      />
    </div>
  </div>
</template>
