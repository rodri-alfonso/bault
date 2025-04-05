// expiration
export const getExpirationStorage = (): number => {
  const expiration = JSON.parse(localStorage.getItem('expiration') || '0')
  return expiration || 0
}
export const setExpirationStorage = (expiration: number) =>
  localStorage.setItem('expiration', JSON.stringify(expiration))
export const removeExpirationStorage = () => localStorage.removeItem('expiration')
