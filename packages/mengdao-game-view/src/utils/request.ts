import axios, { AxiosError } from 'axios'

// 响应数据接口
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    // 添加 token
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      }
    }

    return config
  },
  (error: AxiosError) => {
    // 对请求错误做些什么

    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { data } = response

    // 如果是文件下载等特殊情况，直接返回
    if (response.config.responseType === 'blob') {
      return response
    }

    // 统一处理响应数据
    if (data.code === 200 || data.success || data.code === 0) {
      return data.data
    } else {
      // 业务错误处理
      const errorMessage = data.message || '请求失败'

      // 可以在这里添加全局错误提示
      // ElMessage.error(errorMessage)

      return Promise.reject(new Error(errorMessage))
    }
  },
  (error: AxiosError) => {
    let errorMessage = '网络错误'

    if (error.response) {
      // 服务器响应了错误状态码
      const { status, data } = error.response

      switch (status) {
        case 400:
          errorMessage = '请求参数错误'
          break
        case 401:
          errorMessage = '未授权，请重新登录'
          // 清除 token 并跳转到登录页
          localStorage.removeItem('token')
          // router.push('/login')
          break
        case 403:
          errorMessage = '拒绝访问'
          break
        case 404:
          errorMessage = '请求的资源不存在'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        default:
          errorMessage = (data as any)?.message || `请求失败 (${status})`
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      errorMessage = '网络连接超时'
    }

    // 可以在这里添加全局错误提示
    // ElMessage.error(errorMessage)

    return Promise.reject(new Error(errorMessage))
  }
)

export default service
