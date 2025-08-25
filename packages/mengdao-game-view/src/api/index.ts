import request from '@/utils/request'

// 获取初始化配置
export const sysConf = {
  initConf: () => {
    return request.get('/myapi/game/queryUrl', {})
  },
}

// 通用 API
export const commonApi = {
  // 上传文件
  uploadFile: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return request.post<{ url: string }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // 发送反馈
  sendFeedback: (params: { type: string; content: string; contact?: string }) => {
    return request.post('/feedback', params)
  },
}
