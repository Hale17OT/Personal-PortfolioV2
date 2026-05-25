<script setup lang="ts">
import type { SocialLink } from '../data/content';
import Arrow from './icons/Arrow.vue';

defineProps<{ email: string; socials: SocialLink[] }>();

const words = "Let's make something good".split(' ');
</script>

<template>
  <section class="contact" id="contact">
    <div class="contact-eyebrow reveal">— 04 / Contact</div>
    <h2 class="contact-title reveal">
      <span v-for="(w, i) in words" :key="i" class="word" data-hot>{{ w }}&nbsp;</span>
    </h2>
    <a class="contact-email reveal" :href="`mailto:${email}`" data-hot>
      {{ email }} <Arrow :size="20" />
    </a>
    <div class="socials reveal">
      <a
        v-for="s in socials"
        :key="s.label"
        class="social"
        :href="s.href"
        :target="s.href.startsWith('http') ? '_blank' : undefined"
        :rel="s.href.startsWith('http') ? 'noopener' : undefined"
        data-hot
      >
        <span class="social-dot" :style="{ background: s.color }" />
        {{ s.label }}
      </a>
    </div>
  </section>
</template>

<style scoped>
.social-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
</style>
