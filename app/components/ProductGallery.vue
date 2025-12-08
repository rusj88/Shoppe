<script setup lang="ts">
  import BaseSlider from '@/components/BaseSlider.vue'
  import { SwiperSlide } from 'swiper/vue'
  import type { MySwiperOptions } from '@/types'
  import { Pagination, Autoplay, Virtual } from 'swiper/modules'
  import type { SwiperModule } from 'swiper/types'
  import { ref } from 'vue'

  defineProps<{
    images: string[]
  }>()

  const activeIndex = ref(0)

  const setActive = (i: number) => {
    activeIndex.value = i
  }

  const sliderSettings: MySwiperOptions = {
    modules: [Pagination, Autoplay, Virtual] as SwiperModule[],
    loop: true,
    virtual: true,
    slidesPerView: 1,
    spaceBetween: 8,
    autoplay: { delay: 2500, pauseOnMouseEnter: true },
    pagination: {
      clickable: true,
    },
  }
</script>

<template>
  <div class="product-gallery">
    <div class="product-gallery-mobile">
      <BaseSlider :settings="sliderSettings">
        <SwiperSlide v-for="(src, index) in images" :key="index" class="product-gallery-slide">
          <img :src="src" :alt="`Product image ${index + 1}`" loading="lazy" />
        </SwiperSlide>
      </BaseSlider>
    </div>

    <div class="product-gallery-desktop">
      <div class="product-gallery-thumbs">
        <div
          v-for="(src, index) in images"
          :key="index"
          class="product-thumb"
          :class="{ active: activeIndex === index }"
          @click="setActive(index)"
        >
          <img :src="src" :alt="`Product thumbnail ${index + 1}`" />
        </div>
      </div>

      <div class="product-gallery-main">
        <img :src="images[activeIndex]" alt="Main product image" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .product-gallery-mobile {
    @media (min-width: $bp-lg) {
      display: none;
    }
  }

  .product-gallery-desktop {
    display: none;

    @media (min-width: $bp-lg) {
      display: flex;
      gap: 39px;
      align-items: flex-start;
    }
  }

  .product-gallery-thumbs {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .product-thumb {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    overflow: hidden;
    cursor: pointer;
    background: $gray-300;
    border-radius: 4px;
  }

  .product-thumb img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
  }

  .product-gallery-main {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-width: 440px;
    height: 600px;
    overflow: hidden;
    background: $gray-300;
    border-radius: 4px;

    @media (min-width: $bp-xl) {
      min-width: 540px;
    }
  }

  .product-gallery-main img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }

  :deep(.product-gallery-slide) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: $gray-300;
    border-radius: 4px;
  }

  :deep(.product-gallery-slide img) {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
</style>
