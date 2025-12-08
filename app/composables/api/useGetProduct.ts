import type { Product, RatedProduct } from '@/types'
import { useApiFetch } from '@/composables/api/useApiFetch'
import { computed, type MaybeRef, unref } from 'vue'

export function useGetProduct(id: MaybeRef<string>) {
  const url = computed(() => {
    const productId = unref(id)
    return `/products/${productId}`
  })

  return useApiFetch<RatedProduct>(url, {
    server: false,
    transform: (product: Product): RatedProduct => {
      return {
        ...product,
        rating: Math.floor(Math.random() * 5) + 1,
      }
    },
  })
}
