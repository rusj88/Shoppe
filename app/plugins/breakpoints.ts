import { defineNuxtPlugin, useNuxtApp } from 'nuxt/app'
import { ref, type Ref } from 'vue'

interface Breakpoints {
  sm: Ref<boolean>
  md: Ref<boolean>
  lg: Ref<boolean>
  xl: Ref<boolean>
  xxl: Ref<boolean>
}

export default defineNuxtPlugin((nuxtApp) => {
  const sm = ref(false)
  const md = ref(false)
  const lg = ref(false)
  const xl = ref(false)
  const xxl = ref(false)

  const breakpoints: Breakpoints = { sm, md, lg, xl, xxl }

  if (import.meta.client) {
    const BP_SM = 640,
      BP_MD = 768,
      BP_LG = 1024,
      BP_XL = 1280,
      BP_XXL = 1536

    const onResize = () => {
      const w = window.innerWidth
      sm.value = w >= BP_SM
      md.value = w >= BP_MD
      lg.value = w >= BP_LG
      xl.value = w >= BP_XL
      xxl.value = w >= BP_XXL
    }

    window.addEventListener('resize', onResize)
    onResize()
  }

  nuxtApp.provide('breakpoints', breakpoints)
})

export const useBreakpointsTyped = (): Breakpoints => {
  return useNuxtApp().$breakpoints as Breakpoints
}
