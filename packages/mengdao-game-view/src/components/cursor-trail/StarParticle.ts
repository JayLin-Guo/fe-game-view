/**
 * 爱心粒子类
 * 管理单个爱心的生命周期、动画和渲染
 */

import {
  starIcons,
  getRandomStarType,
  starThemes,
  type StarIconType,
  type StarTheme,
} from './star-icons'

export interface ParticleConfig {
  x: number
  y: number
  size: number
  color: string
  iconType: StarIconType
  lifeTime: number
  fadeOutDuration: number
  initialVelocity?: { x: number; y: number }
  rotationSpeed?: number
}

export class StarParticle {
  // 位置和运动
  public x: number
  public y: number
  private velocityX: number = 0
  private velocityY: number = 0

  // 视觉属性
  public opacity: number = 1
  public scale: number = 0
  public rotation: number = 0
  private size: number
  private color: string
  private iconType: StarIconType

  // 生命周期
  private lifeTime: number
  private fadeOutDuration: number
  private age: number = 0
  private isAlive: boolean = true
  private rotationSpeed: number

  // DOM元素
  public element: any

  constructor(config: ParticleConfig) {
    this.x = config.x
    this.y = config.y
    this.size = config.size
    this.color = config.color
    this.iconType = config.iconType
    this.lifeTime = config.lifeTime
    this.fadeOutDuration = config.fadeOutDuration
    this.rotationSpeed = config.rotationSpeed || (Math.random() - 0.5) * 180 // 随机旋转速度

    // 设置初始速度（轻微的随机漂移）
    if (config.initialVelocity) {
      this.velocityX = config.initialVelocity.x
      this.velocityY = config.initialVelocity.y
    } else {
      this.velocityX = (Math.random() - 0.5) * 20
      this.velocityY = (Math.random() - 0.5) * 20 - 10 // 轻微向上漂移
    }

    this.createElement()
    this.render()
  }

  /**
   * 创建DOM元素
   */
  private createElement(): void {
    this.element = document.createElement('div')
    this.element.className = 'cursor-trail-star'
    this.element.style.cssText = `
      position: fixed;
      pointer-events: none;
      user-select: none;
      z-index: 9999;
      transform-origin: center;
      will-change: transform, opacity;
    `

    // 创建SVG内容
    const iconConfig = starIcons[this.iconType]
    this.element.innerHTML = `
      <svg width="${this.size}" height="${this.size}" viewBox="${iconConfig.viewBox}" style="color: ${this.color}; display: block;" xmlns="http://www.w3.org/2000/svg">
        ${iconConfig.svg}
      </svg>
    `

    // 添加到页面
    document.body.appendChild(this.element)
  }

  /**
   * 更新粒子状态
   * @param deltaTime 时间增量（毫秒）
   * @returns 是否仍然存活
   */
  public update(deltaTime: number): boolean {
    if (!this.isAlive) return false

    this.age += deltaTime

    // 更新位置
    this.x += this.velocityX * (deltaTime / 1000)
    this.y += this.velocityY * (deltaTime / 1000)

    // 更新旋转
    this.rotation += this.rotationSpeed * (deltaTime / 1000)

    // 计算生命周期进度
    const lifeProgress = this.age / this.lifeTime

    if (lifeProgress >= 1) {
      // 生命周期结束
      this.destroy()
      return false
    }

    // 计算缩放动画（0-0.3秒内从0放大到1）
    const scaleInDuration = 300
    if (this.age < scaleInDuration) {
      const scaleProgress = this.age / scaleInDuration
      this.scale = this.easeOutBack(scaleProgress)
    } else {
      this.scale = 1
    }

    // 计算透明度动画（最后fadeOutDuration时间内淡出）
    const fadeStartTime = this.lifeTime - this.fadeOutDuration
    if (this.age >= fadeStartTime) {
      const fadeProgress = (this.age - fadeStartTime) / this.fadeOutDuration
      this.opacity = 1 - this.easeInQuad(fadeProgress)
    } else {
      this.opacity = 1
    }

    // 应用重力效果（轻微下降）
    this.velocityY += 20 * (deltaTime / 1000)

    // 应用空气阻力
    this.velocityX *= 0.98
    this.velocityY *= 0.98

    this.render()
    return true
  }

  /**
   * 渲染粒子到DOM
   */
  private render(): void {
    if (!this.element) return

    const transform = `
      translate3d(${this.x - this.size / 2}px, ${this.y - this.size / 2}px, 0)
      scale(${this.scale})
      rotate(${this.rotation}deg)
    `

    this.element.style.transform = transform
    this.element.style.opacity = this.opacity.toString()
  }

  /**
   * 销毁粒子
   */
  public destroy(): void {
    this.isAlive = false
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element)
    }
  }

  /**
   * 检查粒子是否存活
   */
  public get alive(): boolean {
    return this.isAlive
  }

  /**
   * 获取粒子年龄
   */
  public get currentAge(): number {
    return this.age
  }

  // 缓动函数
  private easeOutBack(t: number): number {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  }

  private easeInQuad(t: number): number {
    return t * t
  }
}

/**
 * 粒子工厂类
 * 用于创建不同类型的粒子
 */
export class ParticleFactory {
  static createStar(
    x: number,
    y: number,
    theme: StarTheme = 'kawaii',
    sizeRange: [number, number] = [14, 22]
  ): StarParticle {
    const colors = starThemes[theme]
    const color = colors[Math.floor(Math.random() * colors.length)]
    const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0])
    const iconType = getRandomStarType()

    return new StarParticle({
      x,
      y,
      size,
      color,
      iconType,
      lifeTime: 1200 + Math.random() * 800, // 1.2-2秒生命周期
      fadeOutDuration: 600, // 0.6秒淡出时间
      rotationSpeed: (Math.random() - 0.5) * 45, // 爱心旋转更轻柔
    })
  }
}
