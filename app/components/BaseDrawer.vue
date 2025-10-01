<script setup lang="ts">
  import { onUnmounted, watch, watchEffect } from 'vue'
  import { useBreakpointsTyped } from '@/plugins/breakpoints'

  const model = defineModel<boolean>()

  watch(
    () => model.value,
    (isOpen) => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
  )
  const $breakpoints = useBreakpointsTyped()

  watchEffect(() => {
    if ($breakpoints.md.value) {
      model.value = false
    }
  })

  onUnmounted(() => {
    document.body.style.overflow = ''
  })
</script>

<template>
  <transition name="drawer-slide">
    <div v-show="model" v-bind="$attrs" class="drawer-content">
      <div class="drawer__scroll">
        <slot />
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
  .drawer-content {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    height: 90dvh;
    padding: 10px 16px 64px;
    font-family: $font-dm-sans;
    font-size: 20px;
    color: $color-black;
    background: #fff;
  }

  .drawer__scroll {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .drawer-slide-enter-active,
  .drawer-slide-leave-active {
    transition: transform 0.25s ease;
    will-change: transform;
  }

  .drawer-slide-enter-from,
  .drawer-slide-leave-to {
    transform: translateX(200%);
  }

  .drawer-slide-enter-to,
  .drawer-slide-leave-from {
    transform: translateX(0);
  }
</style>
