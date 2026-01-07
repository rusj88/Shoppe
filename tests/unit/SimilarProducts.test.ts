import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import SimilarProducts from '@/components/SimilarProducts.vue'
import ProductList from '@/components/ProductList.vue'

vi.mock('@/composables/api/useGetProducts', () => ({
  useGetProducts: () => ({
    pending: ref(false),
    error: ref(null),
    data: ref([
      {
        id: 10,
        title: 'Wool Sweater',
        price: 49.9,
        category: 'clothing',
        description: 'Warm sweater',
        rating: { rate: 4.6, count: 12 },
        image: '/sweater.jpg',
        discount: 0,
        soldout: false,
      },
    ]),
  }),
}))

describe('similar products', () => {
  it('shows product photo, name and price', () => {
    const wrapper = mount(SimilarProducts, {
      props: { category: 'clothing' },
      global: {
        components: { ProductList },
        stubs: {
          Transition: { template: '<div><slot /></div>' },
          SkeletonCard: true,

          ProductCard: {
            props: ['product'],
            template: `
              <article>
                <img :src="product.image" :alt="product.title" />
                <div class="title">{{ product.title }}</div>
                <div class="price">$ {{ product.price }}</div>
              </article>
            `,
          },
        },
      },
    })

    expect(wrapper.get('h2.products-heading').text()).toBe('Similar Items')

    expect(wrapper.text()).toContain('Wool Sweater')
    expect(wrapper.text()).toContain('$ 49.9')

    const img = wrapper.get('img')
    expect(img.attributes('src')).toBe('/sweater.jpg')
    expect(img.attributes('alt')).toBe('Wool Sweater')
  })
})
