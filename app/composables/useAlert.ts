import { useState } from 'nuxt/app'
import { reactive } from 'vue'
import type { NavLink } from '@/types'

interface AlertState {
  open: boolean
  message: string
  showIcon: boolean
  link?: NavLink
  delay: number
  duration: number
}

interface AlertOptions {
  message: string
  showIcon?: boolean
  link?: NavLink
  duration?: number
}

export function useAlert() {
  const state = useState<AlertState>('alert', () =>
    reactive({
      open: false,
      message: '',
      showIcon: true,
      link: undefined,
      delay: 0,
      duration: 3000,
    }),
  )

  let timeoutId: ReturnType<typeof setTimeout> | null = null

  function hide() {
    state.value.open = false
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  function show(options: AlertOptions) {
    if (timeoutId) clearTimeout(timeoutId)

    state.value.message = options.message
    state.value.link = options.link
    state.value.showIcon = options.showIcon ?? true
    state.value.duration = options.duration ?? 3000
    state.value.open = true
    state.value.delay = 0

    timeoutId = setTimeout(() => {
      state.value.open = false
      timeoutId = null
    }, state.value.duration)
  }

  return { state, show, hide }
}
