import PocketBase from 'pocketbase'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const pocketbaseUrl = useRuntimeConfig().public.pocketbaseUrl
  const pb = new PocketBase(pocketbaseUrl as string)
  nuxtApp.provide('pb', pb)
})
