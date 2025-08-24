import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials: { username: string; password: string }) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: '1',
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        role: 'admin',
      }

      const mockToken = 'mock-jwt-token'

      user.value = mockUser
      token.value = mockToken

      // 保存到localStorage
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('token', mockToken)

      return { success: true, user: mockUser }
    } catch (error) {
      return { success: false, error: '登录失败' }
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const initAuth = () => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')

    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser)
      token.value = savedToken
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    initAuth,
  }
})
