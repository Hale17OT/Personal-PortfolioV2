import { ref, watch, onMounted } from 'vue';

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'portfolio.theme';

function resolveInitial(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
  return 'dark';
}

export function useTheme() {
  const theme = ref<ThemeMode>('dark');

  const apply = (mode: ThemeMode) => {
    document.documentElement.setAttribute('data-theme', mode);
    document.body?.setAttribute('data-theme', mode);
  };

  onMounted(() => {
    theme.value = resolveInitial();
    apply(theme.value);
  });

  watch(theme, (mode) => {
    apply(mode);
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  });

  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  return { theme, toggle };
}
