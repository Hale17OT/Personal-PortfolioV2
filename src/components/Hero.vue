<script setup lang="ts">
import { computed } from 'vue';
import Star from './icons/Star.vue';
import Arrow from './icons/Arrow.vue';

const props = defineProps<{
  name: string;
  role: string;
  location: string;
  statement: string;
  available?: boolean;
  cvHref?: string;
}>();

const NBSP = ' ';

const rowChars = computed(() => {
  const idx = props.name.indexOf(' ');
  if (idx > 0) {
    return [props.name.slice(0, idx).split(''), props.name.slice(idx + 1).split('')];
  }
  const half = Math.ceil(props.name.length / 2);
  return [props.name.slice(0, half).split(''), props.name.slice(half).split('')];
});

const firstRow = computed(() => rowChars.value[0].map((c) => (c === ' ' ? NBSP : c)));
const secondRow = computed(() => rowChars.value[1].map((c) => (c === ' ' ? NBSP : c)));

const statementParts = computed(() => props.statement.split('—'));
</script>

<template>
  <section class="hero" id="top">
    <div class="hero-meta reveal">
      <div>Portfolio <span>2026</span></div>
      <div>Currently <span>{{ role }}</span></div>
      <div>Based in <span>{{ location }}</span></div>
    </div>

    <div class="hero-title-wrap">
      <div class="hero-title-row">
        <span class="hero-title">
          <span
            v-for="(c, i) in firstRow"
            :key="`a-${i}`"
            class="letter"
            data-hot
          >{{ c }}</span>
        </span>
      </div>
      <div class="hero-title-row right">
        <Star :size="92" color="var(--accent)" class="hero-glyph spinning" />
        <span class="hero-title">
          <span
            v-for="(c, i) in secondRow"
            :key="`b-${i}`"
            class="letter"
            data-hot
          >{{ c }}</span>
        </span>
      </div>
    </div>

    <div class="hero-foot reveal">
      <p class="hero-statement">
        <template v-for="(part, i) in statementParts" :key="i">
          <em v-if="i > 0"> — </em>{{ part }}
        </template>
      </p>
      <div class="hero-cta">
        <a class="btn" href="#projects" data-hot>
          See selected work <span class="arrow"><Arrow /></span>
        </a>
        <a
          v-if="cvHref"
          class="btn-outline"
          :href="cvHref"
          target="_blank"
          rel="noopener"
          download
          data-hot
        >
          <span class="cv-dot" />
          Download CV (PDF)
        </a>
        <a v-if="available" href="#contact" class="btn-outline" data-hot>
          <span class="status-pip" />
          Open for new projects
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.status-pip {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 8px var(--green);
}
.cv-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}
</style>
