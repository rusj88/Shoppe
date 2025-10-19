<script setup lang="ts">
  import { useJeweleryProducts } from '@/composables/api/useGetJewelery'

  const { data: products, pending, error } = useJeweleryProducts()
</script>

<template>
  <div class="header">
    <h2 class="products-heading">Shop The Latest</h2>
    <NuxtLink to="/shop" class="view-all">View all</NuxtLink>
  </div>
  <Transition name="fade" mode="out-in">
    <section class="products">
      <SkeletonCard v-for="n in 4" v-if="pending" :key="`skeleton-${n}`" class="card-wrapper" />

      <p v-else-if="error" class="error">Unable to fetch products. Try again later</p>

      <template v-else>
        <div v-for="product in products" :key="product.id" class="card-wrapper">
          <ProductCard :product="product" /></div
      ></template>
    </section>
  </Transition>
</template>
<style scoped lang="scss">
  .products {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: space-between;
  }

  .products::after {
    flex: 0 0 136px;
    content: '';

    @media (min-width: $bp-lg) {
      flex-basis: 380px;
    }
  }

  .card-wrapper {
    width: 136px;

    @media (min-width: $bp-lg) {
      width: 380px;
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
