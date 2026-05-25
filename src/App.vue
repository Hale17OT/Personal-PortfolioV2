<script setup lang="ts">
import { ref, computed } from 'vue';
import Cursor from './components/Cursor.vue';
import TopBar from './components/TopBar.vue';
import Hero from './components/Hero.vue';
import Marquee from './components/Marquee.vue';
import About from './components/About.vue';
import Skills from './components/Skills.vue';
import Projects from './components/Projects.vue';
import ProjectModal from './components/ProjectModal.vue';
import Contact from './components/Contact.vue';
import SiteFooter from './components/SiteFooter.vue';
import {
  PROJECTS,
  SOCIALS,
  HERO,
  MARQUEE_TOP,
  MARQUEE_BOTTOM,
} from './data/content';
import { useReveal } from './composables/useReveal';
import { useTheme } from './composables/useTheme';

const { theme, toggle } = useTheme();
useReveal();

const openId = ref<string | null>(null);
const openProject = computed(() => PROJECTS.find((p) => p.id === openId.value) ?? null);
</script>

<template>
  <Cursor />
  <TopBar :theme="theme" @toggle="toggle" />

  <div class="shell">
    <Hero
      :name="HERO.name"
      :role="HERO.role"
      :location="HERO.location"
      :statement="HERO.statement"
      :available="HERO.available"
      :cv-href="HERO.cvHref"
    />

    <Marquee :words="MARQUEE_TOP" />

    <About :name="HERO.name" :location="HERO.location" />

    <Skills />

    <Marquee reverse :words="MARQUEE_BOTTOM" />

    <Projects layout-mode="mosaic" @open="(id) => (openId = id)" />

    <Contact :email="HERO.email" :socials="SOCIALS" />

    <SiteFooter />
  </div>

  <ProjectModal :project="openProject" @close="openId = null" />
</template>
