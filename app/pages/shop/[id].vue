<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useRoute } from 'nuxt/app'
  import { useGetProduct } from '@/composables/api/useGetProduct'
  import { useBreakpointsTyped } from '@/plugins/breakpoints'

  import BaseTabs from '@/components/ui/BaseTabs.vue'
  import BaseAccordeon from '@/components/ui/BaseAccordeon.vue'

  const route = useRoute()
  const { data: product, pending, error } = useGetProduct(route.params.id as string)

  const galleryImages = computed(() => {
    const img = product.value?.image
    return img ? Array(4).fill(img) : []
  })

  const bp = useBreakpointsTyped()
  const tabsWrapper = computed(() => (bp.lg.value ? BaseTabs : BaseAccordeon))

  const reviewCount = ref(0)

  function loadReviewCount() {
    if (typeof window === 'undefined') return
    const id = product.value?.id
    if (!id) return

    const raw = window.localStorage.getItem(`reviews:${id}`)
    if (!raw) {
      reviewCount.value = 0
      return
    }

    try {
      const parsed = JSON.parse(raw)
      reviewCount.value = Array.isArray(parsed) ? parsed.length : 0
    } catch {
      reviewCount.value = 0
    }
  }

  watch(
    () => product.value?.id,
    () => loadReviewCount(),
    { immediate: true },
  )
</script>

<template>
  <div class="product-container" :class="{ center: pending || error }">
    <div v-if="pending">Loading…</div>
    <div v-else-if="error">Error loading product</div>
    <div v-else class="content">
      <div class="product">
        <ProductGallery :images="galleryImages" />
        <ProductInfo :product="product" />
      </div>

      <ClientOnly>
        <component :is="tabsWrapper">
          <BaseTab name="description" label="Description">
            <p class="tab-paragraph">Lorem ipsum dolor sit amet…</p>
          </BaseTab>

          <BaseTab name="additional" label="Additional information">
            <p class="tab-paragraph">More info here…</p>
          </BaseTab>

          <BaseTab name="reviews" :label="`Reviews (${reviewCount})`">
            <ProductReviews
              v-if="product"
              :product-id="product.id"
              :product-name="product.title"
              @change-count="reviewCount = $event"
            />
          </BaseTab>
        </component>
      </ClientOnly>
      <SimilarProducts :category="product?.category" :excludeId="product?.id" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .product-container {
    padding-top: 17px;

    @media (min-width: $bp-lg) {
      padding-top: 129px;
    }
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
  }

  .product {
    display: flex;
    flex-direction: column;
    gap: 39px;

    @media (min-width: $bp-lg) {
      flex-direction: row;
      margin-bottom: 120px;
    }
  }

  .tabs-desktop {
    display: none;

    @media (min-width: $bp-lg) {
      display: block;
    }
  }

  .tabs-mobile {
    @media (min-width: $bp-lg) {
      display: none;
    }
  }

  .tab-paragraph {
    margin: 0;
  }
</style>
