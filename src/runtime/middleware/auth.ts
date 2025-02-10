import { usePocketbase } from '../composables/usePocketbase'
import { defineNuxtRouteMiddleware, createError } from '#app'

export default defineNuxtRouteMiddleware(() => {
  const { pb } = usePocketbase()
  if (!pb.authStore.isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
})
