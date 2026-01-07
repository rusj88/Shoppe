import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductPage from '@/pages/shop/[id].vue'

vi.mock('nuxt/app', () => ({
  useRoute: () => ({
    params: { id: '1' },
  }),
}))

vi.mock('@/composables/api/useGetProduct', () => ({
  useGetProduct: () => ({
    pending: false,
    error: null,
    data: {
      value: {
        id: 1,
        title: 'Cotton Jacket',
        price: 19.99,
        category: 'clothing',
        description: 'great outerwear jackets',
        rating: { rate: 4.4, count: 0 },
        image: '/mock.jpg',
        discount: false,
        soldout: false,
      },
    },
  }),
}))

vi.mock('@/composables/api/useGetProducts', () => ({
  useGetProducts: () => ({
    pending: { value: false },
    error: { value: null },
    data: { value: [] },
  }),
}))

vi.mock('@/plugins/breakpoints', () => ({
  useBreakpointsTyped: () => ({
    lg: { value: true },
  }),
}))

describe('product page', () => {
  it('renders product tabs', () => {
    const wrapper = mount(ProductPage, {
      global: {
        stubs: {
          ProductGallery: {
            template: '<div data-testid="product-gallery" />',
          },
          ProductInfo: true,
          SimilarProducts: true,
          ProductReviews: true,
          ClientOnly: { template: '<div><slot /></div>' },
          BaseTabs: { template: '<div><slot /></div>' },
          BaseAccordeon: { template: '<div><slot /></div>' },
          BaseTab: { props: ['label'], template: '<div>{{ label }}</div>' },
        },
      },
    })

    expect(wrapper.text()).toContain('Description')
    expect(wrapper.text()).toContain('Additional information')
    expect(wrapper.text()).toContain('Reviews (0)')
  })

  it('renders product gallery', () => {
    const wrapper = mount(ProductPage, {
      global: {
        stubs: {
          ProductGallery: {
            template: '<div data-testid="product-gallery" />',
          },
          ProductInfo: true,
          SimilarProducts: true,
          ProductReviews: true,
          ClientOnly: { template: '<div><slot /></div>' },
          BaseTabs: { template: '<div><slot /></div>' },
          BaseAccordeon: { template: '<div><slot /></div>' },
          BaseTab: { props: ['label'], template: '<div>{{ label }}</div>' },
        },
      },
    })

    expect(wrapper.get('[data-testid="product-gallery"]')).toBeTruthy()
  })

  it('renders Similar Items section', () => {
    const wrapper = mount(ProductPage, {
      global: {
        stubs: {
          ProductGallery: true,
          ProductInfo: true,
          ProductReviews: true,
          ClientOnly: { template: '<div><slot /></div>' },
          BaseTabs: { template: '<div><slot /></div>' },
          BaseAccordeon: { template: '<div><slot /></div>' },
          BaseTab: { props: ['label'], template: '<div>{{ label }}</div>' },
          ProductList: true,
        },
      },
    })

    expect(wrapper.get('h2.products-heading').text()).toBe('Similar Items')
  })
})
