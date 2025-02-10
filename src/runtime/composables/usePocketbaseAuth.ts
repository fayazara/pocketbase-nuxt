import type {
  AuthRecord,
  ClientResponseError,
  OAuth2AuthConfig,
} from 'pocketbase'
import { createError } from 'h3'
import { onMounted, onUnmounted, readonly } from 'vue'
import type {
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
  OAuthHandlerOptions,
} from '../types/auth'
import {
  loginUserSchema,
  registerUserSchema,
  forgotPasswordSchema,
} from '../schemas/auth'
import { usePocketbase } from './usePocketbase'
import { navigateTo, useState } from '#app'

/**
 * Composable for handling PocketBase authentication operations and user state management.
 *
 * @returns {object} Authentication utilities and state
 * @property {Readonly<Ref<AuthUser | null>>} user - Current authenticated user state
 * @property {Readonly<Ref<boolean>>} loading - Authentication loading state
 * @property {(credentials: LoginCredentials) => Promise<void>} loginWithPassword - Authenticates user with email/password
 * @property {(credentials: RegisterCredentials) => Promise<void>} registerWithPassword - Registers new user and sends verification email
 * @property {(provider: string, options?: OAuthHandlerOptions) => Promise<void>} handleOAuth - Handles OAuth authentication
 * @property {() => Promise<void>} signOut - Signs out current user
 * @property {(email: string) => Promise<void>} forgotPassword - Initiates password reset process
 * @property {() => Promise<void>} refreshUser - Refreshes current user's authentication
 * @property {ZodObject} loginUserSchema - Validation schema for login credentials
 * @property {ZodObject} registerUserSchema - Validation schema for registration credentials
 * @property {ZodObject} forgotPasswordSchema - Validation schema for forgot password
 * @property {string} authToken - Current authentication token
 */

export const usePocketbaseAuth = () => {
  const { pb } = usePocketbase()
  const authLoading = useState('auth-loading', () => false)
  const currentUser = useState<AuthUser | null>('auth-user', () => null)
  const authToken = pb.authStore.token

  const handleAuthError = (error: unknown) => {
    const clientError = error as ClientResponseError
    const errorMessage
      = clientError.message
        === 'The request doesnt satisfy the collection requirements to authenticate.'
        ? 'You have not been verified yet. Please check your email for a verification link.'
        : clientError.message
    throw createError(errorMessage)
  }

  const updateUserState = (record: AuthRecord | null) => {
    if (!record) {
      currentUser.value = null
      return
    }

    currentUser.value = {
      ...record,
      avatarUrl: record.avatar ? pb.files.getURL(record, record.avatar) : null,
    }
  }

  // Auth state management
  onMounted(() => {
    updateUserState(pb.authStore.record)
    const unsubscribe = pb.authStore.onChange((_, record) => {
      updateUserState(record)
    })

    onUnmounted(() => unsubscribe?.())
  })

  const loginWithPassword = async (credentials: LoginCredentials) => {
    authLoading.value = true
    try {
      await pb
        .collection('users')
        .authWithPassword(credentials.email, credentials.password)
      return navigateTo('/dashboard')
    }
    catch (error) {
      handleAuthError(error)
    }
    finally {
      authLoading.value = false
    }
  }

  const registerWithPassword = async (credentials: RegisterCredentials) => {
    authLoading.value = true
    try {
      await pb.collection('users').create(credentials)
      await pb.collection('users').requestVerification(credentials.email)
      return navigateTo('/auth/login')
    }
    catch (error) {
      handleAuthError(error)
    }
    finally {
      authLoading.value = false
    }
  }

  const forgotPassword = async (email: string) => {
    authLoading.value = true
    try {
      await pb.collection('users').requestPasswordReset(email)
    }
    catch (error) {
      handleAuthError(error)
    }
    finally {
      authLoading.value = false
    }
  }

  const signOut = async () => {
    await pb.authStore.clear()
    return navigateTo('/')
  }

  const refreshUser = async () => {
    try {
      await pb.collection('users').authRefresh()
      updateUserState(pb.authStore.record)
    }
    catch (error) {
      console.error('Failed to refresh user:', error)
      throw createError('Failed to refresh user data')
    }
  }

  let authWindow: Window | null = null

  const handleOAuth = async (
    provider: string,
    options: OAuthHandlerOptions = {},
  ) => {
    const {
      onSuccess,
      onError,
      redirectPath = '/dashboard',
      redirectDelay = 300,
    } = options

    try {
      authLoading.value = true
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

      // For iOS, open window before async operation
      if (isIOS) {
        authWindow = window.open('')
      }

      const authConfig: OAuth2AuthConfig = {
        provider,
        urlCallback: (url) => {
          if (isIOS && authWindow) {
            authWindow.location.href = url
          }
          else {
            const popup = window.open(url, 'oauth', 'width=600,height=800')
            if (!popup) {
              throw createError(
                'Failed to open login popup. Please allow popups for this site.',
              )
            }
          }
        },
      }

      const authData = await pb.collection('users').authWithOAuth2(authConfig)

      if (authData) {
        if (onSuccess) {
          await onSuccess()
        }

        if (redirectPath) {
          await new Promise(resolve => setTimeout(resolve, redirectDelay))
          await navigateTo(redirectPath)
        }
      }
    }
    catch (error) {
      if (onError) {
        onError(error as Error)
      }
      else {
        throw error
      }
    }
    finally {
      authLoading.value = false
    }
  }

  return {
    user: readonly(currentUser),
    loading: readonly(authLoading),
    authToken,
    loginWithPassword,
    registerWithPassword,
    signOut,
    forgotPassword,
    refreshUser,
    handleOAuth,
    loginUserSchema,
    registerUserSchema,
    forgotPasswordSchema,
  } as const
}
