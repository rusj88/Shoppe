<script setup lang="ts">
  import { Pagination, Autoplay, Virtual } from 'swiper/modules'
  import type { SwiperModule } from 'swiper/types'
  import type { MySwiperOptions } from '@/types'
  import SlideOverlay from './SlideOverlay.vue'

  const slides = Array.from(
    { length: 10 },
    (_, i) => `https://picsum.photos/600/900?random=${i + 1}`,
  )

  const settings: MySwiperOptions = {
    modules: [Pagination, Autoplay, Virtual] as SwiperModule[],
    loop: true,
    virtual: true,
    slidesPerView: 1,
    spaceBetween: 12,
    autoplay: { delay: 2500, pauseOnMouseEnter: true },
    pagination: { clickable: true },
  }
</script>

<template>
  <div class="slider-container">
    <HomeSlider :slides="slides" :settings="settings">
      <template #default="{ slide, index }">
        <SlideOverlay :img="slide" :index="index" />
      </template>
    </HomeSlider>
  </div>
</template>

<style scoped lang="scss">
  .slider-container {
    margin-top: 16px;
  }
</style>
