<script setup lang="ts">
  const props = defineProps<{
    modelValue: boolean
  }>()

  defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()
</script>

<template>
  <transition name="mm-collapse">
    <div v-show="props.modelValue" v-bind="$attrs" class="mm-content">
      <slot />
    </div>
  </transition>
</template>

<style scoped lang="scss">
  .mm-content {
    padding-top: 10px;
    font-family: $font-dm-sans;
    font-size: 20px;
    color: $color-black;
    background: #fff;
  }

  .mm-collapse-enter-active,
  .mm-collapse-leave-active {
    overflow: hidden;
    transition:
      max-height 0.22s ease,
      opacity 0.18s ease;
  }

  .mm-collapse-enter-from,
  .mm-collapse-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .mm-collapse-enter-to,
  .mm-collapse-leave-from {
    max-height: 80vh;
    opacity: 1;
  }
</style>
