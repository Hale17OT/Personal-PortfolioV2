<script setup lang="ts">
import type { ThemeMode } from '../composables/useTheme';

defineProps<{ theme: ThemeMode }>();
const emit = defineEmits<{ (e: 'toggle'): void }>();
</script>

<style scoped>
.topbar-mark {
  cursor: none;
}
.topbar-logo {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  display: block;
  flex-shrink: 0;
}
</style>

<template>
  <header class="topbar">
    <a class="topbar-mark" href="#top" data-hot>
      <img class="topbar-logo" src="/logo.png" alt="Hallelujah Abdissa logo" />
      HALLELUJAH / ABDISSA
    </a>
    <nav class="topbar-nav">
      <a href="#about" data-hot>About</a>
      <a href="#projects" data-hot>Work</a>
      <a href="#skills" data-hot>Toolkit</a>
      <a href="#contact" data-hot>Contact</a>
    </nav>
    <div class="topbar-right">
      <div class="topbar-status">
        <span class="pip" /> Open for work
      </div>
      <button
        class="theme-toggle"
        type="button"
        aria-label="Toggle theme"
        :aria-pressed="theme === 'light'"
        data-hot
        @click="emit('toggle')"
      >
        <span class="puck" />
      </button>
    </div>
  </header>
</template>
