export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-02-10',
  pocketbase: {
    url: 'https://pocketbase.supersaas.dev',
  },
})
