import { defineStore } from 'pinia'
import type { CartState, CartItem, Product } from '@/types'

const CART_STORAGE_KEY = 'cart-items'
const CART_SYNC_DELAY = 800

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    isOpen: false,
    items: [],
    syncTimeout: null,
  }),

  getters: {
    itemCount(state) {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    uniqueItemCount(state) {
      return state.items.length
    },

    total(state) {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    },
  },

  actions: {
    loadFromStorage() {
      if (!import.meta.client) return

      try {
        const raw = localStorage.getItem(CART_STORAGE_KEY)
        if (!raw) return

        const parsed = JSON.parse(raw) as CartItem[]
        this.items = parsed
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    },

    saveToStorage() {
      if (!import.meta.client) return

      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items))
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error)
      }
    },

    debounceSync() {
      if (this.syncTimeout) clearTimeout(this.syncTimeout)

      this.syncTimeout = setTimeout(() => {
        this.syncCart()
      }, CART_SYNC_DELAY)
    },

    updateStorageAndSync() {
      this.saveToStorage()
      this.debounceSync()
    },

    async syncCart() {
      const payload = {
        userId: 1,
        products: this.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      }

      try {
        const res = await fetch('https://fakestoreapi.com/carts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        await res.json()
      } catch (error) {
        console.error('Failed to sync cart:', error)
      }
    },

    toggle() {
      this.isOpen = !this.isOpen
    },

    addItem(product: Product, quantity = 1) {
      if (quantity <= 0) return

      const existing = this.items.find((item) => item.id === product.id)

      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ ...product, quantity })
      }

      this.updateStorageAndSync()
    },

    removeItem(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId)

      this.updateStorageAndSync()
    },

    updateQuantity(productId: number, quantity: number) {
      if (quantity <= 0) {
        this.removeItem(productId)
        return
      }

      const item = this.items.find((i) => i.id === productId)
      if (item) {
        item.quantity = quantity
      }

      this.updateStorageAndSync()
    },
  },
})
