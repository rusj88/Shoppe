<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'nuxt/app'
  import { useGetProduct } from '@/composables/api/useGetProduct'

  const route = useRoute()

  const { data: product, pending, error } = useGetProduct(route.params.id as string)
  const galleryImages = computed(() => {
    const img = product.value?.image
    return img ? Array(4).fill(img) : []
  })
</script>

<template>
  <div class="product-container" :class="{ center: pending || error }">
    <div v-if="pending">Loading…</div>
    <div v-else-if="error">Error loading product</div>

    <div v-else-if="product" class="product">
      <ProductGallery :images="galleryImages" />
      <ProductInfo :product="product" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .product-container {
    padding-top: 17px;

    @media (min-width: $bp-lg) {
      padding-top: 129px;
    }
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
  }

  .product {
    display: flex;
    flex-direction: column;
    gap: 39px;

    @media (min-width: $bp-lg) {
      flex-direction: row;
    }
  }
</style>
