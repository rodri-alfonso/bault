import { create } from 'zustand'
import type { User } from './types'
import { signInWithPopup, signOut as googleSignOut } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { addUserToCollection, isUserInCollection } from '@/services/users'
import { encrypt } from '@/lib/encryption'
import { registerStore } from './security'

type Store = {
  user: User | null
  setUser: () => void
}

export const authStore = create<Store>()((set) => ({
  user: null,
  setUser: () => set((state) => ({ user: state.user })),
}))

export const signIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user

      const { displayName, email, photoURL, uid } = user

      isUserInCollection(uid).then((isInCollection) => {
        const payload = {
          id: uid,
          name: encrypt(displayName ?? ''),
          email: encrypt(email ?? ''),
          picture: encrypt(photoURL ?? ''),
        } as User

        if (!isInCollection) {
          addUserToCollection(payload).then(() => {
            authStore.setState({ user: payload })
            // setAuthStorage(payload)
            registerStore.setState({ isInRegisterCode: true })
          })
        } else {
          authStore.setState({ user: payload })
          // setAuthStorage(payload)
        }
      })
    })
    .catch(() => {
      alert('Ha ocurrido un error, vuelve a intentarlo más tarde')
    })
}

export const signOut = () => {
  googleSignOut(auth)
  authStore.setState({ user: null })
  // removeAuthStorage()
}
