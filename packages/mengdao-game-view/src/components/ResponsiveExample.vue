<template>
  <div class="responsive-example">
    <div class="container">
      <h1 class="text-3xl text-center">双CSS响应式设计示例</h1>
      
      <!-- 移动端专用样式 -->
      <div class="mobile-section">
        <h2 class="text-2xl">移动端专用样式</h2>
        <div class="grid-mobile grid-3">
          <div class="card-mobile">
            <h3 class="text-mobile-xl">移动端卡片 1</h3>
            <p class="text-mobile-base">
              使用移动端专用的CSS类，基于375px设计稿计算。
            </p>
            <button class="btn-mobile btn-primary">主要按钮</button>
          </div>
          
          <div class="card-mobile">
            <h3 class="text-mobile-xl">移动端卡片 2</h3>
            <p class="text-mobile-base">
              移动端使用更紧凑的布局和间距。
            </p>
            <button class="btn-mobile btn-secondary">次要按钮</button>
          </div>
          
          <div class="card-mobile">
            <h3 class="text-mobile-xl">移动端卡片 3</h3>
            <p class="text-mobile-base">
              字体大小和间距都针对移动端优化。
            </p>
            <button class="btn-mobile btn-primary">主要按钮</button>
          </div>
        </div>
      </div>
      
      <!-- PC端专用样式 -->
      <div class="desktop-section">
        <h2 class="text-2xl">PC端专用样式</h2>
        <div class="grid-desktop grid-3">
          <div class="card-desktop">
            <h3 class="text-desktop-xl">PC端卡片 1</h3>
            <p class="text-desktop-base">
              使用PC端专用的CSS类，基于1920px设计稿计算。
            </p>
            <button class="btn-desktop btn-primary">主要按钮</button>
          </div>
          
          <div class="card-desktop">
            <h3 class="text-desktop-xl">PC端卡片 2</h3>
            <p class="text-desktop-base">
              PC端使用更宽松的布局和更大的间距。
            </p>
            <button class="btn-desktop btn-secondary">次要按钮</button>
          </div>
          
          <div class="card-desktop">
            <h3 class="text-desktop-xl">PC端卡片 3</h3>
            <p class="text-desktop-base">
              字体大小和间距都针对PC端优化。
            </p>
            <button class="btn-desktop btn-primary">主要按钮</button>
          </div>
        </div>
      </div>
      
      <!-- 通用响应式样式 -->
      <div class="common-section">
        <h2 class="text-2xl">通用响应式样式</h2>
        <p class="text-lg">
          这个区域使用通用响应式类，会根据屏幕尺寸自动调整。
        </p>
        
        <div class="grid grid-3">
          <div class="card">
            <h3 class="text-xl">通用卡片 1</h3>
            <p class="text-base">
              使用通用响应式类，自动适配不同设备。
            </p>
            <button class="btn btn-primary">主要按钮</button>
          </div>
          
          <div class="card">
            <h3 class="text-xl">通用卡片 2</h3>
            <p class="text-base">
              响应式网格系统自动调整列数。
            </p>
            <button class="btn btn-secondary">次要按钮</button>
          </div>
          
          <div class="card">
            <h3 class="text-xl">通用卡片 3</h3>
            <p class="text-base">
              字体大小和间距自动响应式调整。
            </p>
            <button class="btn btn-outline">轮廓按钮</button>
          </div>
        </div>
      </div>
      
      <!-- 响应式工具类演示 -->
      <div class="tools-section">
        <h2 class="text-2xl">响应式工具类演示</h2>
        
        <div class="responsive-demo">
          <div class="hide-mobile">
            <p class="text-lg">这个内容在PC端显示，移动端隐藏</p>
          </div>
          
          <div class="show-mobile">
            <p class="text-lg">这个内容在移动端显示，PC端隐藏</p>
          </div>
          
          <div class="hide-tablet">
            <p class="text-base">这个内容在平板端隐藏</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

.responsive-example {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 0;
  
  h1 {
    color: white;
    margin-bottom: 40px;
  }
  
  h2 {
    color: white;
    margin-bottom: 24px;
    margin-top: 40px;
  }
  
  p {
    color: white;
    opacity: 0.9;
  }
}

.mobile-section, .desktop-section, .common-section, .tools-section {
  margin-bottom: 60px;
}

.responsive-demo {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  
  p {
    margin: 10px 0;
  }
}

// 使用通用响应式类的示例
.common-section {
  .card {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    
    h3 {
      color: #333;
      margin-bottom: 16px;
    }
    
    p {
      color: #666;
      margin-bottom: 20px;
    }
  }
}
</style> 