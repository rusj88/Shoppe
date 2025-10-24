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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 20px;

    @media (min-width: $bp-md) {
      grid-template-columns: repeat(3, 1fr);
      margin-bottom: 86px;
    }
  }

  .product-card {
    width: 100%;
    height: 188px;

    @media (min-width: $bp-md) {
      height: 290px;
    }

    @media (min-width: $bp-xl) {
      height: 392px;
    }
  }
</style>
