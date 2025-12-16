import type { Product } from '@/types'
import { useApiFetch } from '@/composables/api/useApiFetch'

export function useJeweleryProducts() {
  return useApiFetch<Product[]>('/products/category/jewelery', {
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
