import { onMounted, onBeforeUnmount } from 'vue';

/**
 * Adds the `.in` class to every `.reveal` element when it enters the viewport.
 */
export function useReveal(threshold = 0.12) {
  let io: IntersectionObserver | null = null;

  onMounted(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io?.unobserve(entry.target);
          }
        }
      },
      { threshold },
    );

    els.forEach((el) => io!.observe(el));
  });

  onBeforeUnmount(() => {
    io?.disconnect();
    io = null;
  });
}
