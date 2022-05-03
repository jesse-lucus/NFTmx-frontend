<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";

defineProps({
  text: {
    type: String,
    required: true,
  },
});

const store = useStore();
const windowWidth = computed(() => store.state.app.windowWidth);
const tooltip = ref(false);
const tooltipBox = ref(null);
const tooltipRef = ref(null);
const tooltipStyle = ref({ top: 0, left: 0 });

onMounted(() => {
  let tooltipRefPosition = tooltipRef.value.getBoundingClientRect();
  let tooltipBoxPosition = tooltipBox.value.getBoundingClientRect();
  let top = -tooltipBoxPosition.height - tooltipRefPosition.height;
  let left = tooltipBoxPosition.width;
  if (tooltipBoxPosition.top < tooltipRefPosition.height + 100) {
    top = tooltipBoxPosition.height;
  }
  if (
    tooltipBoxPosition.left + tooltipRefPosition.width + 100 >
    windowWidth.value
  ) {
    left = -tooltipRefPosition.width;
  }
  tooltipStyle.value = {
    top: top + "px",
    left: left + "px",
  };
});
watchEffect(() => {
  if (tooltipRef.value && tooltipBox.value) {
    let tooltipRefPosition = tooltipRef.value.getBoundingClientRect();
    let tooltipBoxPosition = tooltipBox.value.getBoundingClientRect();
    let left = tooltipBoxPosition.width;
    if (
      tooltipBoxPosition.left + tooltipRefPosition.width + 100 >
      windowWidth.value
    ) {
      left = -tooltipRefPosition.width;
    }
    tooltipStyle.value.left = left + "px";
  }
}, windowWidth.value);
</script>

<template>
  <div class="relative">
    <div
      class="inline-block w-min h-min cursor-pointer"
      ref="tooltipBox"
      @mouseover="tooltip = true"
      @mouseout="tooltip = false"
    >
      <slot />
    </div>
    <div
      ref="tooltipRef"
      :class="[
        tooltip ? 'opacity-100 z-50' : 'opacity-0 -z-50',
        'absolute transition bg-black text-white font-ibm-light text-left text-11 shadow-[0_-2px_15px_-2px_rgb(0_0_0_/_0.1),_0_2px_6px_-4px_rgb(0_0_0_/_0.1);] shadow-primary-900 py-1.75 px-4 w-64 rounded',
      ]"
      :style="tooltipStyle"
    >
      {{ text }}
    </div>
  </div>
</template>
