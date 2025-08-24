<template>
  <div class="test-page">
    <h1>🌟 鼠标跟随特效测试页面</h1>
    <p>移动鼠标查看星星跟随效果</p>
    
    <div class="test-area">
      <div class="test-box">测试区域 1</div>
      <div class="test-box">测试区域 2</div>
      <div class="test-box">测试区域 3</div>
    </div>
    
    <div class="controls">
      <button @click="toggleTrail">
        {{ isEnabled ? '禁用特效' : '启用特效' }}
      </button>
      <button @click="changeTheme">切换主题</button>
      <p>粒子数量: {{ particleCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCursorTrail } from '@/composables/useCursorTrail'
  
  const {
    isEnabled,
    particleCount,
    toggle,
    setTheme
  } = useCursorTrail({
    enabled: true,
    theme: 'game',
    maxParticles: 20,
    enableMobile: true, // 测试时启用移动端
    autoInit: true
  })
  
  const themes = ['game', 'rainbow', 'warm', 'cool', 'pastel']
  let currentThemeIndex = 0
  
  const toggleTrail = () => {
    toggle()
  }
  
  const changeTheme = () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length
    setTheme(themes[currentThemeIndex] as any)
  }
</script>

<style scoped>
  .test-page {
    min-height: 100vh;
    padding: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  p {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 40px;
  }
  
  .test-area {
    display: flex;
    justify-content: space-around;
    margin: 60px 0;
  }
  
  .test-box {
    width: 200px;
    height: 150px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .test-box:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
  }
  
  .controls {
    text-align: center;
    margin-top: 60px;
  }
  
  button {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 12px 24px;
    margin: 0 10px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
</style>