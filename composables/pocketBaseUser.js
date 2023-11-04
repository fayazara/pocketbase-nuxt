import { useState } from '#imports'
import { usePocketBaseClient } from './pocketBaseClient'

export const usePocketBaseUser = () => {
  const pocketbase = usePocketBaseClient()
  const user = useState('pocketbase_user', () => null)
  const isUserLoggedIn = pocketbase?.authStore.isValid;

  if (isUserLoggedIn) {
    user.value = {
      email: pocketbase.authStore.model.email,
      name: pocketbase.authStore.model.name,
      id: pocketbase.authStore.model.id,
      avatar: pocketbase.authStore.model.avatar
    }
  } else {
    user.value = null
  }
  return { user, isUserLoggedIn }
}
