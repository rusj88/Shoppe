import type { Product } from '@/types'
import { useApiFetch } from '@/composables/api/useApiFetch'
import { computed, type MaybeRef, unref } from 'vue'

export function useGetProduct(id: MaybeRef<string>) {
  const url = computed(() => {
    const productId = unref(id)
    return `/products/${productId}`
  })

  return useApiFetch<Product>(url, {
    server: false,
  })
}
