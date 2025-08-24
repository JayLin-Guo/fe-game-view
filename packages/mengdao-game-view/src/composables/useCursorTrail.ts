/**
 * Vue组合式函数：鼠标光标跟随特效
 * 在Vue组件中使用鼠标跟随特效系统
 */

import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { CursorTrailManager, type TrailConfig } from '@/components/cursor-trail/CursorTrailManager'
import { type StarTheme } from '@/components/cursor-trail/star-icons'
import { useResponsiveScale } from './useResponsiveScale'

export interface CursorTrailOptions {
  enabled?: boolean
  theme?: StarTheme
  maxParticles?: number
  enableMobile?: boolean
  autoInit?: boolean
}

export function useCursorTrail(options: CursorTrailOptions = {}) {
  // 响应式状态
  const isEnabled = ref(options.enabled ?? true)
  const isInitialized = ref(false)
  const trailManager = ref<CursorTrailManager>()
  const particleCount = ref(0)

  // 集成响应式缩放系统
  const { currentScale, isMobile, isDesktop } = useResponsiveScale()

  // 配置选项
  const config = ref<Partial<TrailConfig>>({
    enabled: isEnabled.value,
    theme: options.theme || 'game',
    maxParticles: options.maxParticles || 25,
    enableMobile: options.enableMobile ?? false,
    scaleWithViewport: true,
  })

  // 计算属性
  const shouldEnable = computed(() => {
    if (!isEnabled.value) return false
    if (isMobile.value && !config.value.enableMobile) return false
    return true
  })

  const status = computed(() => {
    if (!trailManager.value) {
      return {
        isRunning: false,
        particleCount: 0,
        config: config.value,
        mousePosition: { x: 0, y: 0 },
      }
    }
    return trailManager.value.getStatus()
  })

  /**
   * 初始化特效系统
   */
  const init = () => {
    if (isInitialized.value || !shouldEnable.value) return

    try {
      trailManager.value = new CursorTrailManager(config.value)
      trailManager.value.init()
      isInitialized.value = true

      console.log('✨ 鼠标跟随特效初始化成功')
    } catch (error) {
      console.warn('❌ 鼠标跟随特效初始化失败:', error)
    }
  }

  /**
   * 销毁特效系统
   */
  const destroy = () => {
    if (!isInitialized.value || !trailManager.value) return

    try {
      trailManager.value.destroy()
      trailManager.value = undefined
      isInitialized.value = false
      particleCount.value = 0

      console.log('✨ 鼠标跟随特效已销毁')
    } catch (error) {
      console.warn('❌ 鼠标跟随特效销毁失败:', error)
    }
  }

  /**
   * 启用特效
   */
  const enable = () => {
    isEnabled.value = true
    if (!isInitialized.value) {
      init()
    } else if (trailManager.value) {
      trailManager.value.setEnabled(true)
    }
  }

  /**
   * 禁用特效
   */
  const disable = () => {
    isEnabled.value = false
    if (trailManager.value) {
      trailManager.value.setEnabled(false)
    }
  }

  /**
   * 切换特效状态
   */
  const toggle = () => {
    if (isEnabled.value) {
      disable()
    } else {
      enable()
    }
  }

  /**
   * 更新配置
   */
  const updateConfig = (newConfig: Partial<TrailConfig>) => {
    config.value = { ...config.value, ...newConfig }

    if (trailManager.value) {
      trailManager.value.updateConfig(config.value)
    }
  }

  /**
   * 设置主题
   */
  const setTheme = (theme: StarTheme) => {
    updateConfig({ theme })
  }

  /**
   * 设置最大粒子数
   */
  const setMaxParticles = (maxParticles: number) => {
    updateConfig({ maxParticles })
  }

  /**
   * 设置移动端支持
   */
  const setMobileEnabled = (enabled: boolean) => {
    updateConfig({ enableMobile: enabled })
  }

  // 监听响应式缩放变化
  watch(currentScale, newScale => {
    if (trailManager.value && config.value.scaleWithViewport) {
      // 响应式缩放变化时，可以调整粒子大小等参数
      const baseSize = isMobile.value ? 12 : 16
      const scaledSize = baseSize * newScale
      updateConfig({
        sizeRange: [scaledSize * 0.8, scaledSize * 1.2] as [number, number],
      })
    }
  })

  // 监听设备类型变化
  watch([isMobile, isDesktop], () => {
    if (isInitialized.value) {
      // 设备类型变化时重新初始化
      destroy()
      if (shouldEnable.value) {
        init()
      }
    }
  })

  // 监听启用状态变化
  watch(shouldEnable, newValue => {
    if (newValue && !isInitialized.value) {
      init()
    } else if (!newValue && isInitialized.value) {
      destroy()
    }
  })

  // 定期更新粒子数量统计
  let statsInterval: number | null = null

  const startStatsUpdate = () => {
    if (statsInterval) return

    statsInterval = window.setInterval(() => {
      if (trailManager.value) {
        const status = trailManager.value.getStatus()
        particleCount.value = status.particleCount
      }
    }, 1000) // 每秒更新一次统计
  }

  const stopStatsUpdate = () => {
    if (statsInterval) {
      clearInterval(statsInterval)
      statsInterval = null
    }
  }

  // 生命周期管理
  onMounted(() => {
    if (options.autoInit !== false && shouldEnable.value) {
      // 延迟初始化，确保DOM已准备好
      setTimeout(init, 100)
    }
    startStatsUpdate()
  })

  onUnmounted(() => {
    destroy()
    stopStatsUpdate()
  })

  return {
    // 状态
    isEnabled,
    isInitialized,
    particleCount,
    status,

    // 计算属性
    shouldEnable,

    // 方法
    init,
    destroy,
    enable,
    disable,
    toggle,
    updateConfig,
    setTheme,
    setMaxParticles,
    setMobileEnabled,

    // 配置
    config,
  }
}

// 导出类型
export type { TrailConfig, StarTheme }
