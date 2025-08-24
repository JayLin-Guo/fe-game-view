# 萌道游戏视图应用

基于 Vue 3 + TypeScript + Pinia + Vue Router 构建的游戏视图应用。

## 功能特性

- ✅ Vue 3 + TypeScript 支持
- ✅ SCSS 预处理器支持
- ✅ 自动 px 到 vw 转换
- ✅ ESLint + Prettier 代码规范
- ✅ VSCode 自动格式化配置
- ✅ Tailwind CSS 支持
- ✅ Element Plus UI 组件库

## 开发环境要求

- Node.js >= 16
- pnpm >= 7

## 安装依赖

```bash
pnpm install
```

## 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 代码格式化
pnpm format

# 代码检查
pnpm lint

# 类型检查
pnpm type-check
```

## VSCode 配置

项目已配置 VSCode 工作区设置，包括：

- 自动保存
- 保存时自动格式化
- ESLint 自动修复
- Vue 文件支持
- SCSS 语法高亮

### 推荐扩展

安装以下 VSCode 扩展以获得最佳开发体验：

- Prettier - Code formatter
- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense
- ESLint
- Auto Rename Tag

## 样式系统

### SCSS 支持

项目支持 SCSS 预处理器，主要特性：

- 变量定义
- 混合器 (Mixins)
- 嵌套规则
- 函数支持

### 响应式单位转换

使用 `postcss-px-to-viewport` 插件自动将 px 单位转换为 vw 单位：

- 设计稿宽度：1920px
- 设计稿高度：1080px
- 转换精度：5位小数
- 最小转换值：1px

### 使用示例

```scss
// 在 SCSS 中使用 px 单位
.card {
  padding: 24px;
  margin: 20px;
  font-size: 16px;
}

// 编译后自动转换为 vw 单位
.card {
  padding: 1.25vw;
  margin: 1.04167vw;
  font-size: 0.83333vw;
}
```

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── router/          # 路由配置
├── stores/          # Pinia 状态管理
├── styles/          # 全局样式
├── views/           # 页面组件
├── App.vue          # 根组件
└── main.ts          # 入口文件
```

## 代码规范

项目使用 ESLint + Prettier 进行代码规范控制：

- 使用单引号
- 不使用分号
- 缩进使用 2 个空格
- 最大行长度 100 字符
- Vue 组件使用 PascalCase 命名

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

MIT

# 双CSS响应式设计系统

## 概述

本项目采用双CSS设计稿基准的响应式设计系统，分别为移动端（375px）和PC端（1920px）提供最优的显示效果。

## 设计理念

### 双设计稿基准

- **移动端基准**: 375px (iPhone标准)
- **PC端基准**: 1920px (主流显示器)
- 分别计算vw值，确保在不同设备上的显示效果

### 三种样式策略

1. **移动端专用样式** (`mobile.scss`) - 基于375px设计稿
2. **PC端专用样式** (`desktop.scss`) - 基于1920px设计稿
3. **通用响应式样式** (`common.scss`) - 自动适配所有设备

## 文件结构

```
src/styles/
├── variables.scss          # 变量定义
├── mobile.scss            # 移动端专用样式
├── desktop.scss           # PC端专用样式
├── common.scss            # 通用响应式样式
└── main.scss             # 主入口文件
```

## 使用方法

### 1. 移动端专用样式

```scss
// 使用移动端专用的CSS类
.card-mobile {
  padding: vw-mobile(16px);
  font-size: vw-mobile(14px);
}

.text-mobile-xl {
  font-size: vw-mobile(20px);
}
.btn-mobile {
  padding: vw-mobile(12px) vw-mobile(24px);
}
```

### 2. PC端专用样式

```scss
// 使用PC端专用的CSS类
.card-desktop {
  padding: vw-pc(24px);
  font-size: vw-pc(16px);
}

.text-desktop-xl {
  font-size: vw-pc(20px);
}
.btn-desktop {
  padding: vw-pc(16px) vw-pc(32px);
}
```

### 3. 通用响应式样式

```scss
// 使用通用响应式类，自动适配
.card {
  // 移动端
  @include mobile {
    padding: 16px;
    font-size: 14px;
  }

  // PC端
  @include desktop {
    padding: 24px;
    font-size: 16px;
  }
}

.text-xl {
  @include mobile {
    font-size: 20px;
  }
  @include desktop {
    font-size: 24px;
  }
}
```

### 4. 响应式工具类

```html
<!-- 响应式显示/隐藏 -->
<div class="hide-mobile">PC端显示，移动端隐藏</div>
<div class="show-mobile">移动端显示，PC端隐藏</div>
<div class="hide-tablet">平板端隐藏</div>

<!-- 响应式网格 -->
<div class="grid grid-3">
  <!-- 移动端：单列，PC端：三列 -->
</div>

<!-- 响应式容器 -->
<div class="container">
  <!-- 自动适配不同设备的容器 -->
</div>
```

## 断点定义

```scss
$mobile-breakpoint: 768px; // 移动端断点
$tablet-breakpoint: 1024px; // 平板断点
$desktop-breakpoint: 1200px; // PC端断点
```

## 混合器使用

### 断点混合器

```scss
@include mobile {
  // 移动端样式
}

@include tablet {
  // 平板样式
}

@include desktop {
  // PC端样式
}
```

### 响应式尺寸混合器

```scss
// 响应式字体
@include responsive-font(24px, 18px); // PC端24px，移动端18px

// 响应式间距
@include responsive-padding(32px, 20px); // PC端32px，移动端20px
```

## 最佳实践

### 1. 选择合适的样式策略

- **移动端专用**: 需要精确控制移动端显示效果时
- **PC端专用**: 需要精确控制PC端显示效果时
- **通用响应式**: 希望自动适配所有设备时

### 2. 命名规范

- 移动端类名以 `-mobile` 结尾
- PC端类名以 `-desktop` 结尾
- 通用类名无后缀

### 3. 性能优化

- 避免过度使用媒体查询
- 合理使用CSS变量
- 利用CSS Grid和Flexbox实现响应式布局

## 示例组件

查看 `src/components/ResponsiveExample.vue` 了解完整的使用示例。

## 开发命令

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 代码检查
npm run lint

# 类型检查
npm run type-check
```
