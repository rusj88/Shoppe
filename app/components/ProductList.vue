<script setup lang="ts">
  import { Product } from '@/types'

  defineProps<{
    products: Product[]
  }>()
</script>

<template>
  <div class="products">
    <div v-for="product in products" :key="product.id">
      <ProductCard :product="product" class="product-card" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .products {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    width: 100%;
    margin-bottom: 20px;

    @media (min-width: $bp-lg) {
      margin-bottom: 86px;
    }
  }

  .product-card {
    width: 136px;
    height: 188px;

    @media (min-width: $bp-md) {
      width: 220px;
      height: 290px;
    }

    @media (min-width: $bp-xl) {
      width: 300px;
      height: 392px;
    }
  }
</style>
