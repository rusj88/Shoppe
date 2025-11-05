<script setup lang="ts">
  import { ref, watch } from 'vue'
  import FindIcon from '@/assets/icons/find.svg'
  import CloseIcon from '@/assets/icons/close.svg'
  import type { ProductFilters } from '@/types'

  const filters = defineModel<ProductFilters>('filters', { required: true })

  const PRICE_RANGE = [0, 1000]
  const range = ref(PRICE_RANGE)
  const searchInput = ref(filters.value?.search ?? '')

  let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null
  let rangeDebounceTimer: ReturnType<typeof setTimeout> | null = null

  watch(searchInput, (newValue) => {
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer)
    }
    searchDebounceTimer = setTimeout(() => {
      filters.value.search = newValue || undefined
    }, 800)
  })

  watch(
    () => filters.value?.search,
    (newSearch) => {
      if (searchInput.value !== (newSearch ?? '')) {
        searchInput.value = newSearch ?? ''
      }
    },
  )

  watch(
    range,
    (newValue) => {
      if (rangeDebounceTimer) {
        clearTimeout(rangeDebounceTimer)
      }
      rangeDebounceTimer = setTimeout(() => {
        if (JSON.stringify(newValue) === JSON.stringify(PRICE_RANGE)) {
          filters.value.priceRange = undefined
        } else {
          filters.value.priceRange = newValue
        }
      }, 800)
    },
    { deep: true },
  )

  watch(
    () => filters.value?.priceRange,
    (newRange) => {
      if (newRange && JSON.stringify(range.value) !== JSON.stringify(newRange)) {
        range.value = newRange
      } else if (!newRange) {
        range.value = PRICE_RANGE
      }
    },
    { deep: true, immediate: true },
  )

  const categories = [
    { name: "Men's clothing" },
    { name: 'Jewelery' },
    { name: 'Electronics' },
    { name: "Women's clothing" },
  ]
  const order = [{ name: 'Name' }, { name: 'Price' }]

  const resetRange = () => {
    if (rangeDebounceTimer) {
      clearTimeout(rangeDebounceTimer)
      rangeDebounceTimer = null
    }
    range.value = PRICE_RANGE
    filters.value.priceRange = undefined
  }

  defineEmits(['closeFilters'])
</script>
<template>
  <div class="wrapper">
    <div class="header">
      <h2 class="filters-heading">Filters</h2>
      <button class="close-btn" @click="$emit('closeFilters')">
        <CloseIcon />
      </button>
    </div>
    <div class="search">
      <BaseInput v-model="searchInput" type="text" name="search" placeholder="Search...">
        <template #end>
          <button type="submit" class="input-btn">
            <FindIcon />
          </button> </template
      ></BaseInput>
    </div>
    <div class="select-container">
      <BaseSelect v-model="filters.category" :options="categories" placeholder="Category" />
      <BaseSelect v-model="filters.sortBy" :options="order" placeholder="Sort By" />
    </div>
    <div class="slider-wrapper">
      <ClientOnly>
        <RangeSlider v-model="range" />
      </ClientOnly>
      <div class="row">
        <span class="price">Price: ${{ range[0] }} – ${{ range[1] }}</span>
        <button class="reset-btn" @click="resetRange">Reset</button>
      </div>
    </div>
    <div class="toggles">
      <div class="toggle"><span>On sale</span><ToggleSwitch v-model="filters.onSale" /></div>
      <div class="toggle"><span>In stock</span><ToggleSwitch v-model="filters.inStock" /></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 34px;

    @media (min-width: $bp-lg) {
      display: none;
    }
  }

  .filters-heading {
    margin: 0;
    font-family: $font-allerta-stencil;
    font-size: 25px;
    color: $color-black;
  }

  .close-btn:deep(svg) {
    width: 15px;
    height: 15px;
  }

  .search {
    font-family: $font-dm-sans;
    font-size: 14px;
  }

  .wrapper {
    padding: 8px 24px;
  }

  .input-btn {
    transform: translateX(-16px);
  }

  .slider-wrapper {
    padding-top: 40px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-family: $font-dm-sans;
    font-size: 14px;
  }

  .price {
    color: $gray-600;
  }

  .reset-btn {
    color: $color-accent-light;
    cursor: pointer;
    background: none;
    border: 0;
  }

  .select-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 40px;
  }

  .toggles {
    --p-toggleswitch-width: 33px;
    --p-toggleswitch-height: 20px;
    --p-toggleswitch-handle-size: 14px;
    --p-toggleswitch-background: #{$gray-600};
    --p-toggleswitch-checked-background: black;
    --p-toggleswitch-hover-background: #{$gray-650};
    --p-toggleswitch-hover-border-color: #{$gray-650};
    --p-toggleswitch-checked-hover-background: #{$gray-650};
    --p-toggleswitch-checked-hover-border-color: #{$gray-650};

    display: flex;
    flex-direction: column;
    gap: 42px;
    padding-top: 40px;

    @media (min-width: $bp-lg) {
      --p-toggleswitch-width: 40px;
      --p-toggleswitch-height: 25px;
    }
  }

  .toggle {
    display: flex;
    justify-content: space-between;
    font-family: $font-dm-sans;
    font-size: 16px;
    color: $color-black;
  }
</style>
