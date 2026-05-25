<script setup lang="ts">
import { PROJECTS } from '../data/content';
import ProjectCard from './ProjectCard.vue';

defineProps<{ layoutMode?: 'mosaic' | 'even' | 'thirds' }>();
const emit = defineEmits<{ (e: 'open', id: string): void }>();
</script>

<template>
  <section class="section" id="projects">
    <div class="container">
      <div class="section-head reveal">
        <span class="section-num">— 03 / Selected work</span>
        <h2 class="section-title">Six things I'm <em>proud</em> of.</h2>
      </div>
      <div class="projects-grid">
        <ProjectCard
          v-for="(p, i) in PROJECTS"
          :key="p.id"
          :p="p"
          :index="i"
          :layout-mode="layoutMode ?? 'mosaic'"
          @open="(id) => emit('open', id)"
        />
      </div>
    </div>
  </section>
</template>
