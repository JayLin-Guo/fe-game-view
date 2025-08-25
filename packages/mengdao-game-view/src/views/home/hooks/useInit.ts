import { sysConf } from '@/api/index'
import { ref } from 'vue'

export const useInitLoad = () => {
  const sysLinkConf = ref()

  const loading = ref()
  const initLoad = async () => {
    loading.value = true

    try {
      const res = await sysConf.initConf()
      sysLinkConf.value = res
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    initLoad,
    sysLinkConf,
  }
}
