<script setup lang="ts">
  import { AuthMode } from '@/types'

  defineProps<{
    modelValue: AuthMode
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', v: AuthMode): void
  }>()
</script>

<template>
  <div class="auth-switch">
    <button
      class="tab"
      :class="{ active: modelValue === AuthMode.SignIn }"
      type="button"
      @click="emit('update:modelValue', AuthMode.SignIn)"
    >
      sign in
    </button>

    <button
      class="tab"
      :class="{ active: modelValue === AuthMode.Register }"
      type="button"
      @click="emit('update:modelValue', AuthMode.Register)"
    >
      Register
    </button>
  </div>
</template>

<style scoped lang="scss">
  .auth-switch {
    display: flex;
    gap: 10px;
    padding: 4px;
    background: $light-gray;
    border-radius: 5px;
  }

  .tab {
    flex: 1;
    padding: 8px 49px;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $color-black;
    cursor: pointer;
    border-radius: 5px;
    transition:
      background 0.15s ease,
      box-shadow 0.15s ease;

    @media (min-width: $bp-lg) {
      font-size: 20px;
    }
  }

  .tab.active {
    background: $color-white;
    box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 10%);
  }
</style>
