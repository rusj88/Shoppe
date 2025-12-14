import type { Product } from '@/types'
import { useApiFetch } from '@/composables/api/useApiFetch'
import { computed, unref, type MaybeRef } from 'vue'

export function useGetSimilar(category: MaybeRef<string>) {
  const url = computed(() => `/products/category/${encodeURIComponent(unref(category))}`)

  return useApiFetch<Product[]>(url, {
    server: false,
  })
}
