<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="iconConfig.viewBox"
    :style="{ color: color }"
    class="star-icon"
  >
    <g v-html="iconConfig.svg"></g>
  </svg>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { starIcons, type StarIconType } from './star-icons'

  interface Props {
    type?: StarIconType
    size?: number | string
    color?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'classic',
    size: 16,
    color: '#FFD700',
  })

  const iconConfig = computed(() => starIcons[props.type])
</script>

<style scoped>
  .star-icon {
    display: inline-block;
    fill: currentColor;
    transition: all 0.3s ease;
    pointer-events: none;
    user-select: none;
  }
</style>