import { defineNuxtPlugin } from 'nuxt/app'
import { ref, reactive } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  const BP_SM = 640
  const BP_MD = 768
  const BP_LG = 1024
  const BP_XL = 1280
  const BP_XXL = 1536

  const sm = ref(false)
  const md = ref(false)
  const lg = ref(false)
  const xl = ref(false)
  const xxl = ref(false)

  const onResize = () => {
    const width = window.innerWidth
    sm.value = width >= BP_SM
    md.value = width >= BP_MD
    lg.value = width >= BP_LG
    xl.value = width >= BP_XL
    xxl.value = width >= BP_XXL
  }

  window.addEventListener('resize', onResize)
  onResize()

  const breakpoints = reactive({ sm, md, lg, xl, xxl })

  nuxtApp.provide('breakpoints', breakpoints)
})
