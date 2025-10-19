<script setup lang="ts">
  import { Product } from '@/types'

  defineProps<{
    products: Product[]
  }>()
</script>

<template>
  <div class="products">
    <div v-for="product in products" :key="product.id" class="card-wrapper">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .products {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 26px;

    @media (min-width: $bp-md) {
      justify-content: flex-start;
    }

    @media (min-width: $bp-lg) {
      justify-content: center;
      margin-bottom: 0;
    }
  }

  .card-wrapper {
    flex: 0 1 136px;

    @media (min-width: $bp-lg) {
      flex: 0 1 300px;
    }
  }
</style>
