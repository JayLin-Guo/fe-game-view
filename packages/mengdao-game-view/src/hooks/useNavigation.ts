import { ref, computed } from 'vue'

export interface NavItem {
  id: string
  label: string
  href: string
  icon?: string
  url?: any
  isActive?: boolean
}

export function useNavigation() {
  const navItems = ref<NavItem[]>([
    {
      id: 'message',
      label: '消息',
      href: '',
      icon: '',
      url: new URL('@/assets/message.png', import.meta.url).href,
      isActive: true,
    },
    {
      id: 'tutorial',
      label: '新手教學',
      url: new URL('@/assets/jiaoxue.png', import.meta.url).href,
      href: '#',
      icon: '',
    },
    {
      id: 'tutorial-cn',
      label: '新手教學(大陸)',
      url: new URL('@/assets/jiaoxue.png', import.meta.url).href,

      href: '#',
      icon: '',
    },
    {
      id: 'download',
      label: '下載',
      url: new URL('@/assets/download.png', import.meta.url).href,
      href: '#',
      icon: '',
    },
    {
      id: 'qq',
      label: 'QQ聊天區',
      url: new URL('@/assets/download.png', import.meta.url).href,
      href: '#',
      icon: '',
    },
    {
      id: 'discord',
      label: 'Discord',
      url: new URL('@/assets/discord.png', import.meta.url).href,
      href: 'discord_url',
      icon: '',
    },
    {
      id: 'login',
      label: '登入',
      url: new URL('@/assets/login.png', import.meta.url).href,
      href: '#',
      icon: '',
    },
    {
      id: 'register',
      label: '註冊',
      url: new URL('@/assets/register.png', import.meta.url).href,
      href: '#',
      icon: '',
    },
  ])

  const activeNavId = ref('discord')

  const setActiveNav = (id: string) => {
    activeNavId.value = id
    navItems.value.forEach(item => {
      item.isActive = item.id === id
    })
  }

  const getActiveNav = computed(() => {
    return navItems.value.find(item => item.isActive)
  })

  return {
    navItems,
    activeNavId,
    setActiveNav,
    getActiveNav,
  }
}
