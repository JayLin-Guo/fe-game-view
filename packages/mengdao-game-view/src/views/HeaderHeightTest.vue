<template>
  <div class="test-page">
    <h1>头部高度测试页面</h1>

    <div class="test-info">
      <h2>当前状态：</h2>
      <p>设备类型: {{ isDesktop ? '桌面端' : '移动端' }}</p>
      <p>桌面端头部高度: {{ desktopHeaderHeight }}px</p>
      <p>移动端头部高度: {{ mobileHeaderHeight }}px</p>
      <p>当前头部高度: {{ currentHeaderHeight }}px</p>
      <p>page-root padding-top: {{ getPageRootPaddingTop }}</p>
    </div>

    <div class="header-container">
      <DesktopHeader v-if="isDesktop" ref="desktopHeaderRef" />
      <MobileHeader v-if="isMobile" ref="mobileHeaderRef" />
    </div>

    <div class="content">
      <h2>内容区域</h2>
      <p>这个区域应该根据头部高度自动调整padding-top</p>
      <p>当前page-root padding-top: {{ getPageRootPaddingTop }}</p>
    </div>

    <button @click="measureHeaderHeight" class="test-button">重新测量头部高度</button>

    <button @click="applyHeaderHeight" class="test-button">手动应用头部高度</button>
  </div>
</template>

<script lang="ts" setup>
  import { useResponsiveScale } from '@/composables/useResponsiveScale'
  import { useHeaderHeight } from '@/composables/useHeaderHeight'
  import DesktopHeader from '../home/components/desktop-header.vue'
  import MobileHeader from '../home/components/mobile-header.vue'
  import { computed } from 'vue'

  const { isDesktop, isMobile } = useResponsiveScale()

  const {
    desktopHeaderRef,
    mobileHeaderRef,
    desktopHeaderHeight,
    mobileHeaderHeight,
    currentHeaderHeight,
    updateDeviceType,
    measureHeaderHeight,
    applyHeaderHeight,
  } = useHeaderHeight()

  // 获取page-root的当前padding-top值
  const getPageRootPaddingTop = computed(() => {
    const pageRoot = document.querySelector('.page-root') as HTMLElement
    return pageRoot ? pageRoot.style.paddingTop || '0px' : '0px'
  })

  // 监听设备类型变化
  import { watch } from 'vue'
  watch(
    [isDesktop, isMobile],
    ([desktop, mobile]) => {
      updateDeviceType(desktop, mobile)
    },
    { immediate: true }
  )
</script>

<style lang="scss" scoped>
  .test-page {
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .test-info {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .test-info p {
    margin: 8px 0;
    font-size: 14px;
  }

  .header-container {
    border: 2px solid #ddd;
    margin: 20px 0;
  }

  .content {
    background: #e8f4fd;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    border: 2px solid #007acc;
  }

  .test-button {
    background: #007acc;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
  }

  .test-button:hover {
    background: #005a9e;
  }
</style>
