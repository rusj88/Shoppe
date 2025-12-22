import { defineNuxtPlugin } from 'nuxt/app'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(() => {
  const auth = useAuthStore()
  auth.loadTokenFromStorage()
})
