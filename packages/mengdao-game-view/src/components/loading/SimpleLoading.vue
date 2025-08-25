<template>
  <Transition name="loading-fade">
    <div class="simple-loading-overlay" v-if="visible">
      <div class="loading-container">
        <!-- 主要加载动画 -->
        <div class="spinner-container">
          <div class="spinner">
            <div class="spinner-inner"></div>
          </div>
        </div>

        <!-- 文字内容 -->
        <div class="loading-content">
          <h3 class="loading-title">{{ text }}</h3>
          <p class="loading-subtitle">{{ subtitle }}</p>
        </div>

        <!-- 底部装饰 -->
        <div class="loading-decoration">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
      </div>
    </div>
  </Transition>
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
    subtitle: '正在进入梦幻世界...',
  })
</script>

<style scoped>
  /* 过渡动画 */
  .loading-fade-enter-active,
  .loading-fade-leave-active {
    transition: all 0.3s ease;
  }

  .loading-fade-enter-from,
  .loading-fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }

  .simple-loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
      135deg,
      rgba(241, 174, 223, 0.95) 0%,
      rgba(214, 130, 191, 0.95) 50%,
      rgba(160, 168, 233, 0.95) 100%
    );
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    text-align: center;
  }

  /* 旋转器 */
  .spinner-container {
    position: relative;
  }

  .spinner {
    width: 80px;
    height: 80px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
    position: relative;
  }

  .spinner-inner {
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    border-right-color: rgba(255, 255, 255, 0.8);
    animation: spin 0.8s ease-in-out infinite reverse;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* 文字内容 */
  .loading-content {
    color: white;
  }

  .loading-title {
    font-size: 36px;
    font-weight: 700;
    margin: 0 0 15px 0;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    animation: titlePulse 2s ease-in-out infinite;
  }

  .loading-subtitle {
    font-size: 18px;
    font-weight: 400;
    margin: 0;
    opacity: 0.9;
    animation: subtitleFade 3s ease-in-out infinite;
  }

  @keyframes titlePulse {
    0%,
    100% {
      transform: scale(1);
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
    50% {
      transform: scale(1.02);
      text-shadow:
        0 2px 8px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(255, 255, 255, 0.3);
    }
  }

  @keyframes subtitleFade {
    0%,
    100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }

  /* 波浪装饰 */
  .loading-decoration {
    display: flex;
    gap: 4px;
    align-items: flex-end;
  }

  .wave {
    width: 4px;
    height: 20px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 2px;
    animation: wave 1.2s ease-in-out infinite;
  }

  .wave:nth-child(1) {
    animation-delay: 0s;
  }

  .wave:nth-child(2) {
    animation-delay: 0.1s;
  }

  .wave:nth-child(3) {
    animation-delay: 0.2s;
  }

  @keyframes wave {
    0%,
    100% {
      height: 20px;
      opacity: 0.6;
    }
    50% {
      height: 35px;
      opacity: 1;
    }
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .spinner {
      width: 60px;
      height: 60px;
    }

    .loading-title {
      font-size: 28px;
    }

    .loading-subtitle {
      font-size: 16px;
    }

    .loading-container {
      gap: 30px;
      padding: 20px;
    }
  }
</style>
