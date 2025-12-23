<script setup lang="ts">
  import { ref } from 'vue'
  import CancelIcon from '@/assets/icons/cancel.svg'

  defineOptions({ inheritAttrs: false })

  const model = defineModel<string | number | null>({ default: '' })

  const {
    type = 'text',
    error = false,
    errorMessage = '',
    clearable = false,
  } = defineProps<{
    type?: string
    error?: boolean
    errorMessage?: string
    clearable?: boolean
  }>()

  const inputRef = ref<HTMLInputElement | null>(null)
  function focus() {
    inputRef.value?.focus()
  }
  function blur() {
    inputRef.value?.blur()
  }
  function select() {
    inputRef.value?.select()
  }
  function clear() {
    model.value = ''
  }

  defineExpose({ focus, blur, select, el: inputRef })
</script>

<template>
  <div class="field">
    <input ref="inputRef" v-bind="$attrs" v-model="model" :type="type" class="input" />
    <span class="end">
      <button v-if="clearable && model" type="button" class="clear-btn" @click="clear">
        <CancelIcon />
      </button>
      <slot name="end" />
    </span>
  </div>
  <p v-if="error && errorMessage" class="error">
    {{ errorMessage }}
  </p>
</template>

<style lang="scss" scoped>
  .field {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input {
    width: 100%;
    padding: 0;
    padding-bottom: 10px;
    margin: 0;
    font: inherit;
    color: inherit;
    outline: none;
    background: transparent;
    border: none;
    border-bottom: 1px solid $color-black;
  }

  .end {
    position: absolute;
    top: 0;
    right: -16px;
    bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 6px;
  }

  .end :deep(svg) {
    width: 18px;
    height: 18px;
    color: $gray-600;
  }

  .error {
    color: $color-accent-red;
  }

  .clear-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &:deep(svg) {
      width: 12px;
      height: 12px;
      color: $gray-300;
    }
  }
</style>
