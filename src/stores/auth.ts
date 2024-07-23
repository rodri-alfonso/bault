import { create } from 'zustand'
import type { User } from './types'
import { getAuthStorage, removeAuthStorage, setAuthStorage } from '../lib/storage'

type Store = {
	user: User | null
	setUser: () => void
}

export const authStore = create<Store>()((set) => ({
	user: getAuthStorage(),
	setUser: () => set((state) => ({ user: state.user })),
}))

export const signIn = () => {
	const mockUser = { id: 1, name: 'John Doe', email: '', picture: '' }

	authStore.setState({ user: mockUser })
	setAuthStorage(mockUser)
}

export const signOut = () => {
	authStore.setState({ user: null })
	removeAuthStorage()
}
