<script setup lang="ts">
  import { useCartStore } from '@/stores/cart'
  import type { CartItem } from '@/types'

  const cartStore = useCartStore()

  const inc = (item: CartItem) => cartStore.updateQuantity(item.id, item.quantity + 1)
  const dec = (item: CartItem) => cartStore.updateQuantity(item.id, item.quantity - 1)

  defineProps<{
    item: CartItem
  }>()
</script>

<template>
  <div class="cart-item">
    <div class="image-container">
      <img :src="item.image" />
    </div>
    <div class="description">
      <div class="cart-item-header">
        <span class="title">{{ item.title }}</span>
        <button class="remove-item-btn" @click="cartStore.removeItem(item.id)">✕</button>
      </div>
      <span class="option">{{ item.category }}</span>
      <span class="price">$ {{ item.price }}</span>
      <div class="quantity-controls">
        <button class="qty-btn" @click="dec(item)">−</button>
        <span class="quantity">{{ item.quantity }}</span>
        <button class="qty-btn" @click="inc(item)">+</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .cart-item {
    display: flex;
    gap: 8px;
  }

  .description {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 6px;
    font-family: $font-dm-sans;
    font-size: 12px;

    @media (min-width: $bp-lg) {
      font-size: 14px;
    }
  }

  .cart-item-header {
    display: flex;
    gap: 6px;
    align-items: flex-start;
    justify-content: space-between;
  }

  .title {
    display: -webkit-box;
    flex: 1;
    min-width: 0;
    min-height: calc(2 * 26px);
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    line-height: 26px;
    color: $color-black;
    -webkit-box-orient: vertical;
  }

  .remove-item-btn {
    font-size: 12px;
    color: $color-black;
    cursor: pointer;
    background: none;
    border: none;
  }

  .option,
  .price {
    color: $gray-600;
  }

  .quantity-controls {
    display: flex;
    gap: 6px;
    align-items: center;
    align-self: flex-end;
    justify-content: center;
    width: 83px;
    height: 33px;
    margin-top: auto;
    font-family: $font-dm-sans;
    font-size: 14px;
    background: $light-gray;
    border-radius: 4px;
  }

  .qty-btn {
    width: 24px;
    height: 24px;
    font-family: $font-dm-sans;
    font-size: 16px;
    cursor: pointer;
    background: transparent;
  }

  .image-container {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 136px;
    height: 136px;
    overflow: hidden;
    background-color: $light-gray;
    border-radius: 4px;
  }

  .image-container img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
  }
</style>
