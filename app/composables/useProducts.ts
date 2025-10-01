import { useFetch } from 'nuxt/app'

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: { rate: number; count: number }
}

export function useJeweleryProducts(delayMs = 1200) {
  // testing skeleton loader
  return useFetch<Product[]>('https://fakestoreapi.com/products/category/jewelery', {
    onRequest: async () => {
      if (delayMs) await new Promise((r) => setTimeout(r, delayMs))
    },
    server: false,
  })
}
