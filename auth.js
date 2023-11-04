import { usePocketBaseUser } from '../composables/pocketBaseUser';
import { defineNuxtPlugin, addRouteMiddleware, defineNuxtRouteMiddleware, useRuntimeConfig, navigateTo } from '#imports'

export default defineNuxtPlugin({
  name: 'auth-redirect',
  setup() {
    addRouteMiddleware(
      'global-auth',
      defineNuxtRouteMiddleware(to => {
        const config = useRuntimeConfig().public.pocketbase;
        const { login, exclude } = config.redirectOptions;
        console.log('config', config)
        const isExcluded = [...exclude, login]?.some(path => {
          const regex = new RegExp(`^${path.replace(/\*/g, '.*')}$`)
          return regex.test(to.path)
        })
        if (isExcluded) return;
        const { isUserLoggedIn } = usePocketBaseUser();
        console.log('isUserLoggedIn', isUserLoggedIn.value)
        if (!isUserLoggedIn.value) {
          return navigateTo(login)
        }
      }),
      { global: true },
    )
  }
})
