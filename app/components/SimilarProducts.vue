<script setup lang="ts">
  import { useGetProducts } from '@/composables/api/useGetProducts'
  import { computed, toRef } from 'vue'

  const props = defineProps<{
    category: string
    excludeId?: number
  }>()

  const categoryRef = toRef(props, 'category')
  const { data, pending, error } = useGetProducts(categoryRef)

  const similarProducts = computed(() => {
    const items = data.value ?? []
    return props.excludeId == null ? items : items.filter((p) => p.id !== props.excludeId)
  })
  const DEFAULT_SKELETON_COUNT = 4
  const skeletonCount = computed(() =>
    !pending.value && similarProducts.value.length
      ? similarProducts.value.length
      : DEFAULT_SKELETON_COUNT,
  )
</script>

<template>
  <div class="header">
    <h2 class="products-heading">Similar Items</h2>
  </div>

  <ProductList
    :products="similarProducts"
    :pending="pending"
    :error="error"
    :skeleton-count="skeletonCount"
  />
</template>

<style scoped lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 21px 0 13px;
    font-family: $font-dm-sans;

    @media (min-width: $bp-lg) {
      margin: 64px 0 39px;
    }
  }

  .products-heading {
    margin: 0;
    font-size: 16px;

    @media (min-width: $bp-lg) {
      font-size: 33px;
    }
  }
</style>
