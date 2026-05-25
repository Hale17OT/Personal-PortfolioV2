<script setup lang="ts">
import { computed } from 'vue';
import Star from './icons/Star.vue';

const props = defineProps<{ words: string[]; reverse?: boolean }>();

const items = computed(() => [...props.words, ...props.words, ...props.words]);
</script>

<template>
  <div :class="['marquee', { reverse }]">
    <div class="marquee-track">
      <span
        v-for="(w, i) in items"
        :key="i"
        :class="['marquee-item', { outline: i % 2 === 1 }]"
      >
        {{ w }}
        <Star class="star" :size="48" color="var(--accent)" />
      </span>
    </div>
  </div>
</template>
