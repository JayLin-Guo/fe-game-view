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
  import { heartIcons, type HeartIconType } from './star-icons'

  interface Props {
    type?: HeartIconType
    size?: number | string
    color?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'classic',
    size: 16,
    color: '#FF69B4',
  })

  const iconConfig = computed(() => heartIcons[props.type])
</script>

<style scoped>
  .star-icon {
    display: inline-block;
    fill: currentColor;
    transition: all 0.3s ease;
    pointer-events: none;
    user-select: none;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
</style>