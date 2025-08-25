<template>
  <div class="circle-loading-overlay" v-if="visible">
    <div class="circle-loading-container">
      <!-- 主要的圆形加载器 -->
      <div class="circle-loader">
        <div class="circle-outer">
          <div class="circle-inner"></div>
        </div>
      </div>

      <!-- 文字 -->
      <div class="loading-text">
        <h3>{{ text }}</h3>
        <p>{{ subtitle }}</p>
      </div>

      <!-- 浮动的小圆点 -->
      <div class="floating-dots">
        <span
          class="floating-dot"
          v-for="i in 6"
          :key="i"
          :style="{
            animationDelay: `${i * 0.2}s`,
            left: `${Math.cos((i * 60 * Math.PI) / 180) * 80 + 50}%`,
            top: `${Math.sin((i * 60 * Math.PI) / 180) * 80 + 50}%`,
          }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    visible?: boolean
    text?: string
    subtitle?: string
  }

  withDefaults(defineProps<Props>(), {
    visible: true,
    text: '萌夢島',
    subtitle: '正在进入游戏世界...',
  })
</script>

<style scoped>
  .circle-loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
      135deg,
      rgba(241, 174, 223, 0.9) 0%,
      rgba(214, 130, 191, 0.9) 50%,
      rgba(160, 168, 233, 0.9) 100%
    );
    backdrop-filter: blur(15px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.5s ease-out;
  }

  .circle-loading-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  /* 圆形加载器 */
  .circle-loader {
    position: relative;
    width: 120px;
    height: 120px;
  }

  .circle-outer {
    width: 100%;
    height: 100%;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    position: relative;
  }

  .circle-inner {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-bottom: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: spin 1.5s linear infinite reverse;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* 文字样式 */
  .loading-text {
    text-align: center;
    color: white;
  }

  .loading-text h3 {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 10px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    animation: textGlow 2s ease-in-out infinite alternate;
  }

  .loading-text p {
    font-size: 16px;
    margin: 0;
    opacity: 0.9;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes textGlow {
    from {
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    to {
      text-shadow:
        0 2px 4px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(255, 255, 255, 0.5);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }

  /* 浮动圆点 */
  .floating-dots {
    position: absolute;
    width: 200px;
    height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .floating-dot {
    position: absolute;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    animation: float 3s ease-in-out infinite;
    opacity: 0.6;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-20px) scale(1.2);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* 响应式 */
  @media (max-width: 768px) {
    .circle-loader {
      width: 80px;
      height: 80px;
    }

    .loading-text h3 {
      font-size: 24px;
    }

    .loading-text p {
      font-size: 14px;
    }

    .floating-dots {
      width: 150px;
      height: 150px;
    }
  }
</style>
