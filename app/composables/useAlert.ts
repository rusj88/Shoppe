import { useState } from 'nuxt/app'
import { reactive } from 'vue'
import type { NavLink } from '@/types'

type AlertState = {
  open: boolean
  message: string
  showIcon: boolean
  link: NavLink | null
  timerId: ReturnType<typeof setTimeout> | null
  duration: number
}

export function useAlert() {
  const state = useState<AlertState>('alert', () =>
    reactive({
      open: false,
      message: '',
      showIcon: true,
      link: null,
      timerId: null,
      duration: 3000,
    }),
  )

  function hide() {
    state.value.open = false
    if (state.value.timerId) {
      clearTimeout(state.value.timerId)
      state.value.timerId = null
    }
  }

  function show(opts: {
    message: string
    link?: NavLink | null
    showIcon?: boolean
    duration?: number
  }) {
    if (state.value.timerId) clearTimeout(state.value.timerId)

    state.value.message = opts.message
    state.value.link = opts.link ?? null
    state.value.showIcon = opts.showIcon ?? true
    state.value.duration = opts.duration ?? 3000
    state.value.open = true

    state.value.timerId = setTimeout(() => {
      state.value.open = false
      state.value.timerId = null
    }, state.value.duration)
  }

  return { state, show, hide }
}
