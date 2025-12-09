<script setup lang="ts">
  import type { Product } from '@/types'
  import { ref } from 'vue'
  import { useCartStore } from '@/stores/cart'
  import { useAlert } from '@/composables/useAlert'

  const props = defineProps<{
    product: Product
  }>()

  const cartStore = useCartStore()
  const { show, hide } = useAlert()

  const quantity = ref(1)

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
  <div class="cart-controls">
    <div class="quantity-controls">
      <button class="qty-btn" type="button" @click="dec">−</button>
      <span class="quantity">{{ quantity }}</span>
      <button class="qty-btn" type="button" @click="inc">+</button>
    </div>

    <button class="add-btn" type="button" @click="addToCart">ADD TO CART</button>
  </div>
</template>

<style scoped lang="scss">
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
</style>
