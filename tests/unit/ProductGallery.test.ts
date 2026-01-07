import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductGallery from '@/components/ProductGallery.vue'

describe('product gallery', () => {
  it('renders the gallery with an active main image', () => {
    const images = ['/img-1.jpg', '/img-2.jpg', '/img-3.jpg', '/img-4.jpg']

    const wrapper = mount(ProductGallery, {
      props: { images },
      global: {
        stubs: {
          BaseSlider: { template: '<div><slot /></div>' },
          SwiperSlide: { template: '<div><slot /></div>' },
        },
      },
    })

    const thumbs = wrapper.findAll('.product-thumb img')
    expect(thumbs).toHaveLength(images.length)

    const mainImage = wrapper.get('.product-gallery-main img')
    expect(mainImage.attributes('src')).toBe(images[0])
    expect(mainImage.attributes('alt')).toBe('Main product image')

    const slides = wrapper.findAll('.product-gallery-slide img')
    expect(slides).toHaveLength(images.length)
  })
})
