import type { Product } from '@/types'
import { useApiFetch } from '@/composables/api/useApiFetch'

export function useGetProducts(delayMs = 1200) {
  return useApiFetch<Product[]>('/products', {
    server: false,
    onRequest: async () => {
      if (delayMs) await new Promise((r) => setTimeout(r, delayMs))
    },
  })
}
