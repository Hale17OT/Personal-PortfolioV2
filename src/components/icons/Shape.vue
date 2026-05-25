<script setup lang="ts">
import { computed } from 'vue';
import type { ShapeKind } from '../../data/content';

const props = withDefaults(
  defineProps<{
    kind: ShapeKind;
    size?: number;
    opacity?: number;
  }>(),
  { size: 240, opacity: 0.25 },
);

const baseStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  fill: 'currentColor' as const,
  opacity: props.opacity,
}));

const sunSpokes = Array.from({ length: 12 }, (_, i) => {
  const a = (i * 30) * (Math.PI / 180);
  return {
    x1: 50 + 30 * Math.cos(a),
    y1: 50 + 30 * Math.sin(a),
    x2: 50 + 44 * Math.cos(a),
    y2: 50 + 44 * Math.sin(a),
  };
});

const gridLines = Array.from({ length: 5 }, (_, i) => i * 25);
</script>

<template>
  <svg v-if="kind === 'circle'" viewBox="0 0 100 100" :style="baseStyle">
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2" />
  </svg>

  <svg v-else-if="kind === 'wave'" viewBox="0 0 100 100" :style="baseStyle">
    <path d="M0 60 Q 25 30, 50 60 T 100 60 V100 H0 Z" />
  </svg>

  <svg v-else-if="kind === 'triangle'" viewBox="0 0 100 100" :style="baseStyle">
    <polygon points="50,8 92,86 8,86" fill="none" stroke="currentColor" stroke-width="2" />
  </svg>

  <svg v-else-if="kind === 'grid'" viewBox="0 0 100 100" :style="baseStyle">
    <g v-for="(v, i) in gridLines" :key="i">
      <line x1="0" :y1="v" x2="100" :y2="v" stroke="currentColor" stroke-width="1.5" />
      <line :x1="v" y1="0" :x2="v" y2="100" stroke="currentColor" stroke-width="1.5" />
    </g>
  </svg>

  <svg v-else-if="kind === 'sun'" viewBox="0 0 100 100" :style="baseStyle">
    <circle cx="50" cy="50" r="22" />
    <g stroke="currentColor" stroke-width="3">
      <line
        v-for="(s, i) in sunSpokes"
        :key="i"
        :x1="s.x1"
        :y1="s.y1"
        :x2="s.x2"
        :y2="s.y2"
      />
    </g>
  </svg>

  <svg v-else-if="kind === 'spark'" viewBox="0 0 100 100" :style="baseStyle">
    <path d="M50 5 L58 42 L95 50 L58 58 L50 95 L42 58 L5 50 L42 42 Z" />
  </svg>
</template>
