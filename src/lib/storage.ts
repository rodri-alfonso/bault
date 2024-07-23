import { ENVIRONMENTS } from './constants'
import type { User } from '../stores/types'

const { LOCAL_STORAGE_KEY } = ENVIRONMENTS

export const getAuthStorage = (): User | null => {
	const user = localStorage.getItem(LOCAL_STORAGE_KEY)
	return user ? JSON.parse(user) : null
}

export const setAuthStorage = (user: User) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
export const removeAuthStorage = () => localStorage.removeItem(LOCAL_STORAGE_KEY)
