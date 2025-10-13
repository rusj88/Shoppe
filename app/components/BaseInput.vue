<script setup lang="ts">
  import { ref } from 'vue'

  defineOptions({ inheritAttrs: false })

  const model = defineModel<string | number | null>({ default: '' })

  const props = withDefaults(
    defineProps<{
      type?: string
      error?: boolean
      errorMessage?: string
    }>(),
    {
      type: 'text',
      error: false,
      errorMessage: '',
    },
  )

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
  defineExpose({ focus, blur, select, el: inputRef })
</script>

<template>
  <div class="field">
    <input ref="inputRef" v-bind="$attrs" v-model="model" :type="type" class="input" />
    <span class="end">
      <slot name="end" />
    </span>
  </div>
  <p v-if="props.error && props.errorMessage" class="error">
    {{ props.errorMessage }}
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
    right: 0;
    bottom: 10;
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
</style>
