<script setup lang="ts">
  import { Pagination, Autoplay, Virtual } from 'swiper/modules'
  import type { SwiperModule } from 'swiper/types'
  import type { MySwiperOptions } from '@/types'
  import SlideOverlay from './SlideOverlay.vue'
  import { SwiperSlide } from 'swiper/vue'

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
    <BaseSlider :settings="settings">
      <SwiperSlide
        v-for="(slide, i) in slides"
        :key="i"
        :virtualIndex="settings?.virtual ? i : undefined"
      >
        <img :src="slide" loading="lazy" />
        <div class="swiper-lazy-preloader"></div>
        <div class="slider-overlay">
          <SlideOverlay :img="slide" :index="i" />
        </div>
      </SwiperSlide>
    </BaseSlider>
  </div>
</template>

<style scoped lang="scss">
  .slider-container {
    margin-top: 16px;
  }

  .slider-overlay {
    position: absolute;
    bottom: 25px;
    left: 8px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: $bp-lg) {
      bottom: 50%;
      left: 39px;
      transform: translateY(50%);
    }
  }

  .slider-overlay > * {
    pointer-events: auto;
  }
</style>
