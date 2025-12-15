<script setup lang="ts">
  import { ref, useSlots, computed } from 'vue'
  import { mapNamedSlots } from '@/utils/mapNamedSlots'
  import ChevronRight from '@/assets/icons/chevron-right.svg'

  const slots = useSlots()
  const open = ref<string | null>(null)

  const items = computed(() => mapNamedSlots(slots))

  function toggle(name: string) {
    open.value = open.value === name ? null : name
  }
</script>

<template>
  <div class="accordeon-wrapper">
    <div v-for="item in items" :key="item.name" class="accordeon-item">
      <button class="accordeon-header" @click="toggle(item.name)">
        <span class="item-label">{{ item.label }}</span>
        <ChevronRight class="accordeon-icon" :class="{ open: open === item.name }" />
      </button>
      <Transition name="accordeon">
        <div v-show="open === item.name" class="accordeon-panel">
          <component :is="item.vnode" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .accordeon-wrapper {
    width: 100%;
    border-top: 1px solid $gray-300;
    border-bottom: 1px solid $gray-300;
  }

  .accordeon-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 8px 0;
    cursor: pointer;
    background: transparent;
    border: none;
  }

  .item-label {
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $color-black;
  }

  .accordeon-icon {
    width: 14px;
    height: 14px;
    transform: rotate(90deg);
    transition: transform 0.2s ease;
  }

  .accordeon-icon.open {
    transform: rotate(-90deg);
  }

  .accordeon-panel {
    padding: 4px 0 12px;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $gray-600;
  }

  .accordeon-enter-active,
  .accordeon-leave-active {
    overflow: hidden;
    transition:
      max-height 0.25s ease,
      opacity 0.2s ease;
  }

  .accordeon-enter-from,
  .accordeon-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .accordeon-enter-to,
  .accordeon-leave-from {
    max-height: 500px;
    opacity: 1;
  }
</style>
