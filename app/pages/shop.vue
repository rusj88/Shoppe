<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useGetProducts } from '@/composables/api/useGetProducts'
  import FiltersIcon from '@/assets/icons/filters.svg'
  import ErrorIcon from '@/assets/icons/error.svg'

  const { data: products, pending, error } = useGetProducts()

  const isMenuOpen = ref(false)
  const route = useRoute()
  const router = useRouter()

  const PER_PAGE = 6

  const page = computed<number>({
    get: () => Number(route.query.page) || 1,
    set: (val: number) => {
      router.push({ query: { ...route.query, page: val } })
    },
  })

  const totalItems = computed(() => products.value?.length ?? 0)

  watch(
    [totalItems, () => route.query.page],
    () => {
      const pages = Math.max(1, Math.ceil(totalItems.value / PER_PAGE))
      const rawPage = Math.max(1, Number(route.query.page) || 1)
      const validPage = Math.min(rawPage, pages)

      if (validPage !== rawPage) {
        router.replace({ query: { ...route.query, page: validPage } })
      }
    },
    { immediate: true },
  )

  const paginated = computed(() => {
    const list = products.value ?? []
    const start = (page.value - 1) * PER_PAGE
    return list.slice(start, start + PER_PAGE)
  })

  const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
</script>

<template>
  <div class="drawer-wrapper">
    <BaseDrawer v-model="isMenuOpen">
      <ProductFilters @closeFilters="toggleMenu" />
    </BaseDrawer>
  </div>
  <h2 class="heading">Shop <span class="desk-heading">The Latest</span></h2>
  <!-- prettier-ignore -->
  <button class="icon-row" @click="toggleMenu">
    <FiltersIcon /> Filters
  </button>
  <div class="content">
    <ProductFilters class="filters-section" />
    <div class="products-section">
      <div v-if="pending" class="skeleton-grid">
        <SkeletonCard v-for="n in PER_PAGE" :key="`skeleton-${n}`" class="skeleton-item" />
      </div>

      <div v-else-if="error" class="error">
        <p>Failed to load products.</p>
        <ErrorIcon />
      </div>

      <template v-else>
        <ProductList :products="paginated" />
        <BasePagination
          v-model:page="page"
          :per-page="PER_PAGE"
          :total-items="totalItems"
          class="pagination-block"
        />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .content {
    display: flex;
    gap: 35px;
    min-height: 700px;
  }

  .icon-row {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $color-accent-light;

    &:deep(svg) {
      width: 18px;
      height: 18px;
      color: $color-accent-light;
    }

    @media (min-width: $bp-lg) {
      display: none;
    }
  }

  .heading {
    margin: 24px 0 16px;
    font-family: $font-dm-sans;
    font-size: 20px;
    color: $color-black;

    @media (min-width: $bp-lg) {
      font-size: 33px;
    }
  }

  .desk-heading {
    display: none;

    @media (min-width: $bp-lg) {
      display: inline;
    }
  }

  .filters-section {
    display: none;
    background: $gray-300;

    @media (min-width: $bp-lg) {
      display: block;
      flex: 0 0 262px;
    }
  }

  .products-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .loading {
    text-align: center;
  }

  .skeleton-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    width: 100%;
  }

  .skeleton-item {
    width: 136px;
    height: 188px;

    @media (min-width: $bp-md) {
      width: 220px;
      height: 290px;
    }

    @media (min-width: $bp-xl) {
      width: 300px;
      height: 392px;
    }
  }

  .drawer-wrapper {
    position: relative;
    z-index: 100;
  }

  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    color: $color-accent-red;

    svg {
      width: 32px;
      height: 32px;
      margin-top: 12px;
    }

    &:deep(path) {
      fill: none;
      stroke: currentcolor;
    }
  }

  .pagination-block {
    margin-top: auto;
  }
</style>
