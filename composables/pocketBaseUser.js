import { useState } from '#imports'
import { usePocketBaseClient } from './pocketBaseClient'

export const usePocketBaseUser = () => {
  const pocketbase = usePocketBaseClient()
  const user = useState('pocketbase_user', () => null)
  const isUserLoggedIn = pocketbase?.authStore.isValid;

  if (isUserLoggedIn) {
    const avatarUrl = pocketbase.getFileUrl(pocketbase.authStore.model, pocketbase.authStore.model.avatar);
    user.value = {
      email: pocketbase.authStore.model.email,
      name: pocketbase.authStore.model.name,
      id: pocketbase.authStore.model.id,
      avatar: avatarUrl,
    }
  } else {
    user.value = null
  }
  return { user, isUserLoggedIn }
}
