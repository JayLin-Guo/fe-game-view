# JavaScript响应式缩放系统

## 概述

这是一个基于JavaScript的动态响应式缩放系统，可以：

1. **动态计算转换比例** - 根据屏幕尺寸实时调整
2. **双设备基准** - 移动端(375px)和PC端(1920px)不同的设计稿基准
3. **缩放范围控制** - 设置最大和最小缩放比例
4. **CSS自定义属性** - 通过CSS变量实现响应式样式
5. **Vue组合式函数** - 在Vue组件中轻松使用

## 核心特性

### 🎯 智能缩放计算

- 自动检测设备类型（移动端/PC端）
- 根据设计稿尺寸和屏幕尺寸计算最佳缩放比例
- 支持手动调整和自动适配

### 📱 双设计稿基准

- **移动端**: 375×667px (iPhone标准)
- **PC端**: 1920×1080px (主流显示器)
- 分别计算，确保最佳显示效果

### 🔒 缩放范围控制

- **移动端**: 0.8x - 1.2x
- **PC端**: 0.7x - 1.5x
- 防止过度缩放，保持可读性

### 🎨 CSS集成

- 通过CSS自定义属性 `--scale-ratio` 和 `--device-type`
- 支持 `calc()` 函数进行动态计算
- 丰富的响应式工具类

## 文件结构

```
src/
├── utils/
│   ├── responsiveScale.ts          # 核心缩放逻辑
│   └── README.md                   # 使用说明
├── composables/
│   └── useResponsiveScale.ts       # Vue组合式函数
├── styles/
│   └── responsive-scale.scss       # 响应式样式
└── components/
    └── ResponsiveScaleExample.vue  # 使用示例
```

## 快速开始

### 1. 基本使用

```typescript
import { responsiveScale } from '@/utils/responsiveScale'

// 获取当前缩放比例
const scale = responsiveScale.getCurrentScale()

// 获取当前设备类型
const device = responsiveScale.getCurrentDevice()

// 手动设置缩放比例
responsiveScale.setScale(1.2)

// 重置缩放比例
responsiveScale.resetScale()
```

### 2. 在Vue组件中使用

```vue
<template>
  <div class="scale-container" :data-device="currentDevice">
    <h1 class="text-scale-2xl">响应式标题</h1>
    <div class="card-scale">响应式卡片</div>
  </div>
</template>

<script setup lang="ts">
  import { useResponsiveScale } from '@/composables/useResponsiveScale'

  const { currentScale, currentDevice, scaleRange, setScale, resetScale } = useResponsiveScale()
</script>
```

### 3. CSS样式使用

```scss
// 基于缩放比例的字体大小
.text-scale-xl {
  font-size: calc(20px * var(--scale-ratio));
}

// 基于缩放比例的间距
.spacing-scale-lg {
  padding: calc(24px * var(--scale-ratio));
}

// 设备特定样式
[data-device='mobile'] {
  .hide-mobile {
    display: none;
  }
}

[data-device='desktop'] {
  .hide-desktop {
    display: none;
  }
}
```

## 配置选项

### 默认配置

```typescript
const defaultConfig = {
  mobile: {
    designWidth: 375, // 移动端设计稿宽度
    designHeight: 667, // 移动端设计稿高度
    minScale: 0.8, // 最小缩放比例
    maxScale: 1.2, // 最大缩放比例
    baseScale: 1.0, // 基准缩放比例
  },
  desktop: {
    designWidth: 1920, // PC端设计稿宽度
    designHeight: 1080, // PC端设计稿高度
    minScale: 0.7, // 最小缩放比例
    maxScale: 1.5, // 最大缩放比例
    baseScale: 1.0, // 基准缩放比例
  },
  common: {
    enableResize: true, // 启用窗口大小变化监听
    debounceDelay: 100, // 防抖延迟时间
    updateInterval: 16, // 更新间隔时间
  },
}
```

### 自定义配置

```typescript
import { ResponsiveScale } from '@/utils/responsiveScale'

const customScale = new ResponsiveScale({
  mobile: {
    designWidth: 414, // iPad Pro宽度
    minScale: 0.9,
    maxScale: 1.1,
  },
  desktop: {
    designWidth: 2560, // 4K显示器宽度
    minScale: 0.6,
    maxScale: 1.8,
  },
})
```

## 工具函数

### scaleUtils

```typescript
import { scaleUtils } from '@/utils/responsiveScale'

// 将px值转换为当前缩放比例下的值
const scaledValue = scaleUtils.px(100)

// 将设计稿px值转换为vw值
const vwValue = scaleUtils.vw(100)

// 将设计稿px值转换为vh值
const vhValue = scaleUtils.vh(100)

// 获取CSS自定义属性值
const scaleRatio = scaleUtils.getCSSVar('--scale-ratio')

// 设置CSS自定义属性值
scaleUtils.setCSSVar('--custom-var', 'value')
```

## CSS工具类

### 字体大小

```html
<div class="text-scale-xs">小号文字</div>
<div class="text-scale-sm">小号文字</div>
<div class="text-scale-base">基础文字</div>
<div class="text-scale-lg">大号文字</div>
<div class="text-scale-xl">超大文字</div>
<div class="text-scale-2xl">标题文字</div>
<div class="text-scale-3xl">大标题</div>
<div class="text-scale-4xl">超大标题</div>
```

### 间距系统

```html
<div class="spacing-scale-xs">小间距</div>
<div class="spacing-scale-sm">小间距</div>
<div class="spacing-scale-md">中等间距</div>
<div class="spacing-scale-lg">大间距</div>
<div class="spacing-scale-xl">超大间距</div>
```

### 尺寸系统

```html
<div class="size-scale-xs"></div>
<div class="size-scale-sm"></div>
<div class="size-scale-md"></div>
<div class="size-scale-lg"></div>
<div class="size-scale-xl"></div>
```

### 响应式网格

```html
<div class="grid-scale grid-4" data-device="desktop">
  <div class="grid-item">项目1</div>
  <div class="grid-item">项目2</div>
  <div class="grid-item">项目3</div>
  <div class="grid-item">项目4</div>
</div>
```

## 事件系统

### 缩放变化事件

```typescript
window.addEventListener('scaleChange', event => {
  const { scale, device, config } = event.detail

  console.log('缩放比例:', scale)
  console.log('设备类型:', device)
  console.log('设备配置:', config)
})
```

## 最佳实践

### 1. 设计稿准备

- 移动端使用375px宽度设计稿
- PC端使用1920px宽度设计稿
- 保持设计稿比例一致

### 2. 样式编写

- 优先使用CSS工具类
- 复杂样式使用CSS自定义属性
- 避免硬编码px值

### 3. 性能优化

- 合理设置更新间隔
- 使用防抖处理窗口变化
- 避免过度频繁的缩放计算

### 4. 兼容性考虑

- 降级到window resize事件
- 支持现代浏览器的ResizeObserver
- 保持向后兼容性

## 示例组件

查看 `ResponsiveScaleExample.vue` 了解完整的使用示例，包括：

- 缩放控制面板
- 响应式样式展示
- 实时信息显示
- 设备模式切换

## 注意事项

1. **初始化时机**: 确保在DOM加载完成后初始化
2. **内存管理**: 在组件销毁时移除事件监听器
3. **性能监控**: 监控缩放计算的性能影响
4. **测试覆盖**: 在不同设备和屏幕尺寸下测试

## 更新日志

### v1.0.0

- 初始版本发布
- 支持移动端和PC端双基准
- 完整的CSS工具类系统
- Vue组合式函数支持
