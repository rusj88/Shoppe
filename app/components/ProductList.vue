<script setup lang="ts">
  import type { Product } from '@/types'

  const {
    products,
    pending,
    error,
    skeletonCount = 4,
  } = defineProps<{
    products: Product[]
    pending: boolean
    error?: unknown
    skeletonCount?: number
  }>()
</script>

<template>
  <Transition name="fade" mode="out-in">
    <section class="products">
      <SkeletonCard
        v-for="n in skeletonCount"
        v-if="pending"
        :key="`skeleton-${n}`"
        class="card-wrapper"
      />

      <p v-else-if="error" class="error">Unable to fetch products. Try again later</p>

      <template v-else>
        <div v-for="product in products" :key="product.id" class="card-wrapper">
          <ProductCard :product="product" />
        </div>
      </template>
    </section>
  </Transition>
</template>

<style scoped lang="scss">
  .products {
    display: flex;
    flex-wrap: nowrap;
    gap: 16px;
    justify-content: space-between;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .card-wrapper {
    flex: 0 0 auto;
    width: 136px;

    @media (min-width: $bp-lg) {
      flex: 1 1 0;
      width: auto;
      min-width: 0;
    }
  }

  .error {
    padding: 16px;
    font-weight: bold;
    color: $color-accent-red;
  }

  .fade-enter-active,
  .fade-leave-active {
    pointer-events: none;
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(4px);
  }
</style>
