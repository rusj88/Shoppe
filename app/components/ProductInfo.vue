<script setup lang="ts">
  import type { Product } from '@/types'
  import Rating from 'primevue/rating'
  import { ref, computed } from 'vue'
  import ChevronRight from '@/assets/icons/chevron-right.svg'

  const props = defineProps<{
    product: Product
  }>()

  const ratingValue = ref(props.product.rating.rate)
  const showFullDescription = ref(false)
  const MAX_MOBILE_CHARS = 80

  const shortDescription = computed(() => {
    const desc = props.product.description
    if (desc.length <= MAX_MOBILE_CHARS) return desc
    return desc.slice(0, MAX_MOBILE_CHARS) + '…'
  })

  const toggleDescription = () => (showFullDescription.value = !showFullDescription.value)
</script>

<template>
  <div class="product-info">
    <div class="product-header">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-price">$ {{ product.price }}</p>
    </div>

    <div class="product-content">
      <div class="rating-container">
        <Rating v-model="ratingValue" readonly class="custom-rating" />
        <span class="rating-count">{{ product.rating.count }} customer review</span>
      </div>

      <button type="button" class="description-toggle" @click="toggleDescription">
        {{ showFullDescription ? 'Hide' : 'View more' }}
        <ChevronRight class="toggle-icon" :class="{ rotated: showFullDescription }" />
      </button>

      <p class="product-description product-description--mobile">
        {{ showFullDescription ? product.description : shortDescription }}
      </p>

      <p class="product-description product-description--desktop">
        {{ product.description }}
      </p>

      <ProductCartControls :product="product" />
    </div>

    <ProductFooter :sku="product.id" :category="product.category" />
  </div>
</template>

<style scoped lang="scss">
  .product-content {
    display: flex;
    flex-direction: column-reverse;
    margin-top: 24px;

    @media (min-width: $bp-lg) {
      flex-direction: column;
      margin-top: 0;
    }
  }

  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .product-header {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (min-width: $bp-lg) {
      gap: 23px;
    }
  }

  .product-title {
    margin: 0;
    font-family: $font-dm-sans;
    font-size: 20px;
    color: $color-black;

    @media (min-width: $bp-lg) {
      font-size: 26px;
    }
  }

  .product-price {
    margin: 0;
    font-family: $font-dm-sans;
    font-size: 20px;
    color: $color-accent-light;
  }

  .product-description {
    margin-top: 16px;
    margin-bottom: 8px;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $gray-600;

    @media (min-width: $bp-lg) {
      margin-bottom: 24px;
      font-size: 16px;
    }
  }

  .product-description--mobile {
    @media (min-width: $bp-lg) {
      display: none;
    }
  }

  .product-description--desktop {
    display: none;

    @media (min-width: $bp-lg) {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 4;
      line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }

  .description-toggle {
    display: flex;
    gap: 4px;
    align-self: flex-start;
    padding: 0;
    margin-bottom: 16px;
    font-family: $font-dm-sans;
    font-size: 12px;
    line-height: 1;
    color: $color-accent-light;
    cursor: pointer;
    background: none;
    border: none;

    @media (min-width: $bp-lg) {
      display: none;
    }
  }

  .toggle-icon {
    align-self: flex-end;
    width: 5px;
    height: 8px;
    color: $color-black;

    &.rotated {
      transform: rotate(180deg);
    }
  }

  .rating-container {
    display: none;

    @media (min-width: $bp-lg) {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      align-items: center;
    }
  }

  .rating-count {
    font-family: $font-dm-sans;
    font-size: 16px;
    color: $gray-600;
  }

  .custom-rating {
    --p-rating-icon-size: 18px;
    --p-rating-icon-color: $gray-700;
    --p-rating-icon-hover-color: $color-black;
    --p-rating-icon-active-color: $color-black;
  }
</style>
