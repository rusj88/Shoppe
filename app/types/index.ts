import type { Ref } from 'vue'

export type NavLink = { label: string; to: string }

export type Breakpoints = {
  sm: Ref<boolean>
  md: Ref<boolean>
  lg: Ref<boolean>
  xl: Ref<boolean>
  xxl: Ref<boolean>
}
