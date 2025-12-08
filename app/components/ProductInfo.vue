<script setup lang="ts">
  import type { RatedProduct } from '@/types'
  import Rating from 'primevue/rating'
  import { ref, computed } from 'vue'
  import { useCartStore } from '@/stores/cart'
  import { useAlert } from '@/composables/useAlert'

  import MailIcon from '@/assets/icons/email.svg'
  import FbIcon from '@/assets/icons/fb.svg'
  import IgIcon from '@/assets/icons/ig.svg'
  import TwIcon from '@/assets/icons/tw.svg'
  import ChevronRight from '@/assets/icons/chevron-right.svg'

  const props = defineProps<{
    product: RatedProduct
  }>()

  const cartStore = useCartStore()
  const { show, hide } = useAlert()

  const ratingValue = ref(props.product.rating)
  const quantity = ref(1)

  const showFullDescription = ref(false)
  const MAX_MOBILE_CHARS = 80

  const shortDescription = computed(() => {
    const desc = props.product.description
    if (desc.length <= MAX_MOBILE_CHARS) return desc
    return desc.slice(0, MAX_MOBILE_CHARS) + '…'
  })

  const socialmedia = [
    { label: 'Email', to: 'mailto:shopppe@shop.com', icon: MailIcon },
    { label: 'FB', to: 'https://www.facebook.com/', icon: FbIcon },
    { label: 'IG', to: 'https://www.instagram.com/', icon: IgIcon },
    { label: 'TW', to: 'https://x.com/', icon: TwIcon },
  ]

  const inc = () => {
    quantity.value++
  }

  const dec = () => {
    if (quantity.value > 1) quantity.value--
  }

  function openCart() {
    cartStore.toggle()
    hide()
  }

  function addToCart() {
    cartStore.addItem(props.product, quantity.value)
    show({
      message: 'The item was added to your Shopping bag.',
      link: { onClick: openCart, label: 'VIEW CART' },
      duration: 5000,
    })
  }
</script>

<template>
  <div class="product-info">
    <div class="product-header">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-price">$ {{ product.price }}</p>
    </div>

    <div class="product-content">
      <Rating v-model="ratingValue" class="custom-rating" />

      <button
        type="button"
        class="description-toggle"
        @click="showFullDescription = !showFullDescription"
      >
        {{ showFullDescription ? 'Hide' : 'View more' }}
        <ChevronRight class="toggle-icon" :class="{ rotated: showFullDescription }" />
      </button>

      <p class="product-description product-description--mobile">
        {{ showFullDescription ? product.description : shortDescription }}
      </p>

      <p class="product-description product-description--desktop">
        {{ product.description }}
      </p>

      <div class="cart-controls">
        <div class="quantity-controls">
          <button class="qty-btn" type="button" @click="dec">−</button>
          <span class="quantity">{{ quantity }}</span>
          <button class="qty-btn" type="button" @click="inc">+</button>
        </div>

        <button class="add-btn" type="button" @click="addToCart">ADD TO CART</button>
      </div>
    </div>

    <div class="product-footer">
      <div class="icons-block">
        <a
          v-for="link in socialmedia"
          :key="link.label"
          :href="link.to"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          :aria-label="link.label"
        >
          <component :is="link.icon" class="social-icon" />
        </a>
      </div>
      <span class="label">SKU:</span> 12 <br />
      <span class="label">Categories:</span> Fashion, Style
    </div>
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

  .cart-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 23px;
    height: 32px;

    @media (min-width: $bp-lg) {
      height: 53px;
      margin-bottom: 81px;
      font-size: 16px;
    }
  }

  .quantity-controls {
    display: none;
    gap: 6px;
    align-items: center;
    align-self: flex-end;
    justify-content: center;
    width: 83px;
    height: 100%;
    margin-top: auto;
    font-family: $font-dm-sans;
    font-size: 14px;
    background: $light-gray;
    border-radius: 4px;

    @media (min-width: $bp-lg) {
      display: flex;
    }
  }

  .qty-btn {
    width: 24px;
    height: 24px;
    font-family: $font-dm-sans;
    font-size: 16px;
    cursor: pointer;
    background: transparent;
  }

  .add-btn {
    flex: 1 1 auto;
    padding: 8px 0;
    font-family: $font-dm-sans;
    font-size: 12px;
    white-space: normal;
    border: 1px solid black;
    border-radius: 4px;

    @media (min-width: $bp-lg) {
      font-size: 16px;
    }
  }

  .icons-block {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 38px;

    &:deep(svg) {
      width: 12px;
      height: 12px;
      color: $gray-600;
    }

    @media (min-width: $bp-lg) {
      &:deep(svg) {
        width: 18px;
        height: 18px;
      }
    }
  }

  .product-footer {
    display: none;
    gap: 6px;
    font-family: $font-dm-sans;
    font-size: 16px;
    color: $gray-600;

    @media (min-width: $bp-lg) {
      display: block;
    }
  }

  .label {
    color: $color-black;
  }

  .custom-rating {
    --p-rating-icon-size: 18px;
    --p-rating-icon-color: $gray-700;
    --p-rating-icon-hover-color: $color-black;
    --p-rating-icon-active-color: $color-black;

    display: none;

    @media (min-width: $bp-lg) {
      display: flex;
    }
  }
</style>
