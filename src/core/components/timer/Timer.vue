<script setup>
import NumberBlock from "@/core/components/basic/NumberBlock.vue";
import { computed, ref } from "vue";

defineProps({
  size: {
    type: String,
    default: "small",
  },
  color: {
    type: String,
    default: "tertiary-800",
  },
});
const time = ref(80000);
const day = computed(() => parseInt(time.value / 86400));
const day1 = computed(() => parseInt(day.value / 10));
const day2 = computed(() => day.value % 10);
const hour = computed(() => parseInt((time.value % 86400) / 3600));
const hour1 = computed(() => parseInt(hour.value / 10));
const hour2 = computed(() => hour.value % 10);
const min = computed(() => parseInt((time.value % 3600) / 60));
const min1 = computed(() => parseInt(min.value / 10));
const min2 = computed(() => min.value % 10);
const sec = computed(() => parseInt(time.value % 60));
const sec1 = computed(() => parseInt(sec.value / 10));
const sec2 = computed(() => sec.value % 10);

const timer = setInterval(() => {
  if (time.value > 0) {
    time.value--;
  } else {
    clearInterval(timer);
  }
}, 1000);
</script>

<template>
  <div
    :class="[
      size === 'big' ? 'font-ibm-bold text-2xl' : 'font-ibm text-sm',
      'flex gap-x-0.5 max-w-fit items-center text-white',
    ]"
    style="width: -webkit-fill-available"
  >
    <number-block :color="color" :size="size">{{
      day1 ? day1 : 0
    }}</number-block>
    <number-block :color="color" :size="size">{{
      day2 ? day2 : 0
    }}</number-block>
    <span class="-mx-px">:</span>
    <number-block :color="color" :size="size">{{
      hour1 ? hour1 : 0
    }}</number-block>
    <number-block :color="color" :size="size">{{
      hour2 ? hour2 : 0
    }}</number-block>
    <span class="-mx-px">:</span>
    <number-block :color="color" :size="size">{{
      min1 ? min1 : 0
    }}</number-block>
    <number-block :color="color" :size="size">{{
      min2 ? min2 : 0
    }}</number-block>
    <span class="-mx-px">:</span>
    <number-block :color="color" :size="size">{{
      sec1 ? sec1 : 0
    }}</number-block>
    <number-block :color="color" :size="size">{{
      sec2 ? sec2 : 0
    }}</number-block>
    <span class="-mx-px">:</span>
    <number-block :color="color" :size="size">
      <span class="numbers__window">
        <span
          :class="[time > 0 ? 'number-milli-1' : '', 'number-milli']"
          data-fake="0987654321"
          >0</span
        >
      </span>
    </number-block>
    <number-block :color="color" :size="size">
      <span class="numbers__window">
        <span
          :class="[time > 0 ? 'number-milli-2' : '', 'number-milli']"
          data-fake="0987654321"
          >0</span
        >
      </span>
    </number-block>
  </div>
</template>

<style scoped>
.numbers__window {
  display: inline-block;
  overflow: hidden;
  width: 100%;
  height: 1em;
  line-height: 1;
}
.number-milli {
  font: inherit;
  word-break: break-all;
  display: block;
  width: 0;
  padding: 0 0.65em 0 0;
  margin: 0 auto;
  overflow: inherit;
}
.number-milli::before {
  content: attr(data-fake);
  display: inline-block;
  width: 100%;
  height: auto;
}
@keyframes counting {
  100% {
    transform: translate3d(0, -10em, 0);
  }
}
.number-milli-1 {
  animation-iteration-count: 6;
  animation: counting 1s steps(10) forwards infinite;
}
.number-milli-2 {
  animation-iteration-count: 9;
  animation: counting 0.1s steps(10) forwards infinite;
}
</style>
