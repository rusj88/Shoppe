import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import BaseTabs from '@/components/ui/BaseTabs.vue'

const baseTab = defineComponent({
  name: 'BaseTab',
  props: {
    name: { type: String, required: true },
    label: { type: String, required: false },
  },
  setup(_, { slots }) {
    return () => slots.default?.()
  },
})

describe('base tabs', () => {
  it('switches tab content when a tab is clicked', async () => {
    const wrapper = mount(BaseTabs, {
      global: {
        components: { baseTab },
      },
      slots: {
        default: () => [
          h(baseTab, { name: 'description', label: 'Description' }, () =>
            h('div', 'Description content'),
          ),
          h(baseTab, { name: 'additional', label: 'Additional information' }, () =>
            h('div', 'Additional content'),
          ),
        ],
      },
    })

    const buttons = wrapper.findAll('.tab-buttons button')
    expect(buttons.map((b) => b.text())).toEqual(['Description', 'Additional information'])

    expect(wrapper.text()).toContain('Description content')
    expect(wrapper.text()).not.toContain('Additional content')

    await buttons[1].trigger('click')

    expect(wrapper.text()).toContain('Additional content')
    expect(wrapper.text()).not.toContain('Description content')
  })
})
