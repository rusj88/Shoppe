<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useGetProducts } from '@/composables/api/useGetProducts'
  import FiltersIcon from '@/assets/icons/filters.svg'
  import ErrorIcon from '@/assets/icons/error.svg'

  const { data: products, pending, error } = useGetProducts()

  const isMenuOpen = ref(false)
  const route = useRoute()
  const router = useRouter()

  const perPage = 6
  const currentPage = computed(() => Number(route.query.page) || 1)

  const totalPages = computed(() =>
    products.value ? Math.ceil(products.value.length / perPage) : 1,
  )

  const paginated = computed(() => {
    if (!products.value) return []
    const start = (currentPage.value - 1) * perPage
    return products.value.slice(start, start + perPage)
  })

  function goToPage(page: number) {
    router.push({ query: { ...route.query, page } })
  }

  const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
</script>

<template>
  <div class="drawer-wrapper">
    <BaseDrawer v-model="isMenuOpen">
      <ProductFilters @closeFilters="toggleMenu" />
    </BaseDrawer>
  </div>
  <h2 class="heading">Shop <span class="desk-heading">The Latest</span></h2>
  <button class="icon-row" @click="toggleMenu"><FiltersIcon /> Filters</button>
  <div class="content">
    <div class="filters-section"><ProductFilters /></div>
    <div class="products-section">
      <ProductList :products="paginated" />
      <div v-if="pending" class="skeleton-grid">
        <SkeletonCard v-for="n in perPage" :key="`skeleton-${n}`" class="skeleton-item" />
      </div>

      <div v-else-if="error" class="error">
        <p>Failed to load products.</p>
        <ErrorIcon />
      </div>

      <div v-if="!pending && totalPages > 1" class="pagination">
        <button
          v-for="page in totalPages"
          :key="page"
          :disabled="page === currentPage"
          class="page-btn"
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <button
          :disabled="currentPage >= totalPages"
          class="page-btn"
          @click="goToPage(currentPage + 1)"
        >
          >
        </button>
      </div>
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
    width: 100%;
  }

  .loading {
    text-align: center;
  }

  .pagination {
    display: flex;
    gap: 8px;
    margin-top: auto;

    @media (min-width: $bp-lg) {
      gap: 12px;
      margin-top: 86px;
    }
  }

  .page-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: solid 1px $gray-300;
    border-radius: 4px;

    &.active {
      color: $color-white;
      background: $color-black;
      border-color: transparent;
    }

    @media (min-width: $bp-lg) {
      width: 45px;
      height: 45px;
    }
  }

  .skeleton-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .skeleton-item {
    flex: 0 1 136px;

    @media (min-width: $bp-lg) {
      flex: 0 1 300px;
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
</style>
