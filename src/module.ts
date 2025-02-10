import { fileURLToPath } from 'node:url'
import { defineNuxtModule, createResolver, addPlugin } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  url: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-pocketbase',
    configKey: 'pocketbase',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    url: '',
  },
  async setup(options, nuxt) {
    if (!options.url) {
      throw new Error('PocketBase URL is required')
    }

    // Make options available in runtime config
    nuxt.options.runtimeConfig.public.pocketbaseUrl = options.url

    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // Add composables directory to auto-imports
    nuxt.hook('imports:dirs', (dirs: string[]) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })

    // Add plugin
    addPlugin(resolve(runtimeDir, 'plugin'))

    // Add types
    nuxt.hook('prepare:types', (options) => {
      options.references.push({ types: 'pocketbase' })
    })
  },
})
