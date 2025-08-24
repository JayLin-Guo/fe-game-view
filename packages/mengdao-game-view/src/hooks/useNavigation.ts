import { ref, computed } from 'vue'

export interface NavItem {
  id: string
  label: string
  href: string
  icon?: string
  isActive?: boolean
}

export function useNavigation() {
  const navItems = ref<NavItem[]>([
    {
      id: 'message',
      label: '消息',
      href: '#',
      icon: '',
      isActive: true,
    },
    {
      id: 'tutorial',
      label: '新手教學',
      href: '#',
      icon: '',
    },
    {
      id: 'tutorial-cn',
      label: '新手教學(大陸)',
      href: '#',
      icon: '',
    },
    {
      id: 'download',
      label: '下載',
      href: '#',
      icon: '',
    },
    {
      id: 'qq',
      label: 'QQ聊天區',
      href: '#',
      icon: '',
    },
    {
      id: 'discord',
      label: 'Discord',
      href: '#',
      icon: '',
    },
    {
      id: 'login',
      label: '登入',
      href: '#',
      icon: '',
    },
    {
      id: 'register',
      label: '註冊',
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
