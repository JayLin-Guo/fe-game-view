import { ref } from 'vue'

export const imageList = ref({
  logoIcon: {
    url: new URL('@/assets/logo-icon.png', import.meta.url).href,
  },
})
