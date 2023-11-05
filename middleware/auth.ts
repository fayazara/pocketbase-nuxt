import { usePocketBaseClient } from '@/composables/pocketBaseClient'
export default defineNuxtRouteMiddleware(async () => {
  if (process.server) return;
  const pocketbase = usePocketBaseClient();
  const isUserLoggedIn = await pocketbase.authStore.isValid;
  if (!isUserLoggedIn) {
    return navigateTo('/auth/login')
  }
})
