/**
 * 鼠标光标跟随特效管理器
 * 负责管理所有星星粒子的生命周期和动画
 */

import { StarParticle, ParticleFactory } from './StarParticle'
import { type StarTheme } from './star-icons'

export interface TrailConfig {
  // 基础配置
  maxParticles: number // 最大粒子数量
  spawnRate: number // 生成频率 (ms)
  enabled: boolean // 是否启用

  // 视觉配置
  theme: any // 主题
  sizeRange: [number, number] // 大小范围

  // 性能配置
  maxFPS: number // 最大帧率
  throttleDelay: number // 节流延迟

  // 响应式配置
  enableMobile: boolean // 移动端是否启用
  scaleWithViewport: boolean // 是否跟随视口缩放
}

const defaultConfig: TrailConfig = {
  maxParticles: 25,
  spawnRate: 50, // 每50ms最多生成一个
  enabled: true,
  theme: 'game',
  sizeRange: [12, 20],
  maxFPS: 60,
  throttleDelay: 16, // 约60fps
  enableMobile: false,
  scaleWithViewport: true,
}

export class CursorTrailManager {
  private config: TrailConfig
  private particles: StarParticle[] = []
  private isRunning: boolean = false
  private lastUpdateTime: number = 0
  private lastSpawnTime: number = 0
  private animationFrameId: number | null = null

  // 鼠标位置跟踪
  private mouseX: number = 0
  private mouseY: number = 0
  private lastMouseX: number = 0
  private lastMouseY: number = 0

  // 事件处理器
  private boundMouseMoveHandler: (event: MouseEvent) => void
  private boundTouchMoveHandler: (event: TouchEvent) => void
  private boundVisibilityChangeHandler: () => void

  constructor(config?: Partial<TrailConfig>) {
    this.config = { ...defaultConfig, ...config }

    // 绑定事件处理器
    this.boundMouseMoveHandler = this.handleMouseMove.bind(this)
    this.boundTouchMoveHandler = this.handleTouchMove.bind(this)
    this.boundVisibilityChangeHandler = this.handleVisibilityChange.bind(this)
  }

  /**
   * 初始化管理器
   */
  public init(): void {
    if (this.isRunning) return

    // 检查是否应该在当前设备上启用
    if (!this.shouldEnable()) {
      return
    }

    this.isRunning = true
    this.setupEventListeners()
    this.startAnimationLoop()

    console.log('🌟 鼠标跟随特效已启用')
  }

  /**
   * 销毁管理器
   */
  public destroy(): void {
    if (!this.isRunning) return

    this.isRunning = false
    this.removeEventListeners()
    this.stopAnimationLoop()
    this.clearAllParticles()

    console.log('🌟 鼠标跟随特效已禁用')
  }

  /**
   * 更新配置
   */
  public updateConfig(newConfig: Partial<TrailConfig>): void {
    const wasRunning = this.isRunning

    if (wasRunning) {
      this.destroy()
    }

    this.config = { ...this.config, ...newConfig }

    if (wasRunning && this.config.enabled) {
      this.init()
    }
  }

  /**
   * 启用/禁用特效
   */
  public setEnabled(enabled: boolean): void {
    if (enabled && !this.isRunning) {
      this.init()
    } else if (!enabled && this.isRunning) {
      this.destroy()
    }
  }

  /**
   * 检查是否应该启用特效
   */
  private shouldEnable(): boolean {
    if (!this.config.enabled) return false

    // 检查移动端设置
    const isMobile = window.innerWidth <= 768
    if (isMobile && !this.config.enableMobile) {
      return false
    }

    // 检查性能
    if (this.isLowPerformanceDevice()) {
      return false
    }

    // 检查用户偏好（尊重无障碍设置）
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false
    }

    return true
  }

  /**
   * 检查是否为低性能设备
   */
  private isLowPerformanceDevice(): boolean {
    // 简单的性能检测
    const canvas = document.createElement('canvas')
    const gl: any = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (!gl) return true

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      // 检测一些已知的低性能GPU
      if (renderer.includes('Intel') && renderer.includes('HD')) {
        return true
      }
    }

    return false
  }

  /**
   * 设置事件监听器
   */
  private setupEventListeners(): void {
    document.addEventListener('mousemove', this.boundMouseMoveHandler, { passive: true })

    if (this.config.enableMobile) {
      document.addEventListener('touchmove', this.boundTouchMoveHandler, { passive: true })
    }

    document.addEventListener('visibilitychange', this.boundVisibilityChangeHandler)
  }

  /**
   * 移除事件监听器
   */
  private removeEventListeners(): void {
    document.removeEventListener('mousemove', this.boundMouseMoveHandler)
    document.removeEventListener('touchmove', this.boundTouchMoveHandler)
    document.removeEventListener('visibilitychange', this.boundVisibilityChangeHandler)
  }

  /**
   * 处理鼠标移动事件
   */
  private handleMouseMove(event: MouseEvent): void {
    this.updateMousePosition(event.clientX, event.clientY)
  }

  /**
   * 处理触摸移动事件
   */
  private handleTouchMove(event: TouchEvent): void {
    if (event.touches.length > 0) {
      const touch = event.touches[0]
      this.updateMousePosition(touch.clientX, touch.clientY)
    }
  }

  /**
   * 更新鼠标位置并尝试生成粒子
   */
  private updateMousePosition(x: number, y: number): void {
    this.lastMouseX = this.mouseX
    this.lastMouseY = this.mouseY
    this.mouseX = x
    this.mouseY = y

    // 计算移动距离
    const distance = Math.sqrt(
      Math.pow(this.mouseX - this.lastMouseX, 2) + Math.pow(this.mouseY - this.lastMouseY, 2)
    )

    // 只有在移动距离足够大时才生成粒子
    if (distance > 5) {
      this.trySpawnParticle()
    }
  }

  /**
   * 尝试生成新粒子
   */
  private trySpawnParticle(): void {
    const now = Date.now()

    // 检查生成频率限制
    if (now - this.lastSpawnTime < this.config.spawnRate) {
      return
    }

    // 检查粒子数量限制
    if (this.particles.length >= this.config.maxParticles) {
      return
    }

    this.spawnParticle(this.mouseX, this.mouseY)
    this.lastSpawnTime = now
  }

  /**
   * 生成新粒子
   */
  private spawnParticle(x: number, y: number): void {
    // 应用响应式缩放
    let sizeRange = this.config.sizeRange
    if (this.config.scaleWithViewport) {
      const scaleRatio = this.getViewportScale()
      sizeRange = [sizeRange[0] * scaleRatio, sizeRange[1] * scaleRatio] as [number, number]
    }

    const particle = ParticleFactory.createStar(x, y, this.config.theme, sizeRange)
    this.particles.push(particle)
  }

  /**
   * 获取视口缩放比例
   */
  private getViewportScale(): number {
    // 尝试从现有的响应式缩放系统获取比例
    const scaleRatio = getComputedStyle(document.documentElement).getPropertyValue('--scale-ratio')

    if (scaleRatio) {
      return parseFloat(scaleRatio) || 1
    }

    // 降级方案：基于视口宽度计算
    const viewportWidth = window.innerWidth
    if (viewportWidth <= 768) {
      return Math.min(1.2, viewportWidth / 375) // 移动端基准
    } else {
      return Math.min(1.5, Math.max(0.7, viewportWidth / 1920)) // PC端基准
    }
  }

  /**
   * 开始动画循环
   */
  private startAnimationLoop(): void {
    const animate = (currentTime: number) => {
      if (!this.isRunning) return

      const deltaTime = currentTime - this.lastUpdateTime

      // 帧率控制
      if (deltaTime >= 1000 / this.config.maxFPS) {
        this.updateParticles(deltaTime)
        this.lastUpdateTime = currentTime
      }

      this.animationFrameId = requestAnimationFrame(animate)
    }

    this.lastUpdateTime = performance.now()
    this.animationFrameId = requestAnimationFrame(animate)
  }

  /**
   * 停止动画循环
   */
  private stopAnimationLoop(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
  }

  /**
   * 更新所有粒子
   */
  private updateParticles(deltaTime: number): void {
    // 更新粒子并移除死亡的粒子
    this.particles = this.particles.filter(particle => {
      const isAlive = particle.update(deltaTime)
      if (!isAlive) {
        particle.destroy()
      }
      return isAlive
    })
  }

  /**
   * 清理所有粒子
   */
  private clearAllParticles(): void {
    this.particles.forEach(particle => particle.destroy())
    this.particles = []
  }

  /**
   * 处理页面可见性变化
   */
  private handleVisibilityChange(): void {
    if (document.hidden) {
      // 页面隐藏时暂停动画
      this.stopAnimationLoop()
    } else if (this.isRunning) {
      // 页面显示时恢复动画
      this.startAnimationLoop()
    }
  }

  /**
   * 获取当前状态信息
   */
  public getStatus() {
    return {
      isRunning: this.isRunning,
      particleCount: this.particles.length,
      config: { ...this.config },
      mousePosition: { x: this.mouseX, y: this.mouseY },
    }
  }
}
