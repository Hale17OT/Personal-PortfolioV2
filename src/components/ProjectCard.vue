<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Project } from '../data/content';
import Shape from './icons/Shape.vue';
import Arrow from './icons/Arrow.vue';

const props = defineProps<{
  p: Project;
  index: number;
  layoutMode: 'mosaic' | 'even' | 'thirds';
}>();

const emit = defineEmits<{ (e: 'open', id: string): void }>();

const cardRef = ref<HTMLElement | null>(null);

const cls = computed(() => {
  const out = ['project'];
  if (props.layoutMode === 'mosaic') {
    if (props.p.span === 'tall') out.push('tall');
    else if (props.p.span === 'wide') out.push('wide');
  } else if (props.layoutMode === 'thirds') {
    out.push('third');
  }
  return out.join(' ');
});

const cardStyle = computed<Record<string, string>>(() => ({
  '--swatch': props.p.swatch,
  animationDelay: `${Math.min(props.index * 80, 480)}ms`,
}));

const miniCells = Array.from({ length: 48 });

const onMove = (e: MouseEvent) => {
  const el = cardRef.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const mx = ((e.clientX - rect.left) / rect.width) * 100;
  const my = ((e.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty('--mx', `${mx}%`);
  el.style.setProperty('--my', `${my}%`);
};
</script>

<template>
  <article
    ref="cardRef"
    :class="[cls, 'reveal']"
    :style="cardStyle"
    data-hot
    @mousemove="onMove"
    @click="emit('open', p.id)"
  >
    <div class="project-mini-grid">
      <div v-for="(_, i) in miniCells" :key="i" />
    </div>

    <Shape :kind="p.shape" :size="300" :opacity="0.18" />
    <div class="project-shape-deco">
      <Shape :kind="p.shape" :size="260" :opacity="1" />
    </div>

    <div class="project-head">
      <span class="project-num">/ {{ p.num }}</span>
      <span class="project-year">{{ p.year }}</span>
    </div>

    <div class="project-body">
      <span class="project-tag">{{ p.tag }}</span>
      <h3 class="project-title">{{ p.title }}</h3>
      <p class="project-desc">{{ p.lede }}</p>
    </div>

    <div class="project-foot">
      <span class="project-role">{{ p.role }}</span>
      <span class="project-cta">View case <Arrow :size="14" /></span>
    </div>
  </article>
</template>

<style scoped>
.project-shape-deco {
  position: absolute;
  top: -40px;
  right: -40px;
  opacity: 0.22;
  transform: rotate(8deg);
  pointer-events: none;
  z-index: 0;
}
.project-role {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  opacity: 0.7;
}
</style>
