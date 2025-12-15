<script setup lang="ts">
  import { ref, useSlots, computed, watchEffect } from 'vue'
  import { mapNamedSlots } from '@/utils/mapNamedSlots'

  const slots = useSlots()
  const active = ref<string | null>(null)

  const tabs = computed(() => mapNamedSlots(slots))

  watchEffect(() => {
    if (!active.value && tabs.value.length) {
      active.value = tabs.value[0].name
    }
  })

  const activeTab = computed(() => tabs.value.find((tab) => tab.name === active.value) ?? null)

  function setActive(name: string) {
    active.value = name
  }
</script>

<template>
  <div class="tabs-wrapper">
    <div class="tab-buttons">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ active: active === tab.name }"
        @click="setActive(tab.name)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-panels">
      <component :is="activeTab.vnode" v-if="activeTab" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .tabs-wrapper {
    width: 100%;
    padding-top: 10px;
  }

  .tab-buttons {
    display: flex;
    gap: 90px;
    align-items: flex-end;
    padding: 0 0 12px;
    border-bottom: 1px solid $gray-300;
  }

  .tab-buttons button {
    position: relative;
    padding: 0 0 8px;
    font-family: $font-dm-sans;
    font-size: 20px;
    color: $gray-600;
    cursor: pointer;
    outline: none;
  }

  .tab-buttons button.active {
    font-weight: 500;
    color: $color-black;
  }

  .tab-buttons button.active::after {
    position: absolute;
    bottom: -13px;
    left: 0;
    width: 100%;
    height: 2px;
    content: '';
    background-color: $color-black;
  }

  .tab-panels {
    padding-top: 28px;
    font-family: $font-dm-sans;
    font-size: 16px;
    color: $gray-600;
  }
</style>
