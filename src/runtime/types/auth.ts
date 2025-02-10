import type { RecordModel } from 'pocketbase'

export interface AuthUser extends RecordModel {
  avatarUrl: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export interface OAuthHandlerOptions {
  /**
   * Optional callback to execute after successful authentication
   */
  onSuccess?: () => Promise<void>
  /**
   * Optional callback to execute on authentication error
   */
  onError?: (error: Error) => void
  /**
   * Optional navigation path to redirect after successful authentication
   */
  redirectPath?: string
  /**
   * Optional delay in milliseconds before redirect (default: 300)
   */
  redirectDelay?: number
}
