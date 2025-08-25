<template>
  <div class="cursor-trail-provider">
    <!-- 插槽内容 -->
    <slot />

    <!-- 调试信息（仅开发环境） -->
    <div v-if="showDebugInfo && isDev" class="cursor-trail-debug">
      <div class="debug-panel">
        <h4>🌟 鼠标跟随特效</h4>
        <div class="debug-item">
          <span>状态:</span>
          <span :class="{ active: isEnabled, inactive: !isEnabled }">
            {{ isEnabled ? '启用' : '禁用' }}
          </span>
        </div>
        <div class="debug-item">
          <span>粒子数:</span>
          <span>{{ particleCount }}/{{ config.maxParticles }}</span>
        </div>
        <div class="debug-item">
          <span>主题:</span>
          <span>{{ config.theme }}</span>
        </div>
        <div class="debug-item">
          <span>设备:</span>
          <span>{{ isMobile ? '移动端' : 'PC端' }}</span>
        </div>
        <div class="debug-controls">
          <button @click="toggle" class="debug-btn">
            {{ isEnabled ? '禁用' : '启用' }}
          </button>
          <button @click="changeTheme" class="debug-btn">切换主题</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, provide, inject } from 'vue'
  import { useCursorTrail, type CursorTrailOptions } from '@/composables/useCursorTrail'
  import { useResponsiveScale } from '@/composables/useResponsiveScale'
  import { starThemes, type StarTheme } from './star-icons'

  interface Props {
    // 基础配置
    enabled?: boolean
    theme?: any
    maxParticles?: number
    enableMobile?: boolean

    // 调试配置
    showDebugInfo?: boolean

    // 高级配置
    spawnRate?: number
    sizeRange?: [number, number]
  }

  const props = withDefaults(defineProps<Props>(), {
    enabled: true,
    theme: 'game',
    maxParticles: 25,
    enableMobile: false,
    showDebugInfo: false,
    spawnRate: 50,
    sizeRange: () => [12, 20],
  })

  // 开发环境检测
  const isDev = computed(() => import.meta.env.DEV)

  // 集成响应式系统
  const { isMobile } = useResponsiveScale()

  // 初始化鼠标跟随特效
  const cursorTrail = useCursorTrail({
    enabled: props.enabled,
    theme: props.theme,
    maxParticles: props.maxParticles,
    enableMobile: props.enableMobile,
    autoInit: true,
  })

  // 解构响应式数据
  const { isEnabled, particleCount, config, toggle, setTheme, updateConfig } = cursorTrail

  // 主题切换逻辑
  const themeList = Object.keys(starThemes) as StarTheme[]
  const currentThemeIndex = ref(themeList.indexOf(props.theme))

  const changeTheme = () => {
    currentThemeIndex.value = (currentThemeIndex.value + 1) % themeList.length
    const newTheme = themeList[currentThemeIndex.value]
    setTheme(newTheme)
  }

  // 更新高级配置
  if (props.spawnRate !== 50 || props.sizeRange[0] !== 12 || props.sizeRange[1] !== 20) {
    updateConfig({
      spawnRate: props.spawnRate,
      sizeRange: props.sizeRange,
    })
  }

  // 提供给子组件使用
  provide('cursorTrail', cursorTrail)

  // 导出给父组件使用
  defineExpose({
    ...cursorTrail,
  })
</script>

<style scoped>
  .cursor-trail-provider {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .cursor-trail-debug {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    pointer-events: none;
  }

  .debug-panel {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px;
    border-radius: 8px;
    font-size: 12px;
    font-family: monospace;
    min-width: 200px;
    pointer-events: auto;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .debug-panel h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #ffd700;
  }

  .debug-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    padding: 2px 0;
  }

  .debug-item span:first-child {
    color: #ccc;
  }

  .debug-item span:last-child {
    color: white;
    font-weight: bold;
  }

  .active {
    color: #4caf50 !important;
  }

  .inactive {
    color: #f44336 !important;
  }

  .debug-controls {
    margin-top: 8px;
    display: flex;
    gap: 4px;
  }

  .debug-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .debug-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .debug-btn:active {
    transform: scale(0.95);
  }
</style>
