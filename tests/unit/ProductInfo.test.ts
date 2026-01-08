import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductInfo from '@/components/ProductInfo.vue'

describe('product info block', () => {
  it('checks the product info block', async () => {
    const product = {
      id: 1,
      title: 'Cotton Jacket',
      price: 19.99,
      category: 'clothing',
      description:
        'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
      rating: { rate: 4.4, count: 0 },
      image: '/mock.jpg',
      discount: false,
      soldout: false,
    }

    const wrapper = mount(ProductInfo, {
      props: { product },
      global: {
        stubs: {
          ProductCartControls: { template: '<div />' },
          ProductFooter: { template: '<div />' },
          ChevronRight: { template: '<span />' },
          Rating: {
            props: ['modelValue', 'readonly'],
            emits: ['update:modelValue'],
            template: '<div />',
          },
        },
      },
    })

    expect(wrapper.get('h1').text()).toBe(product.title)
    expect(wrapper.get('.product-price').text()).toBe(`$ ${product.price}`)
    expect(wrapper.text()).toContain(`${product.rating.count} customer review`)

    const short = product.description.slice(0, 80) + '…'
    expect(wrapper.text()).toContain('View more')
    expect(wrapper.text()).toContain(short)

    await wrapper.get('.description-toggle').trigger('click')
    expect(wrapper.text()).toContain('Hide')
    expect(wrapper.text()).toContain(product.description)
  })
})
