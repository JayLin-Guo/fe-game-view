<template>
  <div class="page-root" :class="{ 'desktop-container': isDesktop, 'mobile-container': isMobile }">
    <!-- Loading 组件 -->
    <LetterLoading
      :visible="initLoader.loading.value"
      text="萌夢島"
      subtitle="正在加载游戏数据..."
    />

    <SimpleCursorTrail />
    <div class="content-container">
      <DesktopHeader v-if="isDesktop" ref="desktopHeaderRef" />
      <MobileHeader v-if="isMobile" ref="mobileHeaderRef" />
      <section class="hero">
        <h1>
          <img class="hero-left" :src="imageList.hero.titleLeft.url" />
          歡迎來到萌夢島
          <img class="hero-right" :src="imageList.hero.titleRight.url" />
        </h1>
        <p>
          <span class="dots-left">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
          最棒的楓之谷體驗，等你來探索可愛的冒險世界
          <span class="dots-right">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
        </p>
      </section>
      <section class="story-section">
        <div class="story-image-container">
          <img :src="imageList.gameInfo.url" alt="萌夢島故事" class="story-image pc-only" />
          <img :src="imageList.gameInfo.url" alt="萌夢島故事" class="story-image mobile-only" />
        </div>
      </section>

      <section class="login-image-section">
        <div class="login-image-container">
          <img :src="imageList.gameView.url" alt="登入介紹" class="login-image pc-only" />
          <img :src="imageList.gameView.url" alt="登入介紹" class="login-image mobile-only" />
        </div>
      </section>
      <section class="features">
        <div v-for="item in imageList.features" :key="item.url" class="feature-card">
          <div class="feature-header">
            <div class="feature-icon">
              <img :src="item.url" />
            </div>
            <div class="feature-title">{{ item.title }}</div>
          </div>
          <div class="feature-text">{{ item.text }}</div>
        </div>
      </section>

      <section class="section" id="news">
        <h2>
          <img class="title-icon" :src="imageList.hIcon.url" />
          <span> 最新消息</span>
          <img class="title-icon" :src="imageList.hIcon.url" />
        </h2>
        <div class="news-item">
          <div class="date">2025-07-01</div>
          <p>暑期活勤始!暑期活動開始！完成任務即可獲得超級 豐厚獎勵！!</p>
        </div>
        <div class="news-item">
          <div class="date">2025-07-01</div>
          <p>伺服器優化完成，遊戲體驗更加流暢穩定，如絲般順滑（大陸直連）免加速器~</p>
        </div>
        <div class="news-item">
          <div class="date">2025-07-01</div>
          <p>萌萝谷正式服!歉迎所有勇者加入我们的粉彩冒险旅程!</p>
        </div>
      </section>

      <section class="section download-section" id="download">
        <h2>
          <img class="title-icon" :src="imageList.hIcon.url" />
          <span>下載專區</span>
          <img class="title-icon" :src="imageList.hIcon.url" />
        </h2>
        <div class="download-buttons">
          <button class="common-button1" @click="onButtonAction(ButtonType.game_download_url)">
            <span class="btn-icon">
              <img :src="imageList.games.icon1" />
            </span>
            <span class="btn-text">遊戲主程序下載</span>
          </button>
          <button class="common-button1" @click="onButtonAction(ButtonType.login_download_url)">
            <span class="btn-icon">
              <img :src="imageList.games.icon2" />
            </span>
            <span class="btn-text">登入器下載</span>
          </button>
        </div>
      </section>

      <section class="section community-section" id="community">
        <h2>
          <img class="title-icon" :src="imageList.hIcon.url" />
          <span>加入我們的社群</span>
          <img class="title-icon" :src="imageList.hIcon.url" />
        </h2>
        <div class="community-buttons">
          <button class="common-button1" @click="onButtonAction(ButtonType.qq_group_url)">
            <span class="btn-icon">
              <img :src="imageList.community.icon1" />
            </span>
            <span class="btn-text">QQ聊天區</span>
          </button>
          <button class="common-button1" @click="onButtonAction(ButtonType.discord_url)">
            <span class="btn-icon">
              <img :src="imageList.community.icon1" />
            </span>
            <span class="btn-text">加入Discord</span>
          </button>

          <button class="common-button1">
            <span class="btn-icon">
              <img :src="imageList.community.icon1" />
            </span>
            <span class="btn-text" @click="onButtonAction(ButtonType.kook_url)">加入KOOK</span>
          </button>
          <button class="common-button1">
            <span class="btn-icon">
              <img :src="imageList.community.icon2" />
            </span>
            <span class="btn-text" @click="onButtonAction('')">贊助支持</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { useNavigation } from '@/hooks/useNavigation'
  import { useResponsiveScale } from '@/composables/useResponsiveScale'
  import { useHeaderHeight } from '@/composables/useHeaderHeight'
  import DesktopHeader from './components/desktop-header.vue'
  import MobileHeader from './components/mobile-header.vue'
  import SimpleCursorTrail from '@/components/cursor-trail/SimpleCursorTrail.vue'
  import LetterLoading from '@/components/loading/LetterLoading.vue'
  import { imageList } from './imageUrl'
  import { useInitLoad } from './hooks/useInit'
  import { useButtonAction, ButtonType } from './hooks/useButtonAction'

  const { isDesktop, isMobile } = useResponsiveScale()
  const initLoader = useInitLoad()
  const { onButtonAction } = useButtonAction(initLoader.sysLinkConf)

  // 页面加载时初始化数据
  onMounted(async () => {
    await initLoader.initLoad()
  })
  // 使用头部高度管理
  const { desktopHeaderRef, mobileHeaderRef, currentHeaderHeight, measureHeaderHeight } =
    useHeaderHeight()
</script>
<style lang="scss" scoped>
  @import './responsive-styles.scss';

  .page-root {
    // min-height: 100vh;
    // padding-top 将通过 JavaScript 动态设置
  }

  // 设备特定显示类
  .mobile-only {
    display: none;
  }

  .pc-only {
    display: block;
  }
  .common-button1 {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    background: linear-gradient(135deg, #ffeefa 0%, #dcf1ff 100%);
    border: none;
    border-radius: 15px;
    color: #8b7b8b;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(200, 200, 200, 0.3);
    position: relative;
    overflow: hidden;
    color: #8b4b9c;
    font-weight: bold;

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
