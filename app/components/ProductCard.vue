<script setup lang="ts">
  import { useAlert } from '@/composables/useAlert'
  import { ref } from 'vue'
  import { vClickOutside } from '@/directives/vClickOutside'
  import { Product } from '@/types'

  defineProps<{
    product: Product
  }>()

  const { show } = useAlert()

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

  function addToCart() {
    show({
      message: 'The item was added to your Shopping bag.',
      link: { to: '/cart', label: 'VIEW CART' },
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
      <button class="add-btn" @click="addToCart">ADD TO CART</button>
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
    width: 136px;
    font-family: $font-dm-sans;
    font-size: 14px;

    @media (min-width: $bp-lg) {
      width: 380px;
      font-size: 20px;
    }
  }

  .title {
    display: -webkit-box;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;

    @media (min-width: $bp-lg) {
      margin-bottom: 16px;
    }
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
    border-radius: 4px;

    @media (min-width: $bp-lg) {
      height: 380px;
      margin-bottom: 24px;
    }
  }

  .image-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
</style>
