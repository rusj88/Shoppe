import type { Product } from '@/types'
import { useApiFetch } from '@/composables/api/useApiFetch'
import { computed, type MaybeRef, unref } from 'vue'

export function useGetProducts(category?: MaybeRef<string | undefined>, delayMs = 800) {
  const url = computed(() => {
    const cat = unref(category)
    if (cat) {
      const categorySlug = cat.toLowerCase()
      return `/products/category/${categorySlug}`
    }
    return '/products'
  })

  return useApiFetch<Product[]>(url, {
    server: false,
    onRequest: async () => {
      if (delayMs) await new Promise((r) => setTimeout(r, delayMs))
    },
  })
}
