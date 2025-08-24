/**
 * 响应式缩放工具
 * 动态计算转换比例，支持移动端和PC端不同的基准比例
 */

export interface ScaleConfig {
  // 移动端配置
  mobile: {
    designWidth: number // 设计稿宽度
    designHeight: number // 设计稿高度
    minScale: number // 最小缩放比例
    maxScale: number // 最大缩放比例
    baseScale: number // 基准缩放比例
  }
  // PC端配置
  desktop: {
    designWidth: number // 设计稿宽度
    designHeight: number // 设计稿高度
    minScale: number // 最小缩放比例
    maxScale: number // 最大缩放比例
    baseScale: number // 基准缩放比例
  }
  // 通用配置
  common: {
    enableResize: boolean // 是否启用窗口大小变化监听
    debounceDelay: number // 防抖延迟时间
    updateInterval: number // 更新间隔时间
  }
}

// 默认配置
const defaultConfig: ScaleConfig = {
  mobile: {
    designWidth: 375,
    designHeight: 667,
    minScale: 0.8,
    maxScale: 1.2,
    baseScale: 1.0,
  },
  desktop: {
    designWidth: 1920,
    designHeight: 1080,
    minScale: 0.7,
    maxScale: 1.5,
    baseScale: 1.0,
  },
  common: {
    enableResize: true,
    debounceDelay: 100,
    updateInterval: 16, // 约60fps
  },
}

export class ResponsiveScale {
  private config: ScaleConfig
  private currentScale: number = 1
  private currentDevice: 'mobile' | 'desktop' = 'desktop'
  private resizeObserver: ResizeObserver | null = null
  private updateTimer: number | null = null
  private lastUpdateTime: number = 0

  constructor(config?: Partial<ScaleConfig>) {
    this.config = { ...defaultConfig, ...config }
    this.init()
  }

  /**
   * 初始化响应式缩放系统
   */
  private init(): void {
    this.updateScale()

    if (this.config.common.enableResize) {
      this.setupResizeListener()
    }
  }

  /**
   * 设置窗口大小变化监听
   */
  private setupResizeListener(): void {
    // 使用 ResizeObserver 监听容器大小变化
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(
        this.debounce(() => this.updateScale(), this.config.common.debounceDelay)
      )

      // 监听 body 元素
      this.resizeObserver.observe(document.body)
    } else {
      // 降级到 window resize 事件
      window.addEventListener(
        'resize',
        this.debounce(() => this.updateScale(), this.config.common.debounceDelay)
      )
    }
  }

  /**
   * 更新缩放比例
   */
  private updateScale(): void {
    const now = Date.now()
    if (now - this.lastUpdateTime < this.config.common.updateInterval) {
      return
    }
    this.lastUpdateTime = now

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // 判断设备类型
    this.currentDevice = windowWidth <= 768 ? 'mobile' : 'desktop'

    // 获取当前设备的配置
    const deviceConfig = this.config[this.currentDevice]

    // 计算缩放比例
    const scaleX = windowWidth / deviceConfig.designWidth
    const scaleY = windowHeight / deviceConfig.designHeight

    // 使用较小的缩放比例，确保内容完全显示
    let newScale = Math.min(scaleX, scaleY) * deviceConfig.baseScale

    // 应用缩放范围限制
    newScale = Math.max(deviceConfig.minScale, Math.min(deviceConfig.maxScale, newScale))

    // 更新当前缩放比例
    if (Math.abs(newScale - this.currentScale) > 0.01) {
      this.currentScale = newScale
      this.applyScale()
    }
  }

  /**
   * 应用缩放比例到页面
   */
  private applyScale(): void {
    const root = document.documentElement

    // 设置CSS自定义属性
    root.style.setProperty('--scale-ratio', this.currentScale.toString())
    root.style.setProperty('--device-type', this.currentDevice)

    // 设置根元素字体大小（用于rem单位）
    const baseFontSize = this.currentDevice === 'mobile' ? 16 : 16
    root.style.fontSize = `${baseFontSize * this.currentScale}px`

    // 触发自定义事件
    this.dispatchScaleChangeEvent()
  }

  /**
   * 触发缩放变化事件
   */
  private dispatchScaleChangeEvent(): void {
    const event = new CustomEvent('scaleChange', {
      detail: {
        scale: this.currentScale,
        device: this.currentDevice,
        config: this.config[this.currentDevice],
      },
    })
    window.dispatchEvent(event)
  }

  /**
   * 防抖函数
   */
  private debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: number
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => func(...args), delay)
    }
  }

  /**
   * 获取当前缩放比例
   */
  public getCurrentScale(): number {
    return this.currentScale
  }

  /**
   * 获取当前设备类型
   */
  public getCurrentDevice(): 'mobile' | 'desktop' {
    return this.currentDevice
  }

  /**
   * 获取当前设备配置
   */
  public getCurrentConfig() {
    return this.config[this.currentDevice]
  }

  /**
   * 手动设置缩放比例
   */
  public setScale(scale: number): void {
    const deviceConfig = this.config[this.currentDevice]
    const clampedScale = Math.max(deviceConfig.minScale, Math.min(deviceConfig.maxScale, scale))

    if (Math.abs(clampedScale - this.currentScale) > 0.01) {
      this.currentScale = clampedScale
      this.applyScale()
    }
  }

  /**
   * 重置缩放比例到默认值
   */
  public resetScale(): void {
    const deviceConfig = this.config[this.currentDevice]
    this.setScale(deviceConfig.baseScale)
  }

  /**
   * 更新配置
   */
  public updateConfig(newConfig: Partial<ScaleConfig>): void {
    this.config = { ...this.config, ...newConfig }
    this.updateScale()
  }

  /**
   * 销毁实例
   */
  public destroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }

    if (this.updateTimer) {
      clearTimeout(this.updateTimer)
      this.updateTimer = null
    }

    // 移除事件监听器
    window.removeEventListener('resize', () => {})
  }
}

// 创建全局实例
export const responsiveScale = new ResponsiveScale()

// 导出工具函数
export const scaleUtils = {
  /**
   * 将px值转换为当前缩放比例下的值
   */
  px(value: number): number {
    return value * responsiveScale.getCurrentScale()
  },

  /**
   * 将设计稿px值转换为当前设备下的vw值
   */
  vw(value: number): string {
    const device = responsiveScale.getCurrentDevice()
    const config = responsiveScale.getCurrentConfig()
    const vwValue = (value / config.designWidth) * 100
    return `${vwValue}vw`
  },

  /**
   * 将设计稿px值转换为当前设备下的vh值
   */
  vh(value: number): string {
    const device = responsiveScale.getCurrentDevice()
    const config = responsiveScale.getCurrentConfig()
    const vhValue = (value / config.designHeight) * 100
    return `${vhValue}vh`
  },

  /**
   * 获取CSS自定义属性值
   */
  getCSSVar(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name)
  },

  /**
   * 设置CSS自定义属性值
   */
  setCSSVar(name: string, value: string): void {
    document.documentElement.style.setProperty(name, value)
  },
}

// 类型已在接口定义时导出，无需重复导出
