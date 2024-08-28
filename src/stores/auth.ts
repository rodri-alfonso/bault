import { create } from 'zustand'
import type { User } from './types'
import { signInWithPopup, signOut as googleSignOut } from 'firebase/auth'
import { auth, provider } from '../firebase'

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

      const { displayName, photoURL, uid } = user

      const payload = {
        id: uid,
        name: displayName,
        picture: photoURL,
      } as User

      authStore.setState({ user: payload })
    })
    .catch(() => {
      alert('Ha ocurrido un error, vuelve a intentarlo más tarde')
    })
}

export const signOut = () => {
  googleSignOut(auth)
  authStore.setState({ user: null })
}
