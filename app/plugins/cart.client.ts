import { useCartStore } from '@/stores/cart'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const cart = useCartStore()
  cart.loadTokenFromStorage()
})
