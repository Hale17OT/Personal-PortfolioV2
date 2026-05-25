<script setup lang="ts">
import { SKILLS } from '../data/content';
</script>

<template>
  <section class="section" id="skills" style="padding-top: 0">
    <div class="container">
      <div class="section-head reveal">
        <span class="section-num">— 02 / Toolkit</span>
        <h2 class="section-title">Tools I reach for, <em>without thinking</em>.</h2>
      </div>
      <div class="skills reveal">
        <div
          v-for="s in SKILLS"
          :key="s.title"
          class="skill-block"
          :style="{ '--swatch': s.swatch }"
          data-hot
        >
          <h3>{{ s.title }}</h3>
          <ul>
            <li v-for="item in s.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
