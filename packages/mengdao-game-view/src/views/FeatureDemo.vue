<template>
  <div class="feature-demo">
    <h1 class="demo-title">功能特性展示</h1>
    <FeatureShowcase />
  </div>
</template>

<script setup lang="ts">
  import FeatureShowcase from '../components/FeatureShowcase.vue'
</script>

<style scoped>
  .feature-demo {
    min-height: 100vh;
    background: #f8fafc;
  }

  .demo-title {
    text-align: center;
    padding: 2rem 0;
    color: #1f2937;
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }

  @media (max-width: 768px) {
    .demo-title {
      font-size: 1.5rem;
      padding: 1rem 0;
    }
  }
</style>
