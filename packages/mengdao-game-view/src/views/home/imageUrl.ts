import { ref } from 'vue'

// 导入图片资源
import logoIcon from '@/assets/logo-icon.png'
import mobileLogoIcon from '@/assets/start2.png'
import heroLeft from '@/assets/start1.png'
import heroRight from '@/assets/contet-icon.png'
import gameInfo from '@/assets/pc-image/game-info.png'
import gameView from '@/assets/pc-image/game-view.png'
import feature1 from '@/assets/jdwf.png'
import feature2 from '@/assets/wdsfq.png'
import feature3 from '@/assets/hysq.png'
import hIcon from '@/assets/aixin.png'
import gamesIcon1 from '@/assets/game-icon.png'
import gamesIcon2 from '@/assets/dengru-icon.png'
import communityIcon1 from '@/assets/link-icon.png'
import communityIcon2 from '@/assets/zanzhu.png'

export const imageList = ref({
  logoIcon: {
    url: logoIcon,
  },
  mobileLogoIcon: {
    url: mobileLogoIcon,
  },
  hero: {
    titleLeft: {
      url: heroLeft,
    },
    titleRight: {
      url: heroRight,
    },
  },
  gameInfo: {
    url: gameInfo,
  },
  gameView: {
    url: gameView,
  },
  features: [
    {
      icon: '',
      title: '經典玩法',
      text: '重現經典楓之谷體驗，帶你回到最初的感動時光，與可愛的夥伴們一起冒險',
      url: feature1,
    },
    {
      icon: '',
      title: '穩定伺服器',
      text: '24小時穩定運行，極低延遲， 給你最流暢的遊戲體驗，像棉花糖般柔順',
      url: feature2,
    },
    {
      icon: '',
      title: '活躍社群',
      text: '熱情的玩家社群，一起冒險、交流、成長，建立最溫暖的友誼',
      url: feature3,
    },
  ],
  hIcon: {
    url: hIcon,
  },
  games: {
    icon1: gamesIcon1,
    icon2: gamesIcon2,
  },
  community: {
    icon1: communityIcon1,
    icon2: communityIcon2,
  },
})
