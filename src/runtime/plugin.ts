import PocketBase from 'pocketbase'
import type { TypedPocketBase } from './types/pocketbase-types'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const pocketbaseUrl = useRuntimeConfig().public.pocketbaseUrl
  const pb = new PocketBase(pocketbaseUrl) as TypedPocketBase
  nuxtApp.provide('pb', pb)
})
