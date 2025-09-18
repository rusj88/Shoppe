<script setup lang="ts">
  import { ref } from 'vue'
  import SearchIcon from '@/assets/icons/find.svg'

  const props = defineProps<{
    modelValue?: string
    placeholder?: string
    autoFocus?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', v: string): void
    (e: 'submit', v: string): void
  }>()

  const inputEl = ref<HTMLInputElement | null>(null)

  function onInput(e: Event) {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
  }
  function onSubmit(e: Event) {
    e.preventDefault()
    emit('submit', props.modelValue ?? '')
  }
</script>

<template>
  <form class="si" role="search" @submit="onSubmit">
    <span class="si-icon">
      <SearchIcon />
    </span>

    <input
      ref="inputEl"
      class="si-input"
      type="search"
      :value="modelValue || ''"
      :placeholder="placeholder || 'Search…'"
      :autofocus="autoFocus"
      autocomplete="off"
      spellcheck="false"
      @input="onInput"
    />
  </form>
</template>

<style scoped lang="scss">
  .si {
    position: relative;
    width: 100%;
    font-family: $font-dm-sans;
  }

  .si-input {
    width: 100%;
    height: 32px;
    padding: 0 32px;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $gray-600;
    outline: none;
    background: $light-gray;
    border: 1px solid transparent;
    border-radius: 8px;
  }

  .si:focus-within .si-input {
    border-color: rgb(0 0 0 / 28%);
    box-shadow: 0 0 0 3px rgb(0 0 0 / 6%);
  }

  .si-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    color: $gray-600;
    pointer-events: none;
    transform: translateY(-50%);

    :deep(svg) {
      width: 12px;
      height: 12px;
    }
  }
</style>
