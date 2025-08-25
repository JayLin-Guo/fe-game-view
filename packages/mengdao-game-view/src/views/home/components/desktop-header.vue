<template>
  <header>
    <div class="header-container">
      <div class="logo">
        萌夢島
        <span class="sparkle">
          <img :src="imageList.logoIcon.url" />
        </span>
      </div>
      <div class="nav-container">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="item.href"
          :class="['nav-button', item.id, { active: item.isActive }]"
          @click.prevent="setActiveNav(item.id)"
        >
          <!-- <span class="icon"></span> -->
          <span>
            <img :src="item.url" />
          </span>
          <span>{{ item.label }}</span>
        </a>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
  import { useNavigation } from '@/hooks/useNavigation'
  import { imageList } from '../imageUrl'

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
    padding: 15px 20px;
    border-bottom: 1px dashed #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    min-height: 60px;

    .header-container {
      width: 100%;
      max-width: 1300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
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
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #f1aedf 0%, #d682bf 32%, #a0a8e9 52%, #a0a8e9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      white-space: nowrap;
      flex-shrink: 0;
      min-width: fit-content;
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;

      // 额外的文字描边效果
      -webkit-text-stroke: 0.5px rgba(241, 174, 223, 0.3);

      .sparkle {
        display: flex;
        align-items: center;

        img {
          width: 32px;
          height: 32px;
          object-fit: contain;
          filter: drop-shadow(2px 2px 0px #e8c5e8) drop-shadow(4px 4px 8px rgba(242, 220, 246, 0.8));
          transition: all 0.3s ease;

          &:hover {
            transform: scale(1.1) rotate(5deg);
            filter: drop-shadow(3px 3px 0px #e8c5e8)
              drop-shadow(6px 6px 12px rgba(242, 220, 246, 0.9));
          }
        }
      }
    }

    .nav-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.8rem;
      flex-wrap: nowrap;
      flex-shrink: 1;
      min-width: 0;

      .nav-button {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        background: #fef7f8;
        border: 1px solid #f5e7e7;
        border-radius: 15px;
        color: #8b4b9c;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(220, 200, 230, 0.3);
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        flex-shrink: 0;

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

        // 图片icon样式
        span:first-child {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;

          img {
            width: 18px;
            height: 18px;
            object-fit: contain;
            transition: all 0.3s ease;
            filter: drop-shadow(0 1px 2px rgba(139, 75, 156, 0.3));
          }
        }

        &:hover span:first-child img {
          transform: scale(1.1);
          filter: drop-shadow(0 2px 4px rgba(139, 75, 156, 0.5));
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

  // 响应式处理
  @media (max-width: 1400px) {
    header {
      .header-container {
        max-width: 1200px;
      }

      .logo {
        font-size: 2.2rem;

        .sparkle img {
          width: 28px;
          height: 28px;
        }
      }

      .nav-container {
        gap: 0.6rem;

        .nav-button {
          padding: 6px 12px;
          font-size: 13px;

          span:first-child img {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }

  @media (max-width: 1200px) {
    header {
      .header-container {
        max-width: 1000px;
      }

      .logo {
        font-size: 2rem;

        .sparkle img {
          width: 24px;
          height: 24px;
        }
      }

      .nav-container {
        gap: 0.5rem;

        .nav-button {
          padding: 6px 10px;
          font-size: 12px;

          span:first-child img {
            width: 14px;
            height: 14px;
          }

          .icon {
            width: 16px;
            height: 16px;
            font-size: 14px;
          }
        }
      }
    }
  }

  @media (max-width: 1000px) {
    header {
      padding: 10px 15px;

      .header-container {
        max-width: 100%;
      }

      .logo {
        font-size: 1.8rem;

        .sparkle img {
          width: 20px;
          height: 20px;
        }
      }

      .nav-container {
        gap: 0.4rem;

        .nav-button {
          padding: 5px 8px;
          font-size: 11px;

          span:first-child img {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
</style>
