<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

const blobRef = ref<HTMLDivElement | null>(null);
const dotRef = ref<HTMLDivElement | null>(null);
const hot = ref(false);

let raf = 0;
const mouse = { x: 0, y: 0 };
const blob = { x: 0, y: 0 };

const onMove = (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  if (dotRef.value) {
    dotRef.value.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  }

  const t = e.target as Element | null;
  hot.value = !!(t && t.closest && t.closest('a, button, [data-hot]'));
};

const tick = () => {
  blob.x += (mouse.x - blob.x) * 0.12;
  blob.y += (mouse.y - blob.y) * 0.12;
  if (blobRef.value) {
    blobRef.value.style.transform = `translate(${blob.x}px, ${blob.y}px) translate(-50%, -50%)`;
  }
  raf = requestAnimationFrame(tick);
};

onMounted(() => {
  mouse.x = window.innerWidth / 2;
  mouse.y = window.innerHeight / 2;
  blob.x = mouse.x;
  blob.y = mouse.y;
  window.addEventListener('mousemove', onMove);
  raf = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMove);
  cancelAnimationFrame(raf);
});
</script>

<template>
  <div ref="blobRef" class="cursor-blob" />
  <div ref="dotRef" :class="['cursor-dot', { 'is-hot': hot }]" />
</template>
