<script setup lang="ts">
  import { computed } from 'vue'
  import { useBreakpointsTyped } from '@/plugins/breakpoints'

  const props = defineProps<{
    page: number
    perPage: number
    totalItems: number
  }>()

  const emit = defineEmits<{
    (e: 'update:page', value: number): void
  }>()

  const { xl: isWide } = useBreakpointsTyped()
  const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / props.perPage)))
  const isFirst = computed(() => props.page <= 1)
  const isLast = computed(() => props.page >= totalPages.value)

  function go(target: number) {
    const newPage = Math.min(Math.max(1, target), totalPages.value)
    if (newPage !== props.page) {
      emit('update:page', newPage)
    }
  }

  const displayItems = computed<(number | '…')[]>(() => {
    const total = totalPages.value
    const current = props.page
    const sibling = isWide.value ? 2 : 1
    const items: (number | '…')[] = []

    if (total <= 7 + sibling) {
      for (let page = 1; page <= total; page++) {
        items.push(page)
      }
      return items
    }

    const left = Math.max(2, current - sibling)
    const right = Math.min(total - 1, current + sibling)

    items.push(1)

    if (left > 2) {
      items.push('…')
    }

    for (let page = left; page <= right; page++) {
      items.push(page)
    }

    if (right < total - 1) {
      items.push('…')
    }

    items.push(total)

    return items
  })
</script>

<template>
  <nav v-if="totalPages > 1" class="pagination">
    <button class="page-btn" :disabled="isFirst" @click="go(page - 1)"><</button>

    <template v-for="(item, idx) in displayItems" :key="`${item}-${idx}`">
      <button
        v-if="item !== '…'"
        class="page-btn"
        :class="{ active: item === page }"
        :disabled="item === page"
        @click="go(item as number)"
      >
        {{ item }}
      </button>
      <span v-else class="ellipsis">…</span>
    </template>

    <button class="page-btn" :disabled="isLast" @click="go(page + 1)">></button>
  </nav>
</template>

<style scoped lang="scss">
  .pagination {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;

    @media (min-width: $bp-lg) {
      gap: 12px;
    }
  }

  .page-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: $color-white;
    border: solid 1px $gray-300;
    border-radius: 4px;

    &.active {
      color: $color-white;
      background: $color-black;
      border-color: transparent;
    }

    @media (min-width: $bp-lg) {
      width: 45px;
      height: 45px;
    }
  }
</style>
