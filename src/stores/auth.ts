import { create } from 'zustand'
import type { User } from './types'
import { getAuthStorage, removeAuthStorage, setAuthStorage } from '../lib/storage'
import { signInWithPopup, signOut as googleSignOut } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { addUserToCollection } from '@/services/users'
import { encrypt } from '@/lib/encryption'

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

			const payload = {
				id: uid,
				name: encrypt(displayName ?? ''),
				email: encrypt(email ?? ''),
				picture: encrypt(photoURL ?? ''),
			} as User

			addUserToCollection(payload).then(() => {
				authStore.setState({ user: payload })
				setAuthStorage(payload)
			})
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
