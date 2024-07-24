import { create } from 'zustand'
import type { User } from './types'
import { getAuthStorage, removeAuthStorage, setAuthStorage } from '../lib/storage'
import { signInWithPopup, signOut as googleSignOut } from 'firebase/auth'
import { auth, provider } from '../firebase'

type Store = {
	user: User | null
	setUser: () => void
}

export const authStore = create<Store>()((set) => ({
	user: getAuthStorage(),
	setUser: () => set((state) => ({ user: state.user })),
}))

export const signIn = () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			const user = result.user

			const { displayName, email, photoURL, uid } = user
			const userData = { id: uid, name: displayName, email, picture: photoURL } as User

			authStore.setState({ user: userData })
			setAuthStorage(userData)
		})
		.catch(() => {
			alert('Ha ocurrido un error, vuelve a intentarlo más tarde')
		})
}

export const signOut = () => {
	googleSignOut(auth)
	authStore.setState({ user: null })
	removeAuthStorage()
}
