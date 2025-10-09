import type { SwiperOptions, SwiperModule } from 'swiper/types'

export type NavLink = { label: string; to: string }

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
}
