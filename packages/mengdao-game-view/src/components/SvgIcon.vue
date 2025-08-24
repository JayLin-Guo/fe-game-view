<template>
  <div
    class="svg-icon"
    :style="{
      width: size + 'px',
      height: size + 'px',
      color: color,
    }"
    v-html="svgContent"
  ></div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    // SVG内容，可以是SVG字符串或图标名称
    icon?: string
    // 图标大小，支持数字或字符串
    size?: number | string
    // 图标颜色
    color?: string
    // 是否禁用自动px转换
    disableAutoPx?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    icon: '',
    size: 24,
    color: 'currentColor',
    disableAutoPx: false,
  })

  // 计算最终尺寸，支持自动px转换
  const size = computed(() => {
    if (props.disableAutoPx) {
      return typeof props.size === 'number' ? props.size + 'px' : props.size
    }

    // 使用自动px转换系统
    const numericSize = typeof props.size === 'number' ? props.size : parseInt(props.size)
    return `calc(${numericSize} * var(--px-ratio))`
  })

  // 预设图标库
  const iconLibrary = {
    gamepad: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm7.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S21.67 10 22.5 10s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>`,

    server: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 1h16c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2zm0 8h16c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2zm0 8h16c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2z"/>
  </svg>`,

    community: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L12 13l-2.99-4.01A2.5 2.5 0 0 0 7 8H5.46c-.8 0-1.54.37-2.01.99L1 18.5V22h2v-6h2.5l2.54-7.63A1.5 1.5 0 0 1 9.54 12H12c.8 0 1.54-.37 2.01-.99L17 13l2.99 4.01A2.5 2.5 0 0 1 22.54 20H24v2h-4z"/>
  </svg>`,

    // 可以继续添加更多图标...
  }

  // 计算SVG内容
  const svgContent = computed(() => {
    if (!props.icon) return ''

    // 如果是预设图标名称，返回对应的SVG
    if (iconLibrary[props.icon as keyof typeof iconLibrary]) {
      return iconLibrary[props.icon as keyof typeof iconLibrary]
    }

    // 否则直接返回icon内容（假设是SVG字符串）
    return props.icon
  })
</script>

<style scoped>
  .svg-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .svg-icon :deep(svg) {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* 支持响应式缩放 */
  @media (max-width: 768px) {
    .svg-icon {
      /* 移动端可以适当缩小 */
    }
  }
</style>
