import type { SwiperOptions, SwiperModule } from 'swiper/types'

export type NavLink = { label: string; to: string }

export type MySwiperOptions = {
  modules?: SwiperModule[]
  loop?: boolean
  virtual?: boolean
  slidesPerView?: number
  spaceBetween?: number
  autoplay?: SwiperOptions['autoplay']
  pagination?: SwiperOptions['pagination']
}
