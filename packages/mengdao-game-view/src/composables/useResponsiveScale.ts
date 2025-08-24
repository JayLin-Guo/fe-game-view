/**
 * Vue组合式函数：响应式缩放
 * 在Vue组件中使用响应式缩放系统
 */

import { ref, onMounted, onUnmounted, computed } from 'vue'
import { responsiveScale, scaleUtils, type ScaleConfig } from '@/utils/responsiveScale'

export function useResponsiveScale() {
  // 响应式状态
  const currentScale = ref(1)
  const currentDevice = ref<'mobile' | 'desktop'>('desktop')
  const isInitialized = ref(false)

  // 计算属性
  const isMobile = computed(() => currentDevice.value === 'mobile')
  const isDesktop = computed(() => currentDevice.value === 'desktop')

  // 缩放比例范围
  const scaleRange = computed(() => {
    const config = responsiveScale.getCurrentConfig()
    return {
      min: config.minScale,
      max: config.maxScale,
      base: config.baseScale,
    }
  })

  // 监听缩放变化事件
  const handleScaleChange = (event: CustomEvent) => {
    const { scale, device } = event.detail
    currentScale.value = scale
    currentDevice.value = device
  }

  // 初始化
  const init = () => {
    if (isInitialized.value) return

    // 获取初始值
    currentScale.value = responsiveScale.getCurrentScale()
    currentDevice.value = responsiveScale.getCurrentDevice()

    // 添加事件监听
    window.addEventListener('scaleChange', handleScaleChange as EventListener)

    isInitialized.value = true
  }

  // 手动设置缩放比例
  const setScale = (scale: number) => {
    responsiveScale.setScale(scale)
  }

  // 重置缩放比例
  const resetScale = () => {
    responsiveScale.resetScale()
  }

  // 更新配置
  const updateConfig = (config: Partial<ScaleConfig>) => {
    responsiveScale.updateConfig(config)
  }

  // 工具函数
  const px = (value: number) => scaleUtils.px(value)
  const vw = (value: number) => scaleUtils.vw(value)
  const vh = (value: number) => scaleUtils.vh(value)
  const getCSSVar = (name: string) => scaleUtils.getCSSVar(name)
  const setCSSVar = (name: string, value: string) => scaleUtils.setCSSVar(name, value)

  // 生命周期
  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    if (isInitialized.value) {
      window.removeEventListener('scaleChange', handleScaleChange as EventListener)
      isInitialized.value = false
    }
  })

  return {
    // 状态
    currentScale,
    currentDevice,
    isInitialized,

    // 计算属性
    isMobile,
    isDesktop,
    scaleRange,

    // 方法
    init,
    setScale,
    resetScale,
    updateConfig,

    // 工具函数
    px,
    vw,
    vh,
    getCSSVar,
    setCSSVar,
  }
}

// 导出类型
export type { ScaleConfig }
