import type { SwiperOptions, SwiperModule } from 'swiper/types'

export type NavLink = { label: string; to?: string; onClick?: () => void }

export interface MySwiperOptions {
  modules?: SwiperModule[]
  loop?: boolean
  virtual?: boolean
  slidesPerView?: number
  spaceBetween?: number
  autoplay?: SwiperOptions['autoplay']
  pagination?: SwiperOptions['pagination']
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  discount: boolean
  soldout: boolean
}

export interface ProductFilters {
  category?: string
  sortBy?: string
  search?: string
  priceRange?: number[]
  onSale: boolean
  inStock: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export interface CartState {
  isOpen: boolean
  items: CartItem[]
  syncTimeout: ReturnType<typeof setTimeout> | null
}
