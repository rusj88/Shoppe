<script setup lang="ts">
  defineProps<{
    modelValue: string | undefined
    options: { name: string }[]
    placeholder: string
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: string | undefined]
  }>()

  const handleUpdate = (value: string | null) => {
    emit('update:modelValue', value ?? undefined)
  }
</script>

<template>
  <div class="base-select">
    <Select
      :model-value="modelValue ?? null"
      :options="options"
      option-label="name"
      option-value="name"
      :placeholder="placeholder"
      showClear
      @update:model-value="handleUpdate"
    />
  </div>
</template>

<style scoped lang="scss">
  .base-select {
    --p-select-background: transparent;
    --p-select-border-color: #{$gray-300};
    --p-select-hover-border-color: #999;
    --p-select-focus-border-color: #666;
    --p-select-border-radius: 4px;
    --p-select-padding-x: 12px;
    --p-select-padding-y: 16px;
    --p-select-color: #000;
    --p-select-placeholder-color: #000;
    --p-select-shadow: none;
    --p-select-focus-ring-width: 0;
    --p-select-focus-ring-color: transparent;
    --p-select-focus-ring-shadow: none;
    --p-select-dropdown-color: #333;
    --p-select-overlay-background: white;
    --p-select-overlay-border-color: #d0d0d0;
    --p-select-overlay-border-radius: 4px;
    --p-select-overlay-shadow: 0 2px 4px rgb(0 0 0 / 8%);
    --p-select-overlay-color: #333;
    --p-select-list-padding: 8px 0;
    --p-select-option-padding: 12px 16px;
    --p-select-option-color: #333;
    --p-select-option-focus-background: #f8f8f8;
    --p-select-option-focus-color: #333;
    --p-select-option-selected-background: #f0f0f0;
    --p-select-option-selected-color: #333;
    --p-select-option-selected-focus-background: #f0f0f0;
    --p-select-option-selected-focus-color: #333;

    width: 100%;

    :deep(.p-select) {
      width: 100% !important;
    }
  }
</style>
