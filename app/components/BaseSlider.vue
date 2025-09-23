<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/css'
  import 'swiper/css/pagination'
  import type { MySwiperOptions } from '@/types'

  const props = defineProps<{
    slides: string[]
    settings?: MySwiperOptions
  }>()
</script>

<template>
  <div class="slider-wrapper">
    <Swiper v-bind="props.settings">
      <SwiperSlide
        v-for="(slide, i) in props.slides"
        :key="i"
        :virtualIndex="props.settings?.virtual ? i : undefined"
      >
        <img :src="slide" loading="lazy" />
        <div class="swiper-lazy-preloader"></div>
      </SwiperSlide>
    </Swiper>

    <div class="slider-overlay">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .slider-wrapper {
    position: relative;
    width: 100%;
    max-width: 100%;
    height: 354px;

    --swiper-pagination-bullet-horizontal-gap: 6px;

    @media (min-width: $bp-lg) {
      --swiper-pagination-bullet-horizontal-gap: 13px;

      height: 646px;
    }
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

  :deep(.swiper-slide) {
    overflow: hidden;
    border-radius: 12px;
  }

  :deep(.swiper) {
    width: 100%;
    height: 100%;
  }

  :deep(.swiper-slide img) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  :deep(.swiper-pagination-bullet) {
    width: 6px;
    height: 6px;
    background: $color-white;
    border: 1px solid $color-white;
    border-radius: 50%;
    opacity: 1;

    @media (min-width: $bp-lg) {
      width: 10px;
      height: 10px;
    }
  }

  :deep(.swiper-pagination-bullet-active) {
    background: transparent;
    transform: scale(1.5);
    transition: transform 0.2s ease;
  }

  :deep(.swiper-lazy-preloader) {
    border: 3px solid $gray-350;
    border-top-color: $gray-650;

    @media (min-width: $bp-lg) {
      width: 32px;
      height: 32px;
    }
  }
</style>
