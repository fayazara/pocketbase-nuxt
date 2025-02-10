import type PocketBase from 'pocketbase'
import { useNuxtApp } from '#app'

/**
 * Composable for accessing the PocketBase client instance.
 *
 * @returns {object} PocketBase utilities
 * @property {PocketBase} pb - PocketBase client instance
 */
export const usePocketbase = () => {
  const pb = useNuxtApp().$pb as PocketBase
  return {
    pb,
  } as const
}
