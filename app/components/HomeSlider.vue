<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/css'
  import 'swiper/css/pagination'
  import type { MySwiperOptions } from '@/types'
  import { ref } from 'vue'

  defineProps<{
    slides: string[]
    settings?: MySwiperOptions
  }>()

  const isLoading = ref(true)
  const onSwiperReady = () => {
    isLoading.value = false
  }
</script>

<template>
  <div class="slider-wrapper">
    <div v-if="isLoading" class="slider-loader">Loading…</div>
    <Swiper v-show="!isLoading" v-bind="settings" @swiper="onSwiperReady">
      <SwiperSlide
        v-for="(slide, i) in slides"
        :key="i"
        :virtualIndex="settings?.virtual ? i : undefined"
      >
        <img :src="slide" loading="lazy" />
        <div class="swiper-lazy-preloader"></div>
        <div class="slider-overlay">
          <slot :slide="slide" :index="i" />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
  .slider-wrapper {
    --swiper-pagination-bullet-horizontal-gap: 5px;

    position: relative;
    width: 100%;
    max-width: 100%;
    height: 354px;

    @media (min-width: $bp-lg) {
      --swiper-pagination-bullet-horizontal-gap: 12px;

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
    position: relative;
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

  .slider-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
