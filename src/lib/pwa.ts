export function registerPWA() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    import('virtual:pwa-register')
      .then(({ registerSW }) => {
        registerSW({ immediate: true });
      })
      .catch((err) => {
        console.error('Failed to register PWA:', err);
      });
  }
}
