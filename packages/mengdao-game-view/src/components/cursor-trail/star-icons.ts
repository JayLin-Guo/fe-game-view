/**
 * SVG爱心图标配置
 * 提供多种风格的爱心图标供鼠标跟随特效使用
 */

export interface HeartIconConfig {
  name: string
  svg: string
  viewBox: string
  defaultColor: string
}

export type HeartIconType = 'classic' | 'cute' | 'sparkle' | 'bubble' | 'kawaii'

export const heartIcons: Record<HeartIconType, HeartIconConfig> = {
  // 经典爱心
  classic: {
    name: '经典爱心',
    viewBox: '0 0 24 24',
    defaultColor: '#FF69B4',
    svg: `
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            fill="currentColor"/>
    `,
  },

  // 可爱爱心（圆润风格）
  cute: {
    name: '可爱爱心',
    viewBox: '0 0 24 24',
    defaultColor: '#FFB3E6',
    svg: `
      <defs>
        <linearGradient id="cuteHeartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:currentColor;stop-opacity:1" />
          <stop offset="100%" style="stop-color:currentColor;stop-opacity:0.7" />
        </linearGradient>
      </defs>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            fill="url(#cuteHeartGradient)" 
            rx="2" 
            ry="2"/>
      <ellipse cx="8.5" cy="7.5" rx="1.5" ry="1" fill="rgba(255,255,255,0.3)"/>
    `,
  },

  // 闪烁爱心（带星星装饰）
  sparkle: {
    name: '闪烁爱心',
    viewBox: '0 0 24 24',
    defaultColor: '#FF1493',
    svg: `
      <g fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        <path d="M6 4l0.5 1L7.5 5.5 7 6l-0.5 1L6 6l-1-0.5L6 4.5 6 4z" opacity="0.8"/>
        <path d="M18 6l0.5 1L19.5 7.5 19 8l-0.5 1L18 8l-1-0.5L18 6.5 18 6z" opacity="0.8"/>
        <path d="M4 12l0.5 1L5.5 13.5 5 14l-0.5 1L4 14l-1-0.5L4 12.5 4 12z" opacity="0.6"/>
        <path d="M20 10l0.5 1L21.5 11.5 21 12l-0.5 1L20 12l-1-0.5L20 10.5 20 10z" opacity="0.6"/>
      </g>
    `,
  },

  // 泡泡爱心（3D效果）
  bubble: {
    name: '泡泡爱心',
    viewBox: '0 0 24 24',
    defaultColor: '#FF6B9D',
    svg: `
      <defs>
        <radialGradient id="bubbleHeartGradient" cx="30%" cy="30%">
          <stop offset="0%" style="stop-color:rgba(255,255,255,0.8)" />
          <stop offset="70%" style="stop-color:currentColor" />
          <stop offset="100%" style="stop-color:currentColor" />
        </radialGradient>
      </defs>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            fill="url(#bubbleHeartGradient)"/>
      <ellipse cx="8" cy="7" rx="2" ry="1.5" fill="rgba(255,255,255,0.4)"/>
      <circle cx="9" cy="6.5" r="0.8" fill="rgba(255,255,255,0.6)"/>
    `,
  },

  // 卡哇伊爱心（带表情）
  kawaii: {
    name: '卡哇伊爱心',
    viewBox: '0 0 24 24',
    defaultColor: '#FF91A4',
    svg: `
      <g fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        <circle cx="9" cy="9" r="0.8" fill="rgba(0,0,0,0.6)"/>
        <circle cx="15" cy="9" r="0.8" fill="rgba(0,0,0,0.6)"/>
        <path d="M9 12c0 1.5 1.5 3 3 3s3-1.5 3-3" stroke="rgba(0,0,0,0.4)" stroke-width="0.8" fill="none" stroke-linecap="round"/>
        <circle cx="8.5" cy="8.5" r="0.3" fill="rgba(255,255,255,0.8)"/>
        <circle cx="14.5" cy="8.5" r="0.3" fill="rgba(255,255,255,0.8)"/>
      </g>
    `,
  },
}

// 随机获取爱心图标类型
export function getRandomHeartType(): HeartIconType {
  const types = Object.keys(heartIcons) as HeartIconType[]
  return types[Math.floor(Math.random() * types.length)]
}

// 获取主题色彩配置
export const heartThemes = {
  pink: ['#FF69B4', '#FFB3E6', '#FF1493', '#FF91A4', '#FFC0CB'],
  rainbow: ['#FF6B9D', '#FFD93D', '#6BCF7F', '#4D96FF', '#9D4EDD'],
  warm: ['#FF69B4', '#FF8C42', '#FF6B9D', '#FF4757'],
  cool: ['#FF69B4', '#4D96FF', '#9D4EDD', '#6BCF7F'],
  pastel: ['#FFB3E6', '#FFE5B3', '#B3FFE5', '#B3E5FF', '#E5B3FF'],
  kawaii: ['#FF91A4', '#FFB3E6', '#FF69B4', '#FFC0CB', '#FF1493'], // 萌夢島可爱主题
} as const

export type HeartTheme = keyof typeof heartThemes

// 兼容性导出（保持向后兼容）
export const starIcons = heartIcons
export const starThemes = heartThemes
export type StarIconType = HeartIconType
export type StarTheme = HeartTheme
export const getRandomStarType = getRandomHeartType
