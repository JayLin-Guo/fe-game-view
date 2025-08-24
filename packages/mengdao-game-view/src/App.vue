<template>
  <div id="app">
    <!-- 首页时显示完整页面，其他页面显示管理后台布局 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
</script>

<style scoped>
  #app {
    min-height: 100vh;
    width: 100%;
  }

  .el-header {
    height: 60px;
    line-height: 60px;
  }

  .el-aside {
    border-right: 1px solid #e5e7eb;
  }
</style>
