/**
 * SVG星星图标配置
 * 提供多种风格的星星图标供鼠标跟随特效使用
 */

export interface StarIconConfig {
  name: string
  svg: string
  viewBox: string
  defaultColor: string
}

export type StarIconType = 'classic' | 'sparkle' | 'cute' | 'magic' | 'twinkle'

export const starIcons: Record<StarIconType, StarIconConfig> = {
  // 经典五角星
  classic: {
    name: '经典星星',
    viewBox: '0 0 24 24',
    defaultColor: '#FFD700',
    svg: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>`,
  },

  // 闪烁星星（带光芒）
  sparkle: {
    name: '闪烁星星',
    viewBox: '0 0 24 24',
    defaultColor: '#FF69B4',
    svg: `
      <g fill="currentColor">
        <path d="M12 2l2.5 5.5L20 9.5l-4 4 1 5.5-5-2.5-5 2.5 1-5.5-4-4 5.5-2L12 2z"/>
        <path d="M6 1l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" opacity="0.7"/>
        <path d="M18 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" opacity="0.7"/>
        <path d="M20 18l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" opacity="0.5"/>
        <path d="M4 20l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" opacity="0.5"/>
      </g>
    `,
  },

  // 可爱圆润星星
  cute: {
    name: '可爱星星',
    viewBox: '0 0 24 24',
    defaultColor: '#FF6B9D',
    svg: `
      <path d="M12 2.5c0.5 0 1 0.3 1.2 0.8l2.3 4.7c0.1 0.2 0.3 0.4 0.5 0.4l5.2 0.8c0.5 0.1 0.9 0.4 1 0.9s-0.1 1-0.5 1.3l-3.8 3.7c-0.2 0.2-0.3 0.4-0.2 0.7l0.9 5.2c0.1 0.5-0.1 1-0.6 1.2s-1 0.1-1.4-0.2L12 18.5c-0.2-0.1-0.5-0.1-0.7 0l-4.6 2.4c-0.4 0.2-0.9 0.1-1.4-0.2s-0.7-0.7-0.6-1.2l0.9-5.2c0.1-0.3-0.1-0.5-0.2-0.7L1.6 9.9c-0.3-0.3-0.5-0.8-0.5-1.3s0.5-0.8 1-0.9l5.2-0.8c0.2 0 0.4-0.2 0.5-0.4l2.3-4.7C10.3 2.8 10.8 2.5 11.3 2.5h0.7z" 
            fill="currentColor" 
            rx="2" 
            ry="2"/>
    `,
  },

  // 魔法星星（带装饰）
  magic: {
    name: '魔法星星',
    viewBox: '0 0 24 24',
    defaultColor: '#9D4EDD',
    svg: `
      <g fill="currentColor">
        <circle cx="12" cy="12" r="1.5" opacity="0.8"/>
        <path d="M12 4l1.5 3.5L17 9l-3.5 1.5L12 14l-1.5-3.5L7 9l3.5-1.5L12 4z"/>
        <circle cx="8" cy="6" r="0.8" opacity="0.6"/>
        <circle cx="16" cy="6" r="0.8" opacity="0.6"/>
        <circle cx="6" cy="16" r="0.8" opacity="0.6"/>
        <circle cx="18" cy="16" r="0.8" opacity="0.6"/>
        <path d="M12 1l0.5 1.5L14 3l-1.5 0.5L12 5l-0.5-1.5L10 3l1.5-0.5L12 1z" opacity="0.7"/>
        <path d="M12 19l0.5 1.5L14 21l-1.5 0.5L12 23l-0.5-1.5L10 21l1.5-0.5L12 19z" opacity="0.7"/>
      </g>
    `,
  },

  // 闪烁小星星
  twinkle: {
    name: '闪烁小星',
    viewBox: '0 0 24 24',
    defaultColor: '#00D4FF',
    svg: `
      <g fill="currentColor">
        <path d="M12 6l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/>
        <path d="M7 2l0.5 1.5L9 4l-1.5 0.5L7 6l-0.5-1.5L5 4l1.5-0.5L7 2z" opacity="0.8"/>
        <path d="M17 2l0.5 1.5L19 4l-1.5 0.5L17 6l-0.5-1.5L15 4l1.5-0.5L17 2z" opacity="0.8"/>
        <path d="M5 17l0.5 1.5L7 19l-1.5 0.5L5 21l-0.5-1.5L3 19l1.5-0.5L5 17z" opacity="0.6"/>
        <path d="M19 17l0.5 1.5L21 19l-1.5 0.5L19 21l-0.5-1.5L17 19l1.5-0.5L19 17z" opacity="0.6"/>
      </g>
    `,
  },
}

// 随机获取星星图标类型
export function getRandomStarType(): StarIconType {
  const types = Object.keys(starIcons) as StarIconType[]
  return types[Math.floor(Math.random() * types.length)]
}

// 获取主题色彩配置
export const starThemes = {
  rainbow: ['#FF6B9D', '#FFD93D', '#6BCF7F', '#4D96FF', '#9D4EDD'],
  warm: ['#FFD700', '#FF8C42', '#FF6B9D', '#FF4757'],
  cool: ['#00D4FF', '#4D96FF', '#9D4EDD', '#6BCF7F'],
  pastel: ['#FFB3E6', '#FFE5B3', '#B3FFE5', '#B3E5FF', '#E5B3FF'],
  game: ['#FFD700', '#FF69B4', '#00FFFF', '#98FB98', '#DDA0DD'], // 萌夢島主题色
} as const

export type StarTheme = keyof typeof starThemes
