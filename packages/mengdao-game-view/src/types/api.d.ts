// API 相关类型定义

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// HTTP 方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// 请求配置扩展
export interface RequestConfig extends AxiosRequestConfig {
  // 是否显示 loading
  showLoading?: boolean
  // 是否显示错误提示
  showError?: boolean
  // 是否重试
  retry?: boolean
  // 重试次数
  retryCount?: number
  // 缓存时间（毫秒）
  cacheTime?: number
  // 是否使用缓存
  useCache?: boolean
}

// 响应拦截器配置
export interface ResponseInterceptorConfig {
  // 成功状态码
  successCodes?: number[]
  // 错误处理函数
  errorHandler?: (error: any) => void
  // 成功处理函数
  successHandler?: (response: any) => any
}

// API 端点配置
export interface ApiEndpoint {
  url: string
  method: HttpMethod
  config?: RequestConfig
}

// API 模块配置
export interface ApiModule {
  baseURL?: string
  endpoints: Record<string, ApiEndpoint>
}

// 用户 API 类型
export namespace UserAPI {
  export interface LoginRequest {
    username: string
    password: string
    captcha?: string
  }

  export interface LoginResponse {
    token: string
    refreshToken: string
    userInfo: User
    permissions: string[]
  }

  export interface RegisterRequest {
    username: string
    email: string
    password: string
    inviteCode?: string
  }

  export interface RegisterResponse {
    success: boolean
    message: string
    userId?: number
  }

  export interface UpdateProfileRequest {
    nickname?: string
    avatar?: string
    email?: string
    phone?: string
    birthday?: string
    gender?: 'male' | 'female' | 'other'
  }

  export interface ChangePasswordRequest {
    oldPassword: string
    newPassword: string
  }

  export interface ResetPasswordRequest {
    email: string
    code: string
    newPassword: string
  }
}

// 游戏 API 类型
export namespace GameAPI {
  export interface CreateCharacterRequest {
    name: string
    job: GameJob
    appearance: CharacterAppearance
  }

  export interface CharacterAppearance {
    face: number
    hair: number
    hairColor: number
    skin: number
    gender: 'male' | 'female'
  }

  export interface GetCharactersResponse {
    characters: Character[]
    maxSlots: number
  }

  export interface DeleteCharacterRequest {
    characterId: number
    password: string
  }

  export interface GetRankingRequest {
    type: 'level' | 'job' | 'guild'
    job?: GameJob
    page?: number
    pageSize?: number
  }

  export interface RankingItem {
    rank: number
    characterId: number
    characterName: string
    job: GameJob
    level: number
    exp: number
    guildName?: string
  }

  export interface GetRankingResponse extends PaginatedResponse<RankingItem> {}
}

// 新闻 API 类型
export namespace NewsAPI {
  export interface GetNewsRequest {
    category?: GameNews['category']
    page?: number
    pageSize?: number
    keyword?: string
  }

  export interface GetNewsResponse extends PaginatedResponse<GameNews> {}

  export interface GetNewsDetailRequest {
    id: number
  }

  export interface GetNewsDetailResponse extends ApiResponse<GameNews> {}
}

// 服务器 API 类型
export namespace ServerAPI {
  export interface GetServerListResponse extends ApiResponse<ServerStatus[]> {}

  export interface GetServerStatusRequest {
    serverId: number
  }

  export interface GetServerStatusResponse extends ApiResponse<ServerStatus> {}
}

// 下载 API 类型
export namespace DownloadAPI {
  export interface GetDownloadLinksResponse extends ApiResponse<DownloadLink[]> {}

  export interface GetLatestVersionResponse
    extends ApiResponse<{
      version: string
      releaseDate: string
      changelog: string[]
      downloadUrl: string
    }> {}
}

// 社群 API 类型
export namespace CommunityAPI {
  export interface GetCommunityLinksResponse extends ApiResponse<CommunityLink[]> {}

  export interface JoinCommunityRequest {
    type: CommunityLink['type']
    userId: number
  }
}

// 事件 API 类型
export namespace EventAPI {
  export interface GetEventsRequest {
    type?: GameEvent['type']
    isActive?: boolean
    page?: number
    pageSize?: number
  }

  export interface GetEventsResponse extends PaginatedResponse<GameEvent> {}

  export interface ParticipateEventRequest {
    eventId: number
    characterId: number
  }

  export interface ParticipateEventResponse
    extends ApiResponse<{
      success: boolean
      rewards: EventReward[]
    }> {}
}

// 物品 API 类型
export namespace ItemAPI {
  export interface GetItemsRequest {
    type?: GameItem['type']
    subType?: string
    rarity?: GameItem['rarity']
    minLevel?: number
    maxLevel?: number
    keyword?: string
    page?: number
    pageSize?: number
  }

  export interface GetItemsResponse extends PaginatedResponse<GameItem> {}

  export interface GetItemDetailRequest {
    id: number
  }

  export interface GetItemDetailResponse extends ApiResponse<GameItem> {}
}

// 反馈 API 类型
export namespace FeedbackAPI {
  export interface SubmitFeedbackRequest {
    type: ContactForm['type']
    title: string
    content: string
    contact?: string
    attachments?: string[]
  }

  export interface SubmitFeedbackResponse
    extends ApiResponse<{
      ticketId: string
      message: string
    }> {}

  export interface GetFeedbackRequest {
    ticketId: string
  }

  export interface FeedbackDetail {
    id: number
    ticketId: string
    type: ContactForm['type']
    title: string
    content: string
    status: 'pending' | 'processing' | 'resolved' | 'closed'
    replies: FeedbackReply[]
    createdAt: string
    updatedAt: string
  }

  export interface FeedbackReply {
    id: number
    content: string
    isAdmin: boolean
    createdAt: string
  }

  export interface GetFeedbackResponse extends ApiResponse<FeedbackDetail> {}
}

// 统计 API 类型
export namespace StatsAPI {
  export interface GetGameStatsResponse
    extends ApiResponse<{
      totalUsers: number
      onlineUsers: number
      totalCharacters: number
      activeServers: number
      totalGuilds: number
      todayRegistrations: number
    }> {}

  export interface GetUserStatsRequest {
    userId: number
    period?: 'day' | 'week' | 'month' | 'year'
  }

  export interface UserStats {
    playTime: number
    loginDays: number
    charactersCreated: number
    achievementsUnlocked: number
    itemsObtained: number
    monstersKilled: number
  }

  export interface GetUserStatsResponse extends ApiResponse<UserStats> {}
}

// 支付 API 类型
export namespace PaymentAPI {
  export interface CreateOrderRequest {
    productId: number
    quantity: number
    paymentMethod: 'alipay' | 'wechat' | 'paypal' | 'stripe'
    returnUrl?: string
  }

  export interface CreateOrderResponse
    extends ApiResponse<{
      orderId: string
      paymentUrl: string
      qrCode?: string
      amount: number
      currency: string
    }> {}

  export interface GetOrderStatusRequest {
    orderId: string
  }

  export interface OrderStatus {
    orderId: string
    status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded'
    amount: number
    currency: string
    paymentMethod: string
    createdAt: string
    paidAt?: string
  }

  export interface GetOrderStatusResponse extends ApiResponse<OrderStatus> {}
}

// WebSocket 消息类型
export namespace WSMessage {
  export interface BaseMessage {
    type: string
    timestamp: number
    id?: string
  }

  export interface ChatMessage extends BaseMessage {
    type: 'chat'
    data: {
      channelId: string
      userId: number
      username: string
      message: string
      messageType: 'text' | 'image' | 'emoji'
    }
  }

  export interface SystemMessage extends BaseMessage {
    type: 'system'
    data: {
      level: 'info' | 'warning' | 'error'
      message: string
      action?: string
    }
  }

  export interface UserStatusMessage extends BaseMessage {
    type: 'user_status'
    data: {
      userId: number
      status: User['status']
      lastSeen?: string
    }
  }

  export interface ServerStatusMessage extends BaseMessage {
    type: 'server_status'
    data: ServerStatus
  }

  export type Message = ChatMessage | SystemMessage | UserStatusMessage | ServerStatusMessage
}
