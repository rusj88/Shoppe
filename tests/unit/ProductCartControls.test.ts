import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCartControls from '@/components/ProductCartControls.vue'

vi.mock('@/stores/cart', () => ({
  useCartStore: () => ({ addItem: vi.fn(), toggle: vi.fn() }),
}))

vi.mock('@/composables/useAlert', () => ({
  useAlert: () => ({ show: vi.fn(), hide: vi.fn() }),
}))

describe('product cart controls', () => {
  it('changes quantity with + and − buttons', async () => {
    const product = {
      id: 1,
      title: 'Classic Cotton T-Shirt',
      price: 19.99,
      category: 'clothing',
      description: 'Soft cotton tee.',
      rating: { rate: 4.4, count: 7 },
      image: '/mock.jpg',
      discount: false,
      soldout: false,
    }

    const wrapper = mount(ProductCartControls, { props: { product } })

    const quantity = () => wrapper.get('.quantity').text()
    const buttons = wrapper.findAll('.qty-btn')

    const dec = buttons[0]
    const inc = buttons[1]

    expect(quantity()).toBe('1')

    await inc.trigger('click')
    expect(quantity()).toBe('2')

    await dec.trigger('click')
    expect(quantity()).toBe('1')

    await dec.trigger('click')
    expect(quantity()).toBe('1')
  })
})
