// import { ENVIRONMENTS } from './constants'
// import type { User } from '../stores/types'

// const { LOCAL_STORAGE_KEY } = ENVIRONMENTS

// STORAGE EXPIRATION

export const getExpirationStorage = (): number => {
  const expiration = JSON.parse(localStorage.getItem('expiration') ?? '')
  return expiration || 0
}
export const setExpirationStorage = (expiration: number) =>
  localStorage.setItem('expiration', JSON.stringify(expiration))
export const removeExpirationStorage = () => localStorage.removeItem('expiration')
