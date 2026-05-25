<script setup lang="ts">
import { watch, onBeforeUnmount, computed, ref } from 'vue';
import type { Project, GalleryGroup, GalleryItem } from '../data/content';
import Shape from './icons/Shape.vue';
import Arrow from './icons/Arrow.vue';

const props = defineProps<{ project: Project | null }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (lightboxSrc.value) lightboxSrc.value = null;
    else emit('close');
  }
};

const lightboxSrc = ref<string | null>(null);

const groupedGallery = computed(() => {
  const g = props.project?.gallery;
  if (!g || g.length === 0) return null;
  const buckets = new Map<GalleryGroup, GalleryItem[]>();
  for (const item of g) {
    if (!buckets.has(item.group)) buckets.set(item.group, []);
    buckets.get(item.group)!.push(item);
  }
  return Array.from(buckets.entries());
});

watch(
  () => props.project,
  (p) => {
    if (p) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lightboxSrc.value = null;
    }
  },
);

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey);
  document.body.style.overflow = '';
});

const showHrefButton = computed(() => {
  const href = props.project?.href;
  return !!href && href !== '#';
});
</script>

<template>
  <Teleport to="body">
    <div :class="['modal-backdrop', { open: !!project }]" @click="emit('close')">
      <div v-if="project" class="modal" @click.stop>
        <button
          class="modal-close"
          type="button"
          aria-label="Close"
          data-hot
          @click="emit('close')"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        <div
          class="modal-cover"
          :style="{ '--swatch': project.swatch, background: project.swatch }"
        >
          <div class="modal-cover-deco">
            <Shape :kind="project.shape" :size="320" :opacity="1" />
          </div>
          <div class="modal-cover-top">
            <span class="modal-cover-tag">{{ project.tag.toUpperCase() }}</span>
            <span class="modal-cover-num">/ {{ project.num }}</span>
          </div>
          <h3 class="modal-cover-title">{{ project.title }}</h3>
          <div class="modal-cover-meta">
            <div>Year<strong>{{ project.year }}</strong></div>
            <div>Role<strong>{{ project.role }}</strong></div>
            <div>Timeline<strong>{{ project.timeline }}</strong></div>
            <div>Status<strong>Shipped · Live</strong></div>
          </div>
        </div>

        <div class="modal-body">
          <div>
            <div class="modal-section-label">The work</div>
            <h2>{{ project.lede }}</h2>
          </div>
          <p class="body-copy">{{ project.body }}</p>
          <div>
            <div class="modal-section-label">Stack &amp; disciplines</div>
            <div class="row">
              <span v-for="s in project.stack" :key="s" class="chip">{{ s }}</span>
            </div>
          </div>

          <template v-if="groupedGallery">
            <div
              v-for="[group, items] in groupedGallery"
              :key="group"
              class="gallery-section"
            >
              <div class="modal-section-label">{{ group }}</div>
              <div class="gallery-grid">
                <button
                  v-for="item in items"
                  :key="item.src"
                  type="button"
                  class="gallery-thumb"
                  data-hot
                  @click="lightboxSrc = item.src"
                >
                  <img :src="item.src" :alt="`${group} screenshot`" loading="lazy" />
                </button>
              </div>
            </div>
          </template>

          <div v-if="showHrefButton" class="modal-links">
            <a
              class="btn"
              :href="project.href"
              target="_blank"
              rel="noopener"
              data-hot
            >Visit {{ project.link }} <span class="arrow"><Arrow /></span></a>
          </div>
        </div>
      </div>
    </div>

    <Transition name="lightbox">
      <div
        v-if="lightboxSrc"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        @click="lightboxSrc = null"
      >
        <img :src="lightboxSrc" alt="Screenshot full size" @click.stop />
        <button
          class="lightbox-close"
          type="button"
          aria-label="Close image"
          data-hot
          @click.stop="lightboxSrc = null"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-cover-deco {
  position: absolute;
  top: -40px;
  right: -40px;
  color: #fff;
  opacity: 0.35;
  pointer-events: none;
}
.modal-cover-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.modal-cover-tag,
.modal-cover-num {
  font-family: var(--font-mono);
  font-size: 12px;
  opacity: 0.85;
  letter-spacing: 0.06em;
}

.gallery-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.gallery-thumb {
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--bg-alt);
  padding: 0;
  cursor: none;
  transition: transform 200ms var(--ease-out), border-color 200ms;
}
.gallery-thumb:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}
.gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  z-index: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5vh 5vw;
  cursor: none;
}
.lightbox img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
}
.lightbox-close {
  position: fixed;
  top: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  display: grid;
  place-items: center;
  backdrop-filter: blur(8px);
  transition: transform 200ms, background 200ms;
}
.lightbox-close:hover {
  transform: rotate(90deg);
  background: var(--accent);
  color: var(--accent-ink);
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 200ms var(--ease-out);
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

@media (max-width: 720px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
