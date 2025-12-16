import type { Product } from '@/types'
import { useApiFetch } from '@/composables/api/useApiFetch'
import { computed, type MaybeRef, unref } from 'vue'

export function useGetProducts(category?: MaybeRef<string | undefined>) {
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

    transform: (products: Product[]) => {
      return products.map((product) => ({
        ...product,
        discount: Math.random() < 0.25,
        soldout: Math.random() < 0.1,
      })) as Product[]
    },
  })
}
