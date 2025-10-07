import { useFetch, useRuntimeConfig } from 'nuxt/app'
import { Product } from '@/types'

export function useJeweleryProducts(delayMs = 1200) {
  const config = useRuntimeConfig()
  const base = (config.public.apiBase as string).replace(/\/+$/, '')
  return useFetch<Product[]>(`${base}/products/category/${encodeURIComponent('jewelery')}`, {
    onRequest: async () => {
      if (delayMs) await new Promise((resolve) => setTimeout(resolve, delayMs))
    },
    server: false,
  })
}
