<script setup lang="ts">
defineProps<{ size?: number; color?: string }>();
</script>

<template>
  <svg
    :width="size ?? 56"
    :height="size ?? 56"
    viewBox="0 0 100 100"
    :style="{ color: color ?? 'currentColor' }"
  >
    <path d="M50 5 L58 42 L95 50 L58 58 L50 95 L42 58 L5 50 L42 42 Z" fill="currentColor" />
  </svg>
</template>
