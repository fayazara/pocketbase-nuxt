export default defineNuxtRouteMiddleware(() => {
  const { pb } = usePocketbase()
  if (!pb.authStore.isValid) {
    return navigateTo('/')
  }
})
