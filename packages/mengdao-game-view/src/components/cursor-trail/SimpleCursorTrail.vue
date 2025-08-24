<template>
  <div class="simple-cursor-trail">
    <!-- 这个组件会在mounted时直接启动特效 -->
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'
  
  let particles: HTMLElement[] = []
  let mouseX = 0
  let mouseY = 0
  let lastSpawnTime = 0
  
  const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#98FB98', '#DDA0DD']
  
  const createStar = (x: number, y: number) => {
    const star = document.createElement('div')
    star.innerHTML = '✨'
    star.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: 16px;
      pointer-events: none;
      user-select: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      animation: starFade 2s ease-out forwards;
    `
    
    document.body.appendChild(star)
    particles.push(star)
    
    // 2秒后移除
    setTimeout(() => {
      if (star.parentNode) {
        star.parentNode.removeChild(star)
      }
      const index = particles.indexOf(star)
      if (index > -1) {
        particles.splice(index, 1)
      }
    }, 2000)
  }
  
  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    
    const now = Date.now()
    if (now - lastSpawnTime > 100 && particles.length < 20) { // 限制频率和数量
      createStar(mouseX, mouseY)
      lastSpawnTime = now
    }
  }
  
  onMounted(() => {
    // 添加CSS动画
    const style = document.createElement('style')
    style.textContent = `
      @keyframes starFade {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0) rotate(0deg);
        }
        20% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.2) rotate(90deg);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5) rotate(360deg) translateY(-20px);
        }
      }
    `
    document.head.appendChild(style)
    
    // 添加鼠标监听
    document.addEventListener('mousemove', handleMouseMove)
    console.log('🌟 简单鼠标跟随特效已启动')
  })
  
  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    // 清理所有粒子
    particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    })
    particles = []
    console.log('🌟 简单鼠标跟随特效已停止')
  })
</script>

<style scoped>
  .simple-cursor-trail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>