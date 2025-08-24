import { ref, nextTick, onMounted, onUnmounted } from 'vue'

export function useHeaderHeight() {
  const desktopHeaderRef = ref<HTMLElement | null>(null)
  const mobileHeaderRef = ref<HTMLElement | null>(null)
  const currentHeaderHeight = ref(0)

  // 测量头部高度
  const measureHeaderHeight = () => {
    try {
      const header = document.querySelector('.header-container') as HTMLElement
      if (header) {
        const height = header.offsetHeight
        currentHeaderHeight.value = height
        console.log('头部高度:', height)

        // 直接设置page-root的padding-top
        applyHeaderHeight()
      }
    } catch (error) {
      console.error('测量头部高度失败:', error)
    }
  }

  // 直接应用头部高度到page-root
  const applyHeaderHeight = () => {
    const pageRoot = document.querySelector('.page-root') as HTMLElement
    if (pageRoot && currentHeaderHeight.value > 0) {
      pageRoot.style.paddingTop = `${currentHeaderHeight.value + 30}px`
      console.log('已设置page-root padding-top:', `${currentHeaderHeight.value}px`)
    }
  }

  // 监听窗口大小变化
  const handleResize = () => {
    // 延迟执行，避免频繁触发
    setTimeout(() => {
      measureHeaderHeight()
    }, 100)
  }

  // 监听DOM变化（用于动态内容变化）
  const observeDOMChanges = () => {
    const pageRoot = document.querySelector('.page-root')
    if (pageRoot) {
      const observer = new MutationObserver(() => {
        // DOM变化后重新测量
        nextTick(() => {
          measureHeaderHeight()
        })
      })

      observer.observe(pageRoot, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class'],
      })

      return observer
    }
    return null
  }

  let domObserver: MutationObserver | null = null

  onMounted(() => {
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)

    // 监听DOM变化
    domObserver = observeDOMChanges()

    // 初始测量
    nextTick(() => {
      measureHeaderHeight()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)

    if (domObserver) {
      domObserver.disconnect()
    }
  })

  return {
    desktopHeaderRef,
    mobileHeaderRef,
    currentHeaderHeight,
    measureHeaderHeight,
    applyHeaderHeight,
  }
}
