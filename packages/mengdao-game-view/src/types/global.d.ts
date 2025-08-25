// 全局类型定义文件

declare global {
  // 环境变量类型扩展
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_ENV: 'development' | 'production' | 'test'
    readonly VITE_API_BASE_URL: string
    readonly VITE_API_TIMEOUT: string
    readonly VITE_APP_VERSION: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  // 窗口对象扩展
  interface Window {
    // 游戏相关全局变量
    __MENGDAO_GAME_CONFIG__?: GameConfig
    __MENGDAO_DEBUG__?: boolean

    // 第三方库
    gtag?: (...args: any[]) => void
    dataLayer?: any[]

    // 微信相关
    wx?: any
    WeixinJSBridge?: any
  }

  // 模块声明
  declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }

  declare module '*.png' {
    const src: string
    export default src
  }

  declare module '*.jpg' {
    const src: string
    export default src
  }

  declare module '*.jpeg' {
    const src: string
    export default src
  }

  declare module '*.gif' {
    const src: string
    export default src
  }

  declare module '*.svg' {
    const src: string
    export default src
  }

  declare module '*.webp' {
    const src: string
    export default src
  }

  declare module '*.ico' {
    const src: string
    export default src
  }

  declare module '*.scss' {
    const classes: { readonly [key: string]: string }
    export default classes
  }

  declare module '*.css' {
    const classes: { readonly [key: string]: string }
    export default classes
  }

  // 音频文件
  declare module '*.mp3' {
    const src: string
    export default src
  }

  declare module '*.wav' {
    const src: string
    export default src
  }

  declare module '*.ogg' {
    const src: string
    export default src
  }

  // 视频文件
  declare module '*.mp4' {
    const src: string
    export default src
  }

  declare module '*.webm' {
    const src: string
    export default src
  }

  // 字体文件
  declare module '*.woff' {
    const src: string
    export default src
  }

  declare module '*.woff2' {
    const src: string
    export default src
  }

  declare module '*.ttf' {
    const src: string
    export default src
  }

  declare module '*.otf' {
    const src: string
    export default src
  }
}

// 游戏配置类型
export interface GameConfig {
  version: string
  apiUrl: string
  cdnUrl: string
  debug: boolean
  features: {
    enableChat: boolean
    enableVoice: boolean
    enableVideo: boolean
  }
}

// 用户相关类型
export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  level: number
  exp: number
  coins: number
  diamonds: number
  vipLevel: number
  createdAt: string
  updatedAt: string
  lastLoginAt: string
  status: 'online' | 'offline' | 'away' | 'busy'
}

// 游戏角色类型
export interface Character {
  id: number
  userId: number
  name: string
  job: string
  level: number
  exp: number
  hp: number
  mp: number
  str: number
  dex: number
  int: number
  luk: number
  mapId: number
  x: number
  y: number
  createdAt: string
  updatedAt: string
}

// API 响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
  timestamp: number
}

// 分页类型
export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination
}

// 游戏新闻类型
export interface GameNews {
  id: number
  title: string
  content: string
  summary: string
  coverImage?: string
  author: string
  category: 'update' | 'event' | 'maintenance' | 'announcement'
  tags: string[]
  publishedAt: string
  createdAt: string
  updatedAt: string
  viewCount: number
  isTop: boolean
  isHot: boolean
}

// 服务器状态类型
export interface ServerStatus {
  id: number
  name: string
  status: 'online' | 'maintenance' | 'offline'
  onlineUsers: number
  maxUsers: number
  load: number
  ping: number
  version: string
  lastUpdate: string
}

// 下载链接类型
export interface DownloadLink {
  id: number
  name: string
  type: 'client' | 'launcher' | 'patch'
  version: string
  size: number
  url: string
  md5: string
  description: string
  createdAt: string
}

// 社群链接类型
export interface CommunityLink {
  id: number
  name: string
  type: 'discord' | 'qq' | 'telegram' | 'facebook' | 'twitter' | 'youtube'
  url: string
  icon: string
  description: string
  memberCount?: number
  isOfficial: boolean
}

// 事件类型
export interface GameEvent {
  id: number
  name: string
  description: string
  type: 'exp' | 'drop' | 'quest' | 'pvp' | 'boss'
  startTime: string
  endTime: string
  rewards: EventReward[]
  requirements: EventRequirement[]
  isActive: boolean
}

export interface EventReward {
  type: 'exp' | 'meso' | 'item'
  amount: number
  itemId?: number
  itemName?: string
}

export interface EventRequirement {
  type: 'level' | 'quest' | 'item'
  value: number | string
  description: string
}

// 物品类型
export interface GameItem {
  id: number
  name: string
  description: string
  type: 'weapon' | 'armor' | 'accessory' | 'use' | 'setup' | 'etc'
  subType: string
  rarity: 'common' | 'rare' | 'epic' | 'unique' | 'legendary'
  level: number
  price: number
  sellPrice: number
  icon: string
  stats: ItemStats
  requirements: ItemRequirement[]
}

export interface ItemStats {
  str?: number
  dex?: number
  int?: number
  luk?: number
  hp?: number
  mp?: number
  attack?: number
  magic?: number
  defense?: number
  speed?: number
  jump?: number
}

export interface ItemRequirement {
  type: 'level' | 'job' | 'str' | 'dex' | 'int' | 'luk'
  value: number
}

// 表单类型
export interface LoginForm {
  username: string
  password: string
  remember?: boolean
}

export interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  type: 'bug' | 'suggestion' | 'complaint' | 'other'
}

// 路由元信息类型
export interface RouteMeta {
  title?: string
  requiresAuth?: boolean
  roles?: string[]
  keepAlive?: boolean
  showInMenu?: boolean
  icon?: string
  order?: number
}

// 组件 Props 类型
export interface BaseComponentProps {
  class?: string
  style?: string | Record<string, any>
}

export interface LoadingProps extends BaseComponentProps {
  visible?: boolean
  text?: string
  subtitle?: string
  size?: 'small' | 'medium' | 'large'
}

export interface ButtonProps extends BaseComponentProps {
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  icon?: string
}

// 工具类型
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type ValueOf<T> = T[keyof T]

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

// 常量类型
export const GAME_JOBS = ['初心者', '战士', '法师', '弓箭手', '盗贼', '海盗'] as const
export type GameJob = (typeof GAME_JOBS)[number]

export const USER_ROLES = ['user', 'vip', 'admin', 'super_admin'] as const
export type UserRole = (typeof USER_ROLES)[number]

export const DEVICE_TYPES = ['desktop', 'tablet', 'mobile'] as const
export type DeviceType = (typeof DEVICE_TYPES)[number]

export const THEME_MODES = ['light', 'dark', 'auto'] as const
export type ThemeMode = (typeof THEME_MODES)[number]

export {}
