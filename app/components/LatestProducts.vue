<script setup lang="ts">
  import { useJeweleryProducts } from '@/composables/api/useGetJewelery'

  const { data: products, pending, error } = useJeweleryProducts()
</script>

<template>
  <div class="header">
    <h2 class="products-heading">Shop The Latest</h2>
    <NuxtLink to="/shop" class="view-all">View all</NuxtLink>
  </div>

  <ProductList :products="products ?? []" :pending="pending" :error="error" :skeleton-count="4" />
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

  .view-all {
    font-size: 14px;
    color: $color-accent-light;

    @media (min-width: $bp-lg) {
      font-size: 20px;
    }
  }
</style>
