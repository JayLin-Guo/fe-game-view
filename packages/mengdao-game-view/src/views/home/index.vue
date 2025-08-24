<template>
  <div :class="`${perClassName}-container`" class="page-root">
    <header>
      <div class="logo">
        萌夢島 <span class="sparkle">✨</span>
      </div>
      <div class="nav-container">
        <a href="#" class="nav-button message active">
          <span class="icon"></span>
          消息
        </a>
        <a href="#" class="nav-button tutorial">
          <span class="icon"></span>
          <span>新手教學</span>
        </a>
        <a href="#" class="nav-button tutorial-cn">
          <span class="icon"></span>
          <span>新手教學(大陸)</span>
        </a>
        <a href="#" class="nav-button download">
          <span class="icon"></span>
          <span>下載</span>
        </a>
        <a href="#" class="nav-button qq">
          
          <span class="icon"></span>
          <span>QQ聊天區</span>
        </a>
        <a href="#" class="nav-button discord">
          <span class="icon"></span>
          <span>Discord</span>
        </a>
        <a href="#" class="nav-button login">
          <span class="icon"></span>
          <span>登入</span>
        </a>
        <a href="#" class="nav-button register">
          <span class="icon"></span>
          <span>註冊</span>
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
          <p>🎉 歐拉谷正式開服！歡迎所有勇者加入我們的粉彩冒險旅程！</p>
        </div>
        <div class="news-item">
          <div class="date">2025-07-01</div>
          <p>🔧 伺服器優化完成，遊戲體驗更加流暢穩定，如絲般順滑(大陸直連)免加速器</p>
        </div>
        <div class="news-item">
          <div class="date">2025-07-01</div>
          <p>💎 暑期活動開始！完成任務即可獲得超級豐厚獎勵</p>
        </div>
      </section>

      <section class="section" id="download">
        <h2>🌟 下载专区 🌟</h2>
      </section>
      <section class="section" id="download">
        <h2>🌟 下载专区 🌟</h2>
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'

  const perClassName = ref('pc')


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
</style>
