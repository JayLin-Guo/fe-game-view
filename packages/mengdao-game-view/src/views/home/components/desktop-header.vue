<template>
  <header>
    <div class="header-container">
      <div class="logo">萌夢島 <span class="sparkle">✨</span></div>
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
    </div>
  </header>
</template>
<script lang="ts" setup>
  import { useNavigation } from '@/hooks/useNavigation'
  const { navItems, setActiveNav } = useNavigation()
  setActiveNav('discord')
</script>
<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    padding: 30px 0;
    border-bottom: 1px dashed #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 1000;

    .header-container {
      max-width: 1300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #ffb6c1 0%, #d8bfd8 100%);
    }

    .logo {
      font-size: 3rem;
      font-weight: 700;
      background: linear-gradient(90deg, #ff69b4 0%, #87ceeb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-right: 30px;

      .sparkle {
        color: #ffffff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
      }
    }

    .nav-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
      flex-wrap: nowrap;
      flex-wrap: wrap;

      .nav-button {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 12px 20px;
        background: #fef7f8;
        border: 1px solid #f5e7e7;
        border-radius: 15px;
        color: #8b4b9c;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(220, 200, 230, 0.3);
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
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220, 200, 230, 0.4);
          background: #ffeded;
        }

        &:hover:before {
          left: 100%;
        }

        &.active {
          background: #ffeded;
          box-shadow: 0 6px 20px rgba(220, 200, 230, 0.4);
        }

        .icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        &.message .icon:before {
          content: '📰';
        }
        &.tutorial .icon:before {
          content: '🔴';
          font-size: 12px;
        }
        &.tutorial-cn .icon:before {
          content: '🔴';
          font-size: 12px;
        }
        &.download .icon:before {
          content: '⬇';
          font-size: 12px;
        }
        &.qq .icon:before {
          content: '💭';
          color: #d8bfd8;
        }
        &.discord .icon:before {
          content: '🎮';
          color: #d8bfd8;
        }
        &.login .icon:before {
          content: '🔑';
          color: #ffd700;
        }
        &.register .icon:before {
          content: '📝';
          font-size: 12px;
        }
      }
    }
  }
</style>
