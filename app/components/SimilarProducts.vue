<script setup lang="ts">
  import { useGetSimilar } from '@/composables/api/useGetSimilar'
  import { computed } from 'vue'

  const props = defineProps<{
    category: string
    excludeId?: number
  }>()

  const { data, pending, error } = useGetSimilar(props.category)
  const similarProducts = computed(() => (data.value ?? []).filter((p) => p.id !== props.excludeId))
  const skeletonCount = computed(() => {
    if (!pending.value && similarProducts.value.length) {
      return similarProducts.value.length
    }

    return 4
  })
</script>

<template>
  <div class="header">
    <h2 class="products-heading">Similar Items</h2>
  </div>

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
        <div v-for="product in similarProducts" :key="product.id" class="card-wrapper">
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
    overflow-x: auto;
    scrollbar-width: none;

    @media (min-width: $bp-lg) {
      flex-wrap: wrap;
      justify-content: space-between;
      overflow-x: visible;
    }
  }

  .products::after {
    flex: 0 0 136px;
    content: '';

    @media (min-width: $bp-lg) {
      flex-basis: 380px;
    }
  }

  .card-wrapper {
    flex: 0 0 auto;
    width: 136px;

    @media (min-width: $bp-lg) {
      flex-basis: 380px;
    }
  }

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

  .view-all {
    font-size: 14px;
    color: $color-accent-light;

    @media (min-width: $bp-lg) {
      font-size: 20px;
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
