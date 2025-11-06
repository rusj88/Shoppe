<script setup lang="ts">
  import { defineModel } from 'vue'
  import Slider from 'primevue/slider'

  const modelValue = defineModel<[number, number]>({
    required: true,
  })

  const { min = 0, max = 1000 } = defineProps<{
    min?: number
    max?: number
  }>()
</script>

<template>
  <Slider v-model="modelValue" :min="min" :max="max" range class="pv-slider-custom" />
</template>

<style lang="scss">
  .pv-slider-custom {
    --p-slider-track-background: #{$gray-300};
    --p-slider-track-size: 2px;
    --p-slider-track-border-radius: 0;
    --p-slider-range-background: #000;
    --p-slider-handle-width: 1px;
    --p-slider-handle-height: 8px;
    --p-slider-handle-border-radius: 0;
    --p-slider-handle-background: transparent;
    --p-slider-handle-hover-background: transparent;
    --p-slider-handle-content-width: 0;
    --p-slider-handle-content-height: 0;
    --p-slider-handle-content-background: transparent;
    --p-slider-handle-content-hover-background: transparent;
    --p-slider-handle-content-shadow: none;
    --p-slider-handle-focus-ring-width: 0;
    --p-slider-handle-focus-ring-offset: 0;
    --p-slider-handle-focus-ring-shadow: none;
  }

  .pv-slider-custom .p-slider-handle {
    top: 50% !important;
    padding: 6px 8px;
    cursor: grab;
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
    transform: translateX(-50%);

    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1px;
      height: 9px;
      content: '';
      background: #000;
      transform: translate(-50%, -6px);
    }

    &:active {
      cursor: grabbing;
    }
  }
</style>
