<template>
  <div :class="`${perClassName}-container`" class="page-root">
    <header>
      <div class="logo">
        萌夢島 <span class="sparkle">✨</span>
      </div>
      <div class="nav-container">
        <a 
          v-for="item in navItems" 
          :key="item.id"
          :href="item.href" 
          :class="['nav-button', item.id, { active: item.isActive }]"
          @click.prevent="setActiveNav(item.id)"
        >
          <span class="icon"></span>
          <span>{{ item.label }}</span>
        </a>
      </div>
    </header>

    <div class="content-container">
      <section class="hero">
        <h1>✨ 歡迎來到萌夢島 ✨</h1>
        <p>🎮 最棒的楓之谷體驗，等你來探索可愛的冒險世界！ 🌸</p>
      </section>
      <section class="story-section">
        <div class="story-image-container">
          <img :src="imageList.gameInfo.url" alt="萌夢島故事" class="story-image" />
        </div>
      </section>

      <section class="login-image-section">
        <div class="login-image-container">
          <img :src="imageList.gameView.url" alt="登入介紹" class="login-image" />
        </div>
      </section>
      <section class="features">
        <div v-for="item in imageList.features" :key="item.url" class="feature-card">
          <img :src="item.url" :alt="item.name" class="feature-image" />
        </div>
      </section>

      <section class="section" id="news">
        <h2>🌟 最新消息 🌟</h2>
        <div class="news-item">
          <div class="date">2025-07-01</div>
          <p>🎉 暑期活勤始!完成任移即可得超级厚励!</p>
        </div>
        <div class="news-item">
          <div class="date">2025-07-01</div>
          <p>🔧 伺服器侵化完成，游截霞更加流畅定，如煞般顺滑 (大陵直速)免加速器</p>
        </div>
        <div class="news-item">
          <div class="date">2025-07-01</div>
          <p>💎 萌萝谷正式服!歉迎所有勇者加入我们的粉彩冒险旅程!</p>
        </div>
      </section>

      <section class="section download-section" id="download">
        <h2>💖 下載專區 💖</h2>
        <div class="download-buttons">
          <button class="common-button1">
            <span class="btn-icon">🎮</span>
            <span class="btn-text">遊戲主程序下載</span>
          </button>
          <button class="common-button1">
            <span class="btn-icon">🔑</span>
            <span class="btn-text">登入器下載</span>
          </button>
        </div>
      </section>
      
      <section class="section community-section" id="community">
        <h2>💖 加入我們的社群 💖</h2>
        <div class="community-buttons">
          <button class="common-button1">
            <span class="btn-icon">💬</span>
            <span class="btn-text">加入Discord</span>
          </button>
          <button class="common-button1">
            <span class="btn-icon">💬</span>
            <span class="btn-text">QQ聊天區</span>
          </button>
          <button class="common-button1">
            <span class="btn-icon">💬</span>
            <span class="btn-text">加入KOOK</span>
          </button>
          <button class="common-button1">
            <span class="btn-icon">💖</span>
            <span class="btn-text">贊助支持</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { useNavigation } from '@/hooks/useNavigation'

  const perClassName = ref('pc')
  const { navItems, setActiveNav } = useNavigation()

  setActiveNav('discord')
  const imageList = ref({
    gameInfo:{
      url: new URL('@/assets/pc-image/game-info.png', import.meta.url).href,
    },
    gameView:{
      url: new URL('@/assets/pc-image/game-view.png', import.meta.url).href,
    },
    features:[
      {
        url: new URL('@/assets/pc-image/feature-1.png', import.meta.url).href,
      },
      {
        url: new URL('@/assets/pc-image/feature-2.png', import.meta.url).href,
      },
      {
        url: new URL('@/assets/pc-image/feature-3.png', import.meta.url).href,
      },
    ]
  })
</script>
<style lang="scss" scoped>
  @import './pc.scss';
  .page-root {
    background: linear-gradient(
      135deg,
      #ffe4e1 0%,
      #e6e6fa 25%,
      #e0ffff 50%,
      #f0fff0 75%,
      #fff8dc 100%
    );
    min-height: 100vh;
  }
  .common-button1{
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 20px;
        background: linear-gradient(135deg, #ffeefa 0%, #dcf1ff 100%);
        border: none;
        border-radius: 25px;
        color: #8b7b8b;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(200, 200, 200, 0.3);
        position: relative;
        overflow: hidden;

        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s ease;
        }

        &:hover {
          background: linear-gradient(135deg, #ffc7dc 0%, #bee6ff 100%);
          border: 2px solid #ffc7dc;
          color: #8b4b9c;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 199, 220, 0.4);
        }

        &:hover:before {
          left: 100%;
        }

        .btn-icon {
          font-size: 20px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
          transition: all 0.3s ease;
        }

        &:hover .btn-icon {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .btn-text {
          white-space: nowrap;
          transition: all 0.3s ease;
        }
      }
</style>
