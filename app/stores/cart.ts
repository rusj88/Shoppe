import { defineStore } from 'pinia'
import type { Product } from '@/types'

export interface CartItem extends Product {
  quantity: number
}

const CART_STORAGE_KEY = 'cart-items'

let syncTimeout: ReturnType<typeof setTimeout> | null = null

export const useCartStore = defineStore('cart', {
  state: () => ({
    isOpen: false,
    items: [] as CartItem[],
  }),

  getters: {
    itemCount(state): number {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    uniqueItemCount(state): number {
      return state.items.length
    },

    total(state): number {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    },

    isInCart(state) {
      return (productId: string | number): boolean =>
        state.items.some((item) => item.id === productId)
    },

    getProductQuantity(state) {
      return (productId: string | number): number => {
        const item = state.items.find((item) => item.id === productId)
        return item?.quantity ?? 0
      }
    },
  },

  actions: {
    loadFromStorage() {
      if (!process.client) return

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
      if (!process.client) return

      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items))
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error)
      }
    },

    debounceSync() {
      if (syncTimeout) clearTimeout(syncTimeout)

      syncTimeout = setTimeout(() => {
        this.syncCart()
      }, 800)
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

    open() {
      this.isOpen = true
    },

    close() {
      this.isOpen = false
    },

    toggle() {
      this.isOpen = !this.isOpen
    },

    addItem(product: Product) {
      const existing = this.items.find((item) => item.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }

      this.updateStorageAndSync()
    },

    removeItem(productId: string | number) {
      this.items = this.items.filter((item) => item.id !== productId)

      this.updateStorageAndSync()
    },

    updateQuantity(productId: string | number, quantity: number) {
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
