import { ENVIRONMENTS } from './constants'
import type { User } from '../stores/types'

const { LOCAL_STORAGE_KEY } = ENVIRONMENTS

// STORAGE AUTH
export const getAuthStorage = (): User | null => {
  const user = localStorage.getItem(LOCAL_STORAGE_KEY)
  return user ? JSON.parse(user) : null
}
export const setAuthStorage = (user: User) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
export const removeAuthStorage = () => localStorage.removeItem(LOCAL_STORAGE_KEY)

// STORAGE EXPIRATION

export const getExpirationStorage = (): number => {
  const expiration = JSON.parse(localStorage.getItem('expiration') ?? '')
  return expiration || 0
}
export const setExpirationStorage = (expiration: number) =>
  localStorage.setItem('expiration', JSON.stringify(expiration))
export const removeExpirationStorage = () => localStorage.removeItem('expiration')
