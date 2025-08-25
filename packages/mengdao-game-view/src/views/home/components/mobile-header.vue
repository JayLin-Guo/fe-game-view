<template>
  <header>
    <div class="header-container">
      <!-- 第一行：Logo -->
      <div class="logo-row">
        <div class="logo">
          <span class="logo-icon">
            <img :src="imageList.mobileLogoIcon.url" />
          </span>
          <span class="logo-text">萌夢島</span>
          <span class="logo-icon">
            <img :src="imageList.mobileLogoIcon.url" />
          </span>
        </div>
      </div>

      <!-- 第二行：导航按钮 -->
      <div class="nav-row">
        <div class="nav-container">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="item.href"
            :class="['nav-button', item.id, { active: item.isActive }]"
            @click.prevent="setActiveNav(item.id)"
          >
            <span class="nav-icon">
              <img :src="item.url" />
            </span>
            <span class="nav-text">{{ item.label }}</span>
          </a>
        </div>
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
    padding: 15px;
    border-bottom: 1px dashed #e0e0e0;
    z-index: 1000;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #ffb6c1 0%, #d8bfd8 100%);
    }

    .header-container {
      width: 100%;
      max-width: 480px;
      margin: 0 auto;
    }

    // Logo行
    .logo-row {
      display: flex;
      justify-content: center;
      margin-bottom: 8px;

      .logo {
        display: flex;
        align-items: center;
        gap: 6px;

        .logo-text {
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #f1aedf 0%, #d682bf 52%, #a0a8e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(2px 0px 2px #f2dcf6);
          white-space: nowrap;
        }

        .logo-icon {
          display: flex;
          align-items: center;

          img {
            width: 24px;
            height: 24px;
            object-fit: contain;
            filter: drop-shadow(0 2px 4px #f2dcf6);
            transition: all 0.3s ease;

            &:hover {
              transform: scale(1.1) rotate(5deg);
            }
          }
        }
      }
    }

    // 导航行
    .nav-row {
      display: flex;
      justify-content: center;

      .nav-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px;
        max-width: 100%;

        .nav-button {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          background: #fef7f8;
          border: 1px solid #f5e7e7;
          border-radius: 12px;
          color: #8b4b9c;
          font-size: 11px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(220, 200, 230, 0.3);
          position: relative;
          overflow: hidden;
          white-space: nowrap;

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
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(220, 200, 230, 0.4);
            background: #ffeded;
          }

          &:hover:before {
            left: 100%;
          }

          &.active {
            background: #ffeded;
            box-shadow: 0 4px 12px rgba(220, 200, 230, 0.4);
          }

          .nav-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 14px;
            height: 14px;

            img {
              width: 12px;
              height: 12px;
              object-fit: contain;
              transition: all 0.3s ease;
              filter: drop-shadow(0 1px 2px rgba(139, 75, 156, 0.3));
            }
          }

          &:hover .nav-icon img {
            transform: scale(1.1);
            filter: drop-shadow(0 2px 3px rgba(139, 75, 156, 0.5));
          }

          .nav-text {
            font-size: 10px;
            line-height: 1;
          }
        }
      }
    }
  }

  // 移动端响应式
  @media (max-width: 480px) {
    header {
      .logo-row .logo {
        gap: 4px;

        .logo-text {
          font-size: 1.5rem;
        }

        .logo-icon img {
          width: 20px;
          height: 20px;
        }
      }

      .nav-row .nav-container {
        gap: 4px;

        .nav-button {
          padding: 4px 8px;
          font-size: 10px;

          .nav-icon {
            width: 12px;
            height: 12px;

            img {
              width: 10px;
              height: 10px;
            }
          }

          .nav-text {
            font-size: 9px;
          }
        }
      }
    }
  }

  @media (max-width: 360px) {
    header {
      .logo-row .logo .logo-text {
        font-size: 1.3rem;
      }

      .nav-row .nav-container {
        gap: 3px;

        .nav-button {
          padding: 3px 6px;
          font-size: 9px;

          .nav-text {
            font-size: 8px;
          }
        }
      }
    }
  }
</style>
