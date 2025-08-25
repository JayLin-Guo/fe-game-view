import { sysConf } from '@/api/index'
import { ref } from 'vue'

export const useInitLoad = () => {
  const sysLinkConf = ref()
  const loading = ref(false)

  const initLoad = async () => {
    loading.value = true

    try {
      const res = await sysConf.initConf()
      sysLinkConf.value = res
    } catch (error) {
      console.error('初始化加载失败:', error)
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
