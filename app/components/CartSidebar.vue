<script setup lang="ts">
  import { watch, onUnmounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCartStore } from '@/stores/cart'
  import BackIcon from '@/assets/icons/back.svg'

  const router = useRouter()
  const cartStore = useCartStore()

  const formattedTotal = computed(() => {
    return cartStore.total.toFixed(2)
  })

  const itemCountText = computed(() => {
    const count = cartStore.uniqueItemCount
    return `${count} ${count === 1 ? 'item' : 'items'}`
  })

  watch(
    () => cartStore.isOpen,
    (isOpen) => {
      document.body.style.overflow = isOpen ? 'hidden' : ''
    },
  )

  onUnmounted(() => {
    document.body.style.overflow = ''
  })

  function handleCheckout() {
    cartStore.toggle()
    router.push('/checkout')
  }
</script>

<template>
  <Teleport to="body">
    <Transition name="sidebar">
      <div v-if="cartStore.isOpen" class="sidebar-wrapper">
        <div class="sidebar-fog" @click="cartStore.toggle()" />

        <aside class="sidebar">
          <div class="sidebar-header">
            <button class="close-btn" @click="cartStore.toggle()"><BackIcon /></button>
            <h2>Shopping bag</h2>
          </div>

          <div class="sidebar-content">
            <div v-if="cartStore.items.length === 0" class="empty-cart">
              <p>Your cart is empty</p>
            </div>

            <div v-else class="cart-items">
              <p class="item-count-text">{{ itemCountText }}</p>
              <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
            </div>
          </div>

          <div v-if="cartStore.items.length > 0" class="sidebar-footer">
            <div class="cart-summary">
              <div class="summary-row">
                <span>Subtotal ({{ itemCountText }})</span>
                <span class="price">$ {{ formattedTotal }}</span>
              </div>
            </div>
            <button class="checkout-btn" @click="handleCheckout">CHECKOUT</button>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
  .sidebar-wrapper {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
  }

  .sidebar-fog {
    position: absolute;
    inset: 0;
    display: none;
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: blur(1px);
  }

  .sidebar {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 96%;
    max-width: 320px;
    height: 100%;
    padding-top: 13px;
    background: white;
    box-shadow: -2px 0 8px rgb(0 0 0 / 15%);
  }

  @media (min-width: $bp-md) {
    .sidebar-wrapper {
      justify-content: flex-end;
    }

    .sidebar-fog {
      display: block;
    }
  }

  @media (min-width: $bp-lg) {
    .sidebar {
      max-width: 360px;
    }
  }

  .sidebar-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    @media (min-width: $bp-lg) {
      justify-content: flex-start;
      padding: 0 16px;
    }
  }

  .sidebar-header h2 {
    margin: 0;
    font-family: $font-dm-sans;
    font-size: 16px;
    font-weight: 400;
    color: $color-black;
  }

  .close-btn {
    position: absolute;
    left: 16px;
    padding: 4px;
    cursor: pointer;
    background: none;
    border: none;
    transition: color 0.2s;

    &:deep(svg) {
      width: 9px;
      height: 16px;
      color: $color-black;
    }

    @media (min-width: $bp-md) {
      display: none;
    }
  }

  .sidebar-content {
    flex: 1;
    padding: 0 16px;
    overflow-y: auto;
  }

  .empty-cart {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 16px;
    color: $gray-600;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .sidebar-footer {
    padding: 24px 16px;
    font-family: $font-dm-sans;
    font-size: 12px;
    border-top: 1px solid $gray-600;

    @media (min-width: $bp-lg) {
      font-size: 16px;
    }
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
  }

  .cart-summary {
    margin-bottom: 21px;
  }

  .item-count-text {
    margin: 0;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $gray-600;
  }

  .checkout-btn {
    width: 100%;
    padding: 8px 0;
    font-family: $font-dm-sans;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid black;
    border-radius: 4px;

    @media (min-width: $bp-lg) {
      font-size: 16px;
    }
  }

  .sidebar-enter-active,
  .sidebar-leave-active {
    transition: opacity 0.3s ease;
  }

  .sidebar-enter-active .sidebar,
  .sidebar-leave-active .sidebar {
    transition: transform 0.3s ease;
  }

  .sidebar-enter-from,
  .sidebar-leave-to {
    opacity: 0;
  }

  .sidebar-enter-from .sidebar,
  .sidebar-leave-to .sidebar {
    transform: translateX(100%);
  }
</style>
