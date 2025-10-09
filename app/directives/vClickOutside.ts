import type { Directive, DirectiveBinding } from 'vue'

type ClickOutsideHandler = (event: PointerEvent) => void

interface ClickOutsideElement extends HTMLElement {
  _clickOutsideHandler?: ClickOutsideHandler
}

export const vClickOutside: Directive<ClickOutsideElement, ClickOutsideHandler> = {
  mounted(el, binding: DirectiveBinding<ClickOutsideHandler>) {
    const handler: ClickOutsideHandler = (e) => {
      if (el === e.target || el.contains(e.target as Node)) return
      binding.value(e)
    }

    el._clickOutsideHandler = handler
    document.addEventListener('pointerdown', handler, true)
  },

  unmounted(el) {
    const handler = el._clickOutsideHandler
    if (handler) {
      document.removeEventListener('pointerdown', handler, true)
      delete el._clickOutsideHandler
    }
  },
}
