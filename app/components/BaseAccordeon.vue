<script setup lang="ts">
  import { ref, useSlots, computed } from 'vue'
  import ChevronRight from '@/assets/icons/chevron-right.svg'

  const slots = useSlots()
  const open = ref<string | null>(null)

  const items = computed(() => {
    const children = slots.default?.() ?? []

    return children
      .filter((vnode) => vnode.type && vnode.props?.name)
      .map((vnode) => ({
        name: vnode.props!.name as string,
        label: vnode.props!.label as string,
        vnode,
      }))
  })

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

      <div v-show="open === item.name" class="accordeon-panel">
        <component :is="item.vnode" />
      </div>
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
    padding: 14px 0;
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
    padding: 8px 0 16px;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $gray-600;
  }
</style>
