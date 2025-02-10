import { defineNuxtModule } from 'nuxt/kit'
import { addCustomTab } from '@nuxt/devtools-kit'
// Unfortunately this does not work because of Iframe security policies
export default defineNuxtModule({
  meta: {
    name: 'pocketbase-admin',
  },
  setup(_options, nuxt) {
    if (!nuxt.options.dev)
      return

    // Access the PocketBase URL from the Nuxt config
    const pocketbaseUrl = nuxt.options.runtimeConfig.public.pocketbaseUrl

    if (!pocketbaseUrl) {
      console.warn('PocketBase URL is not configured in runtime config')
      return
    }

    addCustomTab({
      name: 'pocketbase-admin',
      title: 'PocketBase Admin',
      icon: 'simple-icons:pocketbase',
      view: {
        type: 'iframe',
        src: `${pocketbaseUrl}/_/`,
      },
    })
  },
})
