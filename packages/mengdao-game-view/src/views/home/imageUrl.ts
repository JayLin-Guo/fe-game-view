import { ref } from 'vue'

export const imageList = ref({
  logoIcon: {
    url: new URL('@/assets/logo-icon.png', import.meta.url).href,
  },
  mobileLogoIcon: {
    url: new URL('@/assets/start2.png', import.meta.url).href,
  },
  hero: {
    titleLeft: {
      url: new URL('@/assets/hero-left.png', import.meta.url).href,
    },
    titleRight: {
      url: new URL('@/assets/hero-right.png', import.meta.url).href,
    },
  },
})
