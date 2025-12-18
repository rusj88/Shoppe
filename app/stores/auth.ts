import { defineStore } from 'pinia'
import { navigateTo } from 'nuxt/app'
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from '@/utils/localStorage'

type User = { token: string | null }

const AUTH_TOKEN_KEY = 'auth_token'

export const useAuthStore = defineStore('auth', {
  state: (): { user: User } => ({
    user: { token: null },
  }),

  getters: {
    isAuthenticated: (state) => !!state.user.token,
  },

  actions: {
    loadFromStorage() {
      this.user.token = getLocalStorageItem(AUTH_TOKEN_KEY)
    },

    saveToStorage() {
      if (this.user.token) {
        setLocalStorageItem(AUTH_TOKEN_KEY, this.user.token)
      } else {
        removeLocalStorageItem(AUTH_TOKEN_KEY)
      }
    },

    async login(username: string, password: string, remember = false) {
      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        throw new Error(`Login failed (${res.status})`)
      }

      const data = (await res.json()) as { token?: string }
      if (!data?.token) {
        throw new Error('Login failed: no token returned')
      }

      this.user.token = data.token

      if (remember) {
        setLocalStorageItem(AUTH_TOKEN_KEY, data.token)
      } else {
        removeLocalStorageItem(AUTH_TOKEN_KEY)
      }

      await navigateTo('/')
    },

    logout() {
      this.user.token = null
      this.saveToStorage()
    },
  },
})
