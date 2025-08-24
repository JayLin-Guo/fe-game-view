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
  
  const colors = ['#FF91A4', '#FFB3E6', '#FF69B4', '#FFC0CB', '#FF1493']
  
  const createHeart = (x: number, y: number) => {
    const heart = document.createElement('div')
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    // 创建SVG爱心
    heart.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" style="color: ${color};">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
              fill="currentColor"/>
      </svg>
    `
    heart.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      user-select: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      animation: heartFloat 2.5s ease-out forwards;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    `
    
    document.body.appendChild(heart)
    particles.push(heart)
    
    // 2.5秒后移除
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart)
      }
      const index = particles.indexOf(heart)
      if (index > -1) {
        particles.splice(index, 1)
      }
    }, 2500)
  }
  
  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    
    const now = Date.now()
    if (now - lastSpawnTime > 80 && particles.length < 15) { // 限制频率和数量
      createHeart(mouseX, mouseY)
      lastSpawnTime = now
    }
  }
  
  onMounted(() => {
    // 添加CSS动画
    const style = document.createElement('style')
    style.textContent = `
      @keyframes heartFloat {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0) rotate(-10deg);
        }
        15% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
        }
        30% {
          transform: translate(-50%, -50%) scale(1) rotate(-2deg);
        }
        70% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(0.9) rotate(2deg) translateY(-15px);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.3) rotate(-5deg) translateY(-30px);
        }
      }
    `
    document.head.appendChild(style)
    
    // 添加鼠标监听
    document.addEventListener('mousemove', handleMouseMove)
    console.log('💖 爱心鼠标跟随特效已启动')
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
    console.log('💖 爱心鼠标跟随特效已停止')
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