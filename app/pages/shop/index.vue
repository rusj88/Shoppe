<script setup lang="ts">
  import { computed, reactive, ref, toRef, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useGetProducts } from '@/composables/api/useGetProducts'
  import FiltersIcon from '@/assets/icons/filters.svg'
  import ErrorIcon from '@/assets/icons/error.svg'
  import type { ProductFilters } from '@/types'
  import { validatePriceRange } from '@/utils/validators'

  const PER_PAGE = 6
  const route = useRoute()
  const router = useRouter()
  const isMenuOpen = ref(false)

  const filters = reactive<ProductFilters>({
    category: (route.query.category as string) || undefined,
    sortBy: (route.query.sortBy as string) || undefined,
    search: (route.query.search as string) || undefined,
    priceRange: validatePriceRange(route.query.price as string),
    onSale: route.query.onSale === 'true',
    inStock: route.query.inStock === 'true',
  })

  const { data: products, pending, error, refresh } = useGetProducts(toRef(filters, 'category'))

  const page = computed<number>({
    get: () => Number(route.query.page) || 1,
    set: (val: number) => {
      router.push({ query: { ...route.query, page: val } })
    },
  })

  const filteredProducts = computed(() => {
    let productList = products.value ?? []

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      productList = productList.filter((product) =>
        product.title?.toLowerCase().includes(searchLower),
      )
    }

    if (filters.priceRange && filters.priceRange.length === 2) {
      const [minPrice, maxPrice] = filters.priceRange
      productList = productList.filter((product) => {
        const price = product.price || 0
        return price >= minPrice && price <= maxPrice
      })
    }

    if (filters.onSale) {
      productList = productList.filter((product) => product.discount === true)
    }

    if (filters.inStock) {
      productList = productList.filter((product) => product.soldout !== true)
    }

    if (!filters.sortBy) {
      return productList
    }

    const sorted = [...productList]

    if (filters.sortBy === 'Name') {
      sorted.sort((a, b) => {
        const nameA = a.title?.toLowerCase() || ''
        const nameB = b.title?.toLowerCase() || ''
        return nameA.localeCompare(nameB)
      })
    } else if (filters.sortBy === 'Price') {
      sorted.sort((a, b) => {
        const priceA = a.price || 0
        const priceB = b.price || 0
        return priceA - priceB
      })
    }

    return sorted
  })

  const totalItems = computed(() => filteredProducts.value.length)

  const paginated = computed(() => {
    const list = filteredProducts.value
    const start = (page.value - 1) * PER_PAGE
    return list.slice(start, start + PER_PAGE)
  })

  watch(
    filters,
    (newFilters, oldFilters) => {
      const query: Record<string, string | number> = {}

      if (newFilters.category) query.category = newFilters.category
      if (newFilters.sortBy) query.sortBy = newFilters.sortBy
      if (newFilters.search) query.search = newFilters.search
      if (newFilters.priceRange) query.price = newFilters.priceRange.join(',')
      if (newFilters.onSale) query.onSale = 'true'
      if (newFilters.inStock) query.inStock = 'true'

      const filtersChanged =
        oldFilters &&
        (newFilters.category !== oldFilters.category ||
          newFilters.sortBy !== oldFilters.sortBy ||
          newFilters.search !== oldFilters.search ||
          newFilters.onSale !== oldFilters.onSale ||
          newFilters.inStock !== oldFilters.inStock ||
          JSON.stringify(newFilters.priceRange) !== JSON.stringify(oldFilters.priceRange))

      let pageNumber: number
      if (filtersChanged) {
        pageNumber = 1
      } else {
        pageNumber = Number(route.query.page) || 1
      }
      query.page = pageNumber

      const currentQuery = { ...route.query }
      if (JSON.stringify(currentQuery) !== JSON.stringify(query)) {
        router.push({ query })
      }
    },
    { deep: true },
  )

  watch(
    () => route.query,
    (query) => {
      filters.category = (query.category as string) || undefined
      filters.sortBy = (query.sortBy as string) || undefined
      filters.search = (query.search as string) || undefined

      const validatedPrice = validatePriceRange(query.price as string)
      filters.priceRange = validatedPrice

      filters.onSale = query.onSale === 'true'
      filters.inStock = query.inStock === 'true'

      if (query.price && !validatedPrice) {
        const cleanQuery = { ...query }
        delete cleanQuery.price
        router.replace({ query: cleanQuery })
      }
    },
    { immediate: true },
  )

  watch(
    () => filters.category,
    () => {
      refresh()
    },
  )

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

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }
</script>
<template>
  <div class="drawer-wrapper">
    <BaseDrawer v-model="isMenuOpen">
      <ProductFilters v-model:filters="filters" @closeFilters="toggleMenu" />
    </BaseDrawer>
  </div>
  <h2 class="heading">Shop <span class="desk-heading">The Latest</span></h2>
  <!-- prettier-ignore -->
  <button class="icon-row" @click="toggleMenu">
    <FiltersIcon /> Filters
  </button>
  <div class="content">
    <ProductFilters v-model:filters="filters" class="filters-section" />
    <div class="products-section">
      <div v-if="pending" class="skeleton-grid">
        <SkeletonCard v-for="n in PER_PAGE" :key="`skeleton-${n}`" class="skeleton-item" />
      </div>

      <div v-else-if="error" class="error">
        <p>Failed to load products.</p>
        <ErrorIcon />
      </div>

      <div v-else-if="paginated.length === 0">
        <p>No products found.</p>
      </div>

      <template v-else>
        <CatalogueItems :products="paginated" />
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

  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    width: 100%;
    margin-bottom: 20px;

    @media (min-width: $bp-md) {
      grid-template-columns: repeat(3, 1fr);
      margin-bottom: 86px;
    }
  }

  .skeleton-item {
    width: 100%;
    height: 188px;

    @media (min-width: $bp-md) {
      height: 290px;
    }

    @media (min-width: $bp-xl) {
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
