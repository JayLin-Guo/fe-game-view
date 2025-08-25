<template>
  <div class="letter-loading-overlay" v-if="visible">
    <div class="letter-loading-container">
      <div class="loading-content">
        <!-- 字母动画 -->
        <div class="letter-animation">
          <span
            v-for="(letter, index) in letters"
            :key="index"
            class="letter"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            {{ letter }}
          </span>
        </div>

        <!-- 副标题 -->
        <div class="loading-subtitle">
          {{ subtitle }}
        </div>

        <!-- 进度条 -->
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>

        <!-- 装饰性元素 -->
        <div class="decorative-dots">
          <span
            class="dot"
            v-for="i in 3"
            :key="i"
            :style="{ animationDelay: `${i * 0.2}s` }"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  interface Props {
    visible?: boolean
    text?: string
    subtitle?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    visible: true,
    text: '萌夢島',
    subtitle: '正在加载中...',
  })

  // 将文字分解为字母数组
  const letters = computed(() => props.text.split(''))

  // 模拟进度条
  const progress = ref(0)
  let progressInterval: number | null = null

  onMounted(() => {
    if (props.visible) {
      startProgress()
    }
  })

  onUnmounted(() => {
    if (progressInterval) {
      clearInterval(progressInterval)
    }
  })

  const startProgress = () => {
    progress.value = 0
    progressInterval = setInterval(() => {
      if (progress.value < 90) {
        progress.value += Math.random() * 10
      }
    }, 200) as unknown as number
  }

  // 当 visible 变化时重置进度
  const resetProgress = () => {
    if (progressInterval) {
      clearInterval(progressInterval)
    }
    if (props.visible) {
      startProgress()
    } else {
      progress.value = 100
    }
  }

  // 监听 visible 变化
  import { watch } from 'vue'
  watch(() => props.visible, resetProgress)
</script>

<style scoped>
  .letter-loading-overlay {
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
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.3s ease-out;
  }

  .letter-loading-container {
    text-align: center;
    color: white;
  }

  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  /* 字母动画 */
  .letter-animation {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
  }

  .letter {
    font-size: 48px;
    font-weight: 700;
    color: white;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    animation: letterBounce 1.5s ease-in-out infinite;
    transform-origin: center bottom;
  }

  @keyframes letterBounce {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-20px) scale(1.1);
    }
  }

  /* 副标题 */
  .loading-subtitle {
    font-size: 18px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    animation: pulse 2s ease-in-out infinite;
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

  /* 进度条 */
  .progress-bar {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
    border-radius: 2px;
    transition: width 0.3s ease;
    position: relative;
  }

  .progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.6) 50%,
      transparent 100%
    );
    animation: shimmer 1.5s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  /* 装饰性点点 */
  .decorative-dots {
    display: flex;
    gap: 8px;
    margin-top: 10px;
  }

  .dot {
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    animation: dotPulse 1.5s ease-in-out infinite;
  }

  @keyframes dotPulse {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  /* 整体淡入动画 */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .letter {
      font-size: 36px;
    }

    .loading-subtitle {
      font-size: 16px;
    }

    .progress-bar {
      width: 150px;
    }
  }
</style>
