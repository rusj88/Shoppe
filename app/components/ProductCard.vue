<script setup lang="ts">
  import { useAlert } from '@/composables/useAlert'
  import { ref } from 'vue'
  import { vClickOutside } from '@/directives/vClickOutside'
  import { Product } from '@/types'
  import { useCartStore } from '@/stores/cart'

  const props = defineProps<{
    product: Product
  }>()

  const { show, hide } = useAlert()
  const cartStore = useCartStore()

  const revealed = ref(false)
  const cardEl = ref<HTMLElement | null>(null)

  function onCardTap() {
    if (!revealed.value) {
      revealed.value = true
    }
  }
  function onOutside() {
    revealed.value = false
  }

  function openCart() {
    cartStore.open()
    hide()
  }

  function addToCart() {
    cartStore.addItem(props.product)
    show({
      message: 'The item was added to your Shopping bag.',
      link: { onClick: openCart, label: 'VIEW CART' },
      duration: 5000,
    })
  }
</script>

<template>
  <article
    ref="cardEl"
    v-click-outside="onOutside"
    class="card"
    :class="{ revealed }"
    @click="onCardTap"
  >
    <div class="image-container">
      <img :src="product.image" />
      <div class="badge-container">
        <span v-if="product.discount" class="badge">- %20</span>
        <span v-if="product.soldout" class="badge">Sold out</span>
      </div>
      <button v-if="!product.soldout" class="add-btn" @click="addToCart">ADD TO CART</button>
    </div>
    <span class="title">{{ product.title }}</span>
    <span class="price">$ {{ product.price }}</span>
  </article>
</template>

<style scoped lang="scss">
  .add-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    padding: 4px 8px;
    font-family: $font-dm-sans;
    font-size: 12px;
    font-weight: bold;
    color: $color-black;
    pointer-events: none;
    cursor: pointer;
    background: $light-gray;
    border: none;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%);
    opacity: 0;
    transition: opacity 0.2s ease;

    @media (min-width: $bp-lg) {
      height: 65px;
      font-size: 16px;
    }

    @media (hover: hover) and (pointer: fine) {
      .card:hover & {
        pointer-events: auto;
        opacity: 1;
      }
    }

    @media (hover: none) and (pointer: coarse) {
      .card.revealed & {
        pointer-events: auto;
        opacity: 1;
      }
    }
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    font-family: $font-dm-sans;
    font-size: 14px;

    @media (min-width: $bp-lg) {
      gap: 16px;
      font-size: 20px;
    }
  }

  .title {
    display: -webkit-box;
    min-height: calc(2 * 26px);
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    line-height: 26px;
    -webkit-box-orient: vertical;
  }

  .price {
    font-size: 12px;
    color: $color-accent-light;

    @media (min-width: $bp-lg) {
      font-size: 20px;
    }
  }

  .image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 136px;
    margin-bottom: 8px;
    overflow: hidden;
    background-color: $gray-300;
    border-radius: 4px;

    @media (min-width: $bp-lg) {
      height: 380px;
      margin-bottom: 8px;
    }
  }

  .image-container img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
  }

  .badge-container {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px;

    @media (min-width: $bp-xl) {
      gap: 6px;
      padding: 16px;
    }
  }

  .badge {
    padding: 2px 8px;
    font-size: 12px;
    color: $color-white;
    background: $color-accent-light;
    border-radius: 4px;
  }
</style>
