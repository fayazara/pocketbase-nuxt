export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-02-10',
  pocketbase: {
    url: 'http://localhost:8090',
  },
})
