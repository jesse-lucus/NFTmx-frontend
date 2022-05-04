<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  placeholder: String,
  readonly: Boolean,
  number: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const updateInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <input
    :value="modelValue"
    @input="updateInput"
    :class="[
      'focus:outline-none border border-black text-white placeholder-tertiary-500 bg-transparent w-full font-ibm-medium px-4',
    ]"
    :placeholder="placeholder"
    :readonly="readonly"
    :type="number ? 'number' : 'text'"
  />
</template>

<style scoped>
input {
  white-space: nowrap; /*keep text on one line */
  overflow: hidden; /*prevent text from being shown outside the border */
  text-overflow: ellipsis;
}
</style>
