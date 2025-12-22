import { defineStore } from 'pinia'
import { navigateTo } from 'nuxt/app'
import { useApiFetch } from '@/composables/api/useApiFetch'
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from '@/utils/localStorage'
import { ref } from 'vue'

interface User {
  token: string | null
}

interface AuthState {
  user: User
}

const AUTH_TOKEN_KEY = 'auth_token'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: { token: null },
  }),

  getters: {
    isAuthenticated: (state) => !!state.user.token,
  },

  actions: {
    loadTokenFromStorage() {
      this.user.token = getLocalStorageItem(AUTH_TOKEN_KEY)
    },

    saveTokenToStorage() {
      if (this.user.token) {
        setLocalStorageItem(AUTH_TOKEN_KEY, this.user.token)
      } else {
        removeLocalStorageItem(AUTH_TOKEN_KEY)
      }
    },

    async login(username: string, password: string, remember = false) {
      const { data, error } = await useApiFetch<{ token: string }>('/auth/login', {
        method: 'POST',
        body: { username, password },
      })

      if (error.value) {
        return { error }
      }

      const token = data.value?.token
      if (!token) {
        return {
          error: ref(new Error('Login failed: no token returned')),
        }
      }

      this.user.token = token

      if (remember) {
        setLocalStorageItem(AUTH_TOKEN_KEY, token)
      } else {
        removeLocalStorageItem(AUTH_TOKEN_KEY)
      }

      await navigateTo('/')

      return { error: null }
    },

    logout() {
      this.user.token = null
      removeLocalStorageItem(AUTH_TOKEN_KEY)
    },
  },
})
